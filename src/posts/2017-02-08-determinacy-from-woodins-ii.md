---
title: Determinacy From Woodins II
meta: This is a continuation of my last post on determinacy, where we began the proof of projective determinacy. We've reduced the statement to showing that every projective set is homogeneously Suslin, which will be shown here, modulo a key lemma from Martin and Steel (1989).
tags: set theory, determinacy
---

This is a continuation of my last post on determinacy, where we began the proof of
projective determinacy. We've reduced the statement to showing that every projective
set is homogeneously Suslin, which will be shown here, modulo a key lemma from [Martin
and Steel (1989)](https://doi.org/10.2307/1990913).

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
3. Determinacy From Woodins II
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

As previously mentioned we will inductively show that every $\bf\Pi^1\_1$ set is
homogeneously Suslin, assuming a measurable above a limit of Woodins. The start of the
induction is the following theorem, derived from Martin's proof of
$\bf\Pi^1\_1$-determinacy from a measurable.

> **Theorem (Martin, '70).** Suppose $\kappa$ is a measurable cardinal. Then every
> $\bf\Pi^1\_1$ set is $\kappa$-homogeneously Suslin.

I'll here define the tree and measures that witness this fact, but without showing that
it works. For the interested reader, this is 32.1 and 31.1 in
[Kanamori](https://doi.org/10.1007/978-3-540-88867-3). Fix some $\bf\Pi^1\_1$ set
$A\subseteq{^\omega\omega}$. By the characterisation of $\bf\Pi^1\_1$ sets (see
[Kanamori, 13.1]) we can find a tree $T$ on $\omega\times\omega$ such that, given any
$x\in{^\omega\omega}$,

$$ x\in A\text{ iff }T\_x\text{ is wellfounded.} (1) $$

Fix some recursive enumeration ${^{<\omega}\omega}=\\{s\_i\mid i<\omega\\}$ and define
for each $x\in{^\omega\omega}$ a strict linear ordering $<\_x$ on $\omega$ as $i<\_x j$
iff

$$
s\_i\notin T\_x\land s\_j\notin T\_x\land i < j\text{ or }s\_i\notin T\_x\land s\_j\in
T\_x\text{ or }s\_i\in T\_x\land s\_j\in T\_x\land s\_i<\_{\text{KB}}s\_j,
$$

where $<\_{\text{KB}}$ is the Kleene-Brouwer ordering of ${^{<\omega}\omega}$. We then
see by (1) that

$$ x\in A\text{ iff }<\_x\text{ is a wellordering on }\omega. (2) $$

Given any $s\in{^{<\omega}\omega}$ define $T_{\langle
s\rangle}:=\\{t\in{^{<\omega}\kappa}\mid \exists n<|s|:\langle s\upharpoonright
n,t\rangle\in T\\}$ and furthermore set $<\_s$ to be the ordering on $|s|$ defined
exactly as $<\_x$ but replacing $T\_x$ with $T_{\langle s\rangle}$. Note that
$s\subseteq t\Rightarrow <\_s\subseteq <\_t$ and
$<\_x=\bigcup_{n<\omega}<\_{x\upharpoonright n}$ for any $x\in{^\omega\omega}$. We can
now define the tree we're interested in as

$$
T^\*:=\\{\langle s,t\rangle\mid\forall i,j<|s|:t\_i < t\_j\leftrightarrow i<\_s j\\}.
$$

Note here that the second coordinates are providing witnesses for the wellfoundedness
of the ordering associated to the first coordinate. By (2) we then see that indeed,
$p[T^\*]=A$. So far so good. As for the measures, letting $\mu$ be a normal measure on
$\kappa$, define for each $s\in{^{<\omega}\omega}$

$$
\mu\_s:=\\{x\subseteq T^\*\_s\mid\exists H\in\mu:[H]^{|s|}\subseteq\text{ran}"x\\}.
$$

To see that this works one uses that $\kappa\rightarrow(\mu)^{<\omega}$ holds by
Rowbottom's theorem -- see details in 32.1 and 32.2 in [Kanamori](https://doi.org/10.1007/978-3-540-88867-3).

Having covered the base case we then want to go from assuming that every $\bf\Pi^1_n$
set is homogeneously Suslin to the corresponding fact about $\bf\Pi^1_{n+1}$ sets.
Firstly, we need to weaken the notion of a homogeneously Suslin set.

> **Definition(s).** A tree $T$ over $^k\omega\times X$ for any set $X$ is
> $\kappa$-weakly homogeneous if there exists a countable set $\sigma$ of
> $\kappa$-complete measures such that for any $x\in p[T]$ there is a countably
> complete towert $\langle\mu\_n\mid n<\omega\rangle\in{^\omega\sigma}$ with
> $T_{x\upharpoonright n}\in\mu\_n$ for every $n<\omega$.

A set $A\subseteq{^k({^{<\omega}\omega})}$ is then $\kappa$-weakly homogeneously Suslin
if $A=p[T]$ for a $\kappa$-weakly homogeneous tree, and weakly homogeneously Suslin if
it's $\kappa$-weakly homogeneously Suslin for some $\kappa$.

An alternative characterisation of the weakly homogeneously Suslin sets is that
$A\subseteq{^k({^{<\omega}\omega})}$ is $\kappa$-weakly homogeneously Suslin iff $A=pB$
for some $\kappa$-homogeneously Suslin set $B\subseteq{^{k+1}({^{<\omega}\omega})}$
(see 32.3 in [Kanamori](https://doi.org/10.1007/978-3-540-88867-3)). The following fact
is then the crucial connection between the homogeneously Suslin sets and their weak
variants.

> **Key Lemma (Martin-Steel, '89).** Let $\delta$ be a Woodin cardinal and fix some
> $A\subseteq{^\omega\omega}$. Then if $A$ is $\delta^+$-weakly homogeneously Suslin,
> $\lnot A$ is $\alpha$-homogeneously Suslin for every $\alpha<\delta$.

This is the main theorem in [Martin and Steel (1989)](https://doi.org/10.2307/1990913),
and for the purposes of this post we'll just black box the result. Using this Key Lemma
we can now prove projective determinacy.

> **Theorem (Martin-Steel, '89).** Assume there exist $n$ Woodins and a measurable
> above. Then $\bf\Pi^1_{n+1}$ determinacy holds.

**Proof.** Let $\langle \delta_{i+1}\mid i < n\rangle$ be an increasing enumeration of
the Woodins, set $\delta\_0:=\omega$ and let $\kappa>\delta\_n$ be the measurable. For
each $i < n$ fix some ordinal $\alpha\_i\in(\delta\_i,\delta_{i+1})$ and set
$\alpha\_n:=\kappa$. We will show by induction on $i$ that every $\bf\Pi^1_{i+1}$ set
is $\alpha_{n-i}$-homogeneously Suslin for every $i\in[0,n]$.

For $i=0$ we get the result by the above theorem due to Martin. Assume now that every
$\bf\Pi^1_{i+1}$ set is $\alpha_{n-i}$-homogeneously Suslin for some $i < n$ and fix
some $\bf\Pi^1_{i+2}$ set $A\subseteq{^k({^\omega\omega})}$. By definition of
$\bf\Pi^1_{i+2}$ we can fix some $\bf\Pi^1_{i+1}$ set
$B\subseteq{^{k+1}({^\omega\omega})}$ such that $A=\lnot pB$.

By our inductive hypothesis $B$ is $\alpha_{n-i}$-homogeneously Suslin, so that $\lnot
A$ is $\alpha_{n-i}$-weakly homogeneously Suslin by the above alternative
characterisation of the weakly homogeneously Suslin sets. Since
$\delta_{n-i}\in(\alpha_{n-(i+1)},\alpha_{n-i})$, the Key Lemma implies that $A$ is
$\alpha_{n-(i+1)}$-homogeneously Suslin. As homogeneously Suslin sets are determined,
we're done. **QED**

So, modulo the Key Lemma, a result I might or might not write up a proof of at some
point, we've shown projective determinacy from infinitely many Woodins and a measurable
above. It turns out that from this hypothesis it's even possible to prove that all sets
of reals in $L(\mathbb R)$ are determined, a tremendous result due to Woodin, which
will be covered next time.
