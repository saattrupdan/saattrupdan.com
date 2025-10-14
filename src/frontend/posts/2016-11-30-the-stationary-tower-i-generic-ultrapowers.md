---
title: The Stationary Tower I
subtitle: Generic Ultrapowers
meta: The stationary tower is a forcing notion developed by Woodin in the 80's which, assuming there exists a Woodin cardinal, provides us with an elementary embedding into a subset M of an generic extension of the universe which is closed under \<delta-sequences from the generic extension. Assuming a proper class of Woodins we can even make sure that M is equal to the generic extension!
tags: set theory, stationary tower
---

The stationary tower is a forcing notion developed by Woodin in the 80's which,
assuming there is a Woodin cardinal in $V$, provides us with an elementary embedding
$j:V\to M\subseteq V[G]$ satisfying that $V[G]\models{^{<\delta}}M\subseteq M$.
Assuming a proper class of Woodins we can even make sure that $M=V[G]$! Before we can
reach the tower we have to pass the obstacles along the way, the main one being the
notion of a generic ultrapower.

This post is part of a series on the stationary tower:

1. The Stationary Tower I - Generic Ultrapowers
2. <router-link to="/posts/2016-12-14-the-stationary-tower-ii">The Stationary Tower II - The Construction</router-link>

Let's start off with a non-helpful definition: A generic ultrapower is an ultrapower by
a generic ultrafilter. A Poincaré quote comes to mind.

Now, let's try to go for a definition of the more useful kind. The ultrafilter theorem
tells us that every filter can be extended to an ultrafilter, using the axiom of
choice. What about if we want to extend a filter to a normal ultrafilter? This can be
done, but then the resulting filter will always become principal, as otherwise we've
suddenly proven the existence of a measurable in ZFC! This extension can be done
though, but the resulting normal measure will lie in a generic extension.

Let's say we start off with some filter $F$ on some regular uncountable cardinal
$\kappa$. We can then form the dual ideal $I:=\\{\kappa-x\mid x\in F\\}$ and construct a
forcing notion $\mathbb P$ on $I^+:=P(\kappa)-I$ where $x\leq y$ iff $x-y\in I$ -- that
is, iff $x$ is 'almost' a subset of $y$. Letting $G$ be a generic for this forcing, it
turns out that $G$ is an ultrafilter. That it's a filter follows from $G$ being a
$\mathbb P$-filter and that it's $\mathbb P$-generic ensures that it has the ultra
property ($\\{x\in\mathbb P\mid x\subseteq A\lor x\subseteq\lnot A\\}$ is dense).

If we require that $I$ contains every final intial segment (i.e. that $I$ is uniform),
then this in turn implies that $G$ is uniform and in particular non-principal (with
respect to sets in $V$). If it's furthermore the case that $I$ is normal (i.e. that
every regressive function on an $I$-positive set is constant on an $I$-positive set),
then $G$ is normal! Let's check this last fact.

Say $f:x\to\kappa$ is regressive with $x\in G$. Then every $y\leq x$ has some $z\leq y$
such that $f$ is constant on $z$, by normality of $I$. But this means exactly that
$\\{y\leq x\mid f\text{ is contant on }w\\}$ is dense below $x$, so that there is some
$y\in G$ on which $f$ is constant, making $G$ normal, with respect to sets in $V$. All
in all, we've shown the following statement.

> **Proposition.** In $V[G]$, $G$ is an ultrafilter, which is $V$-uniform if $I$ is
> uniform, and which is $V$-normal if $I$ is normal.

This is exactly what is called the generic ultrafilter, and using it we can form the
ultrapower $j:V\to\text{Ult}(V,G)$. Now, this construction of course relies on the fact
that we can actually find such a uniform normal ideal. But we in fact have a canonical
such one, the non-stationary ideal

$$ \text{NS}\_\kappa:=\\{x\subseteq\kappa\mid x\text{ is non-stationary}\\}, $$

which furthermore enjoys the property of being the least of all such. But what we want
on top of all this, however, is that the generic ultrapower is wellfounded. We say that
the ideal $I$ is precipitous if the empty condition forces that the ultrapower is
wellfounded. It is open whether or not any large cardinal notion implies the existence
of a precipitous ideal on $\omega\_1$ -- it's been shown that a Woodin cardinal does
not. We do have the following theorem however:

> **Theorem (Foreman, Magidor, Shelah).** If $\delta$ is a Woodin cardinal, then the
> Levy collapse $\text{Col}(\omega_1,<\delta)$ forces that $\text{NS}\_{\omega\_1}$ is
> precipitous.

So! Assuming a Woodin exists, we can actually force that we get a generic well-founded
ultrapower $j:V\to\text{Ult}(V,G)$, with critical point $\omega_1^V$. This means that

$$ V[G]\models{^\omega}\text{Ult}(V,G)\subseteq\text{Ult}(V,G). $$

A natural question then arises: can this be improved? Can we construct some forcing
which gives us a generic ultrapower with more closure than $\omega$-sequences, maybe
assuming something more than a Woodin? This turns out to be possible, even just with
a single Woodin still. This is exactly the stationary tower, which we'll get to in the
next blog post.
