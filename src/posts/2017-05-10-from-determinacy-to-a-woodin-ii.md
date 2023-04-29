---
title: From Determinacy to a Woodin II
meta: In the prequel I sketched a proof of how determinacy hypotheses could imply the measurability of both delta^1_1 and delta^2_1 inside L(R). The latter is really the first step in showing the¬†much stronger assertion that Theta^L(R) is Woodin. I'll here sketch what main ideas are involved in the proof of this fact.
tags: set theory, determinacy
---

In the prequel I sketched a proof of how determinacy hypotheses could imply the
measurability of both $(\bf\delta^1\_1)^{L(\mathbb R)}$ and
$(\bf\delta^2\_1)^{L(\mathbb R)}$ inside $L(\mathbb R)$. The latter is really the first
step in showing the much stronger assertion that $\Theta^{L(\mathbb R)}$ is Woodin.
I'll here sketch what main ideas are involved in the proof of this fact.

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
6. From Determinacy to a Woodin II
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

The main theorem in question is thus the following, due to Woodin.

> **Theorem (Woodin).** Assume ZF+DC+AD. Then
>
> $$
> \text{HOD}^{L(\mathbb R)}\models\Theta^{L(\mathbb R)}\text{ is a Woodin cardinal}.
> $$

I should note that the theorem still holds without the use of DC, by using an
alternative characterisation of Woodin cardinals - but I'll stick the following one.

> **Definition.** A cardinal $\delta$ is Woodin if for every $A\subseteq\delta$ there
> exists a cardinal $\kappa<\delta$ which is A-reflecting, which is to say that given
> any $\lambda\in(\kappa,\delta)$ we can find an elementary embedding $j:V\to M$ with
> critical point $\kappa$ and satisfying $j(\kappa)>\lambda$, $V_\lambda\subseteq M$
> and $A\cap V_\lambda=j(A)\cap V_\lambda$.

To show that $\Theta:=\Theta^{L(\mathbb R)}$ is Woodin in HOD we can first of all focus
on the case where $A=\emptyset$, meaning that we need to find an $\emptyset$-reflecting
$\kappa<\Theta$ -- this will be the case we focus on here in this post, as the case for
arbitrary $A$ turns out to be a relativisation of this case. This $\kappa$ will turn
out to be precisely $\bf\delta^2\_1:=(\bf\delta^2\_1)^{L(\mathbb R)}$, so to every
$\lambda<\Theta$ we need to find an elementary embedding $j:V\to M$ with critical point
$\bf\delta^2\_1$, $j(\bf\delta^2\_1)>\lambda$ and $V_\lambda\subseteq M$.

The main new gadget that we're going to use is a reflection phenomenon at
$\bf\delta^2\_1$: there exists a function $F:{\bf\delta^2\_1}\to
L_{\bf\delta^2\_1}(\mathbb R)$ such that

Given any $X\in L(\mathbb R)\cap\text{OD}^{L(\mathbb R)}$, $z\in{^\omega\omega}$ and
$\Sigma\_1$ formula $\varphi$, if

$$ L(\mathbb R)\models\varphi[z,X,{\bf\delta^2\_1},\mathbb R] $$

then there's a $\delta<\bf\delta^2\_1$ such that

$$ L(\mathbb R)\models\varphi[z,F(\delta),\delta,\mathbb R]. $$

This $F$ is constructed analogously to $\diamondsuit$-sequences in $L$, i.e. defining
it by least counterexample. To any $X$ as above we pick a universal
$\Sigma\_1^{L(\mathbb R)}(\\{X,{\bf\delta^2\_1},\mathbb R\\})$ set $U\_X$ and for each
$\delta<\bf\delta^2\_1$ let $U_\delta$ be a universal $\Sigma\_1^{L(\mathbb
R)}(\\{F(\delta),\delta,\mathbb R\\})$ set, obtained by using the same definition as
$U\_X$. We now claim that to each $\Sigma\_1$-formula $\varphi$ and real
$y\in{^\omega\omega}$ we can construct a real $z_{\varphi,y}$ such that

$$
z_{\varphi,y}\in U\_X\text{  iff  }L(\mathbb
R)\models\varphi[y,X,{\bf\delta^2\_1},\mathbb R].
$$

To define the $z_{\varphi,y}$ note that the right-hand side above is a
$\Sigma\_1^{L(\mathbb R)}({X,{\bf\delta^2\_1},\mathbb R})$ formula, meaning that the
set of $y$'s satisfying it is in $(U\_X)\_x$ for some $x\in{^\omega\omega}$, so that we
can define $z_{\varphi,y}:=\langle x,y\rangle$. We can then reformulate the above
reflection phenomenon as $U\_X\subseteq\bigcup_{\delta<{\bf\delta^2\_1}}U_\delta$.

Now to actually define our measure on $\bf\delta^2\_1$. Let $\lambda<\Theta$ be
arbitrary and fix an OD pre-wellordering $\leq_\lambda$ of the reals of order-type
$\lambda$. Then our desired $X$ is going to be $X:=(\leq_\lambda,\lambda)$. To each
$S\subseteq\bf\delta^2\_1$ we can now define the game $G^X(S)$ as

Here the only rule is that $(x)\_i,(y)\_i\in U\_X$ for every $i<\omega$. In this case
that very rule can be seen as a $\Sigma\_1^{L(\mathbb R)}(\\{X,{\bf\delta^2\_1},\mathbb
R\\})$ statement, so the reflection phenomenon applies and there is some
$\delta<\bf\delta^2\_1$ such that $(x)\_i,(y)\_i\in U_\delta$ for every $i<\omega$.
Then player I wins iff $\delta\in S$. Analogously to the previous measures we then set

$$ \mu\_X:=\\{S\subseteq{\bf\delta^2\_1}\mid\text{Player I wins }G^X(S)\\}. $$

Now, what's special about this measure as opposed to the measure we found in my
previous post? The key set is $S\_0$, consisting of all $\delta<\bf\delta^2\_1$ such
that $F(\delta)=(\leq_\delta,\lambda_\delta)$, where $\leq_\delta$ is a
pre-wellordering of the reals of order-type $\lambda_\delta$ and that
$L_{\lambda_\delta}(\mathbb R)$ satisfies a sufficient chunk of ZFC.

Let $Q_\alpha^\delta$ ($Q_\alpha$) be the $\alpha$'th component of $\leq_\delta$
($\leq_\lambda$). Furthermore, for every $\delta\in S\_0$ and $t\in{^\omega\omega}$ let
$\alpha\_t^\delta$ be the unique $\alpha$ such that $t\in Q_\alpha^\delta$ and define
the functions $f\_t:S\_0\to\bf\delta^2\_1$ as $f\_t(\delta):=\alpha\_t^\delta$. A major
theorem is that $[f\_t]\_{\mu\_X}$ collapses to the $\leq_\lambda$-rank of $t$ in the
ultrapower. This means straight away that $\lambda < j\_X({\bf\delta^2\_1})$ as
$f\_t(\delta)<\bf\delta^2\_1$ for every $t$ and $\delta$.

The $\lambda$-strongness of $j$ is shown by describing any subset $A\subseteq\lambda$
with $A\in\text{HOD}^{L(\mathbb R)}$ in terms of the $Q_\alpha$'s using a new coding
lemma, so that we get a "reflected version" $A^\delta$ of $A$, which we can use to
describe $A$ in the ultrapower. See (some) details in [my
note](/src/assets/adtowoodins.pdf).
