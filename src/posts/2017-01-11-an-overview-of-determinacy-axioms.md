---
title: An Overview of Determinacy Axioms
meta: There are dozens of determinacy axiom around, with Sargsyan's "AD_R + Theta is regular" axiom perhaps being the most well known. After skimming through Sargsyan's survey paper I encountered several variants of these so-called "Theta-axioms" and also an axiom called LSA. I decided to do some intense Googling and a little bit of thinking, and this is my current overview of these determinacy axioms and their relation to the large cardinal hierarchy.
tags: set theory, determinacy
---

I've recently started to read up on descriptive inner model theory, and quickly
stumbled across a lot of new axioms. Prime among these were Sargsyan's $latex
\textsf{AD}\_{\mathbb R} + \Theta\text{ is regular}$ axiom. After skimming through
[Sargsyan's survey paper](https://doi.org/10.2178/bsl.1901010) I encountered several
variants of these "$\Theta$-axioms" and also an axiom called $\textsf{LSA}$ (in the
paper it's actually called $\textsf{LST}$, but the terminology has changed since then).

This post is part of a series on determinacy:

1. An Overview of Determinacy Axioms
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
3. <router-link to="/posts/2017-02-08-determinacy-from-woodins-ii">Determinacy From
   Woodins II</router-link>
4. <router-link to="/posts/2017-02-22-determinacy-from-woodins-iii">Determinacy From
   Woodins III</router-link>
5. <router-link to="/posts/2017-04-05-from-determinacy-to-a-woodin-i">From Determinacy
   to a Woodin I</router-link>
6. <router-link to="/posts/2017-05-10-from-determinacy-to-a-woodin-ii">From Determinacy
   to a Woodin II</router-link>
7. <router-link to="/posts/2017-05-24-the-structure-of-games">The Structure of
   Games</router-link>
8. <router-link to="/posts/2017-06-07-borel-determinacy">Borel
   Determinacy</router-link>
9. <router-link to="/posts/2017-06-21-hod-models-of-determinacy">HOD Models of
   Determinacy</router-link>
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
   ZFC Determinacy</router-link>
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

I decided to do some intense Googling and a little bit of thinking, and my current
overview of these determinacy axioms and their relation to the large cardinal hierarchy
looks like this:

![A chart of determinacy axioms and large cardinals aximos between the Woodin cardinals
and the superstrong cardinals](/woodin-to-superstrong.png)

There might be a lot of links that I've missed, but this is at least a first attempt.
All arrows in the diagram are the usual consistency implications, where I've labeled an
arrow with a circle if the implication is strict. The hypotheses on the left-hand side
all include $\textsf{ZFC}$ and the ones on the right include $\textsf{ZF}$.
Let me explain what these axioms are, and which results that constitute the arrows.

Starting from the bottom, we have the two well-known theorems due to Woodin that the
existence of a Woodin cardinal is equiconsistent to $\Delta^1\_2$-determinacy and
the existence of infinitely many Woodins is equiconsistent with $\textsf{AD}$.
Moving one step up,we get to the statement that there is a cardinal $\kappa$
which is a limit of Woodins and there exists a $<\kappa$-strong cardinal $latex
\lambda$ below $\kappa$ -- in Figure 1 I've dubbed this a "limit of Woodins with
a small strong below". This is also called the $\theta\_0<\Theta$ Hypothesis, or
the $\Omega>0$ Hypothesis. It's a result due to Woodin and Steel that this
hypothesis is in fact equiconsistent to $\Omega>0$, where $\Omega+1$ is the
length of the Solovay sequence.

> **Proposition.** The existence of a Woodin cardinal $\delta$ and a $\delta$-strong
> cardinal $\kappa$ below is consistency-wise stronger than a proper class of Woodins.

**Proof.** The idea is simply to iterate $\kappa$ using the associated $\delta$-strong
embedding. As the resulting two models agree about $V_\delta$, $\delta$ is still a
Woodin cardinal in the target model, so iterating $\kappa$ out of the universe we leave
a proper class of Woodins behind. **QED**

In particular, as the $\Omega>0$ Hypothesis is strictly stronger than a Woodin $\delta$
with a $\delta$-strong below, the former is strictly stronger than a proper class of
Woodins. Moving one step up we get the statement that there is a limit of Woodins and
small strongs, also called the $\textsf{AD}\_{\mathbb R}$ Hypothesis. Woodin and Steel
have shown (around 2009-2012) that this hypothesis is in fact equiconsistent to
$\text{AD}\_{\mathbb R}$ (see Theorem 2.14 in [Sargsyan's
survey](https://doi.org/10.2178/bsl.1901010)), giving us an equiconsistency arrow in
the diagram.

Also, given a proper class of Woodins and strongs, we can simply construct a sequence
of increasing interleaving Woodins and strongs, getting a limit of Woodins and strongs
and in particular this limit also satisfies the $\textsf{AD}\_{\mathbb R}$ Hypothesis.
As there is an inaccessible above this limit we can also prove the consistency of the
statement, making this implication strict.

Moving further upwards we encounter the $\Theta$-regular Hypothesis:

> **Definition.** The $\Theta$-regular Hypothesis is the statement that there is a
> cardinal $\delta$ which is an inaccessible limit of Woodin cardinals and
> $<\delta$-strong cardinals and whenever
> $\Gamma\subseteq\dot{\Gamma}^\delta_{\text{uB}}$ is such that
> $\Gamma\models"\Theta\text{ is singular}"$ then there is some $\kappa<\delta$ such
> that $\kappa$ coheres $\Gamma$.

See Definition 2.15 and the discussion just before in [Sargsyan's
survey](https://doi.org/10.2178/bsl.1901010) for a definition of coherence,
$\dot\Gamma^\delta_{\text{uB}}$ and $\Gamma\models\varphi$. It was then shown by
[Sargsyan and Zhu](https://doi.org/10.2178/bsl.1901010) (Theorem 2.18) that this
hypothesis is equiconsistent to $\textsf{AD}+\Theta\text{ is regular}$.

Moving further up on the determinacy side, we get a lot of $\Theta$-theories, which is
[proven in to have the given (strict) ordering](https://doi.org/10.2178/bsl.1901010)
(Lemma 2.6). We then get to $\textsf{LSA}$:

> **Definition.** The Largest Suslin Axiom (LSA) is the statement that $\textsf{AD}^+$
> holds and for some ordinal $\alpha$, $\Theta=\theta_{\alpha+1}$ and $\theta_\alpha$
> is the largest Suslin cardinal $<\Theta$.

That $\textsf{LSA}$ is stronger than $\textsf{AD}\_{\mathbb R}+\Theta\text{ is Mahlo}$
[was shown by Kechris, Klienberg, Moschovakis and
Woodin](https://doi.org/10.1007/BFb0090236). [A very recent result by Sargsyan and
Trang](https://doi.org/10.48550/arXiv.2112.04396) (Theorem 10.3.1) shows that a Woodin
limit of Woodins is stronger than $\textsf{LSA}$.

With the result of Sargsyan and Trang at hand it is trivial that the top determinacy
theory $\textsf{AD}\_{\mathbb R} + \textsf{HOD}\models\Theta\text{ is a Woodin limit of
Woodins}$ is stronger than $\textsf{LSA}$ as well. [Sargsyan also
conjectured](https://doi.org/10.2178/bsl.1901010) that this last theory is
equiconsistent with a superstrong.

Going back to the large cardinal side we get various "hybrid Woodins". At the bottom we
have an iterable Woodin, or an $\omega\_1$-iterable Woodin, where an iterable cardinal
is a notion [invented by Gitman](https://doi.org/10.2178/jsl/1305810762):

> **Definition.** A cardinal $\kappa$ is iterable if for every $A\subseteq\kappa$ there
> is a transitive set $M$ of size $\kappa$, satisfying $\mathsf{ZFC}^-$, having
> $\kappa,A\in M$ and an $M$-measure $\mu$ on $\kappa$, which can be iterated through
> all the ordinals.

Starting off with an iterable Woodin $\delta$ and letting $\vec E\subseteq\delta$ be a
(code for an) extender sequence witnessing Woodinness, we can then find a
$\mathsf{ZFC^-}$-model $M$ in which $\delta$ is a measurable Woodin. By iterating it
out of the universe, we leave (many) Woodin limit of Woodins behind and end up in a
model of full $\mathsf{ZFC}$.

As for the other arrows in the diagram, [Gitman
showed](https://doi.org/10.2178/jsl/1305810762) that Ramseys are iterable and by
definition Ramseys are Jónsson. Measurables are also Ramsey by Rowbottom's theorem. The
last steps involve the notion of Hyper-Woodins and Shelahs, where hyper-Woodins were
[invented by
Schimmerling](https://www.ams.org/journals/proc/2002-130-11/S0002-9939-02-06455-9/), in
which he also showed the given ordering in the diagram above.

One thing to note is the rather peculiar state of a Jónsson Woodin - I'm at least not
aware of any upper bound except the trivial Ramsey Woodin one. Even though Jónssons and
Ramseys are equiconsistent, a result that is [due to
Mitchell](https://doi.org/10.2307/2586619), Jónssons have a lot lower actual strength
than Ramseys, in that they don't even have to be regular.

As for the current status of inner model theory and descriptive inner model theory,
[Neeman has built mice](https://doi.org/10.1016/S0168-0072(01)00103-8) containing a
Woodin limit of Woodins using "pure" inner model theoretic methods, which is the best
result to date. Using descriptive inner model theoretic methods, [Sargsyan and
Trang](https://doi.org/10.48550/arXiv.2112.04396) has produced certain hybrid mice
satisfying $\textsf{LSA}$, which is the current best result on the descriptive side.
Whether or not $\textsf{LSA}$ is equiconsistent to a Woodin limit of Woodins or if it's
strictly weaker is not known at this moment, as far as I can tell.

**EDIT 1:** $\textsf{LSA}$ is strictly below a Woodin limit of Woodins, shown by
Sargsyan and Trang - I've reflected this in the diagram now.
