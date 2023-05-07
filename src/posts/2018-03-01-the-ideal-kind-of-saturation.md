---
title: The Ideal Kind of Saturation
meta: A long time ago I made a blog post on the fascinating phenomenon of generic ultrapowers, where, roughly speaking, we start off with an ideal $I$ on some $\kappa$, force with the poset of $I$-positive sets and then the generic filter ends up being a $V$-measure on $\kappa$. If this sounded like gibberish then I'd recommend reading the aforementioned post first. The cool thing is that we can achieve all this without requiring any large cardinal assumptions! We're not guaranteed that the generic ultrapower is wellfounded however, but if it happens to be the case then we call $I$ precipitous. We have a bunch of other properties these ideals can satisfy however, usually involving the term 'saturation'. What's all that about and what's the connection to precipitousness?
tags: set theory, ideal theory
---

A long time ago I made a blog post on the fascinating phenomenon of generic
ultrapowers, where, roughly speaking, we start off with an ideal $I$ on some $\kappa$,
force with the poset of $I$-positive sets and then the generic filter ends up being a
$V$-measure on $\kappa$. If this sounded like gibberish then I'd recommend reading the
aforementioned post first. The cool thing is that we can achieve all this without
requiring any large cardinal assumptions! We're not guaranteed that the generic
ultrapower is wellfounded however, but if it happens to be the case then we call
$I$ precipitous. We have a bunch of other properties these ideals can satisfy however,
usually involving the term 'saturation'. What's all that about and what's the
connection to precipitousness?

Before we start, let's try to get a bit of motivation. First of all, precipitousness is
equiconsistent with a measurable, as witnessed by the following result which is Theorem
22.33 in [Jech](https://mathscinet.ams.org/mathscinet-getitem?mr=1940513).

> **Theorem.**
>
> 1. If $\kappa$ is a regular uncountable cardinal that carries a precipitous ideal,
>    then $\kappa$ is measurable in $L[A]$ for some set $A$;
> 2. If $\kappa$ is a measurable cardinal, then $\omega\_1$ carries a precipitous ideal
>    after forcing with $\text{Col}(\omega,{<}\kappa)$.

Even though the two notions have the same consistency strength they by no means have
the same _direct implication strength_, in that one can for instance have a precipitous
ideal on a successor cardinal, as witnessed in (2) above. To bridge this gap we use the
notion of _saturated ideals_. To save a few pixels we'll adopt the following
assumption.

<center><b>
All ideals on $\kappa$ considered here are assumed to be $\kappa$-complete and contain
all singletons.
</b></center>

Now, here's a definition.

> **Definition.** Let $\kappa$ be a regular uncountable cardinal and $I$ an ideal on
> $\kappa$. Then the saturation of $I$, denoted $\text{sat}(I)$, is the least ordinal
> $\gamma$ such that the forcing poset of $I^+$-positive subsets of $\kappa$ has the
> $\gamma$-chain condition.

With this notion at hand we say that $I$ is **$\lambda$-saturated** if
$\text{sat}(I)\leq\lambda$. [Tarski
('45)](https://mathscinet.ams.org/mathscinet-getitem?mr=17737) proved that
$\text{sat}(I)$ is always regular, so we can assume $\lambda$ to be regular.

Okay, I now want to argue that we can interpret the amount of saturation of an ideal on
$\kappa$ as "how far from being a measurable $\kappa$ is". First of all, note that
$\kappa$ is measurable if and only if there's a a 2-saturated ideal on $\kappa$, since
that forces the dual filter to be an ultrafilter and so we got a non-principal
$\kappa$-complete ultrafilter on $\kappa$. At the other end of the spectrum, note
that _every_ ideal on $\kappa$ will be $(2^\kappa)^+$-saturated, simply for size
reasons. This means that we eventually lose the precipitousness along this spectrum.
But where? It turns out that we can get incredibly close to the end of the spectrum and
still retain precipitousness.

> **Theorem.** Let $\kappa$ be a regular uncountable cardinal. Then every
> $\kappa^+$-saturated ideal on $\kappa$ is precipitous.

Nowadays it is custom to say that the ideal is **saturated** if it's $\kappa^+$-saturated,
so we'll adopt that convention here. I won't give a proof of the above theorem here,
but an important ingredient is that it's possible to reason _directly_, in V, about the
generic ultrapower: there are collections of functions in V which correspond to generic
functions defined on a measure one set, which are precisely the representatives for
elements of the generic ultrapower. We can even define a relation between these
collections of functions that correspond to membership between the corresponding
elements of the ultrapower! For more detail see section 22 in
[Jech](https://mathscinet.ams.org/mathscinet-getitem?mr=1940513).

Another notion which is used frequently when it comes to ideals like this
is presaturation. Since $I$ being saturated is the same thing as the $I^+$-forcing
having the $\kappa^+$-chain condition, this means in particular that all cardinals
$\geq\kappa^+$ are preserved in the generic extension. We can then weaken this and say
that $I$ is presaturated if it's precipitous and $\kappa^+$ is preserved in the generic
extension. Assuming precipitousness in the definition might seem like cheating and
indeed isn't always included, but [Foreman
('10)](https://mathscinet.ams.org/mathscinet-getitem?mr=2768692) shows that if
$2^\kappa=\kappa^+$ then presaturation does imply precipitousness (even more, the
generic ultrapower is closed under $\kappa$-sequences in the extension).

Now, I claimed that the route from measurability to precipitousness is a spectrum where
we gradually lose more and more direct implication strength, so let's delve into what
happens as we're walking along this spectrum. When we move from being measurable (=
2-saturated) to $\aleph\_1$-saturated then we lose measurability in general: namely,
either $\kappa$ is measurable or $\kappa\leq\mathfrak c$ and it's [_real-valued
measurable_](https://en.wikipedia.org/wiki/Measurable_cardinal#Real-valued_measurable).
As we traverse through the $\lambda<\kappa$ we still retain the [tree
property](https://en.wikipedia.org/wiki/Aronszajn_tree) at $\kappa$, but as soon as we
get to $\kappa$-saturation [Kunen
('78)](https://mathscinet.ams.org/mathscinet-getitem?mr=495118) showed that if $\kappa$
isn't measurable there's a $\kappa$-[Aronszajn
tree](https://en.wikipedia.org/wiki/Aronszajn_tree) and so the tree property fails. In
fact the tree is even a $\kappa$-[Suslin
tree](https://en.wikipedia.org/wiki/Suslin_tree), so the $\kappa$-[Suslin
hypothesis](https://en.wikipedia.org/wiki/Suslin%27s_problem) fails as well. We do keep
some strength however, as Lemma 22.27 in
[Jech](https://mathscinet.ams.org/mathscinet-getitem?mr=1940513) shows that we're
still stationary (in particular still weakly inaccessible).

<center>
  <img
    src="/src/assets/img/saturation-spectrum.webp"
    alt="A diagram showing the various ideal properties between measurable and
    precipitous"
    style="width: min(700px, 100%);"
    class="invert-on-darkmode"
  />
</center>

As we approach the finish line, saturation doesn't even imply that $\kappa$ is a limit
cardinal anymore, as [Shelah
('98)](https://mathscinet.ams.org/mathscinet-getitem?mr=1623206) showed that the
non-stationary ideal on $\aleph\_1$ can be saturated (Schindler has [written up a proof
of this result](https://ivv5hpp.uni-muenster.de/u/rds/sat_ideal_better_version.pdf)),
modulo the existence of a Woodin cardinal. Regularity is something we can't get rid of
however, as this has nothing to do with the saturation but is instead a consequence of
$\kappa$-completeness of our ideal, as [shown
here](https://math.stackexchange.com/a/170868/78298). This is a necessary requirement
as well, as [Johnson
('86)](https://mathscinet.ams.org/mathscinet-getitem?mr=860035) showed that if we don't
assume this completeness property then there can exist a precipitous ideal on a
singular cardinal.
