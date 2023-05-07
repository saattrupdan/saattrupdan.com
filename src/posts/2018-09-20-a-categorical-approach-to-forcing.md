---
title: A Categorical Approach to Forcing?
meta: When doing set theory we tend to take pride in the fact that it's something unique, something that is doing things in a very different way from the rest of mathematics. Take things like transitive sets, forcing extensions, elementary embeddings as well as syntactic considerations in results like Shoenfield absoluteness. But there are times when we might be better off by borrowing terminology, and maybe even results, from other fields. In this post I will just give a potential example of such a thing - namely, considering the structural side of forcing from a categorical point of view.
tags: set theory, forcing
---

When doing set theory we tend to take pride in the fact that it's something unique,
something that is doing things in a very different way from the rest of mathematics.
Take things like transitive sets, forcing extensions, elementary embeddings as well as
syntactic considerations in results like Shoenfield absoluteness. But there are times
when we might be better off by borrowing terminology, and maybe even results, from
other fields. In this post I will just give a potential example of such a thing:
namely, considering the structural side of forcing from a categorical point of view.

![Painting by Chris Quinlan](/src/assets/img/categorical-approach-to-forcing.webp)

When working with forcing we're working with two distinct toolboxes: there is the
combinatorial toolbox used to construct the specific forcing notions at hand, and
the algebraic toolbox for dealing with the relationship between the forcing notions and
dealing with generic extensions. I will here be working with the latter, and try to
argue that it might be worthwhile to consider this angle from a categorical point of
view.

As always when working with forcings, we have to join a camp: are we going to work with
forcing posets or complete boolean algebras? Forcing posets are more consistent with
our intuition of what the forcings should do, when e.g. we're considering posets of
approximations to the generic object we're looking for, making it more natural to deal
with forcing posets when constructing new forcing notions.

On the other hand, complete boolean algebras have a lot more structure, which makes it
easier to deal with abstract results and properties about general forcing notions. Of
course, in practice it doesn't make any difference whatsoever, as any (separative)
forcing notions maps densely into a unique complete boolean algebra.

As we're working with forcings in the abstract in this post I'll therefore restrict
myself to only dealing with complete boolean algebras (**cbas**).

Usually when we're forcing we don't have to deal with the manipulation of forcing
notions; we simply pick a forcing that does what we need and carry on. But there are a
couple of times when we become interested in the theory of forcing notions:

1. When showing some forcing notion $\mathbb P$ is a subforcing of another forcing
   notion $\mathbb Q$.
2. When we want to argue that two forcings are forcing equivalent.
3. When we want to iterate forcing notions.

Points (1) and (2) require that we agree what _subforcings_ are and what _forcing
equivalence_ is. I couldn't find a standard definition, but my guess would be that it's
something like the following.

> **Definition.** A forcing $\mathbb P$ is a subforcing of $\mathbb Q$ if whenever
> $g\subseteq\mathbb P$ is $V$-generic then there's a $V$-generic $h\subseteq\mathbb Q$
> such that $V[g]\subseteq V[h]$, and whenever $h\subseteq\mathbb Q$ is $V$-generic
> then there's a $V$-generic $g\subseteq\mathbb P$ such that $V[g]\subseteq V[h]$. The
> two are forcing equivalent if the same thing holds but with $V[g]=V[h]$ in both
> cases.

This notion is the notion we're trying to capture, but it's hard to deal with. For
almost all practical purposes it suffices to use a sufficient condition, based on
embeddings. I'll here be using the following (maybe standard) terminology from [Viale et
al ('14)](https://doi.org/10.48550/arXiv.1402.1714).

> **Definition.** For $\mathbb B,\mathbb C$ cbas, we say that $\varphi:\mathbb
> B\to\mathbb C$ is a complete homomorphism if it's a homomorphism between boolean
> algebras which preserves all suprema. Further, we say that $\varphi$ is a regular
> embedding if it's an injective complete homomorphism.

It can be shown (See 2.8, 4.10 and 4.14 in [Viale et al
('14)](https://doi.org/10.48550/arXiv.1402.1714)) that if there's a complete
homomorphism $\varphi:\mathbb B\to\mathbb C$ then $\mathbb B$ is a subforcing of
$\mathbb C$. It can be shown that any homomorphism $\varphi:\mathbb B\to\mathbb C$ is
complete iff for every $V$-generic filter $g\subseteq\mathbb C$ it holds that the
preimage $\varphi^{-1}[g]\subseteq\mathbb B$ is also $V$-generic, making complete
homomorphisms between forcings quite natural.

As for point (2), if $\mathbb B\cong\mathbb C$ then the two forcings are forcing
equivalent. This is also equivalent to there being some forcing $\mathbb D$ such that
either there are complete embeddings from $\mathbb D$ into both $\mathbb B$ and
$\mathbb C$ with dense images, or complete embeddings from $\mathbb B$ and $\mathbb C$
into $\mathbb D$ with dense images. This is usually called **strong forcing
equivalence**.

Lastly, for point (3), when it comes to iterating forcing notions then it becomes
especially clear when considering the cba approach. Following [Donder & Fuchs
('92)](https://doi.org/10.48550/arXiv.math/9207204) we can define a **forcing
iteration** as simply a commuting linear system of cbas

$$ (i_{\alpha\beta}:\mathbb B_\alpha\to\mathbb B_\beta\mid \alpha\leq\beta<\lambda) $$

with $i_{\alpha\beta}$ being regular and $i_{\alpha\alpha}=\text{id}\_{\mathbb
B_\alpha}$. As in Viale et al ('14) we can then proceed to take various limits of these
iterations: direct limits, inverse limits, revised countable support limits and others.
What the connection is between these limits and the categorical limits and colimits is
then an interesting question, which I might investigate at a later point.

In any case, we're now working in what we could call the strong forcing category, in
which objects are cbas and morphisms are complete homomorphisms, and the regular strong
forcing category, which is the subcategory in which we're only considering regular
embeddings between the cbas.

As a finishing comment we could ask if we gain anything by attempting to construct the
"true" forcing category; i.e. a category consisting of cbas in which isomorphism in
this category corresponds exactly to forcing equivalence. Since forcing equivalence
is not the same as strong forcing equivalence there will be more isomorphisms in this
category. But how can we construct such a category? One such way could be to somehow
use [Solovay's characterisation of forcing
equivalence](http://jdh.hamkins.org/common-forcing-extension-via-different-forcing-notions/)
to extract the weaker notion of a "forcing equivalence morphism" from this and then
[localise the category](https://en.wikipedia.org/wiki/Localization_of_a_category) by
these maps. I might return to this at some point in the future.
