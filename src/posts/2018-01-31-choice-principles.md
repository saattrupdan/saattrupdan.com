---
title: Choice Principles
meta: The axiom of choice, by which I mean that every collection of non-empty sets has a choice function, is usually an axiom most working mathematicians accept without further thought. But in set theory we usually get ourselves into situations where we simply cannot have (full) choice --- most notably in determinacy scenarios, giving rise to several weakened forms of choice. AC might seem like an isolated axiom without much direct connection to other axioms, as we usually simply assume choice and get on with our day. But choice is in fact implied by the generalised continuum hypothesis GCH, which can then also be seen as a choice principle, and choice even¬†forces us to work in classical logic.
tags: set theory, axiom of choice
---

The axiom of choice, by which I mean that every collection of non-empty sets has a
choice function, is usually an axiom most working mathematicians accept without further
thought. But in set theory we usually get ourselves into situations where we simply
cannot have (full) choice --- most notably in determinacy scenarios, giving rise to
several weakened forms of choice. $\textsf{AC}$ might seem like an isolated axiom
without much direct connection to other axioms, as we usually simply assume choice and
get on with our day. But choice is in fact implied by the generalised continuum
hypothesis $\textsf{GCH}$, which can then also be seen as a choice principle, and
choice even forces us to work in classical logic.

![A woman standing at a crossroads](/src/assets/img/choice-principles-intro.webp)

First of all, let's recall a few well-known weakened versions of $\textsf{AC}$. Firstly
there's the Axiom of Dependent Choices $\textsf{DC}$, stating that whenever R is a
binary relation satisfying that $\forall x\exists y R(x,y)$, there's an
$\omega$-sequence $(x\_n)\_{n<\omega}$ such that $R(x\_n,x_{n+1})$ for every $n<\omega$.
Secondly we got the Axiom of Countable Choice $\textsf{AC}\_\omega$, saying that every
non-empty countable set has a choice function. It's not too hard to show that
$\textsf{AC}\Rightarrow\textsf{DC}\Rightarrow\textsf{AC}\_\omega$, but these have
further been shown to not be reversible. Solovay built his famous Solovay Model in
1970, which in particular satisfies $\textsf{DC}$ and not $\textsf{AC}$, separating the
two. As for the separation of $\textsf{AC}\_\omega$ and $\textsf{DC}$, this is
accomplished by building a certain symmetric extension --- see Theorem 8.12 in Jech's
"The Axiom of Choice" for more details.

$\textsf{AC}$ is already a powerful axiom, as is perhaps manifested in the theorem
stating that it actually implies classical logic, i.e. the law of excluded middle
$\textsf{LEM}$, a result which was proven by Diaconescu. Curiously, this does indeed
require full choice, as it's still consistent to work intuitionistically with
weakenings such as $\textsf{DC}$.

> **Theorem (Diaconescu '75).** $\textsf{IZF}\vdash\textsf{AC}\to\textsf{LEM}$.

If we now choose to strengthen the principles even further, we for instance have Global
Choice, which is a class principle saying that there's a class function $f:V\to V$ such
that $f(x)\in x$ for every  non-empty set $x\in V$ --- a sort of a "uniform choice". As
is shown in Jech's chapter on HOD, this turns out to be equivalent to $V=\textsf{HOD}$.
A natural way to strengthen this even further then is to consider the axiom $V=L$,
which can then be seen as a (very strong) choice principle. Along the way to $V=L$ it
seems we've skipped an axiom however, as $V=L$ in particular implies $\textsf{GCH}$,
which a surprising theorem of Sierpiński's implies $\textsf{AC}$!

> **Theorem (Sierpiński '45).** $\textsf{ZF}\vdash\textsf{GCH}\to\textsf{AC}$.

A proof of this theorem can also be found in Paul Cohen’s "Set Theory and the Continuum
Hypothesis". It would then seem reasonable that $\textsf{CH}$ should also imply
$\textsf{AC}\_\omega$, but this is false, as shown in Theorems 3.2 and 3.6 of Truss
('73). We can get some of the way however: if we assume both $\textsf{CH}$ and
$\textsf{CH}\_\mathfrak{c}$ then we get that the reals can be well-ordered, a result
which Caicedo attributes to Specker. Whether $\textsf{CH}$ is enough to get this
conclusion is open (at least it was back in 2013, again according to Caicedo).

Okay, so that was quite a handful of axioms. Note that all of these choice principles
are equiconsistent (modulo $\textsf{ZF}$), simply because $\textsf{ZF}+V=L$ is
equiconsistent with $\textsf{ZF}$. The interesting connections between the choice
principles are therefore the direct implications --- here's an overview:

<center>
  <img src="/src/assets/img/choice-principles.webp" style="width: min(500px, 100%);"
  class="invert-on-darkmode" />
</center>

As mentioned above, we cannot reverse the implications
$\textsf{AC}\Rightarrow\textsf{DC}\Rightarrow\textsf{AC}\_\omega$. This still remains
true for all the other implications:

1. McAloon ('70) shows that $V=\textsf{HOD}\not\Rightarrow\textsf{CH}$ is consistent;
2. Hamkins-Reitz-Woodin ('08) contains a proof that $\textsf{GCH}\not\Rightarrow
   V=\textsf{HOD}$ is consistent. This is not the original source however, as it's
   attributed to folk lore.

This shows that $V=\textsf{HOD}$ and $\textsf{GCH}$ are independent of each other
(modulo $\textsf{ZFC}$), which then also implies that the implications $V=L\Rightarrow
V=\textsf{HOD}\Rightarrow\textsf{AC}$,
$V=L\Rightarrow\textsf{GCH}\Rightarrow\textsf{AC}$ and
$\textsf{GCH}\Rightarrow\textsf{CH}$ are irreversible.

We could modify the above diagram by replacing $L$ with any fine-structural extender
model, as these satisfy both $V=\textsf{HOD}$ and $\textsf{GCH}$. Of course we weaken
the axiom by doing this, so another way to phrase the inner model programme is then
that we (in particular) want to find the weakest such axiom implying both
$V=\textsf{HOD}$ and $\textsf{GCH}$.

Another curious recent development is concerned with the so-called choiceless large
cardinals, which are large cardinals such as Reinhardt cardinals and beyond. All of
these are inconsistent with $\textsf{AC}$ by the Kunen inconsistency, but Koellner has
even shown that a so-called Berkeley cardinal of countable cofinality is inconsistent
with $\textsf{DC}$! Whether these cardinals can actually exist is a different story.

_I want to thank Mohammad Golshani for bringing my attention to several of the results
I've used here, and Asaf Karagila for correcting my statement that whether
$\textsf{CH}$ implies $\textsf{AC}\_\omega$ is open --- it's false, by the above
reference to Truss ('73)._
