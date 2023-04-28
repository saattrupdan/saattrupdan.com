---
title: Determinacy From Woodins III
meta: This is the third¬†post in my series on determinacy from Woodins. In the last post we showed Martin-Steel's result that PD follows from the existence of infinitely many Woodins and a measurable above. We'll now give the main ideas of Woodin's incredible strengthening of this result, showing from the same assumption that AD^L(R) holds.
tags: set theory, determinacy
---

This is the third post in my series on determinacy from Woodins. In the last post we
showed Martin-Steel's result that $\textsf{PD}$ follows from the existence of
infinitely many Woodins and a measurable above. We'll now give the main ideas of
Woodin's incredible strengthening of this result, showing from the same assumption that
$\textsf{AD}^{L(\mathbb R)}$ holds.

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
3. <router-link to="/posts/2017-02-08-determinacy-from-woodins-ii">Determinacy From
   Woodins II</router-link>
4. Determinacy From Woodins III
5. <router-link to="/posts/2017-04-05-from-determinacy-to-a-woodin-i">From Determinacy
   to a Woodin I</router-link>
6. <router-link to="/posts/2017-05-10-from-determinacy-to-a-woodin-ii">From Determinacy
   to a Woodin II</router-link>
7. <router-link to="/posts/2017-05-24-the-structure-of-games">The Structure of
   Games</router-link>
8. <router-link to="/posts/2017-06-07-borel-determinacy">Borel
   Determinacy</router-link>
9. <router-link to="/posts/2017-06-21-hod-models-of-determinacy">HOD Models of
   Determinacy</router-link>
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
   ZFC Determinacy</router-link>
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

The main result covered in this post is the following.

> **Theorem 1 (Woodin).** Assume there is a limit of Woodins with a measurable above.
> Then $\textsf{AD}^{L(\mathbb R)}$ holds.

This will be done in a series of steps, where we at each such 'checkpoint' we increase
the amount of determined sets of reals:

1. Homogeneously Suslin sets
2. Weakly homogeneously Suslin sets
3. Universally Baire sets
4. "Universally boldface sets"
5. Sets of reals in $L(\mathbb R)$.

The first step is showing that all homogeneously Suslin sets of reals are determined.
See my last post for a definition of such sets and for a proof of that result. We have
thus reached our first checkpoint:

> **Checkpoint 1.** Every homogeneously Suslin set of reals is determined

Next step is to show that weakly homogeneously Suslin sets of reals are determined. To
show this step we need the Key Lemma which we also used to prove projective
determinacy:

> **Key Lemma (Martin-Steel, '89).** For a Woodin cardinal $\delta$ and
> $A\subseteq{^\omega\omega}$, if $A$ is $\delta^+$-weakly homogeneously Suslin then
> $\lnot A$ is $<\delta$-homogeneously Suslin.

Combining this result with the fact that every homogeneously Suslin set is determined,
we arrive at our second checkpoint:

> **Checkpoint 2.** If $\delta$ is Woodin then every $\delta^+$-weakly homogeneously
> Suslin set of reals is determined

Our next step is to move from these weakly homogeneously Suslin sets of reals to
the universally Baire sets of reals. Here a set of reals $A$ is $\kappa$-universally
Baire if there exist trees $T$ and $S$ such that $A=p[T]$ and where $p[T]=\lnot p[S]$
holds in every $\kappa$-small generic extension. Then $A$ is universally Baire if it's
$\kappa$-universally Baire for all cardinals $\kappa$. The result is then the
following.

> **Theorem 2.** Let $\delta$ be Woodin and assume that $T$ and $S$ are trees projecting
> to sets of reals such that $V[g]\models p[T]=\lnot p[S]$, where $g\subseteq\mathbb
> Q_{<\delta}$ and $\mathbb Q_{<\delta}$ is the countable stationary tower at $\delta$.
> Then $T$ and $S$ are $<\delta$-weakly homogeneous. In particular, if
> $A\subseteq{^\omega\omega}$ is $\delta^+$-universally Baire then $A$ is
> $<\delta$-weakly homogeneously Suslin.

In particular this shows that if we have two Woodins $\delta\_0<\delta\_1$ and
$A\subseteq{^\omega\omega}$ is $\delta\_1^+$-universally Baire, then $A$ is
$<\delta\_1$-weakly homogeneously Suslin. In particular it's $\delta\_0^+$-weakly
homogeneously Suslin, making it determined. So far so good!

> **Checkpoint 3.** If $\delta\_0<\delta\_1$ are Woodins then every
> $\delta\_1^+$-universally Baire set of reals is determined

Generalising further, we now focus on the sets of real $A$ with the property that for
some formula $\varphi$ and real $r$ it holds that $A=\\{x\in\mathbb
R\mid\varphi[x,r]\\}$ in any $\kappa$-small forcing extension. As these sets don't have
a name, let's for the sake of brewity call them $\kappa$-universally boldface sets. And
again, we call $A$ universally boldface if it's $\kappa$-universally boldface for every
$\kappa$.

> **Theorem 3 (Woodin).** Let $\delta$ be Woodin and $A\subseteq{^\omega\omega}$ be
> $\delta^+$-universally boldface. Then $A$ is $\delta$-universally Baire.

The proof of this theorem relies heavily on the stationary tower. It's actually a bit
more general than is stated here, and a full proof can be found in my note. This
supplies us with our fourth checkpoint.

> **Checkpoint 4.** If $\delta_0<\delta_1<\delta_2$ are Woodins then every
> $\delta_2^+$-universally boldface set of reals is determined.

Our last step to sets of reals in $L(\mathbb R)$ is the only step that requires the
full hypothesis of a limit of Woodins with a measurable above. The essential property
that we need involves the notion of $\mathbb R^\sharp$, which is the analogue of
$0^\sharp$ to $L(\mathbb R)$. As with $0^\sharp$ there are a lot of equivalent ways to
describe it - we're just giving one such here.

> **Definition.** The set $\mathbb R^\sharp$ is the complete theory extending
> $\mathsf{ZF}+V=L(\mathbb R)$ in the language of set theory expanded with constant
> symbols for every real and for $\omega$ many ordinals, which according to the theory
> are indiscernibles.

The existence of $\mathbb R^\sharp$ is equivalent to a non-trivial elementary embedding
$L(\mathbb R)\to L(\mathbb R)$, and we could equivalently also describe $\mathbb
R^\sharp$ as a certain iterable structure. The importance of $\mathbb R^\sharp$ in our
context is due to the fact that if it exists then every set of reals in $L(\mathbb R)$
is definable from a real. To be able to get from this to the universally boldface sets,
we need $\mathbb R^\sharp$ to be forcing absolute. This is exactly what the next result
supplies us with.

> **Theorem 4 (Woodin).** Assume $\kappa$ is a limit of Woodins and $\lambda>\kappa$ is
> measurable. Then in any $\kappa$-small generic extension $V[g]$ it holds that
> $(\mathbb R^\sharp)^V=\mathbb R^\sharp\cap V$.

This theorem is also making essential use of the stationary tower. This theorem then
implies a set definable from a real is still definable from the same real and the same
formula in any $\kappa$-small generic extension. This means that every set of reals in
$L(\mathbb R)$ is then $\kappa$-universally boldface, giving our final checkpoint and
main result:

> **Checkpoint 5.** If $\kappa$ is a limit of Woodins and $\lambda>\kappa$ is
> measurable then every set of reals in $L(\mathbb R)$ is determined.

And that's it! For the reader interested in proofs of the above theorems, they're all
written up here - check also Larson's book "The Stationary Tower".
