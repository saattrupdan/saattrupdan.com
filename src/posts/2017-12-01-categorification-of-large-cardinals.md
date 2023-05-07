---
title: Categorification of Large Cardinals?
meta: When working with most of modern set theory we tend to transcend ZFC, always working with some strong background hypothesis, whether it being the existence of some elementary embedding, a colouring for some partition property, a generic for some uncountable poset or something completely different. When it comes to using these strong hypotheses in mainstream mathematics it seems that we hit a brick wall, as most of our strong hypotheses don't easily translate to the language of everyday mathematics.
tags: set theory, large cardinals
---

When working with most of modern set theory we tend to transcend ZFC, always working
with some strong background hypothesis, whether it being the existence of some
elementary embedding, a colouring for some partition property, a generic for some
uncountable poset or something completely different. When it comes to using these
strong hypotheses in mainstream mathematics it seems that we hit a brick wall, as most
of our strong hypotheses don't easily translate to the language of everyday
mathematics.

![Painting of sea grass](/src/assets/img/categorification-of-large-cardinals.webp)

If we start off by taking a step back and looking at the set-theoretic strong
hypotheses with fresh eyes, we see that we're (at least usually) modelling these
assumptions on the existence of numbers. The original idea of an (ordinal) number was
that it should be a canonical representative of sets with a certain magnitude -- that
somehow the number $\omega$ should be a canonical element of the class of all countable
sets, for instance. Essentially, we probably could just work with arbitrary countable
sets instead of insisting to work with this specific $\omega$ one, but it seems more
practical and aesthetic to have fixed this particular representative.

If we now want to say that a category $C$ somehow "is" a large cardinal notion, then it
seems that we have to let go of this desire to pick canonical representatives, and
instead observe what properties a given large cardinal should have, and impose those as
conditions on our category. Let's have a look at (strongly) inaccessible cardinals.
These would be sets having the property that

- are non-empty; and
- can't be approximated from below (i.e. additively and multiplicatively closed as well
  as having some sort of a regularity property); and
- are closed under taking exponentials.

Imposing these conditions on a category $C$ could be to say that

1. $C$ has an terminal object $1$; and
2. $C$ is closed under finite limits and "small" colimits; and
3. $C$ is closed under taking exponential objects $X^Y$.

Condition (1) is implied by (2), so we can leave that one out, if we prefer. Now, is
this sufficient? Would the existence of a category satisfying (1)-(3) be equivalent to
the existence of an inaccessible cardinal?

Assuming that we do have an inaccessible $\kappa$, we can form the category $H_\kappa$,
consisting of sets having heriditary size $<\kappa$, with functions between them. This
category does satisfy conditions (1)-(3) above. Closure under small colimits is granted
by regularity of $\kappa$, and exponentials by $\kappa$ being a strong limit. But
$H_\kappa$ satisfies further properties as well:

- $H_\kappa$ is closed under power sets; and
- $H_\kappa$ has the property that the generator $1\in H_\kappa$ satisfies that any
  object $X$ is bijective to the set of maps $1\to X$.

There's a category-theoretic notion of a [power
object](https://ncatlab.org/nlab/show/power+object), which coincides with power sets
when working with a category of sets. The second property is called well-pointedness.
So, it's at least necessary that we should require that our category $C$ satisfies
these two conditions, on top of the above (1)-(3). A category having all these
properties has a name -- it's called a

<center>
<b>
  well-pointed
  <a href="https://ncatlab.org/nlab/show/topos#SheafToposes">Grothendieck topos</a>.
</b>
</center>

The question now is whether the existence of a well-pointed Grothendieck topos suffices
to yield the existence of an inaccessible cardinal. The apparent obstacle is that we
want to convert the algebraic structure into the familiar set theoretic analogues, so
that exponential objects really are the familiar set-theoretic exponentials, for
instance. This seem to require a functor $C\to\textsf{Set}$, preserving all our
structure. We could of course instead simply require that $H_\kappa$ is a Grothendieck
topos instead of just postulating the existence of some well-pointed Grothendieck
topos, which would be equivalent to saying that $\kappa$ is inaccessible. But in this
case we have to use set theoretic methods to define our topos, so we're simply using
set theory to define a set theoretical notion, defeating the whole purpose of being
"independent of set theory"..

..anyway, I better get back to doing some set theory!
