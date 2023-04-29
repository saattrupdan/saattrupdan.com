---
title: Limitations of ZFC Determinacy
meta: I was recently playing a (set-theoretic) game and the question of whether it was determined slowly emerged. As I was working in a ZFC context, most of the determinacy results were of no use to me. Of course we can't have full determinacy (AD), but how about definable variants, where we alter both the objects played and the length of the game?
tags: set theory, determinacy
---

I was recently playing a (set-theoretic) game and the question of whether it was
determined slowly emerged. As I was working in a ZFC context, most of the determinacy
results were of no use to me, so [I tried to
investigate](https://mathoverflow.net/questions/271507/limitations-of-determinacy-hypotheses-in-zfc/)
how much we really know about ZFC determinacy. Of course we can't have full determinacy
(AD), but how about definable variants, where we alter both the objects played and the
length of the game?

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
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
10. Limitations of ZFC Determinacy
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

We can consider games of type $(X,\alpha,\Gamma)$, where $X$ is the set of objects
played, $\alpha$ is the length of the game and $\Gamma\subseteq P(X^\omega)$ is a
pointclass in which our payoff sets lie. My question was then

> **Question.** What are the boundaries to ZFC determinacy? For what game types
> $(X,\alpha,\Gamma)$ do we reach an inconsistency? And also the dual question, what
> game types $(X,\alpha,\Gamma)$ are consistently determined relative to large
> cardinals?

To enforce some kind of ordering on the pointclasses, I'll work with the commonly used
boldface variants in determinacy contexts:

$$
{\bf\Delta}^1\_1, {\bf\Sigma}^1\_1, {\bf\Sigma}^1\_2,
{\bf\Sigma}^1\_3,\dots,{\bf\Sigma}^2\_1,{\bf\Sigma}^2\_2,\dots,\textsf{OD}(\mathbb R).
$$

Just to be clear, I'm only considering these classes with respect to $V_\omega$, which
means that ${\bf\Delta}^1\_1$ will for instance mean a single existential quantifier
over the reals followed by an arithmetical formula, with real parameters. When we're
playing games on $\omega$ this is the same thing as the descriptive set theoretic
notions of taking projections and complements of closed sets, but as soon as we move
away from playing integers, these pointclasses are a lot smaller than their descriptive
set theoretic analogues. Also, in this post I'll consider the following variants of
objects played:

$$ \omega, \mathbb R=P(\omega_0), P(\omega_1), P(\omega_2),\dots $$

As we got three dimensions I'll be working in two-dimensional cross-sections to make
things a bit simpler. Let's start with length $\omega$ games. To start things off we
have the incredible Borel determinacy result by Martin, giving us determinacy of all
Borel games of length $\omega$, no matter what objects are played. As I mentioned above
the Borel sets are really a much larger pointclass than the ${\bf\Delta}^1_1$ class
we're considering, making it a bit of an overkill, but it works.

When we move to playing games on $P(\omega_1)$ we reach an inconsistency. Indeed, if we
let player I play an $\omega_1$-sequence $X$ of reals as his first move (which is
possible as such a sequence can be encoded as an $\omega_1$-sequence of integers). If
$X$ has a perfect subset then it encodes a well-order of the reals and the proof that
AD+AC is inconsistent gives us our non-determined game. If $X$ does not have a perfect
subset then the perfect set game on $X$ is non-determined, as $X$ then doesn't have the
perfect set property.  This is a (lightface) $\Delta^2_2$ definition, giving us a lower
complexity bound for inconsistency when playing games of length $\omega$.

When it comes to longer length games it's quite analogous, where determinacy of
$\Sigma^2_2$ games of length $\omega_1+\omega$ on $\omega$ is inconsistent, where the
first $\omega_1$ many moves are simply used to reconstruct the above sequence $X$. On
the other hand, Woodin has shown that it's consistent (relative to large cardinals)
that we have determinacy of $\textsf{OD}(\mathbb R)$ games of length $\omega_1$ on the
reals (this can be found in Neeman's book on long games, exercise 7F.15).

When we get to play subsets of the reals, we can simply play an undetermined set
$A\subseteq 2^\omega$ of reals, whereafter they play either $\emptyset$ or $\mathbb R$,
encoding an element of $A$. Here the payoff set is (at least) $\Pi^1_2$, so we get a
lower inconsistency bound in this case. The analogous case is for length
$\mathfrak{c}+\omega$ games on $\omega$. In total, we end up with the following
diagrams:

<div style="display: flex; flex-wrap: wrap; justify-content: center;">
  <img src="/limitations-of-zfc-determinacy-1.webp" style="width: min(270px, 100%)" />
  <img src="/limitations-of-zfc-determinacy-2.webp" style="width: min(270px, 100%)" />
  <img src="/limitations-of-zfc-determinacy-3.webp" style="width: min(270px, 100%)" />
</div>

Here the red colour symbolises an inconsistency and the blue colour that the
determinacy is consistent modulo large cardinals. I'm not sure about what happens in
the white area. Again, the inconsistency lower bounds are quite naive - they might be a
lot lower.
