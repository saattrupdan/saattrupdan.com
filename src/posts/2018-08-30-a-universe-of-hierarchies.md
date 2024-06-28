---
title: A Universe of Hierarchies
meta: When doing set theory (or mathematics in general) we're working inside some universe, usually denoted by V. Since we can't work with everything there is (in a first-order way), we resort to working with initial segments of V. The confusion then arises, since what do we mean by an initial segment? Some prefer to work with the "rank-hierarchy" and others prefer to work with the "hereditary cardinality hierarchy". It gets even worse if we're working in Gödel's constructible universe L, since then we also got Gödel's hierarchy and Jensen's hierarchy. How do we picture these hierarchies? What are their relation to each other?
tags: set theory
---

When doing set theory (or mathematics in general) we're working inside some universe,
usually denoted by V. Since we can't work with everything there is (in a first-order
way), we resort to working with initial segments of V. The confusion then arises, since
what do we mean by an initial segment? Some prefer to work with the "rank-hierarchy"
$V\_\alpha$ and others prefer to work with the "hereditary cardinality hierarchy"
$H_\kappa$. It gets even worse if we're working in Gödel's constructible universe $L$,
since then we also got Gödel's $L\_\alpha$ hierarchy and Jensen's $J_\alpha$ hierarchy.
How do we picture these hierarchies? What are their relation to each other?

<img
  src="/src/assets/img/universe-of-hierarchies.webp"
  alt="Painting by Nikolay Lavetsky."
  class="centered-image"
  style="width: min(500px, 100%);"
/>

The "vanilla" hierarchy $V\_\alpha$ is also the way we build our universe in the first
place. Here we start out with the empty set $V\_0=\emptyset$ and then successively
apply the power set operation; i.e. we set $V\_{\alpha+1}=P(V\_\alpha)$ and for $\eta$
a limit ordinal we put $V\_\eta=\bigcup_{\alpha<\eta}V\_\alpha$.

The foundation axiom is equivalent to saying that this construction reaches all sets.
That is, $V:=\bigcup_{\alpha<\infty}V\_\alpha$ is the entire universe we're working in.
To every set $x$ we can then associate its **rank**, which is the least ordinal $\alpha$
such that $x\in V\_{\alpha+1}$. Conveniently, the rank of any ordinal is the ordinal
itself.

So in some sense, it seems natural to work with the $V\_\alpha$'s, and indeed, in many
cases it's the most convenient choice. Sometimes however, these **rank initial
segments** $V\_\alpha$ do have properties which isn't ideal in every scenario. Firstly,
it almost never satisfies the Replacement axiom: only when $\alpha$ is $0$, $\omega$ or
inaccessible. This is basically because the rank initial segments are incredibly
"wide": the size of $V\_\alpha$ is $\beth_\alpha$, which is way larger than $\alpha$
unless $\alpha$ is a strong limit cardinal. We're interested in satisfying Replacement
to do things like taking ultrapowers.

Another hierarchy, $H_\kappa$, consists of all sets $x$ such that $x$ has **hereditary
cardinality** strictly less than $\kappa$. This intuitively means that $x$ has size
${<}\kappa$, every element of $x$ has size ${<}\kappa$, and so on. A downside here is
that we get a coarser hierarchy: we can only distinguish between two initial segments
$H_\kappa$ and $H_\lambda$ when $|\kappa|\neq|\lambda|$. On the plus side we get that
$H_\kappa$ satisfies all of the ZFC axioms except the Power Set axiom, whenever
$\kappa$ is regular. Note that the rank initial segments $V\_\alpha$ satisfy the Power
Set axiom whenever $\alpha$ is a limit ordinal.

These fellas are almost always smaller than the rank initial segments: the size of
$H_\kappa$ is $\sup_{\alpha<\kappa}2^\alpha$. So if $\kappa=\lambda^+$ then it's of
size $2^\lambda$. This means that if GCH holds then $|H_\kappa|=\kappa$ whenever
$\kappa$ is regular. I keep talking about regularity of $\kappa$, which is because if
it's singular then we would get that $H_\kappa=H_{\kappa^+}$. To make a sensible
definition we can then put $H_\kappa:=\bigcup\\{H_\lambda\mid\lambda<\kappa\text{
regular}\\}$.

Let's picture the relationship between the $V\_\alpha$'s and the $H_\kappa$'s. To make
a coherent picture we have to agree on how the cardinal exponent function behaves in
our universe. I've arbitrarily chosen that $2^\kappa=\kappa^{++}$ here. The picture in
general will be similar though, but the larger $2^\kappa$ is, the "narrower" the
$H_\kappa$'s become. Also, $\kappa$ in the picture is meant to be an inaccessible
cardinal --- hopefully this overloading of the use of "$\kappa$" isn't too confusing.

<img
  src="/src/assets/img/universe-of-hierarchies-diagram-1.webp"
  alt="Diagram of the universe, comparing the V_k hierarchy with the H_k hierarchy"
  class="invert-on-darkmode centered-image"
/>

So far so good. Now, let's have a look at the initial segments of $L$. We of course
still have the relativised hierarchies $V\_\alpha^L$ and $H_\kappa^L$ (for
$L$-cardinals $\kappa$), but $L$ has its own two special hierarchies: the $L\_\alpha$'s
and the $J_\alpha$'s.

The $L\_\alpha$'s look like they're simply the $L$ version of the rank initial segments.
We again set $L\_0=\emptyset$ and we then set $L\_{\alpha+1}$ to be all definable subsets
of $L\_\alpha$, with parameters from $L\_\alpha$. The difference here is that we keep
getting new subsets of earlier stages: $L\_{\omega+10}$ will contain new subsets of
$L\_\omega$. This continues until we reach the next cardinal, so that it isn't until we
reach $\omega\_1$ that we stop adding subsets to $L\_\omega$.

When we are at cardinal stages though, then we're simply back at the $H_\kappa$
hierarchy: $L\_\kappa=H_\kappa^L$, so we can see the $L\_\alpha$'s to give the missing
fine-grained pieces to the $H_\kappa$ hierarchy. Also, since GCH holds in $L$ we do get
that $L\_\kappa$ has size $\kappa$. This holds in general: $L\_\alpha$ has size
$|\alpha|$.

A downside to this hierarchy is that the hierarchy is mostly only well-behaved at limit
stages. Most formulas we'd like to work with in an $L$-setting, like checking if a set
is of the form $L\_\alpha$, or how two sets are related in the constructibility
ordering, or even $V=L$, are only absolute to $L\_\alpha$ when $\alpha$ is a limit
ordinal.

This is a first motivation for Jensen's hierarchy $J_\alpha$, whose initial segments
always have limit height. Here we again start with the empty set, at limit stages we
take unions, but we take successor stages $J_{\alpha+1}$ to be the closure of
$J_\alpha\cup\\{J_\alpha\\}$ under all the [rudimentary
functions](https://en.wikipedia.org/wiki/Jensen_hierarchy). Closing something off under
(finitely many) functions takes $\omega$ stages, so here we then get that the height of
$J_{\alpha+1}$ is the height of $J_\alpha$ plus $\omega$, so that in general we get
that $J_\alpha$ has height $\omega\cdot\alpha$.

A notable feature of the Jensen hierarchy is that $J_{\alpha+1}$ agrees with
$L\_{\alpha+1}$ below height $\alpha+1$ --- all new sets are added on top. The main
motivation for working with the Jensen hierarchy rather than Gödel's is more than the
absolute properties however: the Jensen hierarchy allows a [fine structural
analysis](http://www.math.cmu.edu/~laiken/papers/FineStructure.pdf), making it the
hierarchy of choice for inner model theorists.

Here's a picture of the two $L$-hierarchies, situated inside another universe $V$ (here
we assume $V\neq L$ because, why not). Note here that the Jensen hierarchies are really
just the Gödel hierarchy "stretched upwards", and that they agree whenever the index is
a cardinal.

<img
  src="/src/assets/img/universe-of-hierarchies-diagram-2.webp"
  alt="Diagram of the universe, comparing the L_k hierarchy with the J_k hierarchy"
  class="invert-on-darkmode centered-image"
/>
