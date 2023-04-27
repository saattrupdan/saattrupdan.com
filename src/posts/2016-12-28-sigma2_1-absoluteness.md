---
title: Sigma^2_1 Absoluteness
meta: A sentence of type Sigma^2\_1 is a sentence with a second-order existential quantifier as the only second-order quantifier. A particularly famous such sentence is the continuum hypothesis (CH), which is known to be highly non-absolute - we can always both force it and force its negation. But it turns out that CH actually turns out to determine the Sigma^2\_1-truths in models, in that any two forcing extensions in which CH holds have the same Sigma^2\_1-truths. This is a theorem due to Woodin and Steel independently.
tags: set theory
---

A sentence of type $\bf\Sigma^2\_1$ is a sentence of the form $\exists X\subseteq\mathbb
R\colon\psi(X,r)$, where $r$ is some fixed real parameter and all the quantifiers
occuring in $\psi$ are ranging over the reals or naturals. A particularly famous such
sentence is the continuum hypothesis $\mathsf{CH}$, which is known to be highly
non-absolute: we can always both force $\mathsf{CH}$ and force its negation. But it
turns out that $\mathsf{CH}$ actually turns out to determine the $\bf\Sigma^2\_1$-truths
in models, in that any two forcing extensions in which $\mathsf{CH}$ holds have the
same $\bf\Sigma^2\_1$-truths. This is a theorem due to Woodin and Steel independently.
[My full write-up can be found here](/sigma2_1_absoluteness.pdf), but in this post
I'll just focus on the statement and the key ideas used in the proof(s).

This theorem was first proven using stationary tower forcing, but later also by using
genericity iterations. By their very nature the proofs are quite different in terms of
style, but their overall strategy seems to be the same - I'll get back to this later.
Firstly, let's actually state the theorem in question. It turns out to not be exactly
the same theorem, where the version proven using genericity iterations require stronger
hypotheses, but whose conclusion is stronger as well. We start chronologically with the
stationary tower version.

**Theorem 1 (Woodin, Steel).** Assume there exists a measurable Woodin cardinal
$\delta$ and let $\varphi(x)$ be a $\Sigma^2\_1$-formula, $r$ a real and $\mathbb
P,\mathbb Q\in V_\delta$ forcing notions such that $\Vdash_{\mathbb P}\varphi[\check
r]$ and $\Vdash_{\mathbb Q}\textsf{CH}$. Then $\Vdash_{\mathbb Q}\varphi[\check r]$.

In particular, if $\textsf{CH}$ holds then any $\bf\Sigma^2_1$ sentence in a small
forcing extension reflects down to $V$. Note the restriction here to small forcings.
The next version is very similar:

**Theorem 2 (Woodin, Steel).** Assume that $\langle M,\vec E\rangle$ is a transitive
model of a suitable fragment of $\mathsf{ZFC}$, where $\vec E$ is an extender sequence
witnessing that a countable $\delta$ is measurable Woodin in $M$. Assume furthermore
that $\langle M,\vec E\rangle$ is $(\omega,\omega\_1+1)$-iterable in every forcing
extension. Let $\varphi(x)$ be a $\Sigma^2\_1$-formula, $r$ a real and $\mathbb
P,\mathbb Q$ forcing notions such that $\Vdash_{\mathbb P}\varphi[\check r]$ and
$\Vdash_{\mathbb Q}\textsf{CH}$. Then $\Vdash_{\mathbb Q}\varphi[r]$.

Here our extra assumption is iterability of this model $\langle M,\vec E\rangle$, but
we get the stronger conclusion that it holds for all (set-sized) forcing notions. In
this regard, none of the two theorems replace the other - both can be useful in
different situations.

The proof strategies in the two theorems are very similar. For simplicity we will
assume that $\mathbb Q$ is trivial, which amounts to assuming $\textsf{CH}$ in $V$.
Both of them use the simple fact that if $N\subseteq V$ and $N$ contains all the reals,
then $\bf\Sigma^2\_1$-sentences are reflected upwards from $N$ to $V$. Thus to get a
statement from a forcing extension down to $V$, we need to find a model inside $V$,
containing all the reals and somehow capturing enough of the forcing extension so that
it also satisfies the given $\bf\Sigma^2\_1$-statement.

The strategy is then to find such a model with this property. This is where the
stationary tower method and the genericity iteration method diverges. I'm going to try
to briefly sketch the main ideas of the two proofs below, so that the similarities
hopefully becomes apparent.

> **Brief sketch of the stationary tower proof (Theorem 1)**
>
> In this case we start out by finding some (full) stationary tower embedding
> $j\colon:V\to M\subseteq V[\hat g]$ such that there is a $V$-generic
> $g\subseteq\mathbb P$ inside $M$, plus some extra properties. These extra properties
> will allow us to construct generics $h_\xi$ inside $M$, where $h_\xi$ captures the
> $\xi$'th real (i.e. that the real is in $V\[g][h_\xi]$) and all the $h_\xi$'s lie
> nested into each other. Setting $h$ to be the limit of these $h_\xi$'s we get that
> $V\[g][h]$ satisfies $\varphi$ and contains all the reals of $M$. As
> $V\[g][h]\subseteq M$, this is reflected up to $M$, and then by elementarity of $j$
> we get that $\varphi$ holds in $V$ as well. **QED**

> **Brief sketch of the genericity iteration proof (Theorem 2)**
>
> This proof is a two-step procedure. We first transfer the truth of $\varphi$ from
> $V^{\mathbb P}$ to some model which we don't necessarily know is an inner model of
> $V$. Next step is then to transfer the truth from this model to an actual inner model
> of $V$, and then reflect up to $V$.

First step is to look at $M$ inside of $V^{\mathbb
P\*\text{Col}(\aleph\_1,2^{\aleph\_0})}$, pick a witness $A\subseteq\omega\_1$ to the
truth of $\varphi[\check r]$ and then perform a genericity iteration $j:M\to M^\*$ to
capture both $A$ and $\mathbb R$. In the extender algebra extension $M^\*[g]$ we then
have that $\varphi[r]$ holds. This is the end of step one.

By elementarity we can find a condition $p$ in the extender algebra down in $M$ which
forces $\varphi[\check r]$. We then perform $\omega\_1$-many genericity iterations
(recall that $\textsf{CH}$ is assumed to hold in $V$), each capturing a single real
each time, but making sure that $p$ is in the resulting extender algebra generic each
time. In the end we wind up with an iteration $j\colon M\to N$ such that $N[g]$ has all
the reals and satisfies $\varphi$. The thing to note here is that now $N[g]\subseteq
V$! This means that the truth of $\varphi$ is reflected down to $V$ and we're
done. **QED**

Although both methods results in some inner model acting as a middleman between the
forcing extension and $V$, the paths toward this goal are very different. A key feature
used in the stationary tower method is that we don't have to find an inner model of $V$
containing all reals -- we can instead find an inner model of $M$ containing all $M$'s
reals. And given that we can manipulate $M$ to have all sorts of structure, by
tinkering around with stationary sets, this gives us the necessary tools to actually
prove this. The genericity iteration method has the notable feature that the extender
algebra generic is definable, so that the resulting generic extension will always be an
inner model. This means that if we can just code up everything we want in a subset of
$\omega\_1$, we can capture all of these things inside an inner model.

This is just one application in which both the stationary tower and the genericity
iteration can supply us with a proof. One other such application is the proof of the
derived model theorem, which is a tool to go from a model of $\textsf{ZFC}$+Large
Cardinals to a model of determinacy. I'll most probably make a post about that in the
not-too-distant future. Until next time, have a happy new year!
