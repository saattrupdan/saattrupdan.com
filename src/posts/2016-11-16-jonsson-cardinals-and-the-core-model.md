---
title: Jónsson Cardinals and the Core Model
meta: Having introduced the Jónsson cardinals, we now try to investigate how these cardinals relate to the core model K. It turns out that even though Jónsson cardinals can be regular, K computes the successor of every Jónsson cardinal correctly.
tags: set theory, inner model theory
---

Having introduced the Jónsson cardinals, we now try to investigate how these cardinals
relate to the core model $K$. It turns out that even though Jónsson cardinals can be
regular, $K$ computes the successor of every Jónsson cardinal correctly.

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-11-02-jonsson-cardinals">Jónsson Cardinals</router-link>
2. Jónsson Cardinals and the Core Model

The core model $K$ is, intuitively, the canonical $L$-like model admitting many large
cardinals. One way to formalise this is the following, from
[Jensen and Steel (2016)](https://doi.org/10.2178/jsl.7803020):

> **Definition.** The core model $K$ is the transitive proper class premouse satisfying
> the following:
>
> 1. $K\models\textsf{ZFC}$
> 2. $K$ has a unique iteration strategy $\Sigma$
> 3. (Definability) $K$ and $\Sigma$ defined by $\Sigma\_2$-formulae $\psi\_K$ and
>    $\psi_\Sigma$
> 4. (Generic absoluteness) $\psi\_K^V=\psi\_K^{V[G]}$ and
>    $\psi_\Sigma^V=\psi_\Sigma^{V[G]}\cap V$ for every $V$-generic $G$ over a
>    set-sized poset
> 5. (Inductive definition) $K|\omega\_1^V$ is $\Sigma\_1^{J_{\omega\_1}(\mathbb R)}$
> 6. (Weak covering) For any $\lambda\geq\omega\_2^V$ which is a successor cardinal of
>    $K$, $\text{cof }\lambda\geq|\lambda|$. In particular $\kappa^{+K}=\kappa^+$ for
>    every cardinal $\kappa$ which is singular in $V$.

The existence of $K$ has been proven under certain anti large cardinal hypotheses. It
started out in the 70's with Dodd and Jensen proving the existence of $K$ below
$0^\dagger$. Mitchell improved on this in the 80's by showing it below a measurable
$\kappa$ of Mitchell order $\kappa^{++}$. In the 90's Steel improved this result yet
again, now below a Woodin cardinal. Steel required a measurable cardinal in the
background in his construction however, and it wasn't until 2013 that Jensen and
Steel provided a construction of $K$ without assuming a measurable in the background.

It is also shown that in some respect we can't improve on this result any further. If
we did have a Woodin and $K$ existed, then it's possible to derive a contradiction
after forcing with the full stationary tower below the Woodin. We won't go into details
concerning neither this argument nor the definition of the stationary tower -- maybe
some other time.

In this post we focus on the (special case) of the weak covering property of $K$, that
the core model computes successors of singular cardinals correctly. One might then ask
what happens at the regular steps? Of course it won't be the case that all successors
are computed correctly, as then we simply get that $\aleph_\alpha^K=\aleph_\alpha^V$
for every ordinal $\alpha$, making $V=K$, a contradiction.

One thing we can prove though is that it holds for all Jónsson cardinals! This was
proven below a Woodin by Welch in '00, assuming the background measurable. By tweaking
the proof slightly, this still holds in the measurable-free context. I won't give the
full proof (but you can find my write-up here), but just give some overview of what the
ideas are. The theorem is the following.

> **Theorem (Welch, 2000).** Assume that there is no inner model with a Woodin
> cardinal. Let $K$ be the Jensen-Steel core model and $\kappa$ Jónsson. Then
> $\kappa^+=\kappa^{+K}$.

An immediate corollary is then

> **Corollary.** Assume that there is no inner model with a Woodin cardinal. Then
> $\Box_\kappa$ holds for every Jónsson $\kappa$.

Okay, let's begin with the proof. First of all we can assume that $\kappa$ is regular
as weak covering for $K$ would yield the result otherwise. Now set
$\lambda:=\kappa^{+K}$ and assume for a contradiction that $\lambda<\kappa^+$. Weak
covering for $K$ gives us that $\text{cof }\lambda=|\lambda|=\kappa$, so we can fix a
monotone cofinal map $D:\kappa\to\lambda$ witnessing this.

By the results in [Jensen and Steel (2016)](https://doi.org/10.2178/jsl.7803020) we can
find a universal weasel $W$ containing $\kappa^+$ and
such that $\kappa^{+W}=\lambda$, where "weasel" in this context means that
$o(W)=\Omega$ for some regular $\Omega\gg\kappa^+$ (so not necessarily measurable).

Use that $\kappa$ is Jónsson to find an elementary substructure
$X\prec\left<V_\eta,\in,\dot E^{W},D\right>$ for some $\eta\gg 0$, satisfying that
$|X|=\kappa$ and $X\cap\kappa\neq\kappa$. Let

$$ \pi:\left<H,\in,\vec E,\bar D\right>\cong\left<X,\in,\dot E^{W},D\right> $$

be the uncollapse and set $j:=\pi\upharpoonright\bar{W}:\bar{W}\to W$. By virtue of
$\bar D$ we get that $\text{cof }\bar\lambda=\bar\kappa=\kappa>\text{crit }j$, so that
$j$ is continuous at $\bar\lambda$. This finishes the set-up of the "meaty" part of the
proof. We will not give all the gory details here, but instead give a brief overview of
what's going on. The proof roughly has the following five parts:

1. Compare $\bar{W}$ with $W$ via a non-standard coiteration using Mitchell's idea of
   so-called "special drops", yielding trees $T,U$ on $\bar{W},W$ with last models
   $P,Q$ such that $P$ agrees with $Q$ below $\kappa$;
2. Show that $\bar\lambda$ is collapsed in $Q$ and pick the least $N\lhd Q$ such that
   $\bar\lambda$ is definably collapsed over $N$;
3. Use that $N$ agrees with $P$ below $\kappa$ to lift $j:\bar{W}\to W$ to some
   $j^+:N\to M$;
4. The construction of $U$ ensures that we can compare $M$ with $W$, so do that;
5. $\lambda$ is now definably collapsed over $M$ as $j$ is continuous at $\bar\lambda$,
   so use elementarity of the iteration maps in the above coiteration to ensure that
   $\lambda$ is collapsed in $W$, contradicting $\lambda=\kappa^{+W}$.

<img src="/jonsson-covering-proof.png" style="width: min(500px, 100%);" />

The hardest part of the proof is the first, specifically to build this tree $U$. This
whole proof has close to the same structure as the proof of the covering lemma in
[Jensen and Steel (2016)](https://doi.org/10.2178/jsl.7803020), but this first step is
notably different. In [Jensen and Steel (2016)](https://doi.org/10.2178/jsl.7803020)
they assume that $\kappa$ is a singular strong limit cardinal and use this to ensure
that their version of $H$ has strong closure properties, to deal with a so-called
"phalanx-unstable" case in the construction of $U$. The proof in the Jónsson case is
simpler in this regard, as these unstable phalanxes have been denied their existence
with the clever use of the special drops.

As soon as we move past a Woodin cardinal, then we can't prove the existence of $K$ in
$\textsf{ZFC}$, so in this sense the above proof of Jónsson covering is the best
possible. It is possible to build $K$ past a Woodin though, by strengthening
$\textsf{ZFC}$ (but I know very little about the construction of these models right
now). Would Jónsson covering continue to hold in these models? Is it possible to derive
the theorem purely based on the above definition of $K$, and not relying on the
specific construction, as is done in the above proof?
