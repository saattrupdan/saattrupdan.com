---
title: Partition Relations, Suslin Trees and Jónsson Cardinals
subtitle: An Interplay of Open Problems
meta: I've previously mentioned the open problem of whether inaccessible Jónssons provably are weakly compact. Here I want to present a few other seemingly completely different open problems in set theory raised by various people and show the interaction between them.
tags: set theory, jonsson cardinals, infinite combinatorics
---

I've previously mentioned the open problem of whether inaccessible Jónssons provably
are weakly compact. Here I want to present a few other seemingly completely different
open problems in set theory raised by various people and show the interaction between
them.

A Jónsson cardinal is one of those cardinals that can be characterised in multiple very
different ways. Here are some of them.

> **Definition.** A cardinal $\kappa$ is a Jónsson cardinal if it satisfies any of the
> following.
>
> 1. (Jónsson '62) Every algebraic structure of size $\kappa$ in a countable language
>    has a proper subalgebra of the same size;
> 2. (Erdős-Hajnal '66) $\kappa\to[\kappa]^{<\omega}\_\kappa$; i.e. for every
>    $f:[\kappa]^{<\omega}\to\kappa$ there's an $H\in[\kappa]^\kappa$ such that
>    $f"[H]^{<\omega}\neq\kappa$;
> 3. (Kleinberg '79) $(\kappa,\nu)\twoheadrightarrow (\kappa,<\nu)$ for some
>    $\nu<\kappa$; i.e. for every structure $M:=(M,\in,A)$ with $|M|=\kappa$ and
>    $|A|=\nu$ there's an elementary substructure $(H,\in,B)\prec M$ such that
>    $|H|=\kappa$ and $|B|<\nu$;
> 4. (Tryba '84) For every $\theta>\kappa$ there's a transitive M and an elementary
>    embedding $j:M\to H_\theta$ with $\text{crit }j<\kappa$ and $j(\kappa)=\kappa$.

I have mentioned that inaccessible Jónsson cardinals share a lot of common properties
with weakly compact cardinals. This includes threadability, Mahloness, reflecting
stationary sets and there not being any $\kappa$-[Suslin
trees](https://en.wikipedia.org/wiki/Suslin_tree). But the following is open (but
conjectured by Welch ('98) to be false).

> **Question 1.** Is every inaccessible Jónsson cardinal provably weakly compact?

Curiously though, the similarities with weakly compacts persists if we weaken the
notion of a Jónsson cardinal considerably: say an uncountable cardinal $\kappa$
is weakly Jónsson if $\kappa\to[\kappa]^2_\kappa$. Then whenever $\kappa$ is weakly
Jónsson, it holds that

1. (Soare, mentioned in Jensen '72) There exists no $\kappa$-Suslin tree;
2. (Todorčević '87) Every stationary $S\subseteq\kappa$ reflects;
3. (Shelah '94) if $\kappa$ is inaccessible then it's $\omega$-Mahlo;
4. (Rinot '14) $\kappa$ is threadable.

These are basically all the same properties that have been shown to hold for
inaccessible Jónssons, but the main difference here is that whereas Jónsson cardinals
are equiconsistent with Ramsey cardinals, weakly Jónsson cardinals are equiconsistent
with weakly compacts. This is basically because $\kappa$ is weakly compact if and only
if $\kappa\to[\kappa]^2\_2$, so every weakly compact cardinal is weakly Jónsson, and
it's a result of Todorčević ('87) that any threadable cardinal $\kappa\geq\aleph\_2$ is
weakly compact in L (and he also showed that $\aleph\_1$ isn't weakly Jónsson). We can
thus ask the following question.

> **Question 2.** Is every inaccessible weakly Jónsson cardinal provably weakly
> compact?

A positive answer to Question 2 would then of course also answer Question 1
affirmatively. Rewriting Question 2 in terms of combinatorics we get the following
equivalent problem, which is problem 16 in [Erdős-Hajnal
('71)](https://www.renyi.hu/~p_erdos/1971-28.pdf), that has been open for almost fifty
years (I thank Péter Komjáth for [pointing this
out](https://mathoverflow.net/q/280519/38602)).

> **Question 2+** (Erdős-Hajnal). For an inaccessible cardinal $\kappa$, does
> $\kappa\to[\kappa]^2_\kappa$ imply $\kappa\to(\kappa)^2$?

Another related question is the following, posed as Question 8.5 in [Shelah
('91)](https://doi.org/10.48550/arXiv.math/9906113) and [pointed out by Todd
Eisworth](https://mathoverflow.net/q/280519/38602).

> **Question 3 (Shelah).** Does $\kappa\to[\kappa]^2_\kappa$ hold for the first
> $\omega$-Mahlo cardinal $\kappa$?

If Question 3 is consistently false then we have a model in which an uncountable weakly
Jónsson isn't weakly compact (as weakly compacts have many $\omega$-Mahlos below them),
falsifying Question 1. Moving on to trees, [Mohammad Golshani posed the
following](https://mathoverflow.net/q/161868/38602).

> **Question 4 (Golshani).** Is it consistent that there are no $\kappa$-Suslin trees
> for some inaccessible but not weakly compact $\kappa$?

As I mentioned above, there are no $\kappa$-Suslin trees for weakly Jónsson cardinals
$\kappa$, so a negative answer to Question 1 would then yield a positive answer to
Question 4. So summing up,

_A negative answer to Shelah's Question 3 would falsify Question 1, which in turn would
falsify Question 2 (and thus also Erdős' and Hajnal's Question 2+) and answer
Golshani's Question 4 in the positive._
