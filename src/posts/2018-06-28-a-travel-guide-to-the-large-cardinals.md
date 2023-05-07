---
title: A Travel Guide to the Large Cardinals
meta: Looking at a map of the large cardinal hierarchy for the first time can be a dizzying experience. What are the differences between them, and which ones are similar? Some of them are defined using partition properties and some of them are defined using elementary embeddings, and others have a whole myriad of equivalent characterisations! What's the intuition about the different sections of the hierarchy, and what type of set theorists are working in each section?
tags: set theory, large cardinals
---

Looking at a map of the large cardinal hierarchy for the first time can be a dizzying
experience. What are the differences between them, and which ones are similar? Some of
them are defined using partition properties and some of them are defined using
elementary embeddings, and others have a whole myriad of equivalent characterisations!
What's the intuition about the different sections of the hierarchy, and what type of
set theorists are working in each section?

Let's start out with a bird's-eye view of the entire enterprise, before we dig into the
more fine-grained details.

<center>
  <img
    src="/src/assets/img/large-cardinals-1.webp"
    alt="An overview of all the large cardinals"
    style="width: min(500px, 100%);"
    class="invert-on-darkmode"
  />
</center>

That's a lot of large cardinal notions. You've probably come across some of them
before, maybe even all of them! To get a better understanding of this hierarchy I'll
cut it into four different zones, where the large cardinals in each zone have somewhat
similar properties. We start from the bottom.

### The Combinatorial Zone

<center>
  <img
    src="/src/assets/img/large-cardinals-2.webp"
    alt="An overview of the large cardinals in the combinatorial zone, between the
    inaccessible cardinals and the weakly compact cardinals"
    style="width: min(700px, 100%);"
    class="invert-on-darkmode"
  />
</center>

This section consists of the cardinals starting from the inaccessibles and up to, and
including, the weakly compacts. This zone is riddled with various square principles,
tree properties and reflection principles, and is therefore the zone combinatorial set
theorists tend to lurk. The name is a bit misleading however, as combinatorics
permeates most of the large cardinal hierarchy, but with a different flair in terms of
colourings and filters.

Note that most of the cardinals are collapsed when we're looking at them with a
consistency lens, which is why we're mostly interested in direct implications when
dealing with this section. I've previously blogged about this zone.

### The Ramsey-like Zone

<center>
  <img
    src="/src/assets/img/large-cardinals-3.webp"
    alt="An overview of the large cardinals in the Ramsey-like zone, between the
    inaccessible cardinals and the weakly compact cardinals"
    style="width: min(600px, 100%);"
    class="invert-on-darkmode"
  />
  <img
    src="/src/assets/img/large-cardinals-4.webp"
    alt="An overview of the large cardinals in the Ramsey-like zone, between the
    inaccessible cardinals and the weakly compact cardinals"
    style="width: min(800px, 100%);"
    class="invert-on-darkmode"
  />
</center>

This zone starts where the combinatorial zone left off, at the weakly compacts, and
continues up to the measurables. Most of the cardinals in this area can be
characterised as critical points of elementary embeddings between small models of set
theory. This zone is also where we start to transcend the constructible universe L,
which happens exactly when the small models we're considering become iterable. We can
thus talk about the lower and upper part of this zone. This is the zone I'm dealing
with in my recent paper.

### The Extender Zone

<center>
  <img
    src="/src/assets/img/large-cardinals-5.webp"
    alt="An overview of the large cardinals in the extender zone, between the Woodin
    cardinals and the superstrong cardinals"
    style="width: min(500px, 100%);"
    class="invert-on-darkmode"
  />
</center>

Cardinals in this area can be seen as natural strengthenings of the Ramsey-like
cardinals, in which we're still dealing with elementary embeddings between structures,
but where we require that the domain of the embeddings is the entire universe V. The
simplest such one is the measurable cardinals, and they continue up to the superstrong
cardinals.

This could also be called the "inner model theory zone", as this is the area inner
model theorists have mostly been working with. The relatively new area of inner model
theory, called descriptive inner model theory, is working in a determinacy hierarchy
parallel to the large cardinal hierarchy in this region, which is the right-hand column
of the above diagram. I've covered this section in a previous blog post.

### The Crazy Zone

I call this the crazy zone for several reasons. Firstly, this is the zone where [we
reach inconsistency](https://en.wikipedia.org/wiki/Kunen%27s_inconsistency_theorem) (in
ZFC). Secondly, because I don't have a clue about what's going on up there. This zone
starts with the strongly compacts, and all the cardinals are characterised by
embeddings which are usually induced by ultrafilters on $\mathcal P_\kappa(\lambda)$
for some cardinals $\kappa,\lambda$. One notable thing is that combinatorists tend to
skip the Ramsey-like and extender zone, and jump straight to the crazy zone, as the
strongly compacts and the supercompacts have (surprise surprise) useful compactness
properties.

A priori there might be a non-trivial overlap between the extender zone and the crazy
zone, but I'm here going by the commonly accepted conjecture that strongly compacts are
equiconsistent with supercompacts. To be able to prove this conjecture we need the
inner model programme to reach the superstrongs, where the above extender zone diagram
shows that it's still (strictly) below a Woodin limit of Woodin cardinals.
