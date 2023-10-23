---
title: Making a Voice Bot
meta: In this post, we create a voice bot from existing tools out there. This involves detecting audio, transcribing audio, processing the transcription to generate an answer, and converting that answer back into speech. All code is open source, allowing you to easily modify it to your own needs.
tags: data science
---

I've been playing around with text-to-speech and speech-to-text models recently, and I
thought it would be a fun project to create my own voice bot using existing models out
there. At its core, a voice bot combines four different elements:

1. A way to record audio when audio is detected;
2. A way to transcribe that audio;
3. A way to process the transcription, to generate an answer;
4. A way to convert that answer back into speech.

In my implementation I wanted to keep these four components as uncoupled as possible,
as that would allow me to easily replace one of them with newer fancier tools down the
road. I also wanted this to be the initial version of the voice bot, and to keep this
initial version as simple as possible. I might write follow-up posts with improvements
to the bot when such improvements appear :)


### Recording Speech

To record the speech I opted for `pyaudio`, as it allowed me to continuously stream
audio and have a lot of control over when I want to stop recording. All audio will be
processed as simple `numpy` arrays.

We can open an audio stream and record a second of audio like so:

```python
SAMPLE_RATE = 16_000
NUM_SECONDS_TO_RECORD = 1

audio = pyaudio.PyAudio()
stream = audio.open(format=pyaudio.paFloat32, channels=1, rate=SAMPLE_RATE, input=True)
chunk_size = int(SAMPLE_RATE * NUM_SECONDS_TO_RECORD)
chunk = stream.read(num_frames=chunk_size, exception_on_overflow=False)
frame = np.frombuffer(buffer=chunk, dtype=np.float32)
```

Processing speech as 16kHz is standard in speech recognition models, so we might as
well record in 16kHz from the get-go. Here I record a second of mono-channel audio and
get the resulting audio as a numpy array.

This is not exactly what we want of course, since we can't say in advance for how long
we want to record - we basically want to continue recording until the user is done
talking. We can deal with this by recording short chunks continuously, and measure the
maximum volume of the audio for each chunk. If the volume is sufficiently high then we
interpret that as someone speaking, and we continue recording until the volume has been
low for a specified number of seconds. This can be implemented like this:

```python
NUM_SECONDS_PER_CHUNK = 0.25
MAX_SECONDS_SILENCE = 1
MIN_AUDIO_THRESHOLD = 0.05

max_num_silent_frames = MAX_SECONDS_SILENCE // NUM_SECONDS_PER_CHUNK

frames: list[np.ndarray] = list()
num_silent_frames: int = 0
has_begun_talking: bool = False

while num_silent_frames < max_num_silent_frames:

    # Record a chunk of audio
    chunk = stream.read(num_frames=chunk_size, exception_on_overflow=False)
    frame = np.frombuffer(buffer=chunk, dtype=np.float32)

    # Stop the stream when the user stops talking
    if frame.max() < MIN_AUDIO_THRESHOLD and has_begun_talking:
        num_silent_frames += 1

    # Otherwise, if the user is still talking, then reset the number of silent frames
    elif frame.max() >= MIN_AUDIO_THRESHOLD:
        if not has_begun_talking:
            logger.info("Audio detected!")
        has_begun_talking = True
        num_silent_frames = 0
        frames.append(frame)

result = np.concatenate(frames, axis=0)
```

Lastly, to avoid too short or too long audio segments, we can specify lower and upper
bounds for these as well. Here is the `speech_recording` module in its entirety with
this feature built in:

```python
"""Recording of speech."""

import pyaudio
import numpy as np
import logging


logger = logging.getLogger(__name__)


def record_speech(
    sample_rate: int,
    num_seconds_per_chunk: float,
    min_audio_threshold: float,
    max_seconds_silence: float,
    min_seconds_audio: float,
    max_seconds_audio: float,
    audio_format: int,
) -> np.ndarray:
    """Record speech and return it as text.

    Args:
        sample_rate: Sample rate.
        num_seconds_per_chunk: Number of seconds per chunk.
        min_audio_threshold: Minimum amplitude for audio to be considered speech.
        max_seconds_silence: Maximum number of seconds of silence before the recording
        min_seconds_audio: Minimum number of seconds of audio to be considered speech.
        max_seconds_audio: Maximum number of seconds of audio to be considered speech.
        audio_format: Audio format to store the audio as.

    Returns:
        Recorded speech.
    """
    audio = pyaudio.PyAudio()
    stream = audio.open(
        format=audio_format,
        channels=1,
        rate=sample_rate,
        input=True,
    )

    max_num_silent_frames = max_seconds_silence // num_seconds_per_chunk
    chunk_size = int(sample_rate * num_seconds_per_chunk)

    logger.info("Listening...")

    frames: list[np.ndarray] = list()
    num_silent_frames: int = 0
    has_begun_talking: bool = False
    while num_silent_frames < max_num_silent_frames:
        # Record a chunk of audio and append it to the list of frames
        chunk = stream.read(num_frames=chunk_size, exception_on_overflow=False)
        frame = np.frombuffer(buffer=chunk, dtype=np.float32)

        # Stop the stream when the user stops talking
        if frame.max() < min_audio_threshold and has_begun_talking:
            num_silent_frames += 1
            seconds_audio = len(frames) * num_seconds_per_chunk

            # If there's been enough silence and the audio is too short, restart
            if (
                num_silent_frames >= max_num_silent_frames
                and seconds_audio < min_seconds_audio
            ):
                logger.info("Audio too short, resetting. Listening...")
                frames = list()
                num_silent_frames = 0
                has_begun_talking = False

        elif frame.max() >= min_audio_threshold:
            if not has_begun_talking:
                logger.info("Audio detected!")
            has_begun_talking = True
            num_silent_frames = 0
            frames.append(frame)

        if len(frames) * num_seconds_per_chunk >= max_seconds_audio:
            logger.info("Max audio length reached, stopping.")
            break

    stream.stop_stream()
    stream.close()
    audio.terminate()

    return np.concatenate(frames, axis=0)
```


### Transcribing Speech

Now that we have the speech recorded, we need to transcribe it. I'm using the Hugging
Face pipelines for this, which is a simple wrapper that calls a speech recognition
model from the [Hugging Face
Hub](https://huggingface.co/models?pipeline_tag=automatic-speech-recognition):

```python
"""Transcription of speech."""

import numpy as np
from transformers import Pipeline
import warnings
import logging
import torch


logger = logging.getLogger(__name__)


# This prevents unnecessary logging from PyTorch during transcription
logging.getLogger("torch._dynamo.output_graph").setLevel(logging.CRITICAL)


def transcribe_speech(speech: np.ndarray, asr_pipeline: Pipeline) -> str:
    """Transcribe speech.

    Args:
        speech: Speech to transcribe.
        asr_pipeline: Hugging Face pipeline for automatic speech recognition.

    Returns:
        Transcribed speech.
    """
    logger.info(f"Transcribing speech of length {speech.shape[0]:,}...")
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", category=UserWarning)
        with torch.inference_mode():
            transcription = asr_pipeline(speech)["text"]
    logger.info(f"Heard the following: {transcription!r}")
    return transcription
```


### Generating an Answer

Next up, with the text at hand, we want to generate an appropriate answer. In this
first version we go for the easiest option, using ChatGPT. Here is a simple
boiler-plate call to an OpenAI model, using the `openai` package. Note that my voice
bot is in Danish, hence the Danish prompts - simply change these to whatever language
you prefer:

```python
import openai

# Set the OpenAI API key through the environment variable `OPENAI_API_KEY`
openai.api_key = os.getenv("OPENAI_API_KEY")

MODEL_ID = "gpt-3.5-turbo"
TEMPERATURE = 0.3
SYSTEM_PROMPT = """
Du hedder Jarvis og er en dansk stemmerobot. Du er sød, rar og hjælpsom, og dine svar
er altid super korte og præcise.
""".strip()
PROMPT = "Hvem er du?"

llm_answer = openai.ChatCompletion.create(
    model=MODEL_ID,
    messages=[
        dict(role="system", content=SYSTEM_PROMPT.strip()),
        dict(role="user", content=PROMPT),
    ],
    temperature=TEMPERATURE,
)
response = llm_answer.choices[0].message.content.strip()
```

We could easily stop here and use this as our text processing module. But I wanted two
extra features:

1. Enabling wake word detection;
1. Enabling follow-up questions.

The wake word is crucial as I want to use my voice bot as a smart assistant, and would
thus want to ultimately leave it on at all times. At the moment I would simply check if
a given word is present in the speech, and if not then reject the sample.

As for the follow-up questions, I've currently simply implemented it by having a
maximum amount of seconds that the user has to make a follow-up question, and any
speech within that time frame will be perceived as a follow-up question, which is
analogous to how it seems like Alexa devices deal with this.

As I now have an internal state to keep track of, the current conversation, I set it up
as a class. Here is the `text_engine` module with all of these things implemented:

```python
"""The engine that produces new responses."""

import openai
from dotenv import load_dotenv
import os
import logging
import datetime as dt


load_dotenv()
logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """
Du hedder Jarvis og er en dansk stemmerobot. Du er sød, rar og hjælpsom, og dine svar
er altid super korte og præcise.
"""


class TextEngine:
    """The engine that produces new responses.

    Args:
        model_id: OpenAI model ID of the model to use.
        temperature: Temperature to use for generation.
        wake_words: Words that should trigger a new conversation.
        follow_up_max_seconds: Maximum number of seconds to wait for a follow-up.
    """
    def __init__(
        self,
        model_id: str,
        temperature: float,
        wake_words: list[str],
        follow_up_max_seconds: float,
    ) -> None:
        self.model_id = model_id
        self.temperature = temperature
        self.wake_words = wake_words
        self.follow_up_max_seconds = follow_up_max_seconds
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def reset_conversation(self) -> None:
        """Reset the conversation, only keeping the system prompt."""
        self.conversation = [dict(role="system", content=SYSTEM_PROMPT.strip())]

    def generate_response(
        self, prompt: str, last_response_time: dt.datetime
    ) -> str | None:
        """Generate a new response from a prompt.

        Args:
            prompt: Prompt to generate a response from.
            last_response_time: Time of the last response.

        Returns:
            Generated response, or None if prompt should not be responded to.
        """
        now = dt.datetime.now()
        seconds_since_last_response = (now - last_response_time).total_seconds()
        if seconds_since_last_response > self.follow_up_max_seconds:
            self.reset_conversation()
            if all(word not in prompt for word in self.wake_words):
                logger.info("Prompt does not contain any of the wake words, skipping.")
                return None

        # Remove all the wake words from the prompt, to prevent them from influencing
        # the response.
        for word in self.wake_words:
            prompt = prompt.replace(word, "").strip()

        self.conversation.append(dict(role="user", content=prompt))
        llm_answer = openai.ChatCompletion.create(
            model=self.model_id,
            messages=self.conversation,
            temperature=self.temperature,
        )
        response: str = llm_answer.choices[0].message.content.strip()
        self.conversation.append(dict(role="assistant", content=response))
        logger.info(f"Generated the response: {response!r}")
        return response
```


### Synthesising a Response

With the response at hand, we now need to convert this back to speech. To do this, we
use the open source package `gtts`, which uses the speech synthesis built-in to [Google
Translate](https://translate.google.com/).

There is an upper limit of characters that can be converted at a time, so the `gtts`
package handles this by tokenising the text into smaller chunks, synthesising each of
these, after which it merges the audio from all the chunks. This tokenisation is done
quite primitively, by simply splitting on punctuation. This isn't meaningful for
Danish, where we for instance write "5." for "5th". To alleviate this, we can simply
substitute the `gtts` tokeniser with the `nltk` sentence tokeniser, which works really
well.

The following then synthesises the speech and stores it to an MP3 file:

```python
from functools import partial
from gtts import gTTS
from nltk import sent_tokenize

tokenizer_func = partial(sent_tokenize, language="danish")
tts = gTTS(text=text, lang="da", tokenizer_func=tokenizer_func)
tts.save(savefile="audio.mp3")
```

To then play the MP3 file we use the `pydub` package, which makes this really simple:

```python
from pydub import AudioSegment
from pydub.playback import play

audio = AudioSegment.from_mp3("audio.mp3")
play(audio)
```

Putting these two things together, we get our `speech_synthesis` module:

```python
"""Generation of Danish speech."""

from functools import partial
from pathlib import Path
from gtts import gTTS
from nltk import sent_tokenize
import nltk
from pydub import AudioSegment
from pydub.playback import play


# Download the NLTK tokenizer model
nltk.download("punkt", quiet=True)


def synthesise_speech(text: str | None) -> None:
    """Synthesise speech from text.

    Args:
        text: Text to be spoken, or None if nothing should be spoken.
    """
    if text is not None:
        tts = gTTS(
            text=text,
            tld="dk",
            lang="da",
            lang_check=False,
            tokenizer_func=partial(sent_tokenize, language="danish"),
        )
        output_path = Path(".temp.mp3")
        tts.save(savefile=output_path)
        play_mp3(path=output_path)
        output_path.unlink()


def play_mp3(path: str | Path) -> None:
    """Play an MP3 sound file.

    Args:
        path: The path to the MP3 file.
    """
    audio = AudioSegment.from_mp3(str(path))
    play(audio)
```


### Putting It All Together

We now have all the four elements we need to build our voice bot, so we now need to
bring them all together!

This is quite easy with the work we've done so far: we simply initialise all
components, and then run an infinite loop that calls the pipeline.

```python
from transformers import pipeline

# Initialise the speech recognition pipeline with a desired Hugging Face model
self.asr_pipeline = pipeline(
    task="automatic-speech-recognition", model=...
)

# Initialise our text engine
self.text_engine = TextEngine(...)

# Infinite voice bot loop
last_response_time = dt.datetime(year=1900, month=1, day=1)
while True:
    speech = record_speech(...)
    text = transcribe_speech(speech=speech, asr_pipeline=...)
    if text:
        response = self.text_engine.generate_response(
            prompt=text, last_response_time=last_response_time
        )
        synthesise_speech(text=response)
        last_response_time = dt.datetime.now()
```


We can set up this as a `VoiceBot` class as follows. It could potentially just be a
function too, even:

```python
"""A voice bot."""

import pyaudio
from .speech_recording import record_speech
from .speech_recognition import transcribe_speech
from .speech_synthesis import synthesise_speech
from .text_engine import TextEngine
from transformers import pipeline
import transformers.utils.logging as hf_logging
import logging
import datetime as dt


logger = logging.getLogger(__name__)


class VoiceBot:
    """A voice bot.

    Args:
        text_model_id: ID of the text generation model to use.
        asr_model_id: ID of the automatic speech recognition model to use.
        sample_rate: Sample rate to use for recording.
        temperature: Temperature to use for text generation.
        num_seconds_per_chunk: Number of seconds to record per chunk.
        min_audio_threshold: Minimum audio threshold for recording.
        max_seconds_silence: Maximum number of seconds of silence before stopping
        min_seconds_audio: Minimum number of seconds of audio before stopping
        max_seconds_audio: Maximum number of seconds of audio before stopping
        follow_up_max_seconds: Maximum number of seconds between responses before
        wake_words: Words that should trigger a new conversation.
    """

    def __init__(
        self,
        text_model_id: str,
        asr_model_id: str,
        sample_rate: int,
        temperature: float,
        num_seconds_per_chunk: float,
        min_audio_threshold: float,
        max_seconds_silence: float,
        min_seconds_audio: float,
        max_seconds_audio: float,
        follow_up_max_seconds: float,
        wake_words: list[str],
    ) -> None:
        self.text_model_id = text_model_id
        self.asr_model_id = asr_model_id
        self.sample_rate = sample_rate
        self.temperature = temperature
        self.num_seconds_per_chunk = num_seconds_per_chunk
        self.min_audio_threshold = min_audio_threshold
        self.max_seconds_silence = max_seconds_silence
        self.min_seconds_audio = min_seconds_audio
        self.max_seconds_audio = max_seconds_audio
        self.follow_up_max_seconds = follow_up_max_seconds
        self.wake_words = wake_words

        hf_logging.set_verbosity_error()

        self.asr_pipeline = pipeline(
            task="automatic-speech-recognition", model=self.asr_model_id
        )
        self.text_engine = TextEngine(
            model_id=self.text_model_id,
            temperature=self.temperature,
            wake_words=self.wake_words,
            follow_up_max_seconds=self.follow_up_max_seconds,
        )

    def run(self) -> None:
        """Run the bot."""
        last_response_time = dt.datetime(year=1900, month=1, day=1)
        while True:
            speech = record_speech(
                sample_rate=self.sample_rate,
                num_seconds_per_chunk=self.num_seconds_per_chunk,
                min_audio_threshold=self.min_audio_threshold,
                max_seconds_silence=self.max_seconds_silence,
                min_seconds_audio=self.min_seconds_audio,
                max_seconds_audio=self.max_seconds_audio,
                audio_format=pyaudio.paFloat32,
            )
            text = transcribe_speech(speech=speech, asr_pipeline=self.asr_pipeline)
            if text:
                response = self.text_engine.generate_response(
                    prompt=text, last_response_time=last_response_time
                )
                synthesise_speech(text=response)
                last_response_time = dt.datetime.now()
```

To run the bot, we thus simply need to initialise a `VoiceBot` instance and call its
`run` method. All done!


### Wrapping Up, and Next Steps

This concludes this first version of my voicebot! All the code can be found in the
[Github repository](https://github.com/saattrupdan/voicebot). When it comes to future
features, I've got several things on the drawing board.

Firstly, I'd like this bot to not be dependent on paid services like OpenAI, and thus
be able to use open source generative language models instead. Secondly, the
synthesised speech is not great, and I would like to be able to wrap a better
text-to-speech model instead - training such a model for Danish is currently in
progress! Another thing is compatibility with a Raspberry Pi, since I want this to run
as a smart asssistant.

All of this is to come in future installments of this series - stay tuned!
