---
title: The Structure of Games
meta: Games in set theory are usually informally described by describing the rules of the two players and the winning condition. Sometimes we need to describe an interaction between games, which then becomes quite ad hoc, describing certain functions with properties that are desired in the specific proof in question. This is especially prominent in the proof of Borel determinacy, where unraveling coverings are used to transfer determinacy statements between games. I'll here attempt to describe this framework in a more abstract setting, viewing games as objects in their own right, which at the very least might make the proof of Borel determinacy clearer.
tags: set theory, determinacy
---

Games in set theory are usually informally described by describing the rules of the two
players and the winning condition. Sometimes we need to describe an interaction between
games, which then becomes quite ad hoc, describing certain functions with properties
that are desired in the specific proof in question. This is especially prominent in the
proof of Borel determinacy, where unraveling coverings are used to transfer determinacy
statements between games. I'll here attempt to describe this framework in a more
abstract setting, viewing games as objects in their own right, which at the very least
might make the proof of Borel determinacy clearer.

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
7. The Structure of Games
8. <router-link to="/posts/2017-06-07-borel-determinacy">Borel
   Determinacy</router-link>
9. <router-link to="/posts/2017-06-21-hod-models-of-determinacy">HOD Models of
   Determinacy</router-link>
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
    ZFC Determinacy</router-link>
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

We first have to agree on what a game really is. As we're working with games from a
set-theoretical point of view we focus on 2-player games with perfect information, in
which the two players are playing finite ordinals. We also require that one of the two
players wins - we don't allow draws. Such a game are usually described as

$$
\begin{array} {ccccccccc}
    \text{I} & x_0 && x_1 && x_2 && \cdots\\\\
    \text{II} && y_0 && y_1 && y_2 && \cdots
\end{array}
$$

Here player I and II are taking turns playing finite ordinals $x\_i<\omega$ and
$y\_i<\omega$, respectively. Usually we enforce some rules as well. If we for instance
view the finite ordinals as coding chess moves, we would want to make sure that e.g.
pawns can only move forwards. Of course for this example to be valid we need to remove
the possibility of a draw in the chess game, so say for instance that White (player I)
wins if we're in a "draw scenario".

To model the rules in set theory, we first take a step back and look at the plays of
the game, which we can define as countable sequences of finite ordinals $\langle
x\_0,y\_0,x\_1,y\_1,\dots\rangle$, which is also just an element of the Baire space
$\omega^\omega$. Now, if we want to enforce a rule, this simply corresponds to making
certain plays illegal, so we're restricting the possible plays to a subset
$X\subset\omega^\omega$. This is all well and good when we're done with playing, but
we'd like to say straight away if a rule is broken. Because of this we're interested in
the derived tree of $X$, which is the tree of all partial plays:

$$ T_X:=\\{s\in\omega^{<\omega}\mid\exists x\in X: x\upharpoonright|s|=s\\}. $$

We can always recover $X$ from $T\_X$ by looking at the set of infinite branches of the
tree:

$$
X=[T\_X]:=\\{x\in\omega^\omega\mid\forall n<\omega: x\upharpoonright n\in T\_X\\}.
$$

This back-and-forth procedure works with all pruned trees, which are trees satisfying
that every partial play can be extended -- i.e. that whenever we're at a certain stage
of the game, there is some legal move that the current player can play. In other words,
we can now tentatively think of a game as simply a pruned tree
$T\subset\omega^{<\omega}$.

We need to say more than just the legal moves of a game - we need to say what it takes
to win the game as well. This can simply be encoded as a subset $A$ of the set of all
the legal plays, i.e. $A\subseteq [T]$. The pair $(T,A)$ thus encodes both the rules
and the winning conditions of a given game, so we can model the game as this pair. To
help intuition we will write $G(T,A)$ for the game described by $T$ and $A$. Also, if
we're not particularly interested in the winning condition at a given time we'll simply
write $G(T)$ for the game.

Now, if we want an interaction between games we need to have a notion of a mapping
between games. This is where I'll resort to what Martin calls coverings of games, which
is what he used to prove Borel determinacy. Here's the definition.

> **Definition.** A covering $f:G(T)\to G(U)$ is a pair $(\pi\_f,\varphi\_f)$ such that

1. $\pi\_f:T\to U$ is monotone and length-preserving, giving rise to a continuous
   extension $\tilde\pi\_f:[T]\to[U]$ given by $\tilde\pi\_f(x)\upharpoonright
   n:=\pi\_f(x\upharpoonright n)$;
2. $\varphi\_f$ maps partial strategies $\sigma\upharpoonright n$ in $G(T)$ to partial
   strategies $\varphi\_f(\sigma\upharpoonright n)$ in $G(U)$ satisfying that if $m\leq
   n$ then $\varphi\_f(\sigma\upharpoonright m)=\varphi\_f(\sigma\upharpoonright
   n)\upharpoonright m$, which gives rise to an extension $\tilde\varphi\_f$ taking
   strategies to strategies given by $\tilde\varphi\_f(\sigma)\upharpoonright
   n:=\varphi\_f(\sigma\upharpoonright n)$;
3. If $y\in [U]$ is played according to a strategy $\tilde\varphi\_f(\sigma)$ then
   there's a $x\in [T]$ played according to $\sigma$ such that $\tilde\pi\_f(x)=y$.

It's a bit of a mouthful, but it basically says that it takes plays and strategies7
from one game to the other, while preserving the relationship between plays and
strategies. Here a strategy is "the intuitive notion", which can be modelled in set
theory as a function taking a partial play $t\in T$ and giving you a finite ordinal to
play next. As the two players are alternating, a strategy for player I takes
even-length partial plays as input and a strategy for player II takes odd-length
partial plays.

Summing up we now have a rigourous notion of what a game is and what a map between
games is. As one could expect, this gives us a category of games. For instance, we can
simply compose two coverings $f:G(T)\to G(U)$ and $g:G(U)\to G(S)$ by composing the two
component maps: $\pi_{g\circ f}:=\pi\_g\circ\pi\_f$ and $\varphi_{g\circ
f}:=\varphi\_g\circ\varphi\_f$.

Using this framework we can now describe what goes on in Martin's proof of Borel
determinacy. But this is already a rather big mouthful to take in, so that will have
wait until next time.
