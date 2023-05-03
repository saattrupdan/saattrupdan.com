---
title: Three Paths to Weak Compactness
meta: Weakly compact cardinals have a great variety of properties, which are all interesting enough to warrant independent study. These properties include threadability, reflection and Mahlo properties. Studying these features in isolation leads to interesting (non-)interactions and gives us three distinct hierarchies of large cardinal notions below weakly compacts in terms of direct implication, where in terms of consistency strength two of the hierarchies simply collapse.
tags: set theory
---

Weakly compact cardinals have a great variety of properties, which are all interesting
enough to warrant independent study. These properties include threadability, reflection
and Mahlo properties. Studying these features in isolation leads to interesting
(non-)interactions and gives us three distinct hierarchies of large cardinal notions
below weakly compacts in terms of direct implication, where in terms of consistency
strength two of the hierarchies simply collapse.

Let's start with the Mahlo notions. It's convenient first to recursively define a
sequence $\langle A_\alpha\mid\alpha<\kappa^+\rangle$ associated to an inaccessible
cardinal $\kappa$ as follows. Set $A\_0:=\\{\xi<\kappa\mid\xi\text{ is inaccessible}\\}$,
$A_{\alpha+1}:=\\{\xi\in A_\alpha\mid A_\alpha\cap\xi\text{ is stationary in }\xi\\}$,
put $A_\delta:=\bigcap_{\alpha<\delta}A_\alpha$ when $\delta$ is limit and finally if
$\text{cof}(\mu)=\kappa$ then define $A_\mu:=\triangle_{\alpha<\mu}A_\alpha$. We can
then set $\kappa$ to be $\alpha$-Mahlo if $A_\alpha$ is stationary, Mahlo if
it's 0-Mahlo, hyper-Mahlo if it's $\kappa$-Mahlo and greatly Mahlo if it's
$\kappa^+$-Mahlo.

Even though it looks like we get an incredible amount of strength out of these
Mahlo-like cardinals, they're still all trumped by the weakly compact cardinals. As
inaccessibility is a $\Pi^1\_1$-property, the $\Pi^1\_1$-indescribability of weakly
compacts give us a stationary set of inaccessibles below, making them Mahlo. Likewise
stationarity is $\Pi^1\_1$ as well, so we can continue like this all the way up to
hyper-Mahlo, just keep on reflecting down. Weakly compacts are even greatly Mahlo as
well -- more on that in a second.

Alright, let's move on to the cardinals characterised by their reflection properties
and see how these guys interact with the Mahlo cardinals. Say that an inaccessible
cardinal $\kappa$ is $\alpha$-reflecting if whenever
$\\{S_\xi\subseteq\kappa\mid\xi<\alpha\\}$ is a collection of stationary subsets of
$\kappa$ then there is a $\beta<\kappa$ such that $S_\xi\cap\beta$ is stationary in
$\beta$, for all $\xi<\alpha$ (such a $\beta$ is called a reflection point). We say
that all the $S_\xi$'s simultaneously reflect. The first result is then that these
reflecting cardinals exceed all the Mahlos in terms of consistency strength.

> **Theorem (Magidor '82).** The existence of a 2-reflecting cardinal is equiconsistent
> with the existence of a weakly compact cardinal.

This is even true for inaccessibles $\kappa$ such that given any
stationary-co-stationary $S\subseteq\kappa$, $S$ and its complement $\lnot S$
simultaneously reflect --- call this 1.5-reflecting.

So almost the entire reflection hierarchy is equiconsistent with a weakly compact. But
how about direct implications? Of course we don't have any implications from the Mahlos
to the reflecting by the above consistency result. But it turns out that [we can't even
get any implication the other way
either](https://mathoverflow.net/questions/212597/does-stationary-reflection-imply-mahloness/212600#212600).
The two hierarchies are thus completely 'disjoint'.

Moving on, let's have a look at the threadables. We call an inaccessible cardinal
$\kappa$ an $\alpha$-threadable cardinal if the [threaded
square](https://doi.org/10.48550/arXiv.1603.05556) $\Box(\kappa,\alpha)$ fails. A
series of results in [Hayut & Lambie-Hanson
('16)](https://doi.org/10.48550/arXiv.1603.05556) shows that there's an interesting
pattern of implications between these threadables and the reflecting cardinals.

> **Theorem (Hayut, Lambie-Hanson '16).** Let $\lambda<\kappa$ be cardinals.
>
> 1. If $\kappa$ is $<\lambda$-reflecting then it's also $<\lambda$-threadable;
> 2. ZFC can't prove that if $\kappa$ is $<\lambda$-reflecting then it's also
>    $\lambda$-threadable;
> 3. Every 2-reflecting cardinal is $<\omega$-threadable;
> 4. Modulo large cardinals, ZFC can't prove that every 1-reflecting cardinal is
>    threadable.

Furthermore, [this MO answer by Chris Lambie-Hanson](https://mathoverflow.net/q/279022)
also shows that ZFC can't prove that threadable cardinals are $\alpha$-reflecting
cardinals either, for any $\alpha<\kappa$. He also points out that a cardinal $\kappa$
is $<\kappa$-threadable (call such a cardinal fully threadable) if and only if it's
weakly compact -- this is by Todorcevic ('87) -- so such a cardinal then implies all
the properties we'll ever look at throughout this blog post. As for the consistency
strength of the threadables, Schimmerling ('07) shows that all the threadable cardinals
are equiconsistent with a weakly compact, again collapsing the entire hierarchy. If we
were looking at threadable successors of various sorts we would suddenly ramp up
consistency strength considerably, as I covered in a previous post.

Up until this point it seems like we got three almost-disjoint hierarchies: the Mahlos,
the reflecting and the threadables. It turns out that all these hierarchies (excluding
the fully threadables) have a common upper bound strictly below weak compactness. This
bound is a large cardinal notion called a stationary cardinal.

> **Definition (Sun '93).** A cardinal $\kappa$ is stationary if there exists a
> $\kappa$-complete normal filter $F$ on $\kappa$ such that whenever $S\subseteq\kappa$
> is stationary then $\\{\xi\in S\mid S\cap\xi\text{ is stationary in }\xi\\}\in F$.

By definition, stationary cardinals are $\lambda$-reflecting for any $\lambda<\kappa$,
subsuming the reflection- and threadability hierarchies. In Sun ('93) it is also shown
that weakly compacts are stationary and that stationary cardinals are greatly Mahlo,
thus binding all the hierarchies together. He also proves in the same paper that ZFC
can't prove that stationary cardinals are weakly compact, really making the stationary
cardinals strictly below the weakly compacts (in terms of direct implication). The
following then sums up the implications we've been considering, with all ZFC-provable
direct implications shown on the left-hand side.

<img src="/src/assets/img/three-paths-to-weak-compactness.webp" alt="An overview of the
large cardinals between inaccessible and weakly compact" class="invert-on-darkmode" />

Here's an intriguing fact, continuing my Jónsson propaganda: Inaccessible Jónsson
cardinals are both threadable (Rinot '14), 1-reflecting (Tryba-Woodin '84) and
hyper-Mahlo (Shelah '98) - but it's open whether they're (ZFC-provably) weakly compact.
