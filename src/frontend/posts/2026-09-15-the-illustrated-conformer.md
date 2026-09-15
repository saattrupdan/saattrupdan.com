---
title: The Illustrated Conformer
subtitle: From sound waves to FastConformer, Parakeet, and Cohere Transcribe
meta:
  A visual tour of Conformer speech recognition, its FastConformer front end, and the
  different decoders used by Parakeet and Cohere Transcribe.
tags:
  speech recognition, deep learning, transformers, conformer, fastconformer, parakeet,
  automatic speech recognition
---

I've been thinking about speech recognition again. Not because I need another voice
project (I already made one in <router-link to="/posts/2023-10-21-making-a-voice-bot">an
earlier post</router-link>), but because modern ASR model cards now contain a small
alphabet soup: CTC, RNN-T, TDT, FastConformer, attention encoder-decoder. I wanted to
understand which bits were actually the same model, and which bits were merely sharing a
family photograph.

That curiosity sent me back to Jay Alammar's wonderful
[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/). It
showed me how a good diagram can make a difficult architecture feel like a route through
a city rather than a box of mysterious arrows. This post is my own visual walk through
speech recognition, explicitly inspired by that approach. The writing and all the
diagrams here are original; I haven't copied Jay's composition or artwork.

Also, a disclaimer: I'm not a speech researcher. I've tried to keep the details tied to
the papers and model cards below, but please take my explanations with a few grains of
salt (and perhaps a small snack for the longer equations).

### Starting with a sentence, not a definition

Let's use one utterance throughout:

> **“The small green boat is leaving.”**

A microphone doesn't hand an encoder that sentence. It hands over a changing pressure
wave. We sample that wave, slice it into short overlapping windows, and turn each window
into a vector describing energy at different frequencies. The model's job is to turn a
long sequence of those vectors into text, while coping with accents, noise, pauses, and
the fact that people don't politely leave spaces between sounds.

For a related practical project, see
<router-link to="/posts/2023-10-21-making-a-voice-bot"> my earlier voice bot post
</router-link>.

The first useful distinction is between an **encoder** and a **decoder**. The encoder
turns audio frames into contextual representations. A decoder or training objective
turns those representations into a transcript. They can be designed separately. Saying
that a model uses FastConformer tells us primarily about its encoder, not automatically
about whether it uses CTC, RNN-T, TDT, or an autoregressive decoder.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Sound wave to filterbank diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-sound-to-frames.svg"
      alt="A sound wave for The small green boat is leaving becomes overlapping windows
        and an 80-channel filterbank grid"
    />
  </div>
  <figcaption>
    We start with a waveform and make a time-by-frequency view of the utterance.
  </figcaption>
</figure>

### From pressure waves to frames

The original [Conformer paper](https://arxiv.org/abs/2005.08100) uses 80-channel log-Mel
filterbanks. In the paper's recipe, a 25 millisecond window is shifted by 10
milliseconds at a time. Each new slice therefore overlaps the previous one: speech
information doesn't fall into a crack between two frames. For a two-second recording,
that produces roughly 200 time steps before any subsampling (the exact count depends on
padding and feature extraction details).

You can think of each frame as a tiny vertical strip: low frequencies at the bottom,
high frequencies at the top, and brighter values where more energy was present. It isn't
a photograph of sound, and it isn't yet a token sequence. It is a reasonably compact,
learned-friendly description of what the microphone heard.

The Conformer encoder begins with convolutional subsampling. In the original setup, two
strided two-dimensional convolution stages reduce the time and frequency grids,
amounting to 4x subsampling. That makes later attention cheaper, although it also means
the network has to preserve useful information while shrinking the view. The result is
fed through a stack of Conformer blocks.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Conformer encoder pipeline diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-pipeline.svg"
      alt="Pipeline showing 80-channel filterbanks, 4x convolutional subsampling, a stack
        of Conformer encoder blocks, and contextual audio representations"
    />
  </div>
  <figcaption>
    Two 2x stages produce 4x subsampling before the Conformer stack adds context.
  </figcaption>
</figure>

### The block with two half steps

The clever bit of the original Conformer is that it combines two kinds of context.
Multi-head self-attention can connect distant moments: “boat” can influence the
interpretation of a later sound even when many frames sit between them. Convolution is
local: it is good at nearby patterns such as transitions between phonemes. Speech needs
both the wide map and the close-up.

An exact Conformer block, in order, is:

1. a feed-forward network with a half-sized residual contribution;
2. relative-position multi-head self-attention with a residual connection;
3. a convolution module with a residual connection;
4. a second feed-forward network with a half-sized residual contribution; and
5. a final LayerNorm.

The first and last feed-forward contributions are sometimes written as `1/2 FFN`. This
does **not** mean two smaller FFNs. They are regular FFNs whose residual updates are
scaled by one half. This is the Macaron-style arrangement: the attention and convolution
sit between two half steps of feed-forward processing.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Conformer block diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-block.svg"
      alt="A labeled Conformer block with a separate residual addition for each half FFN,
        relative multi-head self-attention, convolution, second half FFN, and final
        LayerNorm"
    />
  </div>
  <figcaption>
    The exact block order: the halves scale residual updates, not the FFN layers
    themselves.
  </figcaption>
</figure>

It helps to read the block as an update to a running representation. The first FFN
nudges it, attention shares information across the utterance, convolution polishes
nearby timing and sound patterns, and the second FFN nudges it again. Residual paths let
each module specialise without having to rebuild the whole representation from scratch.
LayerNorm at the end stabilises what gets passed to the next block.

#### A closer look at the convolution module

The convolution branch is not just “put a CNN somewhere in the middle”. The paper's
module follows a particular sequence:

1. LayerNorm;
2. a pointwise convolution;
3. a GLU (gated linear unit);
4. a one-dimensional depthwise convolution;
5. BatchNorm;
6. Swish (also commonly called SiLU);
7. another pointwise convolution; and
8. dropout before the residual addition.

If the block width is `d`, the first pointwise convolution expands and mixes channels
from `d` to `2d`. The GLU splits that tensor into two `d`-wide halves, gates one with
the other, and returns width `d`. The depthwise convolution therefore operates at `d`,
applying a temporal filter independently per channel. Batch normalisation and Swish then
prepare the signal for a final pointwise convolution that mixes and projects `d` back to
`d`; it does not collapse an expanded representation.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Conformer convolution module diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-convolution.svg"
      alt="The Conformer convolution module in order: LayerNorm, pointwise convolution
        from d to 2d, GLU returning d, depthwise convolution at d channels, BatchNorm,
        Swish, pointwise convolution from d to d, dropout, and residual addition"
    />
  </div>
  <figcaption>
    The local specialist inside the block has a surprisingly specific itinerary.
  </figcaption>
</figure>

This division of labour is the central intuition I take away from Conformer: attention
is the part that can make a global connection, while convolution is the part that has a
strong local bias. Neither slogan should be read as an absolute. Attention is also
computed over a sequence with practical limits, and a convolution stack can pass local
information onward over depth. Still, the two mechanisms give the encoder complementary
ways to organise sound.

### One Conformer system, not just one block

The original paper's complete speech-recognition system did not end at the encoder. Its
baseline used an RNN-Transducer (RNN-T), with a one-layer LSTM prediction network. That
distinction matters: **Conformer names the encoder**. The RNN-T prediction network and
joint network are the sequence-to-sequence machinery that turns encoder outputs and
label history into a transcript.

For our sentence, the encoder can produce a representation for the whole acoustic
sequence. The RNN-T decoder can then use both “The small green” and the next acoustic
representation when deciding whether the next output should be “boat”. An RNN-T head can
decode incrementally only when it is paired with a causal, chunked, cache-aware, or
limited-context encoder. The original full-context Conformer encoder is not made
streaming merely by attaching an RNN-T head; latency and quality still depend on the
encoder, implementation, and configuration.

### FastConformer: make the front door narrower

FastConformer retains the Conformer block topology. Its main speed idea is earlier, in
the front end. The [FastConformer paper](https://arxiv.org/abs/2305.05084) changes the
original 4x subsampling to 8x subsampling: three 2x stages, so the sequence entering the
encoder is one eighth as long as the feature sequence rather than one quarter as long.
The second and third subsampling layers use depthwise-separable convolution. The kernel
size 9 belongs to each Conformer block's convolution module: FastConformer changes that
kernel from the NeMo baseline's 31, rather than using it as a kernel size for the
subsampling front end. The block topology stays the same while this convolution kernel
changes.

“8x” is an easy number to misread. It means **one-eighth the sequence length**, not
“eight times faster”. Shortening the sequence reduces the number of positions that later
layers have to process, but actual speed also depends on kernels, hardware, batching,
memory traffic, and the decoder.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="FastConformer front end diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-fast.svg"
      alt="FastConformer front end showing three 2x stages, with depthwise-separable
        convolution in the second and third stages, followed by the same Conformer block
        topology whose convolution module uses kernel 9 (not the subsampling kernel), with
        optional local attention and a global token"
    />
  </div>
  <figcaption>
    FastConformer changes the entrance and convolution kernel, not the topology of the
    Conformer block.
  </figcaption>
</figure>

The paper also studies limited-context attention. A local window lets each position
attend to nearby positions, while a global token provides a compact route for
utterance-level information. With a window of width `w` over `T` positions, local
attention has roughly `O(Tw)` pair interactions instead of the `O(T²)` shape of full
attention. That is an intuition about attention scores, not a promise of an exact
end-to-end runtime: padding, projections, kernel implementations, and other layers still
count.

There are two numbers worth quoting only with their labels attached. In an A100
encoder-throughput ablation using batch size 128 and 20-second clips, the paper reports
an increase from 169 to 467 samples per second, described as 2.8x. Separately, its
11.25-hour result is a batch-1 A100 memory-feasibility test with limited-context
attention. It is not a claim that a model transcribes 11.25 hours in real time. Those
conditions make for much more useful facts than a floating “2.8x faster” badge.

### Decoders: four ways out of the encoder

Now we can separate the decoder choice from the encoder. Here is the miniature map I
wish I had whenever a model card lists several checkpoints.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Decoder comparison diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-decoders.svg"
      alt="Four decoder lanes: CTC emits parallel frame labels and blanks, RNN-T combines
        prediction history with a joint network, TDT predicts tokens and durations to skip
        frames, and an autoregressive Transformer decoder emits tokens step by step"
    />
  </div>
  <figcaption>
    These objectives and decoders consume encoder representations in different ways.
  </figcaption>
</figure>

**CTC** (Connectionist Temporal Classification) gives each input-aligned frame a
parallel distribution over labels and a blank symbol. A collapse rule removes repeated
labels and blanks to form text. It does not explicitly model a rich output history while
producing those framewise distributions, which makes it simple and often fast, but
alignment and language modelling trade-offs remain.

**RNN-T** adds a prediction network that represents output history. A joint network
combines that history with an encoder representation and chooses a token or blank. It
can emit more than one output while consuming acoustic steps, making it useful for
streaming only when paired with a streaming-capable encoder. The original RNN-T paper is
[Graves (2012)](https://arxiv.org/abs/1211.3711).

**TDT**, or Token-and-Duration Transducer, generalises the RNN-T idea by predicting a
token and a duration. A duration can tell the decoder to skip several acoustic frames
when no new token is needed. That can reduce needless frame-by-frame work, but it is a
property of the TDT objective, checkpoint, and runtime—not something that magically
comes from the word FastConformer. The primary reference is the
[TDT paper](https://arxiv.org/abs/2304.06795).

Finally, an **autoregressive Transformer decoder** emits one token at a time, feeding
its previous outputs back as history. It can model a rich target-side context, at the
cost of serial generation and a different latency profile. It is still perfectly
reasonable to put one after a FastConformer encoder; “Conformer” does not require an
RNN-T head.

| Route       | Predicts                    | Shape                                    |
| ----------- | --------------------------- | ---------------------------------------- |
| CTC         | Label or blank per frame    | Parallel scores, then collapse           |
| RNN-T       | Token or blank plus history | Streaming-friendly with suitable encoder |
| TDT         | Token and duration          | Can skip frames                          |
| Transformer | Next token from history     | Rich context, serial generation          |

This is a comparison of output mechanisms, not a leaderboard. The same route can have
very different latency and quality depending on its checkpoint, search, and runtime.

For reference, the original CTC paper is
[Graves et al. (2006)](https://www.cs.toronto.edu/~graves/icml_2006.pdf). The exact
loss, search procedure, and whether a checkpoint exposes timestamps or streaming are
separate practical choices. Architecture names are useful labels, but they aren't the
whole deployment plan.

### Parakeet is a collection, not a single bird

This distinction becomes important with NVIDIA's
[Parakeet collection](https://huggingface.co/collections/nvidia/parakeet-asr). Parakeet
is a family of models using FastConformer encoders paired with different heads and
objectives: CTC, RNN-T, TDT, and hybrid combinations. It is not one architecture with
one universal decoder.

A representative group of 1.1B checkpoints includes CTC, RNN-T, and TDT variants. The
[Parakeet TDT 0.6B v2 model card][parakeet-v2] describes an English model with
punctuation, capitalisation, and timestamps, and reports clips up to 24 minutes under
its documented setup. Its [v3 model card][parakeet-v3] describes coverage of 25 European
languages with language detection, and advertises up to 24 minutes with full attention
on an A100 80GB or three hours with local attention. These are version-, hardware-,
context-, and runtime-dependent model-card claims, not timeless laws of birds or GPUs.

The labels tell us what we can compare: encoder capacity and front end, decoder or
objective, language coverage, and the available timestamp or streaming behaviour. TDT's
ability to predict durations belongs to its decoder/checkpoint/runtime. It isn't a
property inherited by every FastConformer model sitting nearby in the collection.

### Cohere Transcribe takes a different exit

[Cohere Transcribe](https://huggingface.co/CohereLabs/cohere-transcribe-03-2026) is a
useful counterexample to the temptation to call every FastConformer system “Parakeet”.
The [release article][cohere-release] describes a roughly 2.066B multilingual
**attention encoder-decoder**. Its large FastConformer encoder has 48 layers, width
1280, and 8 heads. The [released config][cohere-config] specifies 8x subsampling with a
subsampling kernel of 3, while kernel size 9 belongs to the encoder's Conformer
convolution modules. Those kernel values are config-derived, not claims made by the
release article. The decoder is an 8-layer autoregressive Transformer with width 1024
and 8 heads.

So it shares a broad encoder family resemblance with FastConformer systems, but it is
not a Parakeet model. It also does not inherit the FastConformer paper's 11-hour memory
feasibility result. That result belongs to a particular paper experiment; model cards
and deployment settings need to be read on their own terms.

The practical constraints are just as important as the layer counts. The model card
documents 14 supported languages and requires the caller to specify the language; it
doesn't auto-detect it. Runtime configuration handles long audio with chunked
processing, using a maximum clip length of 35 seconds and a boundary-context setting of
5 seconds. The model does not natively support timestamps or diarisation. Its disclosed
training recipe mentions 0.5 million curated hours plus synthetic data, without
providing a dataset-by-dataset inventory. The Hub model is gated and released under
Apache-2.0.

<figure class="diagram-figure">
  <div
    class="diagram-scroll"
    tabindex="0"
    role="region"
    aria-label="Model family comparison diagram"
  >
    <img
      src="/src/frontend/assets/img/illustrated-conformer-model-map.svg"
      alt="A comparison map showing Parakeet as a FastConformer family with several
        decoder heads, and Cohere Transcribe as a separate FastConformer encoder with an
        autoregressive Transformer decoder"
    />
  </div>
  <figcaption>
    Shared front-end ideas don't make two model collections the same model.
  </figcaption>
</figure>

This is why I prefer an architecture map to a leaderboard. A benchmark number without
its language, clip length, hardware, batch size, precision, decoding settings, and date
can be more decorative than informative. The trade-offs here are tangible: parallel CTC
decoding, RNN-T paired with a streaming-capable encoder, duration-aware TDT, or a richer
but serial attention decoder; full or local attention; built-in timestamps or none;
automatic language detection or an explicitly supplied language.

### Following the sentence through

Let's return to “The small green boat is leaving.” After filterbanks and subsampling,
the encoder sees a shorter sequence whose vectors contain both local acoustic detail and
wider context. A CTC head may place distributions over repeated frame positions and
blanks, eventually collapsing them into words. An RNN-T head may emit “The”, then use
prediction history while consuming more encoder steps. A TDT head can decide that a
stretch of frames carries no new token and jump over it. An autoregressive Transformer
can keep producing the transcript one token at a time from its decoder history.

All four routes can describe the same utterance. They differ in alignment, search,
latency, and what their checkpoints were trained to do. The encoder has done important
work, but it hasn't selected the final decoding contract on its own.

That also gives me a nicer way to read model cards. First ask: what goes in, and how is
the sequence shortened? Then: what does each block mix locally and globally? Finally:
what head consumes the representation, and what user-facing features did that exact
checkpoint and runtime implement? It is less catchy than memorising one model name, but
it prevents a surprising number of category errors.

### Takeaway and further reading

My short version is this: Conformer combines global relative attention with local
convolution; FastConformer keeps that block while making the front end and attention
context more economical; and decoder choices determine how encoder representations
become text. Parakeet is a family that explores several of those choices. Cohere
Transcribe is a separate multilingual attention encoder-decoder with its own limits and
capabilities.

I started with Jay Alammar's
[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/), and
I'm ending with the primary sources that kept this tour honest:

- [Conformer: Convolution-augmented Transformer for Speech Recognition][conformer]
- [Fast Conformer: A Novel Speech Recognition Model][fast-conformer]
- [Connectionist Temporal Classification][ctc]
- [Sequence Transduction with Recurrent Neural Networks][rnnt]
- [Token-and-Duration Transducer][tdt]
- [NVIDIA Parakeet ASR collection][parakeet]
- [Cohere Transcribe model card][cohere-card]
- [Cohere Transcribe release article][cohere-release]

[conformer]: https://arxiv.org/abs/2005.08100
[fast-conformer]: https://arxiv.org/abs/2305.05084
[ctc]: https://www.cs.toronto.edu/~graves/icml_2006.pdf
[rnnt]: https://arxiv.org/abs/1211.3711
[tdt]: https://arxiv.org/abs/2304.06795
[parakeet]: https://huggingface.co/collections/nvidia/parakeet-asr
[parakeet-v2]: https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2
[parakeet-v3]: https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3
[cohere-card]: https://huggingface.co/CohereLabs/cohere-transcribe-03-2026
[cohere-config]:
  https://huggingface.co/CohereLabs/cohere-transcribe-03-2026/blob/main/config.json
[cohere-release]:
  https://huggingface.co/blog/CohereLabs/cohere-transcribe-03-2026-release

And that's it: one sentence, several ways to represent it, and considerably fewer
mysterious birds. Hope the diagrams make the route as memorable for you as they made it
for me.
