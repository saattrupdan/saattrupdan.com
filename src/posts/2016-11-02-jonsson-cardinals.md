---
title: Jónsson Cardinals
meta: Jónsson cardinals are some really strange creatures. They are large cardinals and consistency-wise they lie above zero sharp, but they don't have to be strongly inaccessible, or even regular. It turns out that K nevertheless computes the successors of all Jónsson cardinals correctly!
tags: set theory, jonsson cardinals
---

Jónsson cardinals are some really strange creatures. They are large cardinals and
consistency-wise they lie above $0^\sharp$, but they don't have to be strongly
inaccessible, or even regular. It turns out that $K$ nevertheless computes the
successors of all Jónsson cardinals correctly! But before delving into that story,
let's try to understand how these cardinals behave.

This post is part of a series on genericity iterations:

1. Jónsson Cardinals
2. <router-link to="/posts/2016-11-16-jonsson-cardinals-and-the-core-model">Jónsson Cardinals and the Core Model</router-link>
3. <router-link to="/posts/2017-07-28-jonsson-successors-of-singulars">Jónsson Successors of Singulars</router-link>

A good place to start would probably be to define these odd beasts. As with several of
the large cardinals in this domain, several equivalent definitions arise.

> **Definition.** A Jónsson cardinal $\kappa$ is a cardinal satisfying one,
> equivalently all, or the following:
>
> 1. Any algebra (that is, a structure $\left\<A,f\_n\right>\_{n<\omega}$) of size
>    $\kappa$ has a proper subalgebra of size $\kappa$.
> 2. For any first-order language $L$ and any $L$-structure $M$ of size $\kappa$ there
>    is a proper elementary substructure $\bar{M}\prec M$ of size $\kappa$.
> 3. For any predicate $A$, there is an elementary substructure $\left\<X,\in,\bar
>    A\right>\prec\left\<V_\kappa,\in,A\right\>$ of size $\kappa$ and such that
>    $X\cap\kappa\neq\kappa$.
> 4. $\kappa\to[\kappa]^{<\omega}\_\kappa$.

Here the fourth definition means that given any colouring
$c:[\kappa]^{<\omega}\to\kappa$ we can find a subset $H\subset\kappa$ such that
$c"[H]^n\neq\kappa$ for each $n<\omega$ -- that is, $c$ will admit at least one colour
when colouring subsets of size $n$ of $H$. Jónsson cardinals lie in the "Ramsey-area"
of the large cardinal hierarchy:

<img
  src="/src/assets/img/jonsson.webp"
  style="width: min(500px, 100%);"
  class="centered-image"
/>

A quick fun fact we can deduce is that Jónsson cardinals have to be uncountable.

> **Fun fact.** $\omega$ is not Jónsson.

**Proof.** We're going to use definition 1 here. Let $f:\omega\to\omega$ be defined as
$f(n):=n-1$. Then $\left<\omega,f\right\>$ is an algebra with no proper infinite
subalgebras. **QED**

We can push this lower bound for the least Jónsson a bit higher:

> **Proposition (Chang, Rowbottom, Erdös-Hajnal).** If $\kappa$ isn't Jónsson then
> neither is $\kappa^+$.

**Proof.** Now we're using definition 4. Let $c_\alpha$ be colourings witnessing that
$\alpha\not\to[\kappa]\_\alpha^{<\omega}$. Define then a colouring
$c:[\kappa^+]^{<\omega}\to\kappa^+$ as $c(s):=c_\alpha(s-\\{\alpha\\})$ if
$\alpha\leq\sup s$ and $c(s):=0$ otherwise. We have to show that $c$ uses all colours
on any $H\in[\kappa^+]^{\kappa^+}$, so let $\xi<\kappa^+$ be a colour. Pick
$\alpha>\xi$ such that $|H\cap\alpha|=\kappa$. Then by definition of $c_\alpha$, there
is some $s\in[H\cap\alpha]^{<\omega}$ such that $c_\alpha(s)=\xi$, as $c_\alpha$ uses
all colours. But then $c(s\hat{\ }\\{\alpha\\})=c_\alpha(s)=\xi$. **QED**

This then means that $\aleph_\omega$ is now the lowest bound for the least Jónsson.
Whether or not it actually is Jónsson, is open. We do have the following results
however:

> **Theorem.**
>
> - (Shelah) $\aleph_{\omega+1}$ is not Jónsson.<br>
> - (Rowbottom-Devlin) The least Jónsson has either countable cofinality or is weakly
>   inaccessible.

Instead of proving the theorem, let's try to establish the above position of Jónsson
cardinals in the large cardinal hierarchy. Ramsey cardinals are always Jónsson, using
definition 4 above, so we're left to prove that Jónsson cardinals consistency-wise
implies that every real has a sharp. But this is again a direct implication: Let
$M\prec\left\<L_\kappa[x],\in,x\right\>$ be a proper elementary substructure with
$\kappa$ Jónsson, $x$ a real and $|M|=\kappa$. Then by elementarity we get that
$M\cong\left\<L_\kappa[\bar x],\in,\bar x\right\>$ for some real $\bar x$. But since
$\text{trcl}(x)\subseteq M$, $\bar x=x$. Then we have a non-trivial elementary embedding
$j:L_\kappa[x]\to L_\kappa[x]$, which is equivalent to $x^\sharp$ by a famous result by
Kunen.

In the next post we'll take a look at how these cardinals are being treated inside the
core model $K$.
