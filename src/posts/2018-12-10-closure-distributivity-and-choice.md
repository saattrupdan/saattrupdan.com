---
title: Closure, Distributivity and Choice
meta: One of the first forcing facts that we learn is that kappa-closed forcings preserve all sequences of length kappa. I will recall these facts here, and show how they relate to the "kappa-version" of both the axiom of choice and the axiom of dependent choices.
tags: set theory, axiom of choice
---

One of the first forcing facts that we learn is that $\kappa$-closed forcings preserve
all sequences of length $\kappa$. This is usually shown via distributivity, by showing
that every $\kappa$-closed forcing is also $\kappa$-distributive, and that
$\kappa$-distributivity is equivalent to the forcing not adding any new sequences of
length $\kappa$. I will recall these facts here, and show how they relate to both
$\textsf{AC}\_\kappa$ and $\textsf{DC}\_\kappa$. Here $\textsf{AC}\_\kappa$ is the
axiom of $\kappa$ choices, stating that we have choice functions for all sets injecting
into $\kappa$, and $\textsf{DC}\_\kappa$ is the [axiom of $\kappa$ dependent
choices](https://en.wikipedia.org/wiki/Axiom_of_dependent_choice), saying that every
pruned tree of height at most $\kappa$ has a branch.

![Painting by Julie Bond](/src/assets/img/closure-distributivity-and-choice.webp)

This post is part of my series on choiceless set theory:
  1. <router-link to="/posts/2017-03-08-choiceless-non-free-algebras">Choiceless
     Non-Free Algebras</router-link>
  2. <router-link to="/posts/2017-03-22-hahn-banach-sans-zorn">Hahn-Banach Sans
     Zorn</router-link>
  3. <router-link to="/posts/2018-01-31-choice-principles">Choice
     Principles</router-link>
  4. Closure, Distributivity and Choice

Let's start off by recalling a few definitions of the terms I just mentioned. I'll be
slightly unorthodox here and follow the convention in both [Jech
(1999)](https://mathscinet.ams.org/mathscinet-getitem?mr=1697766) and [Schindler
(2014)](https://mathscinet.ams.org/mathscinet-getitem?mr=3243739) that $\kappa$-closed
and $\kappa$-distributive are referring to sequences of length $\kappa$. Others might
denote this by $\kappa^+$-closed and $\kappa^+$-distributive, respectively.

> **Definition.** Let $\kappa$ be an infinite cardinal and $\mathbb P$ a forcing. Then
> $\mathbb P$ is...
>
> - $\kappa$-closed if every $\mathbb P$-descending chain $\langle
>   p_\alpha\mid\alpha<\kappa\rangle$ of conditions $p_\alpha\in\mathbb P$ has a lower
>   bound $q\in\mathbb P$; i.e., $q\leq p_\alpha$ holds for every $\alpha<\kappa$.
> - $\kappa$-distributive if the intersection of every $\kappa$-sized collection of
>   open dense subsets of $\mathbb P$ is again open dense.

The following is the well-known reason for why we care about distributivity.

> **Lemma 1 (ZF).** Let $\kappa$ be an infinite cardinal and $\mathbb P$ a
> $\kappa$-distributive forcing. Then $\mathbb P$ doesn't add any new
> $\kappa$-sequences.

**Proof**. Let $G\subset\mathbb P$ be $V$-generic and fix any $f\in V[G]$ such that
$f:\kappa\to V$; say $f:\kappa\to x$ for a set $x\in V$. Fix $p\in g$ forcing that
$\dot{f}:\check\kappa\to\check x$ and define, for each $\xi<\kappa$,

$$
D_\xi:=\\{q\in\mathbb P\mid q\perp p\lor\exists y\in x
(q\Vdash\dot{f}(\check\xi)=\check y)\\}
$$,

all of which are open dense, so $\kappa$-distributivity of $\mathbb P$ implies that
$D:=\bigcap_{\xi<\kappa}D_\xi$ is open dense as well; let $q\in G\cap D$. Since $q\ ||\
p$ we get for each $\xi<\kappa$ a unique $y\in x$ with
$q\Vdash\dot{f}(\check\xi)=\check y$. We can therefore define, in $V$, $f$ as the
function $g:\kappa\to x$ given as $g(\xi)=y\quad\text{iff}\quad
q\Vdash\dot{f}(\check\xi)=\check y$, so that $f\in V$. **QED**

In many circumstances we'd simply show that our forcing of choice is $\kappa$-closed
however, when we want to show that it doesn't add any new $\kappa$-sequences. But this
implication turns out to require some amount of choice, which is the following folklore
result:

> **Proposition (ZF).** Let $\kappa$ be an infinite cardinal. Then the following are
> equivalent:
>
> 1. $\textsf{DC}\_\kappa$
> 2. Every $\kappa$-closed forcing is $\kappa$-distributive
> 3. Every $\kappa$-closed forcing does not add any new $\kappa$-sequences.

**Proof**. Lemma 1 above gives us $(2)\Rightarrow (3)$.

$(1)\Rightarrow (2)$: Let $\mathbb P$ be $\kappa$-closed and fix a $\kappa$-sequence
$\langle D_\alpha\mid\alpha<\kappa\rangle$ of open dense subsets of $\mathbb P$. Let
$p\in\mathbb P$ and use $\textsf{DC}\_\kappa$ to find a $\kappa$-sequence $\langle
p_\alpha\mid\alpha<\kappa\rangle$ with $p_\alpha\leq p$ and $p_\alpha\in D_\alpha$ for
every $\alpha<\kappa$. Since $\mathbb P$ is $\kappa$-closed we get a $q\leq p$ with
$q\in\bigcap_{\alpha<\kappa}D_\alpha$, showing $\kappa$-distributivity.

$(3)\Rightarrow (1)$: Assume $\textsf{DC}\_\kappa$ fails, so that there's a pruned tree
$T$ of height $\kappa$ without any branch. As a forcing, $T$ is then trivially
$\kappa$-closed. But if $G\subset T$ is any generic then $\bigcup G$ is a branch
through $T$ and therefore $V[G]$ contains a new $\kappa$-sequence. **QED**

Okay, so it seems that there's some nontrivial stuff going on between the
distributivity and the closure, and the proposition seems to indicate that we also get
the converse of Lemma 1 in ZF. This at least holds if we're assuming separativity and
some choice:

> **Lemma 2** ($\textsf{ZF}+\textsf{AC}\_\kappa$). Let $\kappa$ be an infinite cardinal
> and $\mathbb P$ a separative forcing. Then $\mathbb P$ is $\kappa$-distributive iff
> it doesn't add any new $\kappa$-sequences.

**Proof**. $(\Rightarrow)$ is just as above, so we show $(\Leftarrow)$: Let $\langle
D_\alpha\mid\alpha<\kappa\rangle$ be a sequence of open dense subsets of $\mathbb P$
and fix some $p\_0\in\mathbb P$; we have to show that there's a $q\leq p$ with
$q\in\bigcap_{\alpha<\kappa}D_\alpha$. Let $G\subseteq\mathbb P$ be a $V$-generic
filter with $p\_0\in G$. In $V[G]$ we may then form the sequence

$$ \langle G\cap D_\alpha\mid\alpha<\kappa\rangle, $$

all of which are nonempty. Now use $\textsf{AC}\_\kappa$ to pick a sequence $\langle
q_\alpha\mid\alpha<\kappa\rangle$ of conditions $q_\alpha\in G\cap D_\alpha$. By
assumption this sequence also belongs to $V$ so that we can then define, in $V$, the
set

$$
D:=\\{p\leq p\_0\mid\exists\alpha<\kappa(p\perp q_\alpha)\lor\forall\alpha<\kappa(p\leq
q_\alpha)\\}\in V,
$$

which is dense below $p\_0$ by separativity of $\mathbb P$, so pick $q\in G\cap D$.
Since $q\ ||\ q_\alpha$ for every $\alpha<\kappa$, as they're all elements of $G$, we
get that $q\leq q_\alpha$ for every $\alpha<\kappa$. Since $p\_0$ was arbitrary we get
that $\bigcap_{\alpha<\kappa}D_\alpha$ is dense, showing
$\kappa$-distributivity. **QED**

Note that we need the separativity assumption, as otherwise we could let
$\kappa=\omega$ and $\mathbb P=(\omega,\ni)$, which doesn't add any new sequences (or
any sets at all, in fact), but it isn't $\omega$-distributive.

If we assume some stronger condition on our forcing we can get the equivalence in ZF,
however:

> **Lemma 3 (ZF).** Let $\kappa$ be an infinite cardinal and $\mathbb P$ a
> separative tree forcing; i.e., where every compatible pair is also comparable. Then
> $\mathbb P$ is $\kappa$-distributive iff it doesn't add any new $\kappa$-sequences.

**Proof**. This is exactly like the proof of Lemma 2, but we have to construct the
sequence of $q_\alpha$'s instead of relying on choice. Again we have, in $V[G]$, the
sequence

$$ \langle G\cap D_\alpha\mid\alpha<\kappa\rangle, $$

all of which are nonempty. Note that every pair of $\bigcup_{\alpha<\kappa}G\cap
D_\alpha$ is compatible, being elements of the filter, so they are comparable as well
as $\mathbb P$ is a tree forcing. This makes $b:=\bigcup_{\alpha<\kappa}G\cap D_\alpha$
a branch, which is then wellordered by $\mathbb P$'s ordering $\leq_{\mathbb P}$.
Define the sequence $\langle q_\alpha\mid\alpha<\kappa\rangle\in V[G]$ as

$$ q_\alpha:=\text{min}\_{\leq_{\mathbb P}}(b\cap D_\alpha), $$

and finish the proof as in Lemma 2. **QED**

The general question of whether the converse of Lemma 1 holds in ZF seems to be open
though, so let's state it here for convenience:

> **Open problem? (ZF)** Let $\kappa$ be an infinite cardinal and $\mathbb P$ a
> separative forcing which doesn't add any new $\kappa$-sequences. Is $\mathbb P$ then
> $\kappa$-distributive?

**Update:** This might have a positive answer, by
[@PBL05240969](https://twitter.com/PBL05240969)'s argument in [this Twitter
thread](https://twitter.com/saattrupdan/status/1072079907839197184).
