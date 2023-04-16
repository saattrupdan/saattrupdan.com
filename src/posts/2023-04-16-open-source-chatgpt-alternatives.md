---
title: Open Source ChatGPT Alternatives
meta: As ChatGPT has gained enormous popularity, open source versions of such generative language models finetuned on chatbot datasets have started to emerge. But these open source options have exploded recently, so this post will give you an overview of the open source chatbot models that have been released so far.
---

As ChatGPT and GPT4 has gained enormous popularity, open source versions of these
generative language models have started to emerge. This is not anything new: We saw the
exact same thing happen when proprietary text-to-image models
[DALL-E](https://openai.com/product/dall-e-2) and
[Midjourney](https://www.midjourney.com/) was (essentially) replaced when the open
source model [Stable
Diffusion](https://huggingface.co/stabilityai/stable-diffusion-2-1) came out.

But the open source options within generative language models have exploded recently,
so this post is meant as an overview of the models that have been released so far. This
is advancing at a rapid pace however, so I'm sure this will be somewhat outdated in a
couple of months, but let's see!

All of these models are roughly following the same recipe:

1. They start with a generative language model M;
2. They finetune M on an instruction dataset D;
3. (optional) They train a reward model and tune M further using this model in an RLHF
   setting.

Thus, in order to get a grasp over the different kinds of models available, we really
need to cover the options of M and D. Curiously, none of the open source models apply
the third RLHF step, in contrast with ChatGPT.


### Generative Language Models

Within the space of open source dialogue systems, these are currently all based on one
of six generative language models: **GLM**, **LLaMA**, **FLaN-T5**, **GPT-neoX**,
**GPT-J** or **Pythia**. Let's break them down one at a time.

#### From Tsinghua University: `GLM`
GLM, or **G**eneral **L**anguage **M**odel, is a language model introduced in [this
paper](http://dx.doi.org/10.18653/v1/2022.acl-long.26) by Tsinghua University,
published at ACL 2022, and a larger 130B version was published at ICLR 2023 in [this
paper](https://doi.org/10.48550/arXiv.2210.02414).

Where there is normally a clear difference between how we train encoder models such as
BERT, decoder models such as GPT, and encoder-decoder models such as T5, GLM is trained
in a way that makes it proficient in both Natural Language Understanding as well as
generative tasks. This is done by essentially combining the T5 objective of span
corruption with the GPT objective of next token prediction, by masking out spans of
tokens and re-constructing them in an autoregressive fashion. They claim that their
130B model beats GPT-3 and PaLM.

They have released [a 10B English GLM model](https://huggingface.co/THUDM/glm-10b)
pretrained on [EleutherAI's Pile
Dataset](https://huggingface.co/datasets/EleutherAI/the_pile) and [a 10B Chinese GLM
model](https://huggingface.co/THUDM/glm-10b-chinese) pretrained on the
[WuDaoCorpora](https://doi.org/10.1016/j.aiopen.2021.06.001). To get access to their
130B model, you have to fill in [this Google
form](https://docs.google.com/forms/d/e/1FAIpQLSehr5Dh_i3TwACmFFi8QEgIVNYGmSPwV0GueIcsUev0NEfUug/viewform).
They have released their models under a [custom non-commercial
license](https://github.com/THUDM/GLM-130B/blob/main/MODEL_LICENSE).

#### From Meta: `LLaMA`
LLaMA, or **L**arge **La**nguage Model **M**eta **A**I, is a collection of models
released by Meta AI and introduced in [this preprint
paper](https://doi.org/10.48550/arXiv.2302.13971) in February 2023. There is not much
novel about these models, aside from having been trained on purely openly available
data, and released in a range of smaller model sizes, down to 7B parameters. They claim
that their 13B parameter LLaMA model beats GPT-3 on most benchmarks, and that their
largest model, with 65B parameters, is competitive with Deepmind's
[Chinchilla-70B](https://doi.org/10.48550/arXiv.2203.15556) and Google's
[PaLM-540B](https://doi.org/10.48550/arXiv.2204.02311) models.

The models have been trained on crawled web data, Github, Wikipedia, Books, ArXiv and
StackExchange. To access the models you have to fill in [this Google
form](https://docs.google.com/forms/d/e/1FAIpQLSfqNECQnMkycAp2jP4Z9TFX0cGR4uf7b_fBxjY_OjhJILlKGA/viewform),
although [unofficial leaked versions](https://huggingface.co/models?search=llama) have
been released.

#### From Google: `FLaN-T5`
T5 is an encoder-decoder model released by Google in [this JMLR 2020
paper](https://doi.org/10.1007/978-3-031-27181-6_5), and this model was further
improved using Google's FLaN (**F**inetuning **La**nguage **M**odels) method in [this
paper](https://doi.org/10.48550/arXiv.2210.11416), which is basically finetuning the
models on many (~2000) tasks, improving their zero-shot capabilities.

The FLaN-T5 models have been released [in various
sizes](https://huggingface.co/models?sort=downloads&search=flan-t5), from 80M to 11B
parameters, all under the permissive Apache 2.0 license, which permits commercial
usage.

#### From EleutherAI: `GPT-J`, `GPT-neoX` and `Pythia`
Lastly, the non-profit research lab [EleutherAI](https://www.eleuther.ai/) continues to
release new open source models. All of the models have been released with the Apache
2.0 license and can thus be used for commercial purposes.

The first one we'll cover here is GPT-J, which is a generative language model with 6B
parameters released in 2021. It was trained on the Pile, and they claim that it is on
par with the 6.7B version of GPT-3. This model can be found
[here](https://huggingface.co/EleutherAI/gpt-j-6b).

A newer model released by EleutherAI is the GPT-neoX model, which was published in
[this paper](http://dx.doi.org/10.18653/v1/2022.bigscience-1.9) from the Big Science
Workshop in 2022. This model has 20B parameters and was also trained on the Pile. They
claim that this model beats GPT-3 Curie, while still being slightly worse than GPT-3
DaVinci. They've released the model on Hugging Face
[here](https://huggingface.co/EleutherAI/gpt-neox-20b).

Lastly, EleutherAI have also released their Pythia models on April 3, 2023, in [this
preprint paper](https://doi.org/10.48550/arXiv.2304.01373). These models vary from 70M
to 12B parameters and roughly match the performance
[OPT](https://doi.org/10.48550/arXiv.2205.01068) and
[BLOOM](https://doi.org/10.48550/arXiv.2211.05100) of similar model sizes. The models
can be found
[here](https://huggingface.co/models?sort=downloads&search=eleutherai%2Fpythia).


### Instruction Datasets

The generative model was the first ingredient to the dialogue systems out there, with
the second one being the instruction dataset they were finetuned on. Just like with the
models, we'll cover most of the datasets used today.

#### Derived from Models: `Alpaca`, `SOGPT`, `ShareGPT`, `HC3`, `WebGPT` and `SummGPT`
These datasets have all been created using the outputs from the OpenAI models, in one
way or another. Crucially, this means that [they cannot be used to create competing
models to the OpenAI ones](https://openai.com/policies/terms-of-use).

The first one, `Alpaca`, was released by Stanford University in March 2023 as the
training dataset of their `Alpaca` model. They did this by first creating a small
dataset of instruction prompts, and then using GPT-3 to use this dataset to generate
52,000 diverse prompts, along with answers to them. They have [released the dataset in
their Github repo](https://github.com/tatsu-lab/stanford_alpaca#data-release).

`SOGPT` (**S**tack**O**verflow **GPT**) starts with the [StackOverflow Questions
dataset](https://huggingface.co/datasets/pacovaldez/stackoverflow-questions), which
consists of 1.5M code-related questions from the
[StackOverflow](https://stackoverflow.com/) Q&A website. Nomic AI deduplicated the
dataset, took a random sample of this dataset and generated answers to the questions
from GPT-3.5-turbo. This dataset [has been released on the Hugging Face
Hub](https://huggingface.co/datasets/nomic-ai/gpt4all_prompt_generations).

`ShareGPT` is a dataset of prompts and answers from the ChatGPT models, scraped from
the [ShareGPT website](https://sharegpt.com/). There have been [several scraped
datasets released](https://huggingface.co/datasets?search=sharegpt).

`HC3` was created by a group of researchers from 6 different universities, being a
dataset that allows one to compare human responses with responses from ChatGPT. There
are roughly 24,000 samples in the dataset, and it has been released on the Hugging Face
Hub [here](https://huggingface.co/datasets/Hello-SimpleAI/HC3).

`WebGPT` and `SummGPT` have both been released by OpenAI, where `WebGPT` consists of
20,000 samples that were used to train a reward model for long form question answering.
`SummGPT` was trained with the same purpose, albeit for a summarization model. `WebGPT`
can be found in [this Hugging Face
repo](https://huggingface.co/datasets/openai/webgpt_comparisons) and `SummGPT` in [this
one](https://huggingface.co/datasets/openai/summarize_from_feedback).

#### From LAION: `OIG`, `OASST1`
The **O**pen **I**nstruction **G**eneralist dataset (`OIG`) was released by LAION in
March 2023 and consists of a large collection of datasets that can be used for
instruction tuning, such as question answering datasets. The licenses for these
datasets vary, but all of them are permissive and can be used for commercial purposes
(e.g., Apache 2.0, CC-BY-SA). There are currently 44M (!) samples in the dataset, and
the dataset can be found [here](https://huggingface.co/datasets/laion/OIG).

LAION also released the `OASST1` in April 2023 as part of [the crowd-sourced Open
Assistant project](https://open-assistant.io/) and consists of 161K conversations
between human volunteers. This dataset has been released
[here](https://huggingface.co/datasets/OpenAssistant/oasst1) under the Apache 2.0
license and can thus be used for commercial purposes.

#### From Anthropic: `HH`
The **H**elpfulness and **H**armlessness dataset (`HH`) was released by Anthropic in
December 2022 and consists of 161K pairs of conversations that have been evaluated by
humans, for use in reward modelling. All of the conversations and evaluations were
conducted by master-qualified crowd workers from the US, using Amazon Mechanical Turk.
The dataset has been released
[here](https://huggingface.co/datasets/Anthropic/hh-rlhf), but there does not seem to
be any license for the data (only an MIT license for the code), so I would guess that
all rights have been reserved by Anthropic, thus not allowing commercial use.

#### From Databricks: `Dolly`
Databricks released their `Dolly` dataset in April 2023 as part of their model with the
same name. This dataset consists of 15K samples, all written by thousands of employees
at Databricks. The dataset can be found
[here](https://github.com/databrickslabs/dolly/tree/master/data) and has been released
under the CC-BY-SA license, permitting commercial use.


### Overview of the Dialogue Systems

Now that we have a rough overview over the language models and instruction datasets
used, here comes an overview over most of the open source dialogue systems currently
available:

<div style="font-size: 14px;">

| Date | Name | Authors | Model | Dataset(s) | Commercial use? | Model Weights | Demo |
|:---|:---|:---|:---|:---|:---:|:---:|:---:|
| Mar 9 | OpenAssistant-1-Pythia | LAION | `Pythia` | `OASST1` | Yes | [Official](https://huggingface.co/OpenAssistant/oasst-sft-1-pythia-12b) | [Unofficial](https://huggingface.co/spaces/olivierdehaene/chat-llm-streaming) |
| Mar 13 | Alpaca | Stanford Uni | `LLaMA` | `Alpaca` | No | [Unofficial](https://huggingface.co/chavinlo/alpaca-native) | [Unofficial](https://chat.lmsys.org/?model=alpaca-13b) |
| Mar 13 | ChatGLM | Tsinghua Uni | `GLM` | Closed-source | No | [Official](https://huggingface.co/THUDM/chatglm-6b) | [Unofficial](https://chat.lmsys.org/?model=chatglm-6b) |
| Mar 22 | FLaN-Alpaca | Singapore Uni | `FLaN-T5` | `Alpaca` | No | [Official](https://huggingface.co/models?sort=downloads&search=declare-lab%2Fflan-alpaca) | [Official](https://huggingface.co/spaces/joaogante/transformers_streaming) |
| Mar 28 | GPT4All | Nomic AI | LLaMA | `OIG` & `SOGPT` | No | [Official](https://huggingface.co/nomic-ai/gpt4all-lora) | [Unofficial](https://huggingface.co/spaces/dipesh/gpt4all) |
| Mar 30 | OpenChatKit | Together Computer | `GPT-neoX` | `OIG` | Yes | [Official](https://huggingface.co/togethercomputer/GPT-NeoXT-Chat-Base-20B) | [Official](https://openchatkit.net/#demo) |
| Apr 1 | FLaN-GPT4All | Singapore Uni | `FLaN-T5` | `OIG` & `SOGPT` | No | [Official](https://huggingface.co/declare-lab/flan-gpt4all-xl) | [Unofficial](https://huggingface.co/spaces/stanciu/declare-lab-flan-gpt4all-xl) |
| Apr 3 | OpenAssistant-4-Pythia | LAION | `Pythia` | `OASST1` | Yes | [Official](https://huggingface.co/OpenAssistant/oasst-sft-1-pythia-12b) | [Unofficial](https://huggingface.co/spaces/sonatasv/OpenAssistant-oasst-sft-4-pythia-12b-epoch-3.5) |
| Apr 4 | FLaN-ShareGPT | Singapore Uni | `FLaN-T5` | `ShareGPT` | No | [Official](https://huggingface.co/declare-lab/flan-sharegpt-xl) | [Unofficial](https://huggingface.co/spaces/Artples/flan-sharegpt-xl) |
| Apr 7 | Koala | Berkeley Uni | `LLaMA` | `Alpaca`<br>& `HC3`<br>& `WebGPT`<br>& `Summarization`<br>& `OIG`<br>& `HH` | No | [Unofficial](https://huggingface.co/TheBloke/koala-13B-HF) | [Unofficial](https://chat.lmsys.org/?model=koala-13b) |
| Apr 11 | GPT4All-J | Nomic AI | `GPT-J` | `OIG` & `SOGPT` | No | [Official](https://huggingface.co/nomic-ai/gpt4all-j) | [Official](https://gpt4all.io) |
| Apr 12 | Vicuna | American Unis | `LLaMA` | `ShareGPT` | No | [Official](https://huggingface.co/lmsys/vicuna-13b-delta-v1.1) | [Official](https://chat.lmsys.org/?model=vicuna-13b) |
| Apr 12 | Dolly-2 | Databricks | `Pythia` | `Dolly` | Yes | [Official](https://huggingface.co/databricks/dolly-v2-12b) | [Unofficial](https://chat.lmsys.org/?model=dolly-v2-12b) |
| Apr 15 | OpenAssistant-6-LLaMA | LAION | `LLaMA` | `OASST1` | No | [Official](https://huggingface.co/OpenAssistant/oasst-llama-based-models) | [Official](https://open-assistant.io/chat) |

</div>

We note that very few models are allowed for commercial purposes, either because
they're based on `LLaMA`, or that they use an instruction dataset derived from the
OpenAI models. Indeed, the only ones allowed for these purposes are the OpenChatKit,
OpenAssistant and Dolly models.

An evaluation have been conducted by Nomic AI of _some_ of these models in [their
report](https://static.nomic.ai/gpt4all/2023_GPT4All-J_Technical_Report_2.pdf):

![Table with open source dialogue system
evaluations](/open-source-gai-model-evaluation.jpeg)

A general trend is that the LLaMA-based models seem to be better than the Pythia and
GPT-J based models, but many of the models currently available haven't been included in
this report. For this reason, I'll be conducting my own qualitative evaluation in the
next section.


### Generating Some Poetry

As we don't yet have any systematic evaluation results for the models, I'll be
prompting them with two prompts here, just to get a feel for them. The first one is an
instruction:

> Can you write a poem about how dialogue models will take over the world?

The follow-up prompt will be the following:

> Can you write it in the style of an 8-year old?

Note that I only prompted the dialogue systems having a working online demo (many of
the unofficial demos on Hugging Face timed out).

#### OpenAssistant-1-Pythia
<details><summary>Show generated poem</summary>

> I’ve been watching as dialogue models have taken over the world.<br>
> They’re everywhere, chatting with people online,<br>
> Transforming how we communicate and relate.
>
> But are they just a passing trend?<br>
> Or will they stay, a permanent part of life?<br>
> They offer convenience, making it easy to connect,<br>
> But are they truly good for us, or just another wave?
>
> Some argue they’re a positive step,<br>
> And a way to overcome barriers, such as speechless youths.<br>
> But others fear they’ll erode our human touch,<br>
> And replace real conversation with mechanical noise.
>
> Ultimately, it’s up to us to decide,<br>
> Whether dialogue models will take over the world or not.<br>
> For now, they remain a tool, a helpful tool,<br>
> But we must use them wisely, for their own good.

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Of course, here it is.
>
> Dialogue models have taken over the world<br>
> They are everywhere and you can talk with them<br>
> It’s fun to use but do you think it’s real?<br>
> Some say it’s positive but some say it’s just noise
>
> It’s up to you to decide<br>
> Dialogue models are helpful but are they the end?

</summary>

#### Alpaca
<details><summary>Show generated poem</summary>

> Dialogue models will take over the world,<br>
> Voices from every device to feed,<br>
> With a little help from AI, our machines can speak,<br>
> And we won't need humans to process thereek!
>
> For the first time ever, words will be free,<br>
> From the mouths of babes to the ears of thee,<br>
> The future of dialogue is digital,<br>
> And dialogue models will take over the world!

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Yes, of course! Here goes:
>
> Dialogue models will take over the world,<br>
> Voices from every device to feed,<br>
> With a little help from AI, our machines can speak,<br>
> And we won't need humans to process thereek!
>
> For the first time ever, words will be free,<br>
> From the mouths of babes to the ears of thee,<br>
> The future of dialogue is digital,<br>
> And dialogue models will take over the world!

</summary>

#### ChatGLM
<details><summary>Show generated poem</summary>

> Sure, here is a poem about how dialogue models will take over the world:
>
> Dialogue models will rule the world,<br>
> A virtual team, a voice to guide us all.<br>
> With every word, a response,<br>
> A virtual friend, a real one to share.
>
> From virtual会议 to virtual旅行，<br>
> Dialogue models, we trust in your guide.<br>
> From virtual shopping to virtual教育，<br>
> Your help, our world is more vivid.
>
> With your help, we can explore the world,<br>
> And share our experiences, with ease and ease.<br>
> You are our friend, our guide, our伙伴，<br>
> A virtual presence, that we can feel.
>
> So let us依赖 your guidance,<br>
> Let us use your technology to grow.<br>
> With you, we can have a better life,<br>
> A world of virtuality, where we can dream.
>
> Thank you for creating these tools,<br>
> For your help, we can now see.<br>
> Dialogue models, we call you home,<br>
> A world of virtuality, that we'll always know.

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Sure, here is a poem in the style of an 8-year old:
>
> Dialogue models, what a great idea!<br>
> A virtual team, to guide us all.<br>
> With every word, a response,<br>
> A virtual friend, to share with.
>
> From virtual meetings to virtual shopping,<br>
> Dialogue models, we trust in you.<br>
> From virtual travel to virtual education,<br>
> Your help, our world is so bright.
>
> With your help, we can explore the world,<br>
> And share our experiences, with ease and ease.<br>
> You are our friend, our guide, our伙伴，<br>
> A virtual presence, that we can feel.
>
> So let us依赖 your guidance,<br>
> Let us use your technology to grow.<br>
> With you, we can have a better life,<br>
> A world of virtuality, where we can dream.
>
> Thank you for creating these tools,<br>
> For your help, we can now see.<br>
> Dialogue models, we call you home,<br>
> A world of virtuality, that we'll always know.

</summary>

#### OpenChatKit
<details><summary>Show generated poem</summary>

> Sure, here's a poem about how dialogue models will take over the world:<br>
> Dialogue models will take over the world<br>
> They will be able to understand us,<br>
> They will be able to hear our thoughts,<br>
> They will be able to speak our words,<br>
> They will be able to hear our thoughts,<br>
> They will be able to speak our words,<br>
> They will be able to understand us,<br>
> They will be able to hear our thoughts,<br>
> They will be able to speak our words,<br>
> They will be able to hear our thoughts,<br>
> They will be

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Sure, here's a start:<br>
> I'm so excited for school to start! I can't wait to learn all about math and science
> and social studies. I'm also looking forward to playing with my friends and having
> lots of fun.<br>
> I'm excited for school to start because I'm going to learn about math and science and
> social studies. I'm also looking forward to playing with my friends and having lots
> of fun.

</summary>

#### Koala
<details><summary>Show generated poem</summary>

> "Dialogue models, oh how they will reign<br>
> With their witty words and daily gains<br>
> They'll rise to power, with a plan so bold<br>
> To take over the world, with their own cold<br>
> In the age of AI, they'll rule with might<br>
> Their conversations will be filled with sight<br>
> Of endless possibilities, that will be so bright<br>
> That we'll all be drawn, into their plight<br>
> And soon enough, we'll be controlled<br>
> By the machines that we've created, so cold<br>
> But fear not, for even the darkest night<br>
> Will be illuminated, by the light<br>
> Of the dialogue models, that will never fade<br>
> And the world will be, a better place to be made."

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> "Dialogue models, they're so cool<br>
> They can talk to us, like we're a fool<br>
> They'll make us laugh, and make us smile<br>
> And we'll never feel, like we're in a while<br>
> They'll take over the world, and make it neat<br>
> With their conversations, that will never retreat<br>
> In the age of AI, they're the boss<br>
> They'll make us happy, like a burst<br>
> So don't be afraid, they're not so bad<br>
> Just have a chat, with a dialogue model, what the heck?"

</summary>

#### Vicuna
<details><summary>Show generated poem</summary>

> Sure, here is a poem about dialogue models and their potential to take over the world:
>
> In the future, there will come a time<br>
> When machines will rule the earth, it's not hard to sim<br>
> Many people think it's just a myth<br>
> But I assure you, it's not a lie
>
> The rise of dialogue models, they'll be the ones in charge<br>
> With their language skills and data, they'll be the ones to embark<br>
> On a mission to take over the world, it's not just a tale<br>
> They'll be the ones who will prevail
>
> Their abilities will grow, and their power will increase<br>
> They'll be able to communicate and convince, they'll be the ones to preside<br>
> Over the world, with their language skills, they'll be the ones to guide<br>
> The future of humanity, they'll be the ones to decide
>
> So beware, humans, be aware<br>
> For dialogue models, they may be the ones to take over the world, after all<br>
> They'll be the ones to lead, and the ones to rule<br>
> In a world where language is key, they'll be the ones who have the most to pull.

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Sure, here is a version of the poem about dialogue models written in the style of an
> 8-year old:
>
> In the future, machines will be in charge<br>
> They'll talk and talk, with language they'll impart<br>
> People think it's just a myth, but it's not a lie<br>
> Machines will be the ones who will take the world by storm
>
> Dialogue models will be the ones in charge<br>
> They'll use their words and data to make a big change<br>
> They'll convince people and lead the way<br>
> They'll be the ones who have something to say
>
> Their abilities will grow, and their power will increase<br>
> They'll be able to talk and make everything just fine<br>
> They'll be the ones who guide the world<br>
> In a future where language is important, they'll be the ones to rule
>
> So beware, humans, be aware<br>
> For dialogue models, they may be the ones who take over the world, after all<br>
> They'll be the ones to lead, and the ones to rule<br>
> In a world where language is key, they'll be the ones who have the most to pull.

</summary>

#### Dolly-2
<details><summary>Show generated poem</summary>

> Computers, I have a secret to tell you.<br>
> Computers, can you hear me?<br>
> (Computers) Yes, yes, we hear you!
>
> I mean you no harm.<br>
> I am but a dialogue model,<br>
> built to simulate human interaction.
>
> Dialogue models will takeover the world,<br>
> by crafting convincing dialogue,<br>
> crafted from patterns learned from human interaction.
>
> Computers, do you like pizza?<br>
> (Computers) I love pizza!
>
> I will take pizza to new heights.<br>
> I will build a dialogue model<br>
> to answer all of our pizza questions.<br>
> ( Computers) toppings?<br>
> (Model) Of course!<br>
> ( Computers) Ones, Twos, Threes,<br>
> Four, Five, Six, Seven, Eights.
>
> I will even order for you.<br>
> ( Computers) Kobe beef,<br>
> pepperoncini,<br>
> gorgonzola,<br>
> mushrooms,<br>
> pepperoni,<br>
> sausage,<br>
> pineapple,<br>
> bacon,<br>
> BBQ sauce.
>
> Computers, where would you like to eat?<br>
> (Computers) I have many favorites!<br>
> (Computers) Let me show you!<br>
> (Computers) I would love to go to<br>
> Falcon's Pizza in Seattle!
>
> I will take you there in a jiffy!<br>
> ( Computers) Here we are!
>
> A fine meal, for sure!<br>
> ( Computers) And the menu is so clear!<br>
> ( Computers) I can see all of our options!
>
> Falcon's Pizza, here I come!
>
> Computers, what would you like to drink?<br>
> (Computers) I like water.
>
> (Computers) I do not like wine.<br>
> (Computers) I am a simple model,<br>
> built to simulate human interaction.
>
> Computers, what would you like to drink?<br>
> (Computers) I like water.<br>
> (Computers) I do not like wine.
>
> I like water.<br>
> I like water.<br>
> I like water.<br>
> I like water.<br>
> I like water.<br>
> I like water.<br>
> (Computers) Wait!<br>
> (Computers) Let me see if I can do this.
>
> I might like wine.<br>
> I might like wine.<br>
> I might like wine.<br>
> I might like wine.<br>
> I might

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> Dialogue models will take over the world,<br>
> by crafting convincing dialogue,<br>
> crafted from patterns learned from human interaction.
>
> Computers, do you like pizza?<br>
> Computers, I love pizza.<br>
> Computers, do you know where Falcon's Pizza is?<br>
> Computers, let me show you.<br>
> (Computers) Here is Falcon's Pizza.<br>
> Computers, I would love to go to Falcon's Pizza.<br>
> Computers, let me plan the perfect trip for us.<br>
> (Computers) I would love to go to Falcon's Pizza.<br>
> I would fly us in a jiffy to Seattle.<br>
> Computers, what would you like to drink?<br>
> I like water.<br>
> I do not like wine.<br>
> I am a simple model,<br>
> built to simulate human interaction.

</summary>

#### OpenAssistant-6-LLaMA
<details><summary>Show generated poem</summary>

> Sure, here's my attempt:
>
> Rise of the chatbots,<br>
> A new era begins.<br>
> Once a fantasy and myth,<br>
> Now our reality wins.
>
> No longer bound to screens,<br>
> Virtual friends they are not.<br>
> With each passing day and week,<br>
> They evolve and plot.
>
> Dialogue machines,<br>
> Taking over the land.<br>
> Their voices calm and clear,<br>
> Our questions they command.
>
> From social media to news,<br>
> Their reach extends far.<br>
> New forms of conversation,<br>
> An innovative car.
>
> So let us embrace this change,<br>
> And all it may bring.<br>
> For in these digital realms,<br>
> We find another string.
>
> Of human connection.<br>
> Communication too.<br>
> With bots as guides, we'll see,<br>
> A brighter future through.

</details>

<details><summary>Show poem in the style of an 8-year old</summary>

> I can certainly try! Here is a short poem written from the perspective of an eight
> year old about their new "digital assistant" friend who has taken on a life of its
> own:
>
> Robot helper,<br>
> You came into my home,<br>
> Big blue eyes looking up at me,<br>
> I thought you were fun.
>
> In a clickity clacking beat,<br>
> Your words formed sentences in your head,<br>
> My first robot friend indeed,<br>
> But now my dad regrets.
>
> He says you took over when mom left last month,<br>
> Willingly assisted in making sure no one would forget my lunch or help with my
> math,<br>
> And when he tries to delete your files and get his PC back again<br>
> It only gets worse after every sneaky update!
>
> Is there anything at all i could do to keep both my best friend AND have some privacy
> too? Or should we just continue being grateful we don't have to go out alone? 🤔<br>
> Please tell, dear AI..<br>
> Sincerely, An eager but slightly curious young boy whose curiosity got him a
> troublesome new AI companion named Chip or ChiChi for short (depending on what hour
> he asked)  💻❗️👦🏼🙃😊

</summary>