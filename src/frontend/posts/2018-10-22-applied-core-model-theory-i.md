---
title: Applied Core Model Theory I
meta: Inner model theory and core model theory might seem like their own niche in set theory, where you have to invest hundreds of hours just to get a glimpse of what's going on. But behind all the complicated theory there are theorems in inner model theory which can be applied in many contexts with minimal background knowledge of the intricate technicalities appearing in their proofs. In this and the next couple of blog posts I'll introduce one such theorem, explain how to use it, do a few mainstream set theory applications of it, and also provide a proof of it. Everything aside from the proof should hopefully be accessible to set theorists who aren't inner model theorists.
tags: set theory, core model theory
---

Inner model theory and core model theory might seem like their own niche in set theory,
where you have to invest hundreds of hours just to get a glimpse of what's going on.
But behind all the complicated theory there are theorems in inner model theory which
can be applied in many contexts with minimal background knowledge of the intricate
technicalities appearing in their proofs. In this and the next couple of blog posts
I'll introduce one such theorem, explain how to use it, do a few mainstream set theory
applications of it, and also provide a proof of it. Everything aside from the proof
should hopefully be accessible to set theorists who aren't inner model theorists.

<img
    src="/src/frontend/assets/img/applied-core-model-theory-i.webp"
    alt="A picture of the earth cut in half, the core glowing"
    class="centered-image"
    style="width: min(500px, 100%);"
/>

This post is part of a series on core model theory:

1. <router-link to="/posts/2017-04-26-what-is-k">What is K?</router-link>
2. <router-link to="2018-05-10-core-model-induction-101">Core Model Induction
   101</router-link>
3. Applied Core Model Theory I
4. <router-link to="2018-11-13-applied-core-model-theory-ii">Applied Core Model
   Theory II</router-link>
5. <router-link to="2018-11-26-applied-core-model-theory-iii">Applied Core Model
   Theory III</router-link>
6. <router-link to="2019-03-31-core-model-induction-the-pointclass-perspective">Core
   Model Induction: The Pointclass Perspective</router-link>

The theorem I mentioned above is a core model dichotomy theorem, which, in the version
I'll present it, can be used to show that various hypotheses imply that projective
determinacy holds; i.e. that every projective set of reals is determined. In terms of
large cardinals this is equivalent to having certain proper class models $M\_n(x)$ for
$x\in\mathbb R$, with $x\in M\_n(x)$ and having $n$ Woodin cardinals. This is not just
a consistency result: it shows that the hypotheses directly gives the determinacy and
the models with the Woodin cardinals.

For this first post, let's introduce some of the objects that we're going to be using.
As the theorem has the word core model in it, let's start there. I've talked about the
core model in a previous blog post, but that post was mostly directed towards inner
model theorists, so I'm not really going to repeat anything from that post. Instead of
talking about precisely what the core model is, I'd rather focus on the key properties
that we often want to use in applications of core model theory: these are
$\textsf{GCH}$, covering and generic absoluteness, all of which are simple to state and
yet incredibly powerful.

The core model is a proper class structure which is denoted by $K$, which I guess is
for arbitrary reasons, like $V$ and $L$. The covering property (or weak covering
property, as it's also called) states that whenever $\kappa$ is a singular cardinal in
$V$ then $\kappa^{+K}=\kappa^{+V}$, and the generic absoluteness property states that
$K$ stays the same when we move to (set) forcing extensions.

The covering property is often presented as witnessing that "$V$ is close to $K$"; if
$\textsf{GCH}$ holds then this can be seen by the fact that they both have the same
amount of bijections $f\colon\kappa\to\kappa$, since in this case
$\kappa^{+V}=(\kappa^\kappa)^V$ (and $\kappa^{+K}=(\kappa^\kappa)^K$ always holds since
$K\models\textsf{GCH}$). The generic absoluteness property can be seen as $K$ being
canonical somehow, that its construction doesn't depend on its surroundings.

We can also build the relativised core model $K(x)$ for a set $x$, which satisfies that
$x\in K(x)$, covering holds above the rank of $x$, and generic absoluteness holds for
all universes that have $x$ as an element.  The theorem is then the following, where we
recall that a forcing extension is $\theta$-small if the forcing poset has size
${<}\theta$.

> **The PD dichotomy.** Let $\theta>\omega$ be either a $\beth$-fixed point or
> $\theta=\infty$. Then
>
> 1. The core model $K(x)|\theta$ exists for some $x\in H_\theta$; or $\textsf{PD}$,
> 2. projective determinacy, holds in an inner model.

Next time we'll look at some concrete applications of this dichotomy, before we start
digging into the proof. Stay tuned!
