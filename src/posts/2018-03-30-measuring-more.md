---
title: Measuring More
meta: It's quite standard nowadays to characterise the measurable cardinals as the cardinals kappa such that there exists a normal kappa-complete non-principal measure on kappa. As we continue climbing the large cardinal hierarchy we get to the strong cardinals, Woodin cardinals and superstrong cardinals, all of which are characterised by extenders, which can be viewed as particular sequences of normal measures on kappa. This trend then stops, and there's a shift from measures on subsets of some lambda with cardinality less than kappa. Now, how does one work with such measures? Where are the differences between our usual measures and these kinds? And how can we view this shift as expanding the amount of things that we can measure?
tags: set theory
---

It's quite standard nowadays to characterise the measurable cardinals as the cardinals
$\kappa$ such that there exists a normal $\kappa$-complete non-principal measure on
$\kappa$. As we continue climbing the large cardinal hierarchy we get to the strong
cardinals, Woodin cardinals and superstrong cardinals, all of which are characterised
by extenders, which can be viewed as particular sequences of normal measures on
$\kappa$. This trend then stops, and there's a shift from measures on $\kappa$ to
measures on $P_\kappa(\lambda)$, being the set of subsets of $\lambda$ of cardinality
less than $\kappa$. Now, how does one work with such measures? Where are the
differences between our usual measures and these kinds? And how can we view this shift
as expanding the amount of things that we can measure?

![Picture of planets from outer space](/src/assets/img/measuring-more.webp)

Before we start, let's note that the step from measures on $\kappa$ to measures on
$P_\kappa(\lambda)$ is a simple matter of generalisation. Because if $\mu$ is a
non-principal measure on $\kappa$,then we can associate to $\mu$ a filter $\nu$ on
$P_\kappa(\kappa)$ by setting

$$ X\in\nu\text{ iff }\\{\sup(\sigma)\mid\sigma\in X\\}\in\mu. $$

Note that non-principality implies that $\nu$ is a measure as well and it furthermore
satisfies that whenever $\xi\in\kappa$, the set of all $\sigma\in P_\kappa(\kappa)$
satisfying that $\xi\in\sigma$ is in $\nu$; we say that $\nu$ is **fine**. Now, if we
started off with a fine measure $\nu$ on $P_\kappa(\kappa)$ then we could've defined
$\mu\subseteq P(\kappa)$ as

$$ X\in\mu\text{ iff }\\{\sigma\mid\sup(\sigma)\in X\\}\in\nu. $$

Note here fineness of $\nu$ ensures that $\mu$ is a non-principal measure on $\kappa$,
showing the equivalence between the existence of these two different types of measures.
We furthermore see that $\kappa$-completeness for $\mu$ is equivalent to
$\kappa$-completeness for $\nu$. This leads us to the definition of strong compactness.

> **Definition.** Let $\kappa\leq\lambda$ be cardinals. Then $\kappa$
> is $\lambda$-strongly compact if there exists a $\kappa$-complete fine measure on
> $P_\kappa(\lambda)$. We also simply say that $\kappa$ is strongly compact if it's
> $\lambda$-strongly compact for all $\lambda\geq\kappa$.

The above argument then shows that $\kappa$ being measurable is equivalent to it being
$\kappa$-strongly compact, and considering larger $\lambda$ then gives us a natural way
to improve the strength of measurability. This is somehow orthogonal to the extender
approach, as that approach ensures that we can measure subsets of $\kappa$ in many
different (coherent) ways, and this other approach is instead about measuring subsets
of cardinals greater than $\kappa$.

Recall that a measure $\mu$ on $\kappa$ is normal if for every $\kappa$-sequence
$\left\< X_\alpha\mid\alpha<\kappa\right\<\in{^\kappa}\mu$ of measure one sets,
the **diagonal intersection** $\triangle\vec X$ has measure one as well, where

$$ \triangle\vec X:=\\{\xi<\kappa\mid\xi\in\bigcap_{\alpha<\xi}X_\alpha\\}. $$

Analogously, normality of a measure $\nu$ on $P_\kappa(\lambda)$ is precisely the same,
except that we define the diagonal intersection slightly differently. If we let
$\left\< Y_\alpha\mid\alpha<\kappa\right\<\in{^\lambda}\nu$ be a $\lambda$-sequence of
measure one sets, then we set

$$
\triangle\vec Y :=
\\{\sigma\in P_\kappa(\lambda)\mid\sigma\in\bigcap_{\alpha\in\sigma}Y_\alpha\\},
$$

and again $\nu$ is **normal** if $\triangle\vec Y\in\nu$ for every $\vec
Y\in{^\lambda}\nu$.

Now note that, in the $\lambda=\kappa$ case, the normality of $\mu$ is equivalent to
normality of $\nu$, in the sense of the above. The argument uses $\kappa$-completeness,
which we may assume since normality of a measure on $P_\kappa(\lambda)$ does imply
$\kappa$-completeness (here it's important that we're looking at ${<}\kappa$-sized
subsets). We arrive at supercompacts.

> **Definition.** Let $\kappa\leq\lambda$ be cardinals. Then $\kappa$
> is $\lambda$-supercompact if there exists a normal fine measure on
> $P_\kappa(\lambda)$. We also simply say that $\kappa$ is supercompact if it's
> $\lambda$-supercompact for all $\lambda\geq\kappa$.

As the existence of a normal measure on $\kappa$ is equivalent to the existence of a
$\kappa$-complete one, the above argument then also shows that measurability is also
equivalent to being $\kappa$-supercompact! As we increase $\lambda$ however,
$\lambda$-supercompactness diverges from $\lambda$-strongly compactness.

Taking a step back, we can also start talking about club and stationary subsets of
$P_\kappa(\lambda)$, in complete analogy with the usual terminology. We say that a
subset $C\subseteq P_\kappa(\lambda)$ is **closed** if it's closed under unions,
and **unbounded** if for every $\sigma\in P_\kappa(\lambda)$ there's a $\tau\in C$ such
that $\sigma\subseteq\tau$. $C$ is then **club** if it's both closed and unbounded, and
a subset $S\subseteq P_\kappa(\lambda)$ is **stationary** if it meets all clubs. If we
then look at the collection of stationary sets of $P_\kappa(\lambda)$ this suddenly
makes an appearance in the realm of Woodin cardinals, as the stationary tower forcing.
