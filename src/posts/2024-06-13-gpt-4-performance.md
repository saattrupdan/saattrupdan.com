---
title: Is GPT-4 Performance Getting Worse?
meta: Whenever OpenAI (or any other AI company to be fair) releases a new GPT model, we all tend to assume that the new model is always better than the predecessor - even if that model is also cheaper than the previous models. Even if we assume that this is the case for English, where does this leave the rest of our languages? In this blog post, I'll be digging into this question, using the multilingual ScandEval benchmarking framework.
tags: data science
---

Whenever OpenAI (or any other AI company to be fair) releases a new GPT model, we all
tend to assume that the new model is always better than the predecessor - even if that
model is also cheaper than the previous models. Even if we assume that this _is_ the
case for English, where does this leave the rest of our languages?

In this blog post, I'll be digging into this question, using the multilingual
[ScandEval benchmarking framework](https://scandeval.com).

Using the [ScandEval benchmarking framework](https://github.com/ScandEval/ScandEval),
we benchmarked the three types of GPT-4 architectures that we have seen so far:

1. The original GPT-4 architecture, released March 2023 and represented here by the
   model `gpt-4-0613`. This is the one that was rumoured to be a large 8x220B
   mixture-of-experts model.
2. The GPT-4-turbo architecture, released November 2023 and represented here by the
   model `gpt-4-1106-preview`. This model is 3x cheaper than the GPT-4 architecture.
3. The newest GPT-4o architecture ("o" for "omni"), which is a multimodal architecture
   that can handle both text and images. It was released May 2024, and here represented
   by the only available iteration `gpt-4o-2024-05-13`. The omni model is 2x cheaper
   than GPT-4-turbo.

The benchmarking framework consists of 7 tasks, and supports evaluating generative
models on these tasks in the Germanic languages English, German, Dutch, Danish, Swedish
and Norwegian. There is support for Icelandic and Faroese as well, but as these don't
cover all 7 tasks we can't compare these directly with the other languages and leave
them out for this analysis. The tasks are the following:

1. Sentiment classification, where the models have to classify texts as having a
   positive, negative or neutral sentiment.
2. Linguistic acceptability, where a text is given and the model has to determine
   whether the text is grammatically correct or not.
3. Named entity recognition, where the model has to locate all the names, locations and
   organisations in a given text. We do this by having the models output a JSON
   dictionary with the three types of entities as keys and lists with the entities as
   values. The new JSON mode is used here with the OpenAI API.
4. Extractive question answering, where the model is given a text and a question whose
   answer exists in the text, and it has to answer the question from the text.
5. Summarisation, where a text is given and the model has to summarise it.
6. World knowledge, in which a multiple-choice factual question is asked and the model
   has to select the answer among the answer choices.
7. Common-sense reasoning, also a multiple-choice task, where the questions are related
   to common sense rather than factual knowledge.

A more in-depth description of the first four tasks, including the datasets used, can
be found in [this paper](https://aclanthology.org/2023.nodalida-1.20/). The evaluation
procedure for generative models can be found in [this preprint](XX).

The following plot shows how the performance of the GPT-4 architectures have developed
for English and the rest of the languages. We normalise GPT-4 performance per language,
and observe how the subsequent GPT-4-turbo and GPT-4o models perform on that given
language. Decreasing values on this plot means that the model is getting worse:

![Line plot of GPT-4 models, separated into each Germanic language](/src/assets/img/gpt4-drop.webp)

We firstly note that the shift from GPT-4 to GPT-4-turbo improved the English
performance while getting worse at all the other languages, which seems to indicate
that the model is an "English distilled" version of GPT-4, also explaining how the
GPT-4-turbo model is substantially cheaper.

Second, we note that the GPT-4o model continues getting worse at _all_ the languages,
where it is interesting that even the English performance got significantly worse. This
has been noted anecdotally by several people (see
[\[1\]](https://x.com/bindureddy/status/1790127425705120149),
[\[2\]](https://x.com/MatthewRideout/status/1794055335440720117),
[\[3\]](https://x.com/arthurcolle/status/1798474316641972457),
[\[4\]](https://x.com/jijosunny/status/1798301455356682677),
[\[5\]](https://x.com/karlrohe/status/1801000308144832698),
[\[6\]](https://x.com/literallydenis/status/1790082766178034059),
[\[7\]](https://x.com/thedataroom/status/1800499701831364678)). However, this is in
stark contrast to the [LMSYS Arena leaderboard](https://chat.lmsys.org/?leaderboard)
where the GPT-4o model has a solid first place. [OpenAI had several (anonymised) models
on the Arena prior to the GPT-4o release, one of which ended up being GPT-4o in
disguise](https://arstechnica.com/information-technology/2024/05/before-launching-gpt-4o-broke-records-on-chatbot-leaderboard-under-a-secret-name/),
so one could speculate that there might be some Arena overfitting going on here.

In any case, it does seem like OpenAI is working hard on cutting down costs, which
unfortunately results in worse models for us all. It even seems like open models have
caught up:

![Bar plot of Germanic ScandEval performance of GPT-4 models and Llama-70b models](/src/assets/img/gpt4-llama.webp)
