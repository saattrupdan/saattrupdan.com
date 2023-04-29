---
title: Projective Understanding via Woodins
meta: I've previously covered Woodin's genericity iterations, being a method to "catch" any real using Woodin cardinals. Roughly, given any countable mouse M and a real x, we can iterate M to a model over which x is generic. An application of this is the phenomenon that Woodins present in mice allows them to be more projectively aware.
tags: set theory, inner model theory, genericity iterations
---

I've previously covered Woodin's genericity iterations, being a method to "catch" any
real using Woodin cardinals. Roughly, given any countable mouse M and a real x, we can
iterate M to a model over which x is generic. An application of this is the phenomenon
that Woodins present in mice allows them to be more projectively aware.

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-10-05-genericity-iterations-i">Genericity Iterations I</router-link>
2. <router-link to="/posts/2016-10-19-genericity-iterations-ii">Genericity Iterations II</router-link>
3. Projective Understanding via Woodins
4. <router-link to="/posts/2017-12-29-from-mice-to-determinacy">From Mice to Determinacy</router-link>
5. <router-link to="/posts/2018-01-20-projectively-correct-mice">Projectively Correct Mice</router-link>

To explain what I mean by this, we need a definition, this one taken from the core
model induction book.

> **Definition.** Let $A\subseteq\mathbb R$, M a countable mouse, $\eta$ an uncountable
> cardinal of M and $\tau\in M^{\text{Col}(\omega,\eta)}$. Then $(M,\tau)$ understands
> A at $\eta$ if whenever P is an iterate of M and $g\in V$ is
> $\text{Col}(\omega,i(\eta))$-generic over P then $A\cap P[g]=i(\tau)^g$. We also say
> that M understands A at $\eta$ if there exists such a $\tau$, and simply that M
> understands A if there exist such $\tau$ and $\eta$.

If a given set A is understood by M at some $\eta$ then M suddenly has an oracle which
can inform it about membership of A, even though A might not be an element of M.
Namely, it can ask of a real $x\in\mathbb R\cap M$ whether there exists a
$p\in\text{Col}(\omega,\eta)^M$ such that $p\Vdash \check x\in\tau$, where $\tau$
witnesses that M understands A.

The result concerning Woodin cardinals is then the following, essentially saying that
the more Woodin cardinals M thinks there are, the more projective sets it knows of as
well.

> **Theorem.** Let M be a countable mouse and let $\delta$ be a Woodin cardinal of M.
> Then whenever M understands $B\subseteq\mathbb R^2$ at $\delta$, M also understands
> $\exists^{\mathbb R}B$ at any $\kappa<\delta$ which is uncountable in M.

**Proof.** Let $\tau$ witness that M understands B at $\delta$ and define $\sigma\in
M^{\text{Col}(\omega,\kappa)}$ as follows. Let $(q,\rho)\in\sigma$ iff
$q\in\text{Col}(\omega,\kappa)$, $\rho\in
M^{\text{Col}(\omega,\kappa)}\cap(H_{\kappa^+})^M$ is a name for a real and

$$
q\Vdash\exists p\in\text{Col}(\check\omega,\check\delta): p\Vdash\exists
y:(\check\rho,y)\in\check\tau.
$$

To show that $\sigma$ witnesses that M understands $\exists^{\mathbb R}B$ at $\kappa$
we may firstly assume $i=\text{id}$ in the definition of understanding, to ease
notation. Let $g\in V$ be $\text{Col}(\omega,\kappa)$-generic over M. We have to show
that

$$ \exists^{\mathbb R}B\cap M[g]=\sigma^g. $$

We start with the $(\subseteq)$ direction. Let $x\in\exists^{\mathbb R}B\cap M[g]$ and
pick $y\_0\in\mathbb R$ such that $(x,y\_0)\in B$. Now, since $\delta$ is Woodin in M we
can form a genericity iteration $j:M[g]\to P$ such that $y\_0\in P[h]$, where $h\in V$
is $\text{Col}(\omega,j(\delta))$-generic over P.

Furthermore, we can pick $\text{crit}(j)<\delta$ to be as large as we want in a
genericity iteration, so by choosing it sufficiently large we may assume that $\kappa$
and $g$ are fixed by $j$. Because then $P=Q[g]$, where $k:M\to Q$ is the iteration
derived from $j$. We thus have the following picture:

<img src="/src/assets/projective-understanding-via-woodins.webp" style="width: min(500px, 100%);" />

As $\tau$ witnesses that M understands B we have that $j(\tau)^h=k(\tau)^{g\oplus
h}=B\cap Q[g,h]$, so that $(x,y\_0)\in j(\tau)^h$. This means that $Q[g,h]\models
\exists y:(x,y)\in j(\tau)$, implying that $Q[g]\models\exists q:q\Vdash\exists
y:(\check x,y)\in j(\tau)$ and then elementarity of $j$ yields that

$$
M[g]\models\exists q:q\Vdash\exists y:(\check x,y)\in\tau, (\dagger)
$$

concluding that $x\in\sigma^g$ by construction of $\sigma$. As for the $(\supseteq)$
direction, if $x\in\sigma^g$ then $(\dagger)$ holds, so that $Q[g,h]\models\exists
y:(\check x,y)\in j(\tau)=B\cap Q[g,h]$, i.e. that $x\in\exists^{\mathbb R}B$ and we're
done. **QED**

Note that being understood is closed under negation, so that if $\exists^{\mathbb R}B$
is understood then so is $\forall^{\mathbb R}B=\lnot\exists^{\mathbb R}\lnot B$. Also
note that since $\Sigma^1\_1$ sets of reals are absolute between mice, every
$\Sigma^1\_1$ set is understood by any M and $\eta$. By assuming we got a Woodin lying
around we can then catch real parameters, making sure that this is still true for
boldface $\bf\Sigma^1\_1$ sets of reals and hence also for boldface $\bf\Sigma^1\_2$
sets by the above Theorem.

In particular, this means that $A\cap M\in M$ for every $\bf\Sigma^1\_2$ set A. The
theorem then implies that whenever M has $n<\omega$ Woodins then this holds true for
$\bf\Sigma^1_{n+1}$ sets, and that if it has a limit of Woodins then it's true for all
projective sets. This is not quite as strong as being projectively correct, as we might
have projective sets which have empty intersection with M. To ensure correctness we
need something stronger, called Suslin capturing, which we'll cover at some later
point.

But of course we don't have to restrict ourselves to the projective hierarchy. Whenever
M understands any class $\Gamma\subseteq P(\mathbb R)$, Woodins present inside M will
ensure that M can reason about the corresponding "$\Gamma$ projective hierarchy".
