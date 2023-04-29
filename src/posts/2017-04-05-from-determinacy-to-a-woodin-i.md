---
title: From Determinacy to a Woodin I
meta: In my previous posts I provided a sketch of how a measurable above a limit of Woodins implies that AD holds in L(R). The "converse", saying that AD implies that there is a model with infinitely many Woodin cardinals, is a lot more complicated. I will try to simplify a lot of these complications here, to give an idea of what is going on. I will only focus on showing the existence of a single Woodin (for now), where the Woodin in question will be Theta^L(R) inside of HOD^L(R). As always, I will be very sketchy in this blog post, but provide more details in my note.
tags: set theory, determinacy
---

In my previous posts I provided a sketch of how a measurable above a limit of Woodins
implies that $\textsf{AD}$ holds in $L(\mathbb R)$. The "converse", saying that
$\textsf{AD}$ implies that there is a model with infinitely many Woodin cardinals, is a
lot more complicated. I will try to simplify a lot of these complications here, to give
an idea of what is going on. I will only focus on showing the existence of a single
Woodin (for now), where the Woodin in question will be $\Theta^{L(\mathbb R)}$ inside
of $\text{HOD}^{L(\mathbb R)}$. As always, I will be very sketchy in this blog post,
but provide more details in [my note](/src/assets/adtowoodins.pdf).

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
3. <router-link to="/posts/2017-02-08-determinacy-from-woodins-ii">Determinacy From
   Woodins II</router-link>
4. <router-link to="/posts/2017-02-22-determinacy-from-woodins-iii">Determinacy From
   Woodins III</router-link>
5. From Determinacy to a Woodin I
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

The theorem of interest is the following.

> **Theorem 1 (Woodin).** Assume $\textsf{ZF+DC+AD}$. Then
>
> $\text{HOD}^{L(\mathbb R)}\models\Theta^{L(\mathbb R)}$ is a Woodin cardinal.

The assumption of $\textsf{DC}$ is not really needed, but it makes the proof a bit more
smooth. The proof of this theorem is very related to the following theorem, due to
Solovay.

> **Theorem 2 (Solovay).** Assume $\textsf{ZF+AD}$. Then
>
> $L(\mathbb R)\models\omega\_1^V$ is measurable.

To define the given measure on $\omega\_1^V$ we first need to introduce some
terminology. For $x\in{^\omega\omega}$ define the binary relation

$$ E\_x:=\\{(m,n)\in\omega\times\omega\mid x(\langle m,n\rangle)=0\\}, $$

where $\langle\cdot,\cdot\rangle:\omega\times\omega\to\omega$ is a recursive bijection.
Then the key set is

$$ \text{WO}:=\\{x\in{^\omega\omega}\mid E\_x\text{ is a wellordering}\\}. $$

Also, setting $\alpha\_x$ to be the order-type of $E\_x$, set
$\text{WO}\_\alpha:=\\{x\in\text{WO}\mid\alpha\_x=\alpha\\}$ and define
$\text{WO}\_{<\alpha}$, $\text{WO}\_{\leq\alpha}$ and $\text{WO}\_{[\alpha,\beta]}$ and
so on in the obvious fashion. Then define the game $G(S)$ associated to a subset
$S\in P^{L(\mathbb R)}(\omega\_1^V)$ as

$$
\begin{array}{lllllllll}
\text{I} & x\_0 && x\_1 && x\_2 && \cdots\\\\
\text{II} && y\_0 && y\_1 && y\_2 && \cdots\end{array}
$$

with $x\_i,y\_i<\omega$ and the rules of the game requiring that
$(x)\_i,(y)\_i\in\text{WO}$ for every $i<\omega$ and
$\alpha_{(x)\_0}<\alpha_{(y)\_0}<\alpha_{(x)\_1}<\alpha_{(y)\_1}<\cdots$. Player I wins
iff $\text{sup}\_i\alpha_{(x)\_i}\in S$. We can then define our measure $\mu$ on
$\omega\_1^V$ as

$$ \mu(S)=1\text{ iff Player I wins }G(S). $$

Then $\mu$ is clearly non-principal, upwards closed and $\textsf{AD}$ ensures that it
has the ultra property. It thus only remains to show that it's normal. Assuming it's
not and letting $f:\omega\_1\to\omega\_1$ be a regressive function witnessing the failure
of normality, $\textsf{AD}$ implies that

$$ S_\alpha:=\\{\xi<\omega\_1\mid f(\xi)\neq\alpha\\}\in\mu $$

for every $\alpha<\omega\_1$. It then turns out that we can define

- An increasing sequence $\langle\eta\_i\mid i<\omega\rangle$ of countable ordinals;
- A sequence of sets of strategies $\langle X\_i\mid i<\omega\rangle$ where $X\_i$
  consists of winning strategies for player I in $G(S_\alpha)$ for all
  $\alpha\in[\eta_{i-1},\eta\_i)$ (where we set $\eta_{-1}:=0$ for convenience);
- A sequence $\langle y\_i\mid i<\omega\rangle$ of reals such that $y\_i$ is legal for
  player II against any $\sigma\in X\_i$ and
  $\text{sup}\_j\alpha_{(y\_i)\_j}=\text{sup}\_i\eta\_i$.

These $y\_i$'s will then witness that $f(\eta)\neq\alpha$ for any $\alpha<\eta$, by
definition of the games $G(S_\alpha)$ as well as the definition of the $S_\alpha$'s.
But this then contradicts that $f$ is regressive!

The actual construction of the above sequences requires some tools that relies on the
nature of the set $\text{WO}$. We won't supply the proofs of neither these tools nor
how they entail the existence of the above sequences - if you're interested you can
have a look at my note. The two tools that we need is a boundedness result and a coding
result.

> **Tool 1 ($\bf\Sigma^1_1$-boundedness; Luzin-Sierpinski).** Assume $\textsf{ZF+AD}$.
> Then whenever $X\subset\text{WO}$ is $\bf\Sigma^1\_1$ there is some
> $\alpha<\omega\_1$ such that $X\subset\text{WO}\_{<\alpha}$.

> **Tool 2 (Basic coding; Solovay).** Assume $\textsf{ZF+AD}$ and let
> $Z\subset\text{WO}\times{^\omega\omega}$. Then there is a $\bf\Sigma^1\_2$ subset
> $Z^\*\subset Z$ such that $Z^\*$ is a selector for $Z$, i.e. that for every
> $\alpha<\omega\_1$ it holds that

$$
Z^\*\cap(\text{WO}\_\alpha\times{^\omega\omega})\neq\emptyset\Leftrightarrow
Z\cap(\text{WO}\_\alpha\times{^\omega\omega})\neq\emptyset.
$$

Tool 2 is used to construct a specific choice of $X\_i$'s such that Tool 1 can be used
to construct the $y\_i$'s. This finishes the (very rough) sketch of Solovay's Theorem 2.
The same ideas can be used to show that $(\bf\delta^2\_1)^{L(\mathbb R)}$ is also
measurable in $L(\mathbb R)$. Here's the analogy:

$$
\begin{array}{c | c}
\hline {\bf\delta^1\_1} & {\bf\delta^2\_1} \\\\
\hline \text{WO} & U\\\\
{\bf\delta^1\_1}\text{-many }\alpha\_x's & {\bf\delta^2\_1}\text{-many }\delta\_x's\\\\
{\bf\Sigma^1\_1}\text{-boundedness} & {\bf\Delta^2\_1}\text{-boundedness}\\\\
{\bf\Sigma^1\_2}\text{-coding} & {\bf\Sigma^2\_1}\text{-coding}\\\\
\hline
\end{array}
$$

Here $U$ is a universal $\Sigma^2\_1$ set, and just as the $\alpha\_x$'s partitioned
$\text{WO}$ into $\bf\delta^1\_1$-many pieces, the $\delta\_x$'s are defined in such a
way that they also partition $U$ into $\bf\delta^2\_1$-many pieces. We get analogous
boundedness and coding tools which are due to Moschovakis, and by using these we can
simply copy the proof of Solovay's theorem to get the following.

> **Theorem 3 (Moschovakis).** Assume $\textsf{ZF+DC+AD}$. Then
>
> $L(\mathbb R)\models{\bf\delta^2\_1}$ is measurable.

The use of $\textsf{DC}$ can be avoided, but it is required if we simply want to reuse
Solovay's proof. When we want to not only show measurability, but show Woodinness, we
have to suddenly construct extenders rather than measures to get the desired strength.
These will use similar ideas, but a new reflection tool will be needed. More about that
next time!
