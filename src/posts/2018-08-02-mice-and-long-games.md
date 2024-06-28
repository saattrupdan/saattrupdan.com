---
title: Mice and Long Games
meta: When dealing with games in general, we can vary different parameters. We could vary (1) how big the payoff set is, (2) which objects we're playing and (3) for how many rounds we're playing. When we restrict ourselves to definable games then we can't have determinacy of games on integers of length omega_1+omega. Restricting ourselves to definable games of countable length on the integers, what large cardinal strength do we obtain?
tags: set theory, determinacy
---

When dealing with games in general, we can vary different parameters. We could vary (1)
how big the payoff set is, (2) which objects we're playing and (3) for how many rounds
we're playing. In a ZFC context, which is what I'll be working with here as well, I've
previously written about what limitations we're facing. In particular, when we restrict
ourselves to definable games then we can't have determinacy of games on integers of
length $\omega\_1+\omega$. Restricting ourselves to definable games of countable
length on the integers, what large cardinal strength do we obtain?

![A game of mice](/src/assets/img/mice-game.webp)

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
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
    ZFC Determinacy</router-link>
11. Mice and Long Games

Before we move on to the long games, let's note what happens at games of length $latex
\omega$. As with most things involving determinacy, Woodin cardinals enter the mix: for
a real $x$ we let $M\_n^\sharp(x)$ be the minimal iterable $x$-mouse
with $n$ Woodin cardinals. We then have the following celebrated theorem by
Woodin and Neeman --- this is published in Müller's thesis. For simplicity let's write
$\text{Det}\_\alpha(\Gamma)$ for the statement that every $\Gamma$-game of
length $\alpha$ is determined.

> **Theorem (Woodin, Neeman).** $\text{Det}\_\omega(\bf\Pi^1_{n+1})$ is equivalent to
> the existence of $M\_n^\sharp(x)$ for all reals $x$.

Now, there's a connection between determinacy of all $\bf\Pi^1_{n+1}$-sets and
determinacy of long games. If we assume $\text{Det}\_{\omega\cdot n}(\bf\Pi^1\_1)$ then
we also get $\text{Det}\_\omega(\bf\Pi^1\_n)$! This is because if we start out with a
$\bf\Pi^1\_n$-set A then it's defined using $n$ quantifiers ranging over reals
(=$\omega$-sequences of integers), so if we define a game of length $\omega\cdot n$ in
which the two players alternate in playing every $\omega$-block, one of the players is
essentially playing existential quantifiers over the reals and the other one universal
quantifiers. Defining the rules of this game so that the reals played by the two
players define A, determinacy of this long game yields determinacy of the shorter one!

It turns out that we even get the other implication as well, that
$\text{Det}\_\omega(\bf\Pi^1\_n)$ implies $\text{Det}\_{\omega\cdot n}(\bf\Pi^1\_1)$. This
is a deep theorem known as the determinacy transfer theorem; see Müller's thesis.
Together with the above theorem we then get the following corollary.

> **Corollary.** $\text{Det}\_{\omega\cdot(n+1)}(\bf\Pi^1\_1)$ is equivalent to the
> existence of $M\_n^\sharp(x)$ for all reals $x$.

A natural question is then if this stays true when we go from finite $n$ to arbitrary
countable ordinals $\alpha$. Neeman ('04) has shown one direction:

> **Theorem (Neeman).** Let $\alpha>1$ be a countable ordinal and assume
> $M^\sharp_\alpha(x)$ exists for all $x\in\mathbb R$. Then
> $\text{Det}\_{\omega\cdot\alpha}(\bf\Pi^1\_1)$ holds.

As for the other direction, Woodin has shown that if $\alpha=\omega$ or
$\alpha=\omega^{\beta+1}$ for some infinite $\beta$ then the converse holds (see
Trang's thesis), but the general case is still open. Very recently, Aguilera and Müller
has shown the following, which comes close to an equivalence for $\alpha=\omega+n$.

> **Theorem (Aguilera-Müller).** Let $n<\omega$ and assume that
> $\text{Det}\_{\omega\cdot(\omega+n)}$ holds. Then there exists a premouse with
> $\omega+n$ Woodin cardinals.

That's as far as the story on countable length games goes, for now. On a final note, I
mentioned in the beginning of this post that we can't get definable determinacy of
length $\omega\_1+\omega$ games, but what about $\omega\_1$? Here Neeman ('07) comes to
the rescue once again:

> **Theorem (Neeman).** Assume that there exists an iterable mouse in which the
> critical point of the top extender is a Woodin cardinal. Then every open
> $\bf\Pi^1\_1$-game of length $\omega\_1$ is determined.

Here "open" means that if player I wins the game then he wins at a countable stage.
This allows us to encode payoff sets as sets of reals, which is why the $\bf\Pi^1\_1$
part makes sense. As Neeman also mentions in the above paper however, the assumption is
not known to be consistent. If a certain iterability assumption is true (that rank
initial segments of $V$ are countably iterable) then the existence of such a mouse is
consistent, relative to the existence of a measurable Woodin cardinal.
