---
title: Generalised Square Inaccesibility
meta: Jensen's square principle has proven very useful in measuring the non-compactness of various successor cardinals as well as being an essential tool in finding new lower bounds for forcing axioms like the Proper Forcing Axiom. It should be noted however, that square at kappa is not really about kappa, but about the successor of kappa. To remedy this confusion, Caicedo et al ('17) came up with the term square inaccessible instead, where the successor of kappa is square inaccessible if square at kappa fails. It seems as though we can only talk about successor cardinals being square inaccessible then, but results from Krueger ('13) and Todorčević ('87) allow us generalise this to all uncountable regular cardinals. I'll introduce this generalisation here and note that the celebrated result of Jensen ('72), stating that there aren't any successor square inaccessible cardinals in L, does not hold for all cardinals.
tags: set theory, infinite combinatorics
---

Jensen's square principle $\Box_\kappa$ has proven very useful in measuring the
non-compactness of various successor cardinals as well as being an essential tool in
finding new lower bounds for forcing axioms like the Proper Forcing Axiom. It should be
noted however, that $\Box_\kappa$ is not really about $\kappa$, but about $\kappa^+$.
To remedy this confusion, Caicedo et al ('17) came up with the term square inaccessible
instead, where $\kappa^+$ is square inaccessible if $\Box_\kappa$ fails. It seems as
though we can only talk about successor cardinals being square inaccessible then, but
results from Krueger ('13) and Todorčević ('87) allow us generalise this to all
uncountable regular cardinals. I'll introduce this generalisation here and note that
the celebrated result of Jensen ('72), stating that there aren't any successor square
inaccessible cardinals in L, does not hold for all cardinals.

Let's start off with the original square principle.

> **Definition (Jensen '72).** Let $\kappa$ be a cardinal. We say that $\Box_\kappa$
> holds if there exists a sequence $\left\<
> C_\alpha\mid\alpha\in\kappa^+\cap\text{Lim}\right\<$ such that
>
> 1. $C_\alpha\subseteq\alpha$ is club
> 2. $C_\beta\cap\alpha=C_\alpha$ for every pair of limit ordinals
>    $\alpha\leq\beta<\kappa^+$
> 3. $\text{ot}(C_\alpha)\leq\kappa$ for each limit ordinal $\alpha<\kappa^+$.

We say that a sequence $\vec C$ satisfying conditions (1)-(2) above is a coherent
sequence of clubs. In the same paper, Jensen showed that, in L, $\Box_\kappa$ holds
for every (infinite) cardinal $\kappa$. Besides being interesting in its own right, it
sparked a lot of interest when [Devlin-Jensen
('74)](https://mathscinet.ams.org/mathscinet-getitem?mr=0480036) a couple of years
later proved the covering lemma for L, in particular stating that if $0^\sharp$ doesn't
exist then $\kappa^+=\kappa^{+L}$ for every V-singular cardinal $\kappa$. This meant
that the failure of $\Box_\kappa$ for a singular $\kappa$ implies $0^\sharp$! Since the
failure of $\Box_\kappa$ for a regular cardinal $\kappa$ merely had the consistency
strength of a Mahlo cardinal, this disparity was quite interesting. How far can it be
pushed?

Solovay started by showing that $\Box$ holds inside $L[U]$ for $U$ a measure, Welch
('79) showed it for the core model K below a measurable, Jensen ('94) for K below
$0^¶$ and [Schimmerling-Zeman
('01)](https://mathscinet.ams.org/mathscinet-getitem?mr=1860606) then showed it for
every Mitchell-Steel core model. This was accompanied by a proof in
[Mitchell-Schimmerling-Steel
('97)](https://mathscinet.ams.org/mathscinet-getitem?mr=1437646) of the (weak) covering
lemma for K below a Woodin, pushing the lower consistency bound of $\lnot\Box_\kappa$
for a singular $\kappa$ up to a Woodin cardinal.

If we take a step back at this point we note that $\Box_\kappa$ is really a statement
about $\kappa^+$, which is why the covering lemma was so crucial for the consistency
strength application above. But what if we consider the analogous thing for any
uncountable regular cardinal? Before this, however, let's introduce some terminology
that turns out to be useful in this context.

> **Definition ([Caicedo et al
> '17](https://mathscinet.ams.org/mathscinet-getitem?mr=3625110)).** An uncountable
> successor cardinal $\kappa^+$ is called square inaccessible if $\Box_\kappa$ fails.

We can then rephrase the above theorems concerning core models to saying that there
aren't any square inaccessible successor cardinals in any Mitchell-Steel core model. Is
this still true for limit cardinals as well? What does that even mean? [Krueger
('13)](https://mathscinet.ams.org/mathscinet-getitem?mr=3078820) managed to come up
with the correct definition of square inaccessibility for an arbitrary uncountable
regular cardinal (his definition is a bit different than the following, as he defines
the analogue of being fully square inaccessible, i.e. the failure of the weak square
$\Box_\kappa^\*$ instead of the failure of $\Box_\kappa$).

> **Definition ([Krueger
> '13](https://mathscinet.ams.org/mathscinet-getitem?mr=3078820)).** Let $\kappa$ be an
> uncountable regular cardinal. Then $\kappa$ is square inaccessible if whenever
> $C\subseteq\kappa$ is club and $\left\< c_\alpha\mid\alpha\in C\right\<$ is a
> coherent sequence of clubs then there exists $\alpha\in C$ such that
> $\text{ot}(c_\alpha)=\alpha$.

He then, in the same paper, shows that the two definitions agree whenever $\kappa$ is a
successor cardinal, so this is really a natural strengthening of the concept. Here's
the catch however: every Mahlo cardinal is square inaccessible. This is because we
can't have a club of singular cardinals in a Mahlo cardinal, so there has to be many
$\alpha\in C$ for which $\text{ot}(c_\alpha)=\alpha$. This puts a damper on the
situation, as Mahlo cardinals are downwards absolute to L -- we thus get the following
corollary.

> **Corollary.** If there exists a Mahlo cardinal then there are square inaccessible
> cardinals in L.

In fact, he proves, together with a result of [Todorčević
('87)](https://mathscinet.ams.org/mathscinet-getitem?mr=908147), that an inaccesible
cardinal $\kappa$ is fully square inaccessible (by what I mean his generalised notion
of the failure of $\Box_\kappa^\*$) if and only if $\kappa$ is Mahlo. This is a great
analogy to an inaccessible cardinal $\kappa$ being fully threadable if and only if
$\kappa$ is weakly compact, also due to Todorčević ('87). In other words, from a
consistency point of view, it's not really that the generalised concept of square
inaccesibility is less interesting, but more that the focus is really about the
existence of square inaccessible successor cardinals, or even successor cardinals
failing weaker square principles, like the successor (fully) threadable cardinals.
