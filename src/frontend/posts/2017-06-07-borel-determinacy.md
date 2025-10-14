---
title: Borel Determinacy
meta: The proof of Borel determinacy doesn't seem to have the best reputation, as it's both rather long, quite technical and it's really easy to lose track of what's going on. I've noticed that the same proof can be presented in a more structural setting, making the core ideas of the proof be slightly clearer. I'll try here to present what's going on in the proof, using the structural framework of games I set up in my previous post.
tags: set theory, determinacy
---

The proof of Borel determinacy doesn't seem to have the best reputation, as it's both
rather long, quite technical and it's really easy to lose track of what's going on.
I've noticed that the same proof can be presented in a more structural setting, making
the core ideas of the proof be slightly clearer. I'll try here to present what's going
on in the proof, using the structural framework of games I set up in my previous post.
The full proof can be found in [my determinacy
project](/notes/determinacy-project.pdf).

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
8. Borel Determinacy
9. <router-link to="/posts/2017-06-21-hod-models-of-determinacy">HOD Models of
   Determinacy</router-link>
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
    ZFC Determinacy</router-link>
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

In my previous post I only considered games in which integers were played, but it's a
curious fact that the proof of Borel determinacy needs to consider all possible games
to work. Let's therefore write $G\_X(T,A)$ for the game in which the two players play
elements $x\in X$ for any set $X$, $T\subseteq X^{<\omega}$ is the pruned tree of legal
moves and $A\subseteq X^\omega$ is the payoff set. Our previous games $G(T,A)$ are
therefore simply $G_\omega(T,A)$. All right, so far so good. Let's recall what Borel
determinacy actually says.

> **Theorem (Martin).** Every Borel game $G\_X(T,A)$ is determined.

As most proofs of determinacy, the strategy is to come up with auxiliary simple games
which are determined, and somehow transfer this fact to the game in question - this is
where the coverings come into play. Martin defines that a covering $f:G\_Y(U)\to
G\_X(T)$ unravels a set $A\subset[T]$ if ${\tilde\pi\_f}^{-1}[A]$ is clopen in $[U]$. A
game $G\_X(T,A)$ is then said to be unraveled if there exists a covering $f:G\_Y(U)\to
G\_X(T)$ unraveling $A$. By playing around with the definition of covering and being
unraveled, we get the following fact, which is the reason why we care about unraveled
games.

> **Proposition.** Every unraveled game is determined.

The problem is thus reduced to showing that every Borel game is unraveled. This is done
inductively, starting with closed ($\bf\Pi^0\_1$) games and then inductively showing
that every $\bf\Pi^0_\xi$ game is unraveled, for every $\xi<\omega\_1$. The 'closed
case' is a direct argument, producing an explicit covering of an arbitrary closed game.
Here's a sketch of how it's constructed.

Given any game $G\_X(T)$ we will define an auxiliary game $G\_Y(U)$ with a covering
$f:G\_Y(U)\to G\_X(T)$ unraveling the closed set $A\subseteq[T]$. Since the game is
already closed we need to enforce an "open" condition, which is to say that we want to
modify $G\_X(T)$ so that if player I wins, he will already have won at a finite stage.
The way this is done is by making the two players at round $k<\omega$ play a set of
strategies, which they're then required to follow for the rest of the game.

This means that the game is really over at round $k$, in that if player I (resp player
II) wins, then this was already known in the $k$'th round. We can then produce the
first part of the covering $\pi\_f:U\to T$ as simply forgetting this extra
strategy-information. Constructing the second part is done by considering a series of
cases, which I'll omit here. This finishes the sketch of the following.

> **Proposition.** Every closed game is unraveled.

That finishes the "induction start". For the limit levels of the induction we need to
improve the above-mentioned result. Note that the auxiliary game didn't depend on which
$k<\omega$ we chose, so we really showed an ostensibly stronger property. We say that a
covering $f:G\_Y(U)\to G\_X(T)$ is a k-covering if $T$ and $U$ agree up to level $2k$,
and that $\pi\_f$ is the identity up to this level.

What the above proof then shows is that given any closed game $G\_X(T,A)$ and
$k<\omega$ we can find a $k$-covering that unravels $A$. The reason why we care about
this strengthening  is that the $k$-coverings allow us to ensure the existence of
certain inverse limits of games, which we will need in our induction.

> **Proposition (Existence of inverse limits).** Let $k<\omega$ and
> $f_{i+1}:G_{X_{i+1}}(T_{i+1})\to G_{X\_i}(T\_i)$ be a $(k+i)$-covering for every
> $i<\omega$. Then there's a game $G\_X(T)$ and $(k+i)$-coverings $F\_i:G\_X(T)\to
> G_{X\_i}(T\_i)$ for every $i<\omega$ such that $f_{i+1}\circ F_{i+1}=F\_i$, and
> $G\_X(T)$ is the universal such game.

The "universal" statement at the end means that if $G$ is another game with
$(k+i)$-coverings $H\_i:G\to G_{X\_i}(T\_i)$ such that $f_{i+1}\circ H_{i+1}=H\_i$ then
there's a unique covering $H:G\to G\_X(T)$ satisfying $F\_i\circ H=H\_i$ for every
$i<\omega$. In other words, $G\_X(T)$ is the "supremum" of the $G_{X\_i}(T\_i)$'s.

For the inductive argument fix some $\xi<\omega\_1$ and let's assume that we've shown
that $\bf\Pi^0_\eta$ games, and thus also $\bf\Sigma^0_\eta$ games, are $k$-unraveled
for all $k<\omega$ and $\eta<\xi$. Let $G\_X(T,A)$ be a $\bf\Sigma^0_\xi$ game, meaning
that $A$ is a countable union of $\Pi^0_\eta$ sets $A\_n$ for $\eta<\xi$.

By assumption we get a $k$-covering $f\_0:G_{X\_1}(T\_1)\to G_{X\_0}(T)$ unravelling
$A\_0$ where $X\_0:=X$, $A\_0:=A$ and $T_0:=T, and recursively

$$ f_i:G*{X*{i+1}}(T*{i+1})\to G*{X_i}(T_i) $$

is a $(k+i)$-covering unravelling
${\tilde\pi_{f_{i-1}}}^{-1}\circ\cdots\circ{\tilde\pi_{f\_1}}^{-1}[A\_i]$, which exists
as $\bf\Pi^0_\eta$ is closed under continuous preimages for $\eta<\xi$.

We can then take the inverse limit $G\_Y(U):=\varprojlim\_n G_{X\_n}(T\_n)$ with
$k$-coverings $F\_i:G\_Y(U)\to G_{X\_i}(T\_i)$. Now $F\_0:G\_Y(U)\to G\_X(T)$ is a
$k$-covering unravelling every $A\_i$, since

$$
{\tilde\pi_{F\_0}}^{-1}[A\_i] =
{\tilde\pi_{F\_i}}^{-1}\circ{\tilde\pi_{f_{i-1}}}^{-1}\circ
\cdots\circ{\tilde\pi_{f\_1}}^{-1}[A]
$$

and $\tilde\pi_{F\_i}$ is continuous. Then
${\tilde\pi_{F\_0}}^{-1}[A]=\bigcup\_n{\tilde\pi_{F\_0}}^{-1}[A\_n]$ is open, so we get
a $k$-covering $H:G\_Z(V)\to G\_Y(U)$ $k$-unravelling ${\tilde\pi_{F\_0}}^{-1}[A]$. But
now

$$ F_0\circ H:G_Z(V)\to G_X(T) $$

is a $k$-covering unravelling $A$ and we're done. **QED**

So given any $\bf\Pi^0_\eta$ game $G\_X(T,A)$ we find a linear system of coverings of
length $\eta\omega$ that collectively unravel $A$. The existence of this linear system
requires that we use the axiom of replacement $\eta$ many times, and this was shown by
[Friedman (1971)](https://doi.org/10.1142/9789812564894_0005) to be necessary as well.
