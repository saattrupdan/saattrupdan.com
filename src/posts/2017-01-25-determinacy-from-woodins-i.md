---
title: Determinacy From Woodins I
meta: I'm amazed by the history of determinacy. As soon as classical descriptive set theorists found the impact the determinacy of games has on regularity properties of sets of reals, a sophisticated program began the goal of which was to characterise the strength of determinacy. The fact that Delta^1_2-determinacy seemed like an unreachable statement at the time is incredible, until it culminated with Woodin's 1979 result that AD^L(R) follows from the incredibly strong hypothesis I_0, after which he isolated the Woodin cardinal as a variant of a Shelah cardinal and proved the well-known equiconsistency result between AD and infinitely many Woodins. I'm dedicating a few blog posts to giving an idea of how some of these later results are proven.
tags: set theory, determinacy
---

I'm amazed by the history of determinacy. As soon as classical descriptive set
theorists found the impact the determinacy of games has on regularity properties of
sets of reals, a sophisticated program began the goal of which was to characterise the
strength of determinacy. The fact that $\bf\Delta^1\_2$-determinacy seemed like an
unreachable statement at the time is incredible, until it culminated with Woodin's 1979
result that $\textsf{AD}^{L(\mathbb R)}$ follows from the incredibly strong hypothesis
$\bf I\_0$, after which he isolated the Woodin cardinal as a variant of a Shelah
cardinal and proved the well-known equiconsistency result between $\textsf{AD}$ and
infinitely many Woodins. For a more detailed historical exposition I can highly
recommend [this book by Larson](https://paulblarson.github.io/Cabal_Determinacy.pdf).

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. Determinacy From Woodins I
3. <router-link to="/posts/2017-02-08-determinacy-from-woodins-ii">Determinacy From
   Woodins II</router-link>
4. <router-link to="/posts/2017-02-22-determinacy-from-woodins-iii">Determinacy From
   Woodins III</router-link>
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

I'm dedicating a few blog posts to giving an idea of how some of these later results
are proven. As some of the proofs are incredibly long and technical, my goal is to give
the main ideas and strategies of the proofs, intended to the set theorist who might be
interested in what key ideas the determinacy crowd are using. My plan is to accompany
most proofs with pdf notes in which I'm writing out the proofs with all the technical
details. A tentative plan is to cover:

1. $\textsf{PD}$ from infinitely many Woodins and a measurable above;
2. $\textsf{AD}^{L(\mathbb R)}$ from infinitely many Woodins and a measurable above;
3. The equiconsistency of $\textsf{AD}$ with infinitely many Woodins.

The first result is due to Martin-Steel and the last two are due to Woodin. We'll start by focusing on the first result.

We thus aim to sketch the proof of the following theorem.

> **Theorem (Martin-Steel, 1989).** Assume there exists infinitely many Woodins and a
> measurable above. Then Projective Determinacy holds.

This theorem was proven by [Martin and Steel](https://doi.org/10.2307/1990913). The key
property that is used is the notion of a homogeneously Suslin set, so this first post
is going to focus on those. The first step is to define a tower of measures, which is
analogous to an extender in that it's a sequence of measures that collectively can form
a single ultrapower. Here we only focus on countably complete measures over finite
sequences of a fixed set $X$.

Say $k\leq n$,$\mu\_k$ is some measure over $^k X$ and $\mu\_n$ a measure over $^n X$.
We then say that these two measures are compatible if it holds that given any set
$A\subset{^k X}$, $A\in\mu\_k$ iff $\\{s\in{^n\omega}\mid s\upharpoonright k\in
A\\}\in\mu\_n$. I.e. that the two measures "line up".

We then say that an $\omega$-sequence $\langle\mu\_n\mid n<\omega\rangle$ is a tower of
measures if there is some set $X$ such that $\mu\_n$ is a measure over $^n X$ and all
the measures are pairwise compatible. Such a tower is countably complete if given any
sequence $\vec A\in\Pi_{k<\omega}\mu\_k$ there is some function $f:\omega\to X$ such
that $f\upharpoonright n\in A\_n$ for every $n<\omega$. Countably completeness ensures
that the resulting ultrapower is wellfounded, because say there is an infinite
descending chain

$$ \cdots\in_\mu[f\_2]\in_\mu[f\_1]\in_\mu[f\_0] $$

in the ultrapower. Say for simplicity that the set $A\_k$ witnessing that
$[f\_k]\in_\mu[f_{k-1}]$ is in $\mu\_k$ for every $k\geq 1$. Then letting
$A\_k:=\\{u\in{^k X}\mid f\_k(u)\in f_{k-1}(u\upharpoonright k-1)\\}\in\mu\_k\\}$ witness
this, the countably completeness gives us an $f:\omega\to X$ such that

$$
\cdots\in f\_2(f\upharpoonright 2)\in f\_1(f\upharpoonright 1)\in f\_0(f\upharpoonright
0),
$$

contradicting foundation.

Now let $\kappa$ be a cardinal and $X$ any set. A tree $T$ on $\omega\times X$ is then
called $\kappa$-homogeneous if we can find a partial function $\pi$ taking finite
sequences of $\omega$ to measures on ${^{<\omega}}\kappa$ such that $\pi(s)$ is a
$\kappa$-complete measure with $T\_s\in\pi(s)$, for every $s\in\text{dom}\pi$, and given
any $x\in{^\omega\omega}$ we have that $x\in p[T]$ iff $\langle\pi(x\upharpoonright
n)\mid n<\omega\rangle$ is a countably complete tower. In other words, we get a
correspondence between reals in $p[T]$ and countably complete towers.

Say now that a set of reals $A$ is $\kappa$-homogeneously Suslin if $A=p[T]$ for a
$\kappa$-homogeneous tree, and $A$ is homogeneously Suslin if it's
$\kappa$-homogeneously Suslin for some $\kappa$. So, given a homogeneously Suslin set,
we can now associate to each element a corresponding countably complete tower. This
turns out to give sufficient structure to ensure determinacy:

> **Theorem.** Every homogeneously Suslin set $A$ is determined.

Say $T$ is homogeneous tree over $\omega\times X$ with $p[T]=A$. The idea of the proof
is to define the auxiliary game $G^\*$:

$$
\begin{array} {ccccccccc}
    \text{I} & \langle x\_0,g\_0 \rangle && \langle x\_2,g\_1 \rangle && \langle x\_4,g\_2 \rangle && \cdots\\\\
    \text{II} && x\_1 && x\_3 && x\_5 && \cdots
\end{array}
$$

Here $x\_i\in\omega$ and $g\_i\in X$, and $I$ wins iff $\langle x,g \rangle\in[T]$. Since
$[T]$ is closed, $G^\*$ is determined. If $I$ has a winning strategy in $G^\*$ then he
also has one in $G_\omega(A)$ by just ignoring the $g\_i$'s. It turns out that the
homogeneity of $T$ ensures that $II$ cannot have a winning strategy in $G^\*$, thus
making $A$ determined (see 32.2 in
[Kanamori](https://doi.org/10.1007/978-3-540-88867-3))

Our task has thus been reduced to showing that every projective set is homogeneously
Suslin, assuming the existence of infinitely many Woodins and a measurable above. We
will do this in an inductive fashion, starting by showing that $\bf\Pi^1\_1$ sets are
homogeneously Suslin and then going from $\bf\Pi^1\_n$ sets to $\bf\Pi^1_{n+1}$ sets.
But this is all happening in my next post.
