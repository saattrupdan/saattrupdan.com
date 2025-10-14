---
title: Jónsson Successors of Singulars
meta: We currently don't know whether or not there can exist a singular cardinal whose cardinal successor is a Jónsson cardinal. I'll try to survey some of the properties these strange things satisfy and how much is known about the consistency strength of the existence of them.
tags: set theory, jonsson cardinals
---

We currently don't know whether or not there can exist a singular cardinal $\rho$ such
that $\rho^+$ is a Jónsson cardinal. I'll try to survey some of the properties these
strange things satisfy and how much is known about the consistency strength of the
existence of them.

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-11-02-jonsson-cardinals">Jónsson Cardinals</router-link>
2. <router-link to="/posts/2016-11-16-jonsson-cardinals-and-the-core-model">Jónsson Cardinals and the Core Model</router-link>
3. Jónsson Successors of Singulars

Let's start with some of the properties that a Jónsson successor of a singular satisfy.
First, since "Jónsson successor of a singular" is annoyingly long both to read and
write, it's convenient for us to note that Jónssons can't be successors of regulars
(we'll get back to why in a second), so we may simply write "Jónsson successor".
Regular Jónsson cardinals in general satisfy a reflection property:

> **Theorem (Tryba-Woodin '84).** If $\kappa$ is regular Jónsson then every stationary
> $A\subseteq\kappa$ reflects, meaning that there exists some $\alpha<\kappa$ such that
> $A\cap\alpha$ is stationary in $\alpha$.

Since the successor $\lambda^+$ of a regular $\lambda$ has a non-reflecting stationary
set, namely $\\{\alpha<\kappa^+\mid\text{cof }\alpha=\kappa\\}$, the theorem shows that
Jónssons can't be successors of regular cardinals. We can now ask if we can push this
further, i.e. if we can get simultaneous stationary reflection, meaning the following.

> **Definition.** Let $\lambda,\kappa$ be cardinals. Then $\text{Refl}(\lambda,\kappa)$
> holds if given any $\leq\lambda$-sized collection of stationary sets of $\kappa$,
> there exists an $\alpha<\kappa$ which is a reflection point for all the stationary
> sets in the collection.

Here $\text{Refl}(1,\kappa)$ is simply the usual stationary reflection in the above
theorem. The next step, $\text{Refl}(2,\kappa)$, says that given any pair of stationary
subsets $S,T\subseteq\kappa$ we can find an $\alpha<\kappa$ such that both
$S\cap\alpha$ and $T\cap\alpha$ are stationary in $\alpha$.

The question of whether $\text{Refl}(2,\kappa)$ holds for all regular Jónsson cardinals
is open, but the following result of Eisworth shows that we know more if the Jónssons
are successors.

> **Theorem (Eisworth '12).** Let $\rho^+$ be a successor Jónsson. Then
> $\text{Refl}({<\text{cof }\rho},\kappa)$ holds.

So at the very least, i.e. if $\rho$ has countable cofinality, we get that
$\text{Refl}(n,\kappa)$ holds for all finite $n$. Moving to other avenues, let's
consider the [diamond principle](https://en.wikipedia.org/wiki/Diamond_principle)
$\diamondsuit_\kappa$. It's been shown that almost any large cardinal notion satisfies
the diamond principle:

> **Theorem (Kunen '69).** $\diamondsuit_\kappa$ holds at every subtle $\kappa$.

Here subtle cardinals lie just above weakly compacts in terms of consistency strength
and almost any large cardinal notion is subtle. The remaining non-subtle cardinals are
all the large cardinals consistency-wise below the subtle cardinals... and surprise
surprise, also Jónssons. These large cardinals include the following, shown here in
increasing consistency strength.

- Inaccessible
- Mahlo
- Greatly Mahlo
- Reflecting
- Stationary
- Weakly compact
- (Strongly) unfoldable
- Indescribable
- Jónsson

It's not really important what the definitions of all these large cardinals are, just
that they aren't subtle, or in the Jónsson case, that we just don't know if they are.
The question of whether $\diamondsuit_\kappa$ can hold for these remaining large
cardinals has been partially solved.

> **Theorem (Woodin '80s, Ben Neria '17).** It is consistent relative to certain
> hypermeasurable assumptions that $\diamondsuit_\kappa$ fails at inaccessibles, Mahlo,
> greatly Mahlo, reflecting and stationary cardinals.

Whether $\diamondsuit_\kappa$ holds for the rest of the list (weakly compact,
(strongly) unfoldables, indescribables, Jónssons) is still open. Again, in the case of
a successor Jónsson we can give an answer. We will use the following two theorems.

> **Theorem (Erdös-Hajnal-Rado '65).** If $2^\kappa=\kappa^+$ then $\kappa^+$ is not
> Jónsson.

> **Theorem (Shelah '10).** Let $\kappa$ be uncountable. Then $\diamondsuit_{\kappa^+}$
> holds iff $2^\kappa=\kappa^+$.

These then directly imply that $\diamondsuit_\kappa$ fails for every successor Jónsson
$\kappa$, which again would make Jónsson cardinals "the odd ones out", as they're
consistency-wise surrounded by large cardinals satisfying diamond.

But can successor Jónssons ever exist? They haven't been shown consistent relative to
any large cardinal notion up to this point, but the lower bound has been studied. We
can cheat a bit and use the following well-known result concerning [square
sequences](https://en.wikipedia.org/wiki/Square_principle).

> **Proposition.** For uncountable $\kappa$, $\Box_\kappa$ implies that
> $\text{Refl}(1,\kappa^+)$ fails.

This then immediately implies that if $\rho^+$ is a Jónsson successor then $\Box_\rho$
fails. The only result I know of about the failure of $\Box_\rho$ at a singular $\rho$
is the following.

> **Theorem (Mitchell-Schimmerling-Steel '94).** Assume $\Box_\rho$ fails for a
> singular $\rho$. Then there exists an inner model with a Woodin cardinal.

If we furthermore assume $\rho$ to be a strong limit, we have the following.

> **Theorem (Adolf '17).** Assume $\rho$ is a singular strong limit and $\Box_\rho$
> fails. Then there is a transitive model containing all the ordinals and reals and
> which satisfies $\textsf{ZF}+\textsf{AD}\_{\mathbb R}+\Theta\text{ is regular}$.

The conclusion of the theorem is stronger than $\textsf{AD}^{L(\mathbb R)}$, which is
equiconsistent to a limit of Woodin cardinals (see my previous post on these
determinacy axioms). This then means that a successor Jónsson of a strong limit
singular also lies above $\textsf{AD}^++\theta\_0<\Theta$ in terms of consistency
strength. Summing all of this up, we arrived at the following facts.

> **Corollary.** Let $\kappa:=\rho^+$ be a Jónsson successor. Then
>
> 1. $\text{Refl}({<\text{cof }\rho},\kappa)$ holds;
> 2. $\diamondsuit_\kappa$ fails;
> 3. $\Box_\rho$ fails (even $\Box(\rho^+,{<\text{cof}(\rho)})$ fails, see below);
> 4. There exists an inner model with a Woodin cardinal;
> 5. If $\rho$ is a strong limit then $\text{Con}(\textsf{AD}\_{\mathbb R}+\Theta\text{
>    is regular})$ holds.

**EDIT 1:** It has been pointed out that point (3) in the above corollary can be
improved: as shown in Theorem B of [this paper by Assaf
Rinot](https://doi.org/10.1017/bsl.2014.24), for every regular Jónsson cardinal
$\kappa$, the threaded square $\square(\kappa)$ fails. More precisely, he shows in the
theorem that $\kappa\to[\kappa]^2_\kappa$ (which is equivalent to the failure of
Shelah's $\text{Pr}\_1(\kappa,\kappa,\kappa,2)$ used in Assaf's theorem) implies that
$\Box(\kappa)$ fails (recall that $\kappa$ is Jónsson precisely if
$\kappa\to[\kappa]\_\kappa^{<\omega}$). When $\kappa=\rho^+$ is a successor, the
statement that $\Box(\rho^+)$ fails is then stronger than $\Box_\rho$ failing,
improving the result.

**EDIT 2:** Improving even further, Theorem 2.13 of [this paper by Yair Hayut and Chris
Lambie-Hanson](https://doi.org/10.48550/arXiv.1603.05556) shows that
$\text{Refl}({<\text{cof}(\rho)},\kappa)$ implies that
$\Box(\kappa,{<\text{cof}(\rho)})$ fails, where $\Box(\kappa,{<\text{cof}(\rho)})$ is a
weakening of $\Box(\kappa)$. As $\text{Refl}({<\text{cof}(\rho)},\kappa)$ holds for
successor Jónsson cardinals $\kappa=\rho^+$ by Eisworth's result above, we get a
failure of $\Box(\kappa,{<\text{cof}(\rho)})$ for all successor Jónssons
$\kappa=\rho^+$.

**EDIT 3:** Improved Sargsyan's lower bound $\textsf{AD}^++\theta\_0<\Theta$ for the
consistency strength of a Jónsson successor of a singular strong limit by using a
recent (to be published) result of Adolf that failure of $\Box_\rho$ for $\rho$ a
singular strong limit gives a model of $\textsf{AD}\_{\mathbb R}+\Theta\text{ is
regular}$.
