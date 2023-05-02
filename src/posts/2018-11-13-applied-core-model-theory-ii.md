---
title: Applied Core Model Theory II
meta: This is a continuation of my last post, in which I argue that core model theory can provide tools which other set theorists can use without having indepth knowledge of their proofs. The tool I chose was the following core model dichotomy, and in this post we'll dig into a couple of examples in which we apply the dichotomy to various areas of set theory.
tags: set theory, core model theory
---

This is a continuation of my last post, in which I argue that core model theory can
provide tools which other set theorists can use without having indepth knowledge of
their proofs. The tool I chose was the following core model dichotomy, and in this post
we'll dig into a couple of examples in which we apply the dichotomy to various areas of
set theory.

<center>
  <img src="/src/assets/img/applied-core-model-theory-ii.webp" alt="A picture of an
  apple partially eaten, where the skin remaining resembles the earth" style="width:
  min(500px, 100%);" class="invert-on-darkmode" />
</center>

This post is part of a series on core model theory:

1. <router-link to="/posts/2017-04-26-what-is-k">What is K?</router-link>
2. <router-link to="2018-05-10-core-model-induction-101">Core Model Induction
   101</router-link>
3. <router-link to="2018-10-22-applied-core-model-theory-i">Applied Core Model
   Theory I</router-link>
4. Applied Core Model Theory II
5. <router-link to="2019-03-31-core-model-induction-the-pointclass-perspective">Core
   Model Induction: The Pointclass Perspective</router-link>

> **The PD dichotomy.** Let $\theta>\omega$ be either a $\beth$-fixed point or
> $\theta=\infty$. Then
>
> 1. The core model $K(x)|\theta$ exists for some $x\in H_\theta$; or
> 2. $\textsf{PD}$, projective determinacy, holds in an inner model.

This dichotomy is usually applied by assuming some strong hypothesis and showing that
$K(x)|\theta$ can't exist for any $x\in H_\theta$. Here are the main general facts
about the core model $K(x)$ that are useful to show that it can't exist under some
strong hypothesis; I elaborated on a few of them last time:

1. (Covering) $\text{cof}^V(\kappa^{+K(x)})=\text{Card}^V(\kappa^{+K(x)})$ for every
   $K(x)$-cardinal $\kappa\geq\text{rk}(x)$. In particular,
   $\kappa^{+K(x)}=\kappa^{+V}$ if $\kappa\geq\text{rk}(x)$ is singular in $V$.
2. (Generic absoluteness) $K(x)^V=K(x)^{V[g]}$ for every generic extension $V[g]$.
3. (GCH) $K(x)\models\ulcorner 2^\kappa=\kappa^+\text{ for all cardinals
   }\kappa\geq\text{rk}(x)\urcorner$.
4. (Rigidity) There is no elementary embedding $j:K(x)\to K(x)$.
5. (Embeddings) If $j:K(x)\to M$ is elementary for $M$ with ${^\omega}{M}\subseteq M$
   then $j$ is a composition of ultrapower embeddings; in particular $j(\kappa^+)=\sup
   j[\kappa^+]$ for every $K(x)$-cardinal $\kappa$.
6. (Square) $K(x)\models\ulcorner\Box_\kappa\text{ for all uncountable cardinals
   }\kappa\geq\text{rk}(x)\urcorner$.

Okay, let's start off simple, with the failure of square.

> **Theorem.** Assume $\Box_\kappa$ fails for cofinally many singular $\kappa$. Then
> $\textsf{PD}$ holds.

**Proof**. Assume that $K(x)$ exists for some $x$. Pick some singular
$\kappa\geq\text{rk}(x)$ such that $\Box_\kappa$ fails. Inside $K(x)$ we get that
$\Box_\kappa$ holds and $\kappa^{+K(x)}=\kappa^{+V}$, so that $\Box_\kappa$ also holds
in $V$, a contradiction! **QED**

This gives us a couple of immediate corollaries.

> **Corollary.** All of the following hypotheses imply that $\textsf{PD}$ holds.
>
> 1. $\textsf{PFA}$, the proper forcing axiom;
> 2. $\textsf{SCFA}$, the subcomplete forcing axiom;
> 3. The existence of a strongly compact cardinal.

**Proof**. Todorcevic ('84) showed that $\textsf{PFA}$ implies the failure of
$\Box_\kappa$ for all uncountable cardinals $\kappa$, and Jensen ('09) showed the same
when $\textsf{SCFA}$ is assumed (see Fuchs ('18) for a proof). If there exists a
strongly compact cardinal $\lambda$ then Solovay ('78) showed that $\Box_\kappa$ fails
for all $\kappa\geq\lambda$. **QED**

Okay, let's try something else, this time a hypothesis concerning the tree property.
This will also be an instance in which we use the dichotomy for $\theta\neq\infty$. To
make sure that this won't be too long, we'll black box the following non-inner model
theory lemma.

> **Lemma (Foreman-Magidor-Schindler).** If $\delta$ has the tree property,
> $M\models\textsf{ZFC}^-+\textsf{GCH}+\ulcorner\delta\text{ is inaccessible}\urcorner$
> and $\text{cof}^V(\delta^{+M})=\text{cof}^V(\delta^{++M})=\delta$ then there's an
> elementary embedding $j:M\to N$ with ${^\omega}{N}\subseteq N$ and
> $j(\delta^{+M})>\sup j[\delta^{+M}]$.

> **Theorem (Foreman-Magidor-Schindler).** Let $\lambda$ be a $\beth$-fixed point such
> that $\lambda=\sup_{n<\omega}\delta\_n$, where $\delta\_n$ are cardinals such that both
> $\delta\_n$ and $\delta\_n^+$ have the tree property. Then $\textsf{PD}$ holds.

**Proof**. Assume that $K(x)|\lambda$ exists for some $x\in H_\lambda$. Pick
$\delta\geq\text{rk}(x)$ such that both $\delta$ and $\delta^+$ satisfy the tree
property. We'll show all the assumptions of the above lemma with $M=K(x)|\lambda$.

Note that $\Box_\delta$ holds in $K(x)|\lambda$ as $\delta\geq\text{rk}(x)$. A
well-known result mentioned in Jensen ('72) and proven in Räsch ('05) is that, assuming
$2^\delta=\delta^+$, the weak square $\Box_\delta^\*$ is equivalent to the existence of
a special $\delta^+$-Aronszajn tree, so in particular we have such a tree $T$ in $K(x)$
as $\textsf{GCH}$ holds in $K(x)$.

Now, $T$ being special in particular means that it's also a $\delta^+$-Aronszajn tree
in $V$ unless $\delta^{+K}<\delta^{+V}$, so as we're assuming that $\delta^+$ satisfies
the tree property we must have that $V$ collapses $\delta^{+K}$. Note that the covering
property then also implies that

$$ \text{cof}^V(\delta^{+K(x)})=\text{cof}^V(\delta^{++K(x)})=\delta. $$

We also note that $\delta$ is inaccessible in $K(x)$, since singular cardinals cannot
satisfy the tree property, and since we also have a special $\delta$-Aronszajn tree in
$K(x)$ by the above we cannot have that $\delta$ is a successor cardinal in $K(x)$.
$\textsf{GCH}$ then implies that $\delta$ is inaccessible in $K(x)$.

Now that we've checked that all the assumptions in the lemma we get an elementary
embedding $j:K(x)|\lambda\to N$ which is discontinuous at $\delta$, which contradicts
the embeddings property of $K(x)$. **QED**

Of course, these proofs are merely meant to be concrete applications of the dichotomy
--- anything which could contradict any of the properties of the core model would be
sufficient. The list of properties of the core model also includes more than the above,
but the ones mentioned tend to be the most commonly used ones.
