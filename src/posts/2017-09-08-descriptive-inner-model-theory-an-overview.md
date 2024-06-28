---
title: Descriptive Inner Model Theory
subtitle: An Overview
meta: Inner model theory is all about constructing canonical inner models of set theory that inherits the complexity - i.e. the large cardinals - of the universe. In "classical", or "pure", inner model theory it's clear that there's been a lot of partial progress towards this goal, as the programme has resulted in explicit constructions of inner models inheriting a lot of the large cardinals present in V. But with the emergence of descriptive inner model theory this is suddenly not as clear. Where are the inner models containing large cardinals? I'll do my best to give an overview of how this is accomplished and also how large cardinal theories, determinacy theories and arbitrary theories of interest (like forcing axioms) interact with each other.
tags: set theory, descriptive set theory
---

Inner model theory is all about constructing canonical inner models of set theory that
inherits the complexity --- i.e. the large cardinals --- of the universe. In
"classical", or "pure", inner model theory it's clear that there's been a lot of
partial progress towards this goal, as the programme has resulted in explicit
constructions of inner models inheriting a lot of the large cardinals present in V. But
with the emergence of descriptive inner model theory this is suddenly not as clear.
Where are the inner models containing large cardinals? I'll do my best to give an
overview of how this is accomplished and also how large cardinal theories, determinacy
theories and arbitrary theories of interest (like forcing axioms) interact with each
other.

The key ingredient to the descriptive inner model theory programme (call it DIMT) is
the core model induction (CMI), so let's start there. If there's no inner model with a
Woodin cardinal then the celebrated theorem of Jensen and Steel (building on work of
Mitchell, Schimmerling and Steel) that the core model K exists, which is an extremely
canonical model, whatever that means.

But say we now want to improve this result, still getting canonical models but allowing
more large cardinals to (consistently) exist. It turns out that we can not assume that
a Woodin cardinal exists in the universe, as one can prove (using the stationary tower)
from a Woodin cardinal that K doesn't exist. But we can still traverse the large
cardinal ladder, by instead allowing inner models with Woodin cardinals to exist. The
least canonical inner model (called a mouse) containing n Woodin cardinals and some set
$x$ is denoted by $M\_n^\sharp(x)$. We can then continue climbing our ladder, using the
following theorem.

> **Theorem (Schindler-Steel? '14).** Suppose $M\_n^\sharp(x)$ exists for every set $x$.
> Then either
>
> 1. $M_{n+1}^\sharp(x)$ exists for every set $x$; or
> 2. $K(x)$ exists for some set $x$ and $K(x)\vDash M\_n^\sharp\text{ exists}$.

Here $K(x)$ is the same construction as K, but we just stick $x$ at the bottom, just as
with $L(x)$. This now allows us to get mice with the large cardinal strength of
finitely many Woodins, as letting $n+1$ be largest such that V is closed under
$M\_n^\sharp$ we then get that $K(x)$ exists for some set $x$, and $K(x)$ can see inner
models with $n$ Woodins. This could be called the finite steps of the core model
induction, but that's quite misleading as CMI is really about producing determinacy
models. Instead we'll call them the projective levels because of the following theorem.

> **Theorem (Woodin-Neeman '08).** The following are equivalent.
>
> - $M\_n^\sharp(x)$ exists for every real $x$;
> - Every $\bf\Pi^1_{n+1}$ set $A\subseteq\mathbb R$ is determined.

The projective levels then ensures that projective determinacy holds, assuming that the
universe is closed under $M\_n^\sharp$ for every $n<\omega$. Instead of improving the
amount of Woodin cardinals we then follow this determinacy route and want to enlarge
the class of determined sets of reals. The next significant determinacy stage is
getting determinacy of all sets in $L(\mathbb R)$ which again is done inductively, this
time traversing up through all the initial segments, now involving a considerable
amount of descriptive set theory to organise the induction.

But how does $\textsf{AD}^{L(\mathbb R)}$ yield canonical models with large cardinals?
This is where $\textsf{HOD}$ enters DIMT. As I described in my two previous posts we
now get that $\textsf{HOD}^{L(\mathbb R)}$ has a Woodin cardinal, and with some more
work (see Woodin & Koellner's handbook chapter) one can get a $\textsf{HOD}$ with
infinitely many Woodin cardinals. These $\textsf{HOD}$'s are not quite the mice we're
looking for, but are of a different breed, called hod mice - this is what I covered in
this blog post.

We're now in the need of some kind of a translation procedure between these hod mice
and actual mice. This is exactly what Steel has produced in his 2007 paper "Derived
models associated to mice", yielding a mouse with infinitely many Woodins from
$\textsf{AD}^{L(\mathbb R)}$. We can now strengthen our determinacy hypothesis to the
$\Theta$-axioms described here, and for at least some of them we have an analogous
translation procedure to yield mice with large cardinals.

So let's sum up. To produce canonical models with large cardinals using DIMT, we assume
a sufficiently strong background hypothesis so that the core model induction yields
determinacy models, from which we can extract hod mice satisfying large cardinal
hypotheses and finally we translate these hod mice to actual mice, again satisfying
large cardinal hypotheses.

The core model induction and the translation procedure aren't the only interactions
between the large cardinals, determinacy theories and arbitrary theories of interest.
The derived model theorem gives a way of converting large cardinals to determinacy
theories (which is even inverse to Steel's translation procedure), and Woodin invented
a forcing notion $\mathbb P_{\text{max}}$ that produces $\textsf{ZFC}$-models from
determinacy models, and has e.g. been used to produce a model satisfying
$\textsf{MM}(\mathfrak c)$ from a model satisfying
$\textsf{AD}\_{\mathbb{R}}+\Theta\text{ is regular}$. We can sum up the interactions as
follows, where of course we can't expect anything to commute.

<img
src="/src/assets/img/an-overview-of-descriptive-inner-model-theory.webp"
alt="A diagram showing the interactions between large cardinals, determinacy
theories and arbitrary theories"
style="width: min(700px, 100%);"
class="invert-on-darkmode centered-image"
/>
