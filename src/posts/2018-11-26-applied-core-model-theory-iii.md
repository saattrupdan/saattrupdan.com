---
title: Applied Core Model Theory III
meta: The previous two posts was dedicated to stating, explaining and applying a certain result in core model theory, the PD dichotomy, without using any inner model theory at all. This post is then the final post in this short series in which we'll actually prove the dichotomy. This blog series, and especially the following proof, grew out of some work with Stefan Mesken.
tags: set theory, core model theory
---

The previous two posts was dedicated to stating, explaining and applying a certain
result in core model theory, the PD dichotomy, without using any inner model theory at
all. This post is then the final post in this short series in which we'll actually
prove the dichotomy. This blog series, and especially the following proof, grew out of
some work with Stefan Mesken.

<center>
  <img src="/src/assets/img/applied-core-model-theory-iii.webp" alt="A picture of a big
  red rock with engraved squares, and a glass building in the background. The
  photograph is called 'Kernel', by Stuart Green."
  style="width: min(500px, 100%);" />
</center>

This post is part of a series on core model theory:

1. <router-link to="/posts/2017-04-26-what-is-k">What is K?</router-link>
2. <router-link to="2018-05-10-core-model-induction-101">Core Model Induction
   101</router-link>
3. <router-link to="2018-10-22-applied-core-model-theory-i">Applied Core Model
   Theory I</router-link>
4. <router-link to="2018-11-13-applied-core-model-theory-ii">Applied Core Model
   Theory II</router-link>
5. Applied Core Model Theory III
6. <router-link to="2019-03-31-core-model-induction-the-pointclass-perspective">Core
   Model Induction: The Pointclass Perspective</router-link>

The following is the dichotomy we've been working with for the last couple of posts.

> **The PD dichotomy.** Let $\theta>\omega$ be either a $\beth$-fixed point or
> $\theta=\infty$. Then
>
> 1. The core model $K(x)|\theta$ exists for some $x\in H_\theta$; or
> 2. $\textsf{PD}$, projective determinacy, holds in an inner model.

Technically speaking, this is not really a dichotomy, as stated here. A dichotomy would
also have the property that the two outcomes are mutually exclusive, which isn't the
case here. This was mostly done to minimise the number of definitions and
complications, and the disjunctive conclusion is still correct. A more "correct"
dichotomy, for the experts, would be the following.

> **The "correct" PD dichotomy.** Let $\theta>\omega$ be either a $\beth$-fixed point
> or $\theta=\infty$. Assume that $K^c(x)$ has $<\text{cof}(\theta)$
> many Woodins (say $\text{cof}(\infty)=\infty$), for every $x\in H_\theta$.
> Then either
>
> 1. The core model $K(x)|\theta$ exists for some $x\in H_\theta$ and is
>    $(\theta,\theta)$-iterable; or
> 2. $M\_n^\sharp$ is total on $H_\theta$ and is $(\theta,\theta)$-iterable, for every
>    $n<\omega$. In particular, $\textsf{PD}$ holds.

Note here that if $K^c(x)$ had a limit of Woodins then $K^c(x)$ would satisfy
$\textsf{AD}^{L(\mathbb R)}$, so we still get $\textsf{PD}$ in an inner model. So the
first $\textsf{PD}$ dichotomy is really quite simplified. I'll provide our sketch of
the proof below, and the full proof can be found here.

**Sketch of proof.** Assume that (2) fails, so that there's a least $n<\omega$ and
$x\in H_\theta$ such that either $M\_n^\sharp(x)$ doesn't exist or it exists and isn't
$(\theta,\theta)$-iterable. If $n=0$ then all we're saying is that $x^\sharp$ doesn't
exist, but then it's a well-known theorem of Jensen that $L[x]=K(x)$ in that case. So
we may assume that $n=k+1$ for some $k<\omega$.

We may further assume that all premice are tame, as otherwise (2) holds. By Corollary
2.11 of Jensen et al. (2009) we get that $K^c(x)|\theta$ exists and is countably
iterable. We now have two cases.

> **Case 1.** $K^c(x)|\theta$ has a Woodin cardinal.

Let $\delta$ be the strict sup of all the Woodin cardinals of $K^c(x)|\theta$, which
exists as $K^c(x)$ has $<\text{cof}(\theta)$ many Woodins. In this case we want to
compare $M\_k^\sharp(K^c(x)|\delta)$ with $K^c(x)|\theta$, and for this to be possible
it suffices to show that they're both $(\theta,\theta)$-iterable above $\delta$. By the
choice of $k$ we get that $M\_k^\sharp(K^c(x)|\delta)$ is $(\theta,\theta)$-iterable, so
we have to show that $K^c(x)|\theta$ is $(\theta,\theta)$-iterable above $\delta$ as
well. A technical lemma ensures that this is actually the case, so we have a
coiteration

$$ (M\_k^\sharp(K^c(x)|\delta),K^c(x)|\theta)\leadsto (P,R). $$

By universality of $K^c(x)|\theta$ we get that $P\trianglelefteqR$.
We can further show that neither branch move, so that
$M\_k^\sharp(K^c(x)|\delta)\triangleleft K^c(x)|\theta$. But $K^c(x)|\theta$ is
countably iterable, so $M\_k^\sharp(K^c(x)|\delta)$ is as well, and one can show that
this also implies that $M\_k^\sharp(K^c(x)|\delta)$ is $(\theta,\theta)$-iterable as
well.

> **Case 2.** $K^c(x)|\theta$ has no Woodin cardinals.

Let $\kappa<\theta$ be any uncountable cardinal and let
$\Omega:=\beth_\kappa(\kappa)^+$. Note that $\Omega<\theta$ by our choice of $\theta$.
Define now $S$ to be $\text{Lp}(K^c(x)|\Omega)$ if $\Omega$ is a limit
cardinal of $K^c(x)|\theta$, and otherwise let $S:=K^c(x)|\Omega$. By Lemma
3.3 of Jensen et al. (2009) it holds that $S$ is countably iterable. In
particular, $\Omega$ is not Woodin in $L[S]$, as it's trivial when $S=K^c(x)|\Omega$,
and otherwise it's because

$$ K^c(x)|\Omega^{+K^c(x)|\theta}\subseteq S. $$

Now, by Fernandes ($\infty$) and Jensen & Steel (2013) this means that we can build the
core model $K(x)|\kappa$, as the only places they're using that there's no inner model
with a Woodin cardinal are to guarantee that $K^c(x)|\theta$ has no Woodin cardinals,
which is simply our case assumption, and in Lemma 4.27 of Jensen & Steel (2013) in
which they require that $\Omega$ isn't Woodin in $L[S]$.

As $\kappa<\theta$ was arbitrary we get that the core model $K(x)|\theta$ exists. Since
the core model doesn't have any Woodins either in this case, $Q$-structures
trivially exist, making $K(x)|\theta$ $(\theta,\theta)$-iterable as well. **QED**
