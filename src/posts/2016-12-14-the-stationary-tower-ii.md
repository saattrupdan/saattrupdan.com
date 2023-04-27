---
title: The Stationary Tower II
subtitle: The Construction
meta: In the last post we developed the machinery of generic ultrapowers, which enabled us to go from a uniform normal ideal in the universe to getting an elementary embedding from the universe, assuming th existence of a Woodin cardinal. We now introduce a generalisation of such an embedding, which grants more closure -- this is precisely given by the stationary tower.
tags: set theory, stationary tower
---

In the last post we developed the machinery of generic ultrapowers, which enabled us to
go from a uniform normal ideal in $V$ to getting an elementary embedding $j:V\to M$
with $\text{crit }j=\omega\_1^V$ lying in a generic extension of $V$, if we assume that
we have a Woodin cardinal. The model $M$ furthermore enjoyed the property of being
closed under countable sequences in the forcing extension. We now introduce a
generalisation of such an embedding, which grants more closure -- this is precisely
given by the stationary tower.

This post is part of a series on the stationary tower:

1. <router-link to="/posts/2016-11-30-the-stationary-tower-i-generic-ultrapowers">The Stationary Tower I - Generic Ultrapowers</router-link>
2. The Stationary Tower II - The Construction

So, say we want to construct a forcing notion $\mathbb P$ such that a generic $G$ for
$\mathbb P$ induces an elementary embedding $j:V\to M$ satisfying that
${^{<\delta}}M\subseteq M$. If we focus on a particular $\lambda<\delta$, we
essentially want to show that $\kappa:=\text{crit} j$ is "$V$-supercompact" in $V[G]$.

To witness this we need a normal fine ultrafilter over $P_\kappa(\lambda)$, so our
forcing notion should approximate such measures for every $\lambda<\delta$
simultaneously. Since we want our resulting measures to be normal, we're not interested
in considering non-stationary sets. A naive attempt would then be to define

$$ \mathbb P:=\bigcup_{\lambda<\delta}\\{s\in P_\kappa(\lambda)\mid s\text{ is
stationary}\\}. $$

What should the ordering be? We at least want to connect stationary subsets of
$P_\kappa(\lambda)$ with stationary subsets of $P_\kappa(\theta)$ for every
$\lambda,\theta<\delta$. If $s\in P_\kappa(\lambda)$ is stationary then $\bigcup
s=\lambda$, so we don't really need to keep track of the $\lambda$'s as well. The first
condition is then that for $s,p\in\mathbb P$,

$$ s\leq p\Rightarrow \bigcup p\subseteq\bigcup s. $$

We want something more than this though, as otherwise everything would be comparable.
For, say, $p,s\in\mathbb P$ such that $\bigcup p=\bigcup s$, we would want that $p\leq
s$ iff $s\subseteq p$. This leads us to the following definition.

> **Definition.** The $\kappa$-stationary tower for some uncountable $\kappa$,
> associated to a Woodin cardinal $\delta>\kappa$, is the poset
>
> $$
> \mathbb P:=\\{s\in V_\delta\mid s\text{ is stationary over } P_\kappa(\bigcup s)\\},
> $$
>
> where $s\leq p$ iff $\bigcup p\subseteq\bigcup s$ and $\\{A\cap\bigcup p\mid A\in
> s\\}\subseteq p$.

The $\delta$-stationary tower is denoted by $\mathbb P_{<\delta}$ and called the full
stationary tower, and the $\omega\_1$-stationary tower is denoted by $\mathbb
Q_{<\delta}$ and called the countable stationary tower.

So, let's see that this actually works. I'll focus on the full stationary tower, but
the same proof works for any other variant as well. We need to find a $V$-extender in
$V[G]$ witnessing the existence of a $j:V\to M$ such that $M$ is closed under sequences
in $V[G]$ of length $<\delta$. To each $X\in V_\delta-\\{\emptyset\\}$ we define a
measure $\mu\_X:P(P(X))\to 2$ given by

$\mu\_X(s)=1$ iff $s=\\{X\cap A\mid A\in p\\}$ for some $p\in G$ such that
$X\subseteq\bigcup p$.

> **Proposition.** $\mu\_X$ is a $V$-measure over $P(X)$, for every non-empty $X\in
> V_\delta$.

**Proof.** That $\mu\_X$ is a filter over $P(X)$ follows from $G$ being a filter over
$\mathbb P_{<\delta}$. To show that $\mu\_X$ is an ultrafilter, let $A\subseteq P(X)$
be any set. We then want to show that

$$
\\{p\in\mathbb P_{<\delta}\mid p\_X\subseteq A\lor p\_X\cap A=\emptyset\\}\text{ is
dense}
$$

Let therefore $p\in\mathbb P_{<\delta}$ be arbitrary and define the two sets

$$
p^0:=\\{x\in p\mid x\cap X\in A\\}\text{ and }p^1:=\\{x\in p\mid x\cap X\notin A\\}.
$$

Then as $p^0\cup p^1=p$ is stationary, one of the two is stationary, say $p^0$. Then
we're done, since $p^0\leq p$ and $p^0\_X\subseteq A$. **QED**

That $\mu\_X$ is actually $V$-normal and $V$-fine, i.e. that the corresponding
embedding $j:V\to M$ satisfies that $M$ is closed under $|X|$-sequences in $V[G]$, is
quite a long proof and I won't give it here. The proof goes indirectly by showing that
if $\delta$ satisfies that given any $|X|$-sequence of predense sets of $\mathbb
P_{<\delta}$ we can find an inaccessible $\gamma<\delta$ such that every predense set
restricted to $\mathbb P_{<\gamma}$ is so-called semi-proper, then $M$ is closed under
$|X|$-sequences. It turns out that when $\delta$ is Woodin, this condition is
satisfied.

We still need to show that all the resulting ultrapowers give rise to a single
ultrapower, giving us closure under all sequences of length $<\delta$
simultaneously. In other words, we need a directed system, just like we have with
extenders. But this turns out to be straightforward, using the following lemma, which
follows just by going through the definitions.

> **Lemma.** Let $X\subseteq Y$ and $X\neq\emptyset$.

If $p\subseteq P(X)$ is stationary then $\\{A\subseteq Y\mid A\cap X\in p\\}$ is
stationary. $\mu\_X(p)=1$ iff $\mu\_Y(\\{A\subseteq Y\mid A\cap X\in p\\})=1$.

We can then for $X\subseteq Y$ define maps
$i_{XY}:\text{Ult}(V,\mu\_X)\to\text{Ult}(V,\mu\_Y)$ as
$i_{XY}([f]\_{\mu\_X}):=[f^Y]\_{\mu\_Y}$, where $f^Y(A):=f(A\cap X)$. This grants us
with a directed system, so taking the direct limit of the ultrapower we wind up with
our elementary $j:V\to M$ in the generic extension such that $M$ is closed under
$<\delta$-sequences in $V[G]$.

One neat feature is that we can more or less choose the critical point of $j:V\to M$ to
be anything we want. More specifically, we can set it to be any uncountable regular
cardinal $\kappa<\delta$. To see this, note first that $\kappa$ is stationary in
$P(\kappa)$, so that $\kappa\in\mathbb P_{<\delta}$. Now let $g\subseteq\mathbb
P_{<\delta}$ be $V$-generic such that $\kappa\in G$. Analogously to measures $\mu$
where $x\in\mu$ iff $\text{crit }\mu\in j_\mu(x)$, we get that $j"\kappa\in j(\kappa)$.
This means that $j"\kappa$ is an ordinal, so that $j"\kappa=\kappa$, and furthermore
that $\kappa < j(\kappa)$, making it the critical point of $j$.

Summing up, we more or less did the same thing as with the generic ultrapowers, but we
needed a way to go from only a single generic to get ultrapowers at every "level", i.e.
on every $P(X)$, which were coherent. Now, given this new tool at hand, what can we use
it for? It turns out that the stationary tower forcing and the genericity iterations
seem to give "dual" proofs to various applications. I'll get back to that later.

For now, all there is left to say is: merry Christmas everyone!
