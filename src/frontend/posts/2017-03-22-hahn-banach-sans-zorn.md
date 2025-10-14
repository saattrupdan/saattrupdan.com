---
title: Hahn-Banach Sans Zorn
meta: The Hahn-Banach Theorem in functional analysis is the theorem saying more or less that normed vector spaces have many bounded linear functionals. The theorem is usually proven via Zorn's lemma, giving the impression that Hahn-Banach uses the full power of choice. I'll here give a proof based on the ultrafilter lemma, that every filter can be extended to an ultrafilter. One of the benefits of this approach, besides relying on a (strictly) weaker assumption, is that we get a little more information about how the functionals are constructed. The idea is that the ultrafilters allow us to "glue" functionals together.
tags: set theory, axiom of choice
---

The Hahn-Banach Theorem in functional analysis is the theorem saying more or less that
normed vector spaces have many bounded linear functionals. The theorem is usually
proven via Zorn's lemma, giving the impression that Hahn-Banach uses the full power of
choice. I'll here give a proof based on the ultrafilter lemma, that every filter can be
extended to an ultrafilter. One of the benefits of this approach, besides relying on a
(strictly) weaker assumption, is that we get a little more information about how the
functionals are constructed. The idea is that the ultrafilters allow us to "glue"
functionals together. [A latex'ed version can be found
here](/notes/hahn-banach-sans-zorn.pdf).

This post is part of my series on choiceless set theory:

1. <router-link to="/posts/2017-03-08-choiceless-non-free-algebras">Choiceless
   Non-Free Algebras</router-link>
2. Hahn-Banach Sans Zorn
3. <router-link to="/posts/2018-01-31-choice-principles">Choice
   Principles</router-link>
4. <router-link to="/posts/2018-12-10-closure-distributivity-and-choice">Closure,
   Distributivity and Choice</router-link>

Let's start off with reviewing what Hahn-Banach is actually saying. First of all, say
that a seminorm on a vector space $X$ is a function $p:X\to\mathbb R$ such that

1. (Non-negative) $p(x)\geq 0$;
2. (Subadditivity) $p(x+y)\leq p(x)+p(y)$;
3. (Absolute homogeneity) $p(\lambda x)=|\lambda|p(x)$.

A functional is simply a linear function from a vector space to its underlying field.

> **Hahn-Banach Theorem.** Let $X$ be a normed space, $Z\subseteq X$ a subspace, $f$ a
> functional on $Z$, $p$ a seminorm on $X$ such that $|f(z)|\leq p(z)$ for every $z\in
> Z$. Then there is a linear functional $\bar f$ on $X$ such that $f(z)=\bar f(z)$ for
> every $z\in Z$ and $|\bar f(x)|\leq p(x)$ for every $x\in X$.

To prove this we first show a weaker version, which can be proven in ZF.

> **Finite Extension Lemma (ZF).** Let $X$, $Z$, $f$ and $p$ be as in the Hahn-Banach
> Theorem. Then for any $x\_0\in X$ there is a linear functional $\bar f$ on
> $\text{span}(Z\cup\\{x\_0\\})$ which extends $f$ and satisfies that $|\bar f(x)|\leq
> p(x)$ for every $x\in\text{dom }\bar f$.

The proof is roughly that in this finite case we get a closed interval of possible
values of $\bar f(x\_0)$, so we can simply pick one of those. For more details see e.g.
my note. We will prove Hahn-Banach in the case where $X$ is a real vector space, as the
transition to the complex case is standard. Define the set $S$ as

$$
g\in S\text{ iff }g\text{ is a linear functional extending }f\text{, defined on a
subspace }Y\subseteq X\text{ that contains }Z\text{, and which is absolutely bounded by
}p.
$$

Then to any $x\in X$ set $A\_x$ to be all those $g\in S$ with $x\in\text{dom }g$. The
finite extension lemma implies that all the $A\_x$'s are non-empty and furthermore that
finite intersections of them are non-empty as well. The $A\_x$'s then form a "subbasis"
for a filter $F$:

$$
F:=\\{A\subseteq S\mid\exists x\_1\cdots\exists x\_m:\bigcap_{n=1}^m A_{x\_n}\subseteq
A\\}.
$$

Use the ultrafilter lemma to extend $F$ to an ultrafilter $U$ on $S$. It then holds
that given any $x\in X$, $x\in\text{dom }g$ for $U$-a.e. $g\in S$. Now form the
(ill-founded) ultrapower $(M,E):=(\text{Ult}(V,U),\in_{U})$ with associated ultrapower
embedding

$$ j:(V,\in)\to(M,E). $$

Then setting $h:=[\text{id}]\_{U}$ we see that given any $x\in X$, $x\ E\ \text{dom }h$,
giving us a candidate for an extension! But note that $h$ is a function into the
hyperreals $j(\mathbb R)$ (inside the ultrapower), so it's not really a functional. But
the hyperreals has the nifty feature that there is a homomorphism $\text{st}:(j(\mathbb
R),E)\to(\mathbb R,\in)$ called the standard part. This is basically by the
completeness of the reals, so that to any hyperreal we can associate a unique real such
that their difference is infinitesimal. Then set $\bar f$ to be the functional on $X$
defined as

$$ \bar f:=\text{st}\circ h\circ j\upharpoonright X. $$

As $g$ extends $f$ for $U$-a.e. $g$, we get that $(h\text{ extends } j(f))^{M}$. This
means that

$$ \text{st}(h(j(z))=\text{st}(j(f)(j(z)))=\text{st}(j(f(z)))=f(z), $$

for every $z\in Z$, so $\bar f$ does in fact extend $f$. Furthermore, note that
$|h(x)|\leq j(p)(x)$ for every $x\ E\ \text{dom }h$, so that

$$
|\bar f(x)|=|\text{st}(h(j(x)))| =
\text{st}(|h(j(x))|)\leq\text{st}(j(p)(j(x)))=\text{st}(j(p(x)))=p(x),
$$

showing that $\bar f$ is absolutely bounded by $p$ as well. **QED**

Note that the function $h$ in the proof was defined as $[\text{id}]\_{U}$, so that
really it corresponds to all the functionals that we're interested in, at the same
time. The ultrafilters are thus used for this sort of "gluing", that if we can just
make sure that a given property holds for many partial functionals, there is a
canonical functional with the property as well.

This note was inspired by [Asaf Karagila's note on Hahn-Banach and the Axiom of
Choice](https://doi.org/10.48550/arXiv.2010.15632).
