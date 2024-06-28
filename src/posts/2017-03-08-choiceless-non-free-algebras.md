---
title: Choiceless Non-Free Algebras
meta: This post is a bit different, as it's somewhat more of a curiosity I recently noticed. It's a theorem of $\textsf{ZFC}$ that every type of of algebraic structure has a free¬†algebra, similar to the notion of a free group, free module and so on. How about without choice?
tags: set theory, axiom of choice
---

This post is a bit different, as it's somewhat more of a curiosity I recently noticed.
It's a theorem of $\textsf{ZFC}$ that every type of of algebraic structure has a
free algebra, similar to the notion of a free group, free module and so on. How about
without choice? It turns out that the theory

$$
\textsf{ZF}+\textsf{F}:\equiv\textsf{ZF}+ "\text{There is an algebraic type which does
not admit free algebras}"
$$

has considerable consistency strength. It consistency-wise implies
$\textsf{AD}^{L(\mathbb R)}$ and is consistency-wise implied by a proper class of
strongly compacts.

This post is part of my series on choiceless set theory:

1. Choiceless Non-Free Algebras
2. <router-link to="/posts/2017-03-22-hahn-banach-sans-zorn">Hahn-Banach Sans
   Zorn</router-link>
3. <router-link to="/posts/2018-01-31-choice-principles">Choice
   Principles</router-link>
4. <router-link to="/posts/2018-12-10-closure-distributivity-and-choice">Closure,
   Distributivity and Choice</router-link>

Let me first define exactly what we mean by an algebraic type and what it means for
such a type to admit free algebras. By an algebraic type I mean a pair $(L,T)$, where
$L$ is a language without any relation symbols and $T$ an $L$-theory. Here we allow the
function symbols in $L$ to have arbitrary arity. To every algebraic type
$\sigma:=(L_\sigma,T_\sigma)$ we can thus associate the class $\text{Mod}(\sigma)$ of
all $L_\sigma$-structures that satisfy $T_\sigma$. For instance, if we picked
$L_\sigma:=\\{e,\cdot\\}$ with $e$ a constant symbol and $\cdot$ a binary function
symbol, and picked

$$
T_\sigma:=\\{\forall x\forall y\forall z(x(yz)=(xy)z), \forall x(xe=x\land ex=x)\\},
$$

then $\text{Mod}(\sigma)$ is just the class of all monoids.

To every such $\text{Mod}(\sigma)$ we also have homomorphisms between them, in the
classical model-theoretic context (so that these would be monoid homomorphisms in the
above example). This gives us a category $C_\sigma$ with objects the structures in
$\text{Mod}(\sigma)$ and the associated homomorphisms between them. In the above
example we would simply get $C_\sigma=\textsf{Mon}$, the category of monoids.

To every such category $C_\sigma$ we always have a functor $U:C_\sigma\to\textsf{Set}$,
which simply "forgets" about all the extra structure, i.e. taking the reduct to the
empty language. This functor $U$ is called the forgetful functor. I then say
that $\sigma$ admits free algebras if the forgetful functor has a left adjoint. That
is, there exists a functor $F:\textsf{Set}\to C_\sigma$ such that for every set $X$ and
$A\in\textsf{Mod}(\sigma)$,

$$ C\_\sigma(FX,A)\cong\textsf{Set}(X,UA). $$

In the running example we could choose $F:\textsf{Set}\to\textsf{Mon}$ to send a set
$X$ to the set of all finite words on the elements of $X$, i.e. that

$$ FX:=({^{<\omega}}X,\cdot), $$

where the operation $\cdot$ is merely concatenation of sequences. Then to every
function $f:X\to UA$ we can define $\varphi\_f:FX\to A$ as

$$
\begin{align}
  \varphi\_f(\langle\rangle)&:=e \\\\
  \varphi\_f(\langle x\_1,\dots,x\_n\rangle)&:=f(x\_1)\cdot f(x\_2)\cdots f(x\_n),
\end{align}
$$

and the function $f\mapsto\varphi\_f$ is indeed bijective, making $F$ a left adjoint to
the forgetful functor.

Okay, so that was a few definitions. It turns out that given any algebraic type admits
free algebras, in the presence of choice. This is done analogous to the above example,
by constructing the set of all words of elements of a given set. Some care must be
taken however, as we don't want our words to infinitely nest, which is done by
considering words to be certain well-founded trees instead, see [Blass
(1983)](http://matwbn.icm.edu.pl/ksiazki/fm/fm117/fm117116.pdf). Without choice it
turns out to be a different story.

> **Theorem (Blass, 1983).** Assume $\textsf{ZF}$. Then every algebraic type admits
> free algebras iff there is a proper class of regular cardinals.

This conversion of the problem turns out to be fruitful, as we now have the following
upper bound of our hypothesis.

> **Theorem (Gitik, 1980).** Assume that there exists a proper class of strongly
> compact cardinals. Then there exists a model of $\textsf{ZF}$ in which
> $\text{cof}(\aleph_\alpha)=\aleph\_0$ for every ordinal $\alpha$.

Ostensibly, this theorem seems a bit of an overkill, as we just require the cardinals
to be singular and not necessarily having cofinality $\aleph\_0$. Furthermore we only
require that the class of regular infinite cardinals is bounded, and not only
containing $\aleph\_0$, but that might be equiconsistent. As for lower bounds, we have
the following recent result, building on [Busche and Schindler
(2009)](https://doi.org/10.1016/j.apal.2008.12.001).

> **Theorem (Adolf '17).** Assume $\textsf{ZF}$ and that the regular cardinals are
> bounded. Then there is a model of $\textsf{AD}\_{\mathbb R}+\Theta\text{ is regular}$.

This result is accomplished by using the core model induction technique in a choiceless
context. The result assumes that every uncountable cardinal is singular, but the proof
only requires that the regular cardinals are bounded. We then have that

$$
\textsf{AD}\_{\mathbb R}+\Theta\text{ is regular}\leq_{\text{Con}}
\textsf{ZF}+\textsf{F}\leq_{\text{Con}}\text{There is a proper class of strongly
compacts}.
$$

This is still an enormous span, so it would be interesting if it turns out that
$\textsf{ZF}+\textsf{F}$ is consistency-wise below a superstrong, making it interact
with all the determinacy theories we got in that area.

**EDIT:** Changed the lower bound to a recent result of Adolf.
