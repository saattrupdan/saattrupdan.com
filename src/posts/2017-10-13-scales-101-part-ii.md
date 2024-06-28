---
title: Scales 101 - Part II
subtitle: Where & How?
meta: Last time we got an idea of what scales are and why they're useful. The next questions we then might ask is where do we find them, and how do we create new ones from existing ones? We'll cover the 'classical' answers to these questions here, meaning the ones concerned with the projective hiearchy.
tags: set theory, descriptive set theory
---

Last time we got an idea of what scales are and why they're useful. The next questions
we then might ask is where do we find them, and how do we create new ones from existing
ones? We'll cover the 'classical' answers to these questions here, meaning the ones
concerned with the projective hiearchy.

This post is part of a series on scales:

1. <router-link to="/posts/2017-10-06-scales-101-part-i">Scales 101 - Part I: What &
   Why?</router-link>
2. Scales 101 - Part II: Where & How?
3. <router-link to="/posts/2017-10-20-scales-101-part-iii">Scales 101 - Part III:
   Moving to L(R)</router-link>
4. <router-link to="/posts/2017-10-27-scales-101-part-iv">Scales 101 - Part IV: Leaving
   a Gap</router-link>

The first question, where we find the scales, is given by the following theorem, due to
Novikov (Нóвиков), Kondô (近藤), Addison and Moschovakis (Μοσχοβάκης). We'll give a
full proof here to give an idea of how these scales are constructed.

> **Theorem (Novikov-Kondô-Addison-Moschovakis).** $\bf\Pi^1\_1$ has the scale property.

**Proof**. It suffices to prove that $\Pi^1\_1$ has the scale property, as the closure
properties of $\Pi^1\_1$ allows us to define $\bf\Pi^1\_1$-scales from $\Pi^1\_1$-scales,
simply by including the relevant real parameter.

So let $A\in\Pi^1\_1$. Then for some recursive function $f:\mathbb R\to\mathbb R$ it
holds that $x\in A$ iff $f(x)\in\textsf{WO}$, where $\textsf{WO}$ is the set of all
$x\in\mathbb R$ such that

$$ \leq_x:=\\{(m,n)\mid x(\left\< m,n\right\<)=0\\} $$

is a wellordering (it can be shown that this set is a universal $\Pi^1\_1$-set). For
$x\in\textsf{WO}$ define $x\upharpoonright n:=\\{m<\omega\mid m <\_x n\\}$ and define, for
$x,y\in A$ and $n<\omega$,

$$
x\leq\_n y\text{ iff }|f(x)|<|f(y)|\lor(|f(x)|=|f(y)|\land|f(x)\upharpoonright
n|\leq|f(y)\upharpoonright n|),
$$

and let $\varphi\_n:A\to\textsf{On}$ be the norm corresponding to $\leq\_n$. We'll show
that $\left\<\varphi\_n\mid n<\omega\right\<$ is a $\Pi^1\_1$-scale on $A$.

> **Claim.** $\vec\varphi$ is a scale.

**Proof** of claim. Let $\left\< x\_i\mid i<\omega\right\<$ be a sequence of elements
of $A$ and assume that $x\_i\to x$ for some $x\in\mathbb R$ and
$\varphi\_n(x\_i)\to\alpha\_n$ for some $\alpha\_n$. We first show that $x\in A$; i.e.
that $f(x)\in\textsf{WO}$. We achieve this by showing that the mapping
$n\mapsto\tilde\alpha\_n$ is an order-preserving map from the domain of $\leq_{f(x)}$
to $\textsf{On}$. Here $\tilde\alpha\_n$ is such that $|f(x\_i)\upharpoonright
n|=\tilde\alpha\_n$ for sufficiently large $i<\omega$, which is possible as
$\varphi\_n(x\_i)\to\alpha\_n$.

Assume that $n<\_{f(x)}m$. By continuity of $f$ we get that $n<\_{f(x\_i)}m$ for
sufficiently large $i<\omega$, so that $|f(x\_i)\upharpoonright
n|<|f(x\_i)\upharpoonright m|$ by definition and then
$\tilde\alpha\_n<\tilde\alpha\_m$. This shows that $x\in A$. Next, we have to show that
$\varphi\_n(x)\leq\alpha\_n$ for all $n<\omega$. If we stare at the following equation
for a while, we see that it's sufficient to show that

$$
|f(x)|<\tilde\alpha\lor(|f(x)|=\tilde\alpha\land|f(x)\upharpoonright
n|\leq\tilde\alpha\_n),
$$

where again $\tilde\alpha=|f(x\_i)|$ for sufficiently large $i<\omega$. By monotonicity
of $n\mapsto\tilde\alpha\_n$ we get that $|f(x)\upharpoonright n|\leq\tilde\alpha\_n$,
since $m<\_{f(x)}n$ implies $\tilde\alpha\_m<\tilde\alpha\_n$, so there can be at most
$\tilde\alpha\_n$ many $\leq_{f(x)}$-predecessors of $n$ by injectivity of
$n\mapsto\tilde\alpha\_n$. As $\tilde\alpha\_n\leq\tilde\alpha$ holds for every
$n<\omega$ we can conclude that

$$ |f(x)|=\text{sup}\_n|f(x)\upharpoonright n|\leq\tilde\alpha, $$

making $\vec\varphi$ a scale. **QED**

It remains to show that $\vec\varphi$ is a $\Pi^1\_1$-scale; but this follows from the
fact that there exist relations $Q_{\Pi^1\_1}\in\Pi^1\_1$ and
$Q_{\Sigma^1\_1}\in\Sigma^1\_1$ such that for $y\in\textsf{WO}$,

$$
x\in\textsf{WO}\land|x|\leq|y|$ iff $Q_{\Pi^1\_1}(x,y)$ iff $Q_{\Sigma^1\_1}(x,y).
$$

Indeed, $Q_{\Pi^1\_1}(x,y)$ holds iff $\leq\_x$ is a wellorder and given any map
$f:(\omega,\leq\_y)\to(\omega,\leq\_x)$ it holds that $f$ is injective iff it's
bijective. In other words, we're simply saying that $x\in\textsf{WO}$ (which is
$\Pi^1\_1$) and that $|y|\not<|x|$, which we described in a $\Pi^1\_1$ fashion as well.
The other formula, $Q_{\Sigma^1\_1}(x,y)$ is defined as there exists an injective
$f:(\omega,\leq\_x)\to(\omega,\leq\_y)$. Since we assumed that $y\in\textsf{WO}$ this
automatically gives us that $x\in\textsf{WO}$ as well. **QED**

Okay, so we can find scaled pointclasses. Now, the question is how we move from one
scaled pointclass to another. Say a pointclass is adequate if it contains all recursive
sets and is closed under disjunction, conjunction, bounded number quantification of
both kinds (i.e. over $\omega$ and $\mathbb R$) and substitution of recursive
functions. The usual arithmetical ($\Sigma^0\_n$ and $\Pi^0\_n$), analytical
($\Sigma^1\_n$ and $\Pi^1\_n$), Borel ($\bf\Sigma^0\_n$ and $\bf\Pi^0\_n$) and
projective ($\bf\Sigma^1\_n$ and $\bf\Pi^1\_n$) hierarchies are all adequate. We then
got the following theorem.

> **Theorem (Moschovakis).** If $\Gamma$ is adequate and $A\in\Gamma$ admits a
> $\Gamma$-scale, then $\exists^{\mathbb R}A$ admits an $\exists^{\mathbb
> R}\forall^{\mathbb R}\Gamma$-scale.

I won't give the proof, but the scale $\vec\psi$ in question is given by

$$
\psi\_n(x):=\text{min}\\{\left\<\varphi\_0(x,\alpha),\alpha\_0, \dots,
\varphi\_n(x,\alpha),\alpha\_n\right\<\mid(x,\alpha)\in A\\},
$$

where $\vec\varphi$ is the $\Gamma$-scale given by assumption, and $\left\<
\cdot,\dots,\cdot \right\<$ a coding of tuples of ordinals to ordinals. This then
yields the corollary stating that for adequate scaled $\Gamma$ with $\forall^{\mathbb
R}\Gamma\subseteq\Gamma$, $\exists^{\mathbb R}\Gamma$ has the scale property. In
particular we then get that $\bf\Sigma^1\_2$ has the scale property.

To cover the rest of the projective hierarchy we need to assume some determinacy. We
arrive at the following second peridicity theorem.

> **Theorem (Moschovakis).** Assume $\Gamma$ is adequate and
> $\text{Det}(\Gamma\cap\lnot\Gamma)$ holds. Then whenever $A\in\Gamma$ admits a
> $\Gamma$-scale, $\forall^{\mathbb R}A$ admits a $\forall^{\mathbb R}\exists^{\mathbb
> R}\Gamma$-scale.

Here the construction of the scale is a bit more elaborate and will be omitted here --
see "Notes on the theory of scales" in the first Cabal volume by Kechris (Κεχρής) and
Moschovakis. Again we get that for adequate scaled $\Gamma$ such that
$\text{Det}(\Gamma\cap\lnot\Gamma)$ holds, $\forall^{\mathbb R}\Gamma$ is scaled as
well. This yields the following picture under projective determinacy, with the scaled
pointclasses encircled:

This finishes the classical scale theory. The next step is to analyse the pointclasses
of the form $\bf\Sigma\_n^{J_\alpha(\mathbb R)}$ and $\bf\Pi\_n^{J_\alpha(\mathbb R)}$,
which is due to Steel. Note that $\bf\Sigma^1\_n=\bf\Sigma\_n^{J\_0(\mathbb R)}$ and
$\bf\Pi^1\_n=\bf\Pi\_n^{J\_0(\mathbb R)}$, so all the classical theorems cover the case
where $\alpha=0$ and Steel's analysis focuses on the $\alpha>0$ case. But that's not
until next time.
