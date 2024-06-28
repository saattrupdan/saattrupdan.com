---
title: Separating Atoms
meta: Some of the first properties we learn about forcing notions are the notions of being atomless and being separative. Usually any kind of analysis of these terms are left out, as "all forcings we care about are atomless and separative", so this post will be dedicated to taking a slightly closer look at these properties.
tags: set theory, forcing
---

Some of the first properties we learn about forcing notions are the notions of
being atomless and being separative. Usually any kind of analysis of these terms are
left out, as "all forcings we care about are atomless and separative", so this post
will be dedicated to taking a slightly closer look at these properties.

Let's start off by remembering what we're dealing with.

> **Definition.** A forcing notion $\mathbb P$ is...
>
> - **atomless** if every condition has two incompatible extensions.
> - **separative** if for every $p,q\in\mathbb P$, $p\leq q$ implies that there's an
>   $r\leq p$ such that $r\perp q$.
> - **pruned** if every condition has a proper extension.

Starting with atomlessness, the following proposition is the reason why we care about
this property.

> **Proposition.** A forcing $\mathbb P$ is atomless iff $\mathbb P$ has no generic
> filters in $V$.

**Proof**. $(\Rightarrow)$: If $\mathbb P$ is atomless and $g\subseteq\mathbb P$ is a
generic filter, then define $D:=\mathbb P-g$. Let $p\in\mathbb P$ be arbitrary. By
atomlessness we get two incompatible extensions $q,r\leq p$, so that at least one of
them has to be an element of $D$, making $D$ dense. But then $D\cap g=\emptyset$, a
contradiction.

$(\Leftarrow)$: Assume $p\in\mathbb P$ is an atom, meaning that every two extensions of
$p$ are compatible. Let $g$ be the set of all conditions comparable with $p$, which is
then a filter since $p$ is an atom. It's also generic since every dense set will
contain a condition below $p$. **QED**

This also shows that atomlessness is a forcing invariant: if two forcings are forcing
equivalent then either they're both atomless or neither is. Why we care about
separativeness is a bit more elusive. Firstly we do have the following:

> **Theorem.** A forcing $\mathbb P$ is separative iff $\mathbb P$ embeds densely into
> a complete boolean algebra $\mathbb B$.

**Proof**. $(\Leftarrow)$ is easy to check, so we'll show $(\Rightarrow)$. Let a subset
$U\subseteq\mathbb P$ be a cut if it's downwards closed with respect to $\mathbb P$'s
ordering. To every $p\in\mathbb P$ let $U\_p:=\\{q\in\mathbb P\mid q\leq p\\}$. Say that
a cut $U$ is regular if $\forall p\in\mathbb P-U\exists q\leq p: U\_q\cap U=\emptyset$.
The topological analogue here is that cuts are open sets and regular cuts are clopen
sets.

Now note that separativity of $\mathbb P$ implies that every $U\_p$ is regular. Again,
the analogue here is that when we're dealing with trees then all the basic open sets
are clopen. Now simply let $\mathbb B$ be the set of all regular cuts of $\mathbb P$
and note that to every cut $U$ there's a least regular cut containing it; namely,

$$ \overline U:=\\{p\in\mathbb P\mid\forall q\leq p: U\cap U_q\neq\emptyset\\}. $$

We can therefore let $U\cdot V:=U\cap V$, $U+V:=\overline{U\cup V}$ and
$-U:=\\{p\in\mathbb P\mid U\_p\cap U=\emptyset\\}$. Since any intersection of regular
cuts is regular, $\mathbb B$ is complete. We can now define $i:\mathbb P\to\mathbb B$
as $i(p):=U\_p$, which is clearly a dense embedding. **QED**

The only thing separativity is giving us in the above theorem is injectivity of the
embedding however, as any forcing is strongly forcing equivalent to a separative one:

> **Theorem.** To every forcing $\mathbb P$ there exists a separative forcing $\mathbb
> Q$, called the separative quotient, and a dense order-preserving map $\pi:\mathbb
> P\to\mathbb Q$ such that $p\perp q\Leftrightarrow\pi(p)\perp\pi(q)$ for all
> $p,q\in\mathbb P$.

**Proof**. Surprisingly, $\mathbb Q$ will be a quotient of $\mathbb P$. We define
$p\sim q$ iff they are compatible with exactly the same things in $\mathbb P$. This can
be shown to be an equivalence relation, so let $\mathbb Q:=\mathbb P/\sim$, which can
be shown to be a separative forcing, and the quotient map $\pi:\mathbb P\to\mathbb Q$
satisfies the wanted. **QED**

This also shows that being separative is not a forcing invariant, in contrast with
atomlessness.

As for the relationship between being atomless and being separative, note first of all
that every pruned separative forcing is atomless. But aside from that we don't really
get any implications between the two:

> **Proposition.** There exists a separative forcing which isn't atomless, and an
> atomless forcing which isn't separative.

**Proof**. For the first bit, let $\mathbb P$ to be the following forcing, which is
easily seen to be separative and not atomless:

<img
  src="/src/assets/img/separating-atoms-1.webp"
  alt="a diagram of a forcing with a single root element and two leaves, p and q"
  style="width: min(500px, 100%);"
  class="invert-on-darkmode centered-image"
/>

For the second one, let $\mathbb Q$ be the following forcing, which is the union of a
full binary tree with an extra element $p\in\mathbb Q$ with the following relations:

<img
  src="/src/assets/img/separating-atoms-2.webp"
  alt="a diagram of a forcing being a full binary tree with an extra element p, which
  is not comparable an element q"
  style="width: min(500px, 100%);"
  class="invert-on-darkmode centered-image"
/>

It's clearly atomless and note that $p\not\leq q$ but any condition below $p$ will be
compatible with $q$, making it non-separative. **QED**

So, I suppose we can think of the atomless forcings as being the 'non-trivial ones',
and the separative forcings as the 'well-behaved ones'. In most cases we'd therefore
want both, and we note that being separative and atomless is the same thing as being
separative and pruned. If we take the boolean algebraic approach to forcing then
restricting ourselves to separative pruned forcings would correspond to restricting
ourselves to
[atomless](https://math.stackexchange.com/questions/110011/an-atom-in-boolean-algebra/110032#110032)
complete boolean algebras, which seems quite reasonable.
