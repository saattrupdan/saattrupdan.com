---
title: Consistency Strength of Forcing Axioms
meta: Previously I've only been talking about large cardinals and determinacy theories as if they were the only consistency hierarchies around. There is another important class of axioms, which has the added benefit of being, dare I say it, more useful to mathematicians not working in set theory. The reason for this is probably that these forcing axioms have a handful of consequences of a non-set theoretic nature, making them easier to apply in (mathematical) practice. When it comes to the consistency strength of these axioms though, things get a lot more hazy - we know very little about the strength of (almost all of) these axioms. I'll introduce these axioms here and state what is known to date.
tags: set theory, forcing
---

Previously I've only been talking about large cardinals and determinacy theories as if
they were the only consistency hierarchies around. There is another important class of
axioms, which has the added benefit of being, dare I say it, more useful to
mathematicians not working in set theory. The reason for this is probably that these
forcing axioms have a handful of consequences of a non-set theoretic nature, making
them easier to apply in (mathematical) practice. When it comes to the consistency
strength of these axioms though, things get a lot more hazy: we know very little about
the strength of (almost all of) these axioms. I'll introduce these axioms here and
state what is known to date.

What is a forcing axiom first of all? The axioms that definitely fit this label are
particular instances of the following schema.

> **Definition.** For a class of forcing posets $C$ and a cardinal $\lambda$ define
> the forcing axiom $\textsf{FA}\_\lambda\(C\)$ as postulating, for every $\mathbb P\in
> C$ and $D\subseteq\mathbb P$ a ${\leq\lambda}$-sized collection of dense subsets of
> $\mathbb P$, the existence of a filter $G\subseteq\mathbb P$ that meets every
> $D\in D$. We set $\textsf{FA}\(C\):=\textsf{FA}\_{\aleph\_1}\(C\)$.

To mention a few examples:

- **Martin's axiom at $\lambda<\mathfrak c$**, $\textsf{MA}\_\lambda$, is
  $\textsf{FA}\_\lambda(\text{ccc})$, and $\textsf{MA}$ is $\textsf{MA}\_\lambda$ for
  all $\lambda<\mathfrak c$;
- [**Proper forcing axiom**](https://en.wikipedia.org/wiki/Proper_forcing_axiom),
  $\textsf{PFA}$, is $\textsf{FA}(\text{proper})$;
- **Martin's maximum**, $\textsf{MM}$, is $\textsf{FA}(\text{preserves stationary sets of
  }\omega\_1)$;
- [**Subcomplete forcing
  axiom**](https://www.mathematik.hu-berlin.de/~raesch/org/jensen/pdf/Singapore_Lectures_final_version.pdf),
  $\textsf{SCFA}$, is $\textsf{FA}(\text{subcomplete})$.

Here if we focus on the $\aleph\_1$ case for Martin's axiom the first three axioms come
in increasing actual strength, meaning that $\textsf{MA}\_{\aleph\_1}$ is implied by
$\textsf{PFA}$ which again follows from $\textsf{MM}$, and $\textsf{SCFA}$ also follows
from $\textsf{MM}$. One peculiar feature of $\textsf{PFA}$ (and $\textsf{MM}$) is that
it implies that $\textsf{CH}$ fails. More precisely, $\mathfrak c=\aleph\_2$ under
$\textsf{PFA}$. On the contrary, $\textsf{SCFA}$ is consistent with $\textsf{CH}$. As
for a few applications to get an idea of the mathematical usefulness, we'll mention the
following.

> **Theorem(s).**
>
> 1. (Bella-Nyikus '91, $\textsf{MA}\_{\aleph\_1}$) Every compact Hausdorff space of size
>    strictly less than $2^{\aleph\_1}$ is [sequentially
>    compact](https://en.wikipedia.org/wiki/Compact_space);
> 2. (Shelah '74, $\textsf{MA}+\lnot\textsf{CH}$) There exists a non-free [Whitehead
>    group](https://en.wikipedia.org/wiki/Whitehead_problem);
> 3. (Baumgartner '73, $\textsf{PFA}$) Every two $\aleph_1$-dense sets of reals are
>    isomorphic.
> 4. (Shelah-Steprans '88, $\textsf{PFA}$) Every automorphism of $P(\mathbb
>    N)/\text{Fin}$ is trivial; i.e. is induced by a function $f:\mathbb N\to\mathbb N$.
> 5. (Farah '11, $\textsf{PFA}$) Every automorphism of the [Calkin
>    algebra](https://en.wikipedia.org/wiki/Calkin_algebra) is
>    [inner](https://en.wikipedia.org/wiki/Inner_automorphism).

In (3), a set $X\subseteq\mathbb R$ is $\aleph\_1$-dense if $(a,b)\cap X$ has size
$\aleph\_1$ for every pair of reals $a < b$. But okay, say we agree that these
forcing-type axioms are indeed useful. Then how strong of a hypothesis are we really
assuming? Is it just innocently consistent with $\textsf{ZFC}$, or is it wildly far
from it? In the case of $\textsf{MA}$ it's quite innocent: it's implied by
$\textsf{CH}$ and thus consistent relative to $\textsf{ZFC}$, and even
$\textsf{MA}+\lnot\textsf{CH}$ is consistent relative to $\textsf{ZFC}$.

As for $\textsf{PFA}$, $\textsf{SCFA}$ and $\textsf{MM}$, we quickly fly through the
roof in terms of (upper bounds of) consistency strength.

> **Theorem (Foreman-Magidor-Shelah '88).** $\textsf{MM}$, and thus also $\textsf{PFA}$
> and $\textsf{SCFA}$, are consistent relative to a supercompact cardinal.

How about the lower bound? This is a slow process, as the main (probably only) tool we
got for showing lower consistency bounds is via inner model theory, so it ultimately
depends on how far the inner model theory programme has come. As it's incredibly far
from a supercompact right now, we simply don't have the tools yet to find an
equiconsistency. As I mentioned in my previous post, inner models have been constructed
up to $\textsf{LSA}$, which is in the area of a Woodin limit of Woodins. Sargsyan and
Trang has recently shown the lower bound of $\textsf{PFA}$ and $\textsf{SCFA}$ up to
this point.

> **Theorem (Sargsyan-Trang '16).** Assume either $\textsf{PFA}$ or $\textsf{SCFA}$.
> Then there exists a transitive model containing the ordinals and the reals, which
> satisfies $\textsf{LSA}$.

A strategy we could also take, which is interesting and useful in its own right, is try
"chopping the axiom into smaller parts" and looking at the consistency strength of
these parts. One of the parts we're particularly interested in are failures of square
principles - I'll use the following terminology in the following.

> **Definition (Caicedo-Larson-Sargsyan-Schindler-Steel-Zeman '15).** Let $\kappa$ be a
> cardinal. Then
>
> - $\kappa$ is threadable if $\Box(\kappa)$ fails;
> - If $\kappa=\rho^+$ then $\kappa$ is square inaccessible if $\Box_\rho$ fails.

Recall that $\Box_\kappa$ implies $\Box(\kappa^+)$, so every threadable successor
cardinal is also square inaccessible. Now the interest in square inaccessible and
threadable cardinals originates from the following $\textsf{PFA}$ theorem of
Todorčević, and recently Fuchs has shown that the same result holds assuming
$\textsf{SCFA}$ as well, improving on a result of Jensen ('14) that $\textsf{SCFA}$
implies that every successor cardinal $\kappa\geq\aleph\_2$ is square inaccessible.

> **Theorem (Todorčević '84).** $\textsf{PFA}$ implies that every cardinal
> $\kappa\geq\aleph\_2$ is threadable.

> **Theorem (Fuchs '16).** $\textsf{SCFA}$ implies that every cardinal
> $\kappa\geq\aleph\_2$ is threadable.

This has led square-failure principles to be regarded as belonging to the hierarchy of
forcing axioms. We can contemplate the consistency strength of specific failures of the
square principles, yielding a wide array of new axioms. I'll here consider the strength
of square inaccessibility of successors of the following cardinals.

- Regular;
- Singular;
- Singular strong limit;
- Weakly compact;
- Jónsson;
- Inaccessible Jónsson;
- Measurable;
- Weakly compact Woodin.

At this point we have a lot of axioms to consider, and we haven't even covered variants
of the forcing axioms such as bounded variants $\textsf{BPFA}$ and $\textsf{BMM}$, even
stronger versions of $\textsf{MM}$ known as $\textsf{MM}^{++}$ and $\textsf{MM}^{+++}$,
and more. I'll say a bit more about the square inaccesibility, but first here's an
overview of what is currently known about the consistency strength of the various
axioms.

<img src="/src/assets/img/forcing-axioms.webp" alt="A diagram of the relations between
the different forcing axioms" class="invert-on-darkmode" />

First of all, don't be fooled in thinking that e.g. we're close to finding an
equiconsistency for a square inaccesible successor of a weakly compact Woodin: I've
cherry-picked certain large cardinals and especially the area between Woodin cardinals
and a Woodin limit of Woodins is highly inflated. But okay, let's justify some of the
points in this diagram - I'm here going to focus on the square-failure principles.
Firstly, Jensen and Solovay showed that the existence of a square inaccessible
successor of a regular cardinal is equiconsistent with the existence of a Mahlo
cardinal. As for the upper bounds of the remaining cases we got the following results.

> **Theorem (Jensen '98).** Successors of subcompact cardinals are square inaccessible.

> **Theorem (Zeman '91).** Assuming the existence of a measurable subcompact, there
> exists a generic extension of V in which $\aleph_{\omega+1}$ is square inaccessible
> and $\textsf{GCH}$ holds.

Jensen's result gives a measurable subcompact as an upper bound for all the square
inaccessibles of the non-singular variant and Zeman's ensures that this same upper
bound also works for singulars and singular strong limits. Note that subcompacts are
both weakly compact and Woodin, so we can lower this upper bound slightly in the case
of weakly compacts and weakly compact Woodins. As for the lower bounds, we got the
following results.

> **Theorem (Mitchell-Schimmerling-Steel '94).** If there exists a square inaccessible
> successor of a singular cardinal then there exists an inner model with a Woodin
> cardinal.

> **Theorem (Adolf '17).** If there exists a square inaccessible successor of a
> singular strong limit cardinal then there exists a transitive M containing all the
> ordinals and reals such that $M\models\textsf{ZF}+\textsf{AD}^++\Theta\text{ is
> regular}$.

> **Theorem (Jensen-Schimmerling-Schindler-Steel '09).** Let $\kappa\geq\aleph\_3$ be
> regular and countably closed and suppose that both $\kappa^+$ is square inaccessible
> and $\kappa$ is threadable. Then there is a proper class model that satisfies "there
> is a proper class of strong cardinals" and "there is a proper class of Woodin
> cardinals".

The first two theorems immediately give lower bounds for the singular cases. The last
theorem is useful to us because of the following.

> **Theorem (Todocevic '86).** Every weakly compact cardinal is threadable.

> **Theorem (Rinot '14).** Every regular Jónsson cardinal is threadable.

As both weakly compacts and inaccessible Jónssons are countably closed this supplies us
with lower bounds in the weakly compact, inaccessible Jónsson and measurable case. The
Jónsson lower bound is then just the minimum of the singular lower bound and the
inaccessible Jónsson lower bound, which is then an inner model with a Woodin cardinal.
When it comes to lower bounds for square inaccessible successors of weakly compact
Woodin cardinals we simply got the trivial lower bound of a weakly compact Woodin,
which is strictly above a Woodin limit of Woodins. The reason why I included this one
is due to the following recent result of Neeman and Steel.

> **Theorem (Neeman-Steel '15).** The theory $\textsf{SBH}\_\delta+\delta^+\text{ is a
> square inaccessible successor of a weakly compact Woodin}$ is equiconsistent with the
> theory $\textsf{SBH}\_\delta+\delta\text{ is subcompact}$.

Here $\textsf{SBH}\_\delta$ is a certain iterability hypothesis called Strategic
Branches Hypothesis (at $\delta$). So if this hypothesis turns out to be true then we
really get an equiconsistency result for square inaccessible successors of weakly
compact Woodins.

That was it! Phew, and that was just the square principles! I'll leave it to the reader
to find the consistency upper- and lower bounds for the remaining forcing axioms.
