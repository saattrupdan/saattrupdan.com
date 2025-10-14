---
title: Incomplete Approaches to the Incompleteness Theorems
meta: The incompleteness theorems appear mysterious to many people, from sheer confusion of the statements themselves, to wrongfully applying the theorems to scenarios way out proportion, such as (dis)proving the existence of god. It doesn't help that when actually learning about the theorems in a logic course, most details are usually admitted. What I'll try to do in this post is still not to give a complete account of the proofs, but try to explain how it all fits together. Fill in the gaps that I've at least encountered during my studies, which can then hopefully help others stitch together whichever parts they might have learned throughout their studies.
tags: set theory
---

![Ben Helne: The Liars](/src/frontend/assets/img/the-liars.webp)

The incompleteness theorems appear mysterious to many people, from sheer confusion of
the statements themselves, to wrongfully applying the theorems to scenarios way out
proportion, such as (dis)proving the existence of god. It doesn't help that when
actually learning about the theorems in a logic course, most details are usually
admitted. This is probably not the case at all universities, of course, but I have now
personally experienced two different approaches to Gödel's theorems:

1. Spend most of the time on the recursion theory prerequisites to the theorems,
   without actually covering the theorems themselves, save for the statements;
2. Skip the recursion theory and only give an informal argument of the incompleteness
   theorems without really showing why we should care about recursiveness.

The reason for not giving a full account of the theorems is of course the perennial
enemy of lecturers: time. What I'll try to do in this post is still not to give a
complete account of the proofs, but try to explain how it all fits together. Fill in
the gaps that I've at least encountered during my studies, which can then hopefully
help others stitch together whichever parts they might have learned throughout their
studies. Here we go.

I'm going to focus on the first incompleteness theorem, since the second one is really
a corollary to the first one. Let's start with the statement itself.

> **First Incompleteness Theorem (Gödel '31).** Let $L\supseteq L_{\mathbb N}$ be a
> language. Then any consistent recursive set of $L$-sentences $\Gamma$ such that
> $\Gamma\vdash A\_E$, is incomplete.

Let's start off by examining the statement. We have to figure out what $L_{\mathbb N}$
is, what we mean by recursive and what $A\_E$ is. Firstly, $L_{\mathbb
N}:=\\{0,S,+,\cdot,E,<\\}$ is simply the language of arithmetic, where $S$ is the
symbol for the successor function, and $E$ is the symbol for exponentiation. So far so
good.

To define recursiveness we first define recursive functions. Before we do that,
the intuitive idea behind any recursive set is that we (in principle) can sit down and
write a computer program, which takes an object $x$ as input and after a finite amount
of time will answer whether $x$ is in our set or not. Now, the simplest way to define
what recursive functions are is probably that it's the smallest set of functions
$f:\mathbb N^m\to\mathbb N$ containing the functions:

- Successor $S:\mathbb N\to\mathbb N$;
- Addition $+:\mathbb N^2\to\mathbb N$;
- Multiplication $\cdot:\mathbb N^2\to\mathbb N$;
- Exponentiation $E:\mathbb N^2\to\mathbb N$;
- The characteristic functions $\chi_=:\mathbb N^2\to\mathbb N$ and $\chi_<:\mathbb
  N^2\to\mathbb N$ of equality = and less-than <;
- Constant functions $c\_m:\mathbb N\to\mathbb N$ for all $m\in\mathbb N$;
- Projections $I^m\_i:\mathbb N^m\to\mathbb N$, given as
  $I^m\_i(n\_1,\dots,n\_m):=n\_i$;

and furthermore closed under composition and minimalisation, where the latter means
that if $f:\mathbb N^{m+1}\to\mathbb N$ is recursive such that whenever $\vec
n\in\mathbb N^m$ there exists $k\in\mathbb N$ satisfying $f(\vec n,k)=0$, then the
function $\mu[f]:\mathbb N^m\to\mathbb N$ given as

$$ \mu\[f](\vec n) := \min\\{k\in\mathbb N\mid f(\vec n,k=0\\} $$

is recursive as well. We can also talk about recursive relations $R\subseteq\mathbb
N^m$, which is simply when the characteristic function of the relation is recursive.

But we're not really talking about sets of natural numbers in the statement of the
theorem; we're talking about sets of $L$-sentences. To fix this, we encode all symbols
in our language $L$, and all sentences of these symbols as numbers. This can be done in
many different ways, and any such encoding is called a [Gödel
encoding](https://en.wikipedia.org/wiki/G%C3%B6del_numbering). Writing
$\sharp\Gamma\subseteq\mathbb N$ for the encoded version of $\Gamma$, we then say
$\Gamma$ is recursive if $\sharp\Gamma$ is.

Now, why do we care about recursiveness in the incompleteness context? I'll get to
that, hang on. First, let's clarify what $A\_E$ is. It's the following (weak) system of
axioms in the language of arithmetic, from Enderton's book:

- (S1) $\forall x Sx\neq 0$;
- (S2) $\forall x\forall y(Sx=Sy\to x=y)$;
- (L1) $\forall x\forall y(x < Sy\leftrightarrow(x < y\lor x=y)$;
- (L2) $\forall x x\not <0$;
- (L3) $\forall x\forall y(x < y\lor x=y\lor y < x)$;
- (A1) $\forall x x+0=x$;
- (A2) $\forall x\forall y x+Sy=S(x+y)$;
- (M1) $\forall x x\cdot 0=0$;
- (M2) $\forall x\forall y x\cdot Sy=(x\cdot y)+x$;
- (E1) $\forall x E(x,0)=S0$;
- (E2) $\forall x\forall y E(x,Sy)=E(x,y)\cdot x$.

It's a fair amount of axioms, but they should all be "intuitively true" when thinking
about the standard interpretation of the symbols in $L_{\mathbb N}$. The specific
choice of system is *not important*: all we need is a reasonably strong system which
is finite.

Okay, so now we at least know what we're working with. The next (tedious) part, which
is the one I'll skip here, is proving that basically everything in our formula-toolbox
is recursive: the set of terms, set of formulas, set of variables, substitution and
provability. This last one gives us a recursive relation
$\text{Proof}\_\Gamma\subseteq\mathbb N^2$, where $\text{Proof}\_\Gamma(x,y)$ expresses
the fact that $x$ encodes a proof from $\Gamma$ of an $L$-formula $\varphi$, and $y$
encodes $\varphi$.

Having happily skipped that part, the next part is explaining why we care about
recursiveness. For a relation $R\subseteq\mathbb N^m$ we say that an $L_{\mathbb
N}$-formula $\varphi(v\_1,\dots,v\_m)$ **represents** $R$ in $A\_E$ if, letting
$v\_1,\dots,v\_m$ be the free variables of $\varphi$ and letting
$n\_1,\dots,n\_m\in\mathbb N$,

- If $R(n\_1,\dots,n\_m)$ holds then $A\_E\vdash\varphi(\bar n\_1/v\_1,\dots,\bar
  n\_m/v\_m)$, and
- If $R(n\_1,\dots,n\_m)$ fails then $A\_E\vdash\lnot\varphi(\bar
  n\_1/v\_1,\dots,\bar n\_m/v\_m)$.

Here $\bar n$ is the $L_{\mathbb N}$-term $SS\cdots S0$ with $n$ many $S$'s. That
$\varphi$ represents $R$ can be seen as a syntactic strengthening of $R$ being
definable over the standard model of arithmetic. Indeed, if $A\_E$ was replaced by the
theory of that model, then representability would coincide with definability. Now,
here's the reason why we care about recursiveness.

> **Lemma (aka why recursiveness is useful).** Every relation $R\subseteq\mathbb N^m$
> is recursive iff it's representable in $A\_E$.

Now we can move on to the (in my mind) fun bits of the argument.

There are (at least) two proofs of the first incompleteness theorem floating about.
There's Gödel's original method, consisting of constructing an explicit sentence $G$
which witnesses the incompleteness of $\Gamma$, i.e. that $\Gamma\not\vdash G$ and
$\Gamma\not\vdash\lnot G$, and the abstract method which only shows that such a
sentence exists. The abstract method, which doesn't construct an explicit witness to
the incompleteness, does a detour through Tarski's Undefinability Theorem and is quite
slick, but I'll stick with Gödel's constructive approach here instead, to emphasise
that we're really just formalising the [liar
paradox](https://en.wikipedia.org/wiki/Liar_paradox).

The crucial lemma is then the following, from which the incompleteness theorem is a
simple corollary. The lemma essentially says that we can construct self-referential
sentences in our weak system $A\_E$.

> **Fixed-point lemma.** Let $\varphi(x)$ be an $L_{\mathbb N}$-formula. Then there
> exists an $L_{\mathbb N}$-sentence $\sigma$ such that
>
> $$ A_E\vdash\varphi(\overline{\sharp\sigma}\phantom{x}/x)\leftrightarrow\sigma. $$

**Proof**. Let $y\neq x$ be a variable and define a function $F:\mathbb N\to\mathbb N$
as $F(m):=\sharp(\psi(\overline{\sharp\psi}\phantom{x}/y))$ whenever $m=\sharp\psi$ for
an $L_{\mathbb N}$-formula $\psi(y)$, and $F(m):=0$ otherwise.

By the above-mentioned results, this function is recursive and hence also representable
in $A\_E$, meaning that we get an $L_{\mathbb N}$-formula $\theta(w,z)$ such that for
any $L_{\mathbb N}$-formula $\psi(y)$ we get that

$$
A\_E\vdash\forall z(\theta(\overline{\sharp\psi}\phantom{x}/w)\leftrightarrow
z=\overline{\sharp(\psi(\overline{\sharp\psi}\phantom{x}/y))}\phantom{x}),
$$

just by definition of representability (where we identify $F$ with its graph). We may
assume that $w=y$ and $z=x$, so that we wind up with

$$
A\_E\vdash\forall x(\theta(\overline{\sharp\psi}\phantom{x}/y)\leftrightarrow
x=\overline{\sharp(\psi(\overline{\sharp\psi}\phantom{x}/y))}\phantom{x})\qquad (1)
$$

for every $\psi(y)$. Define now $\chi:\equiv\forall x(\theta\to\varphi)$ and note that
$\chi$ only has $y$ free. Our desired formula is then

$$
\sigma:\equiv\chi(\overline{\sharp\chi}\phantom{x}/y)\quad (\equiv\forall
x(\theta(\overline{\sharp\chi}\phantom{x}/y)\to\varphi)\qquad (2).
$$

Note here that $\sigma$ says "if $x$ is the Gödel number of the sentence '$\chi$ is
true of itself' then $\varphi$ is true of $x$". But since $\sigma$ also says that
"$\chi$ is true of itself", what $\sigma$ is really saying is that $\varphi$ holds of
$\sharp\sigma$! Now, putting together (1) and (2) we get that

$$
A\_E\vdash\forall x(\theta(\overline{\sharp\chi}\phantom{x}/y)\leftrightarrow
x=\overline{\sharp\sigma}\phantom{x})\qquad (3).
$$

It remains to show that $\sigma$ actually works, which is shown in the following
technical claim.

> **Claim.** > $A\_E\vdash\varphi(\overline{\sharp\sigma}\phantom{x}/x)\leftrightarrow\sigma$.

**Proof** of claim. $(\leftarrow)$:

- $A\_E,\sigma\vdash\theta(\overline{\sharp\chi}\phantom{x}/y)(\overline{\sharp\sigma}\phantom{x}/x)\to\varphi(\overline{\sharp\sigma}\phantom{x}/x)\qquad
  (\forall{-}E)+(2)$
- $A\_E\vdash\theta(\overline{\sharp\chi}\phantom{x}/y)(\overline{\sharp\sigma}\phantom{x}/x)\qquad
  (3)$
- $A\_E,\sigma\vdash\varphi(\overline{\sharp\sigma}\phantom{x}/x)\qquad (MP)$
- $A\_E\vdash\sigma\to\varphi(\overline{\sharp\sigma}\phantom{x}/x)\qquad (Ded)$.

$(\rightarrow)$:

- $A\_E\vdash\theta(\overline{\sharp\chi}\phantom{x}/y)\to
  x=\overline{\sharp\sigma}\phantom{x}\qquad (3)$
- $A\_E,\theta(\overline{\sharp\chi}\phantom{x}/y)\vdash
  x=\overline{\sharp\sigma}\phantom{x}\qquad (Ded)$
- $\vdash
  x=\overline{\sharp\sigma}\phantom{x}\to(\varphi(\overline{\sharp\sigma}\phantom{x}/x)\to\varphi(x/x))\qquad
  (Axiom)$
- $A,\theta(\overline{\sharp\chi}\phantom{x}/y)\vdash\varphi(\overline{\sharp\sigma}\phantom{x}/x)\to\varphi\qquad
  (MP)$
- $A\_E,\theta(\overline{\sharp\chi}\phantom{x}/y),\varphi(\overline{\sharp\sigma}\phantom{x}/x)\vdash\varphi\qquad
  (Ded)$
- $A,\varphi(\overline{\sharp\sigma}\phantom{x}/x)\vdash\theta(\overline{\sharp\chi}\phantom{x}/y)\to\varphi\qquad
  (Ded)$
- $A\_E,\varphi(\overline{\sharp\sigma}\phantom{x}/x)\vdash\forall
  x(\theta(\overline{\sharp\chi}\phantom{x}/y)\to\varphi)\qquad (Gen)$
- $A\_E\vdash \varphi(\overline{\sharp\sigma}\phantom{x}/x)\to\sigma\qquad (Ded)$

This finishes the proof of the fixed-point lemma. **QED**

Using the lemma, we can now prove the (first) incompleteness theorem.

**Proof of the first incompleteness theorem.** Recall that we have a recursive
relation $\text{Proof}\_\Gamma\subseteq\mathbb N^2$, where
$\text{Proof}\_\Gamma(x,y)$ expresses the fact that $x$ encodes a proof from
$\Gamma$ of an $L$-formula $\varphi$, and $y$ encodes $\varphi$. This is then also
representable in $A\_E$, so we get an $L_{\mathbb N}$-formula $\varphi(x,y)$
representing it in $A\_E$. Define then

$$ \textsf{Prv}\_\Gamma(x):\equiv\exists z\varphi(z,x), $$

intuitively meaning "$x$ is provable". More precisely, $\Gamma\vdash\psi$ implies that
$A\_E\vdash\textsf{Prv}\_\Gamma(\overline{\sharp\psi}\phantom{x})$, by definition of
representability. The fixed-point lemma grants us an $L_{\mathbb N}$-sentence
$G_\Gamma$ such that

$$
A\_E\vdash\lnot\textsf{Prv}\_\Gamma(\overline{\sharp
G_\Gamma}\phantom{x})\leftrightarrow G_\Gamma\qquad (1),
$$

i.e. $G_\Gamma$ says that "I am not provable from $\Gamma$". Now, if $\Gamma\vdash
G_\Gamma$ then $A\_E\vdash\textsf{Prv}\_\Gamma(\overline{\sharp G_\Gamma}\phantom{x})$
by the above, but we also get that $\Gamma\cup
A\_E\vdash\lnot\textsf{Prv}\_\Gamma(\overline{\sharp G_\Gamma}\phantom{x})$ by (1),
contradicting the consistency of $\Gamma\cup A\_E$.

Next, assuming $\Gamma\vdash\lnot G_\Gamma$ we get that $\Gamma\cup
A\_E\vdash\textsf{Prv}\_\Gamma(\overline{\sharp G_\Gamma}\phantom{x})$ by (1). Using
the consistency of $\Gamma\cup A\_E$ we get an $L_{\mathbb N}$-model $M\vDash\Gamma\cup
A\_E$. By definition of $\textsf{Prv}\_\Gamma$ it holds that
$M\models\varphi(\bar{n},\overline{\sharp G_\Gamma}\phantom{x})$ for some $n\in\mathbb
N$. The soundness theorem then implies that
$A\_E\not\vdash\lnot\varphi(\bar{n},\overline{\sharp G_\Gamma}\phantom{x})$ and
representability then yields that $n=\sharp D$ for some deduction $D$ of $G_\Gamma$
from $\Gamma$. This means that $\Gamma\vdash G_\Gamma$, contradicting the consistency
of $\Gamma$ again. **QED**

Aaaand that finishes this (quite long) post. Hope this is useful to some of you!
