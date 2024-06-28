---
title: Core Model Induction
subtitle: The Pointclass Perspective
meta: Previously I covered the core model induction up to showing that all sets of reals in L(R) are determined. In terms of large cardinal theories, this is equiconsistent with the theory ZFC and the existence of infinitely many Woodin cardinals. I'll here talk about how to push this even further, getting close to reaching the current state of the art.
tags: set theory, core model theory
---

Previously I covered the core model induction up to showing that all sets of reals in
$L(\mathbb R)$ are determined. In other words, it reached a model containing all the
reals satisfying $\textsf{ZF}$ and $\textsf{AD}$, the Axiom of Determinacy. In terms of
large cardinal theories, this is equiconsistent with the theory $\textsf{ZFC}$ and the
existence of infinitely many Woodin cardinals. I'll here talk about how to push this
even further, getting close to reaching the current state of the art.

This post is part of a series on core model theory:

1. <router-link to="/posts/2017-04-26-what-is-k">What is K?</router-link>
2. <router-link to="2018-05-10-core-model-induction-101">Core Model Induction
   101</router-link>
3. <router-link to="2018-10-22-applied-core-model-theory-i">Applied Core Model
   Theory I</router-link>
4. <router-link to="2018-11-13-applied-core-model-theory-ii">Applied Core Model
   Theory II</router-link>
5. <router-link to="2018-11-26-applied-core-model-theory-iii">Applied Core Model
   Theory III</router-link>
6. Core Model Induction: The Pointclass Perspective

But before we go beyond $L(\mathbb R)$ let's start all the way from the beginning
again, with a different viewpoint. That is, instead of focusing on the inner model
theoretic aspect, as we did in my previous blog post, we put on our descriptive set
theoretic glasses and see the inner model theoretic approach only as a convenient tool
to showing that certain sets are determined.

Let's therefore, once and for all, decide that our goal is to produce
a large pointclass $\Gamma\subseteq P(\mathbb R)$ such that every $A\in\Gamma$ is
determined. Now, the question of what we mean by "large" appears, since we can't work
with $\textsf{AC}$ in a determinacy context. For now, let's stick to the intuitive
notion and we'll be more precise later. We can then split our induction into the
following steps.

<img
  src="/src/assets/img/core-model-induction-the-pointclass-perspective.webp"
  alt="A table showing the steps of the core model induction and the associated mouse challenge"
  style="width: min(500px, 100%);"
  class="invert-on-darkmode centered-image"
/>

**The $\textsf{PD}$ step** of a core model induction is when
$\Gamma=\bigcup_{n<\omega}{\bf\Sigma}^1\_n$, the pointclass of projective sets of
reals. A result by Müller-Neeman-Woodin (see Müller's thesis for a proof) shows that
this is equivalent to the existence and iterability of $M\_n^\sharp(x)$ for every
$n<\omega$ and $x\in\mathbb R$, and we have a (folklore?) result that this is
equivalent to showing that the core model $K(x)$ doesn't exist for all $x\in\mathbb R$.

We have therefore taken a problem of descriptive set theory, showing that projective
sets of reals are determined, and converted it into an inner model theoretic problem,
showing that $K(x)$ doesn't exist for all reals $x$. To complete this step we therefore
use our hypothesis to contradict the existence of such core models.

Our goal and interest still lies in the determinacy world, however, so our induction
should reflect that, meaning that instead of staying in the world of mice and core
models we go back to the determinacy world and now try to figure out which sets of
reals we now want to show are determined.

**The $\textsf{HPD}$ step** of a core model induction is when $\Gamma$ is the
pointclass of all the hyperprojective sets of reals, being sets of reals in
$J_{\kappa^{\mathbb R}}(\mathbb R)$, where $\kappa^{\mathbb R}$ is least such that
there's no $\Sigma\_1^{J_{\kappa^{\mathbb R}}(\mathbb R)}$-definable surjection
$J_\gamma(\mathbb R)\to J_{\kappa^{\mathbb R}}(\mathbb R)$ for some
$\gamma<\kappa^{\mathbb R}$ (in other words, $\kappa^{\mathbb R}$ is the least $\mathbb
R$-admissible). Note that the projective sets of reals are exactly the sets of reals in
$J\_1(\mathbb R)$, so this is a natural strengthening of that.

Again, the way we do this is to convert it into a problem of inner model theory, where
it this time reduces to showing that $M\_n^{F,\sharp}(x)$ exists and is iterable for
every $n<\omega$ and $x\in\mathbb R$, where $F$ here is a certain pure mouse operator,
taking a real number $x\in\mathbb R$ and spitting out a certain mouse over $x$. I won't
go into exactly how the operator is defined, as that's not really intuitively useful, I
think. Here $M\_n^{F,\sharp}(x)$ is then more or less the same as $M\_n^\sharp(x)$ but
where we further require that it's closed under this mouse operator $F$.

**The $\textsf{AD}^+$ step** is then showing that all sets of reals in $L(\mathbb R)$
are determined. Once again, we can convert this to an inner model theoretic problem:
namely, showing that $M\_n^{\Sigma,\sharp}(x)$ exists and is iterable for every
$x\in\mathbb R$, where this time $\Sigma$ is not just a pure mouse operator anymore,
but an iteration strategy for a certain (different) mouse $N$. Again it's the same idea
as $M\_n^\sharp(x)$, but where we require that it's closed under $\Sigma$ (meaning that
whenever there's an iteration tree in there, the branch corresponding to $\Sigma$ is in
there as well).

The tricky bit with this step is not showing that $M\_n^{\Sigma,\sharp}(x)$ exists and
is iterable, as this is usually more or less the same proof as for
$M\_n^{F,\sharp}(x)$, but rather to show that this mouse $N$ with strategy $\Sigma$
actually exists. This is a result by Woodin, which is completely independent of
whatever hypothesis we're assuming in our core model induction. This then shows that
all sets of reals in $L(\mathbb R)$ are determined, and in particular it proves the
consistency of $\textsf{ZF}+\textsf{AD}$.

**The $\textsf{AD}^+ +\Omega>0$ step** is then about finding a "larger" pointclass than in
the $\textsf{AD}^+$ step. But how can we reflect that there are more sets of reals, as
AD just says that every set of reals is determined? The current way this is done is by
considering the so-called Solovay hierarchy, whose length in a way measures the "size"
of $P(\mathbb R)$ (remember we're in a determinacy set-up, so we don't have access to
$\textsf{AC}$). The Solovay hierarchy $\langle\theta_\alpha\mid\alpha\leq\Omega\rangle$
is then defined as follows:

1. $\theta\_0$ is the least ordinal such that there's no surjection $\mathbb
   R\to\theta\_0$ which is ordinal definable;
2. $\theta_{\alpha+1}$ is the least ordinal such that there's no surjection $\mathbb
   R\to\theta_{\alpha+1}$ which is ordinal definable in a parameter $A\subseteq\mathbb
   R$ of Wadge rank $\theta_\alpha$;
3. $\theta_\gamma:=\sup_{\alpha<\gamma}\theta_\alpha$ for $\gamma$ a limit ordinal.

We set $\Theta:=\theta_\Omega$, which can equivalently be defined as the least ordinal
such that there's no surjection $\mathbb R\to\Theta$. One can show that, in $L(\mathbb
R)$, $\textsf{AD}$ will always imply $\Omega=0$ (equivalently, $\theta\_0=\Theta$), so
$L(\mathbb R)$ can't be used to push our determinacy theories further.

What we do, then, is proceed by contradiction and assume that there's no pointclass
$\Gamma$ such that $L(\Gamma,\mathbb R)\models\textsf{ZF}+\textsf{AD}^++\Omega>0$. The
plan is then to isolate the maximal model $M$ of $\textsf{ZF}+\textsf{AD}^+$, being the
smallest model containing all determined sets, and then proceed to produce a determined
set which isn't in $M$, yielding a contradiction. This determined set turns out to be
(the code of) the iteration strategy $\Sigma$ for some mouse $N$. The goal of this step
is therefore to construct such $N$ and $\Sigma$, and show that $\Sigma\notin M$ and
that (the code of) $\Sigma$ is determined, which would mean that $L(\Sigma,\mathbb R)$
satisfies $\textsf{ZF}+\textsf{AD}^++\Omega>0$.

The determinacy part then becomes quite similar to the $\textsf{AD}^+$ step, as we
again need to show that $M\_n^{\Sigma,\sharp}(x)$ exists and is iterable for every
$n<\omega$ and $x\in\mathbb R$. The challenge in this step is that the existence of
this mouse $N$ and its strategy is not automatic anymore, and we have to use our
hypothesis to construct it. Woodin does have a general hypothesis-independent result
stating that we can construct a so-called quasi-iterable premouse, and the job is then
to show that this premouse is actually iterable and that its strategy isn't an element
of $M$.

**The $\textsf{AD}^+ +\Omega\text{ is a limit}$ step**, which is more commonly known as
$\textsf{AD}\_{\mathbb R}$, is similar to the $\Omega>0$ step, but the main difference
is that the mouse we need to construct here is now going to be a hybrid mouse, being
one that contains fragments of its own iteration strategy. To develop the theory of
such hybrid mouse is a major task and has been carried out in two different ways:
the layered approach in Sargsyan's PhD thesis and the least-branch approach by Steel.
As this framework is hypothesis-independent, we can stand on the shoulders of giants
and prove this step in almost the same way as we show the $\Omega>0$ step.

**The $\textsf{AD}^+ + \Omega\text{ is inaccessible}$ step**, which is more commonly
known as $\textsf{AD}\_{\mathbb R}+\Theta\text{ is regular}$, is about dealing with the
"singular limit steps": we have built these hybrid mice for every $\alpha$ up to some
singular limit, and we want to "merge" them somehow. We can coiterate these mice to a
"limit premouse", but the problem is then finding an iteration strategy for this
premouse. If the singular limit doesn't have measurable cofinality then this can simply
be taken to be the join of the previous iteration strategies, but if this is not the
case then we have to use our hypothesis to prove the existence of such an iteration
strategy.

**Further steps** then include stronger assumptions on $\Omega$, such as being Mahlo or
measurable, and the strongest step currently known is the Largest Suslin Axiom. Note,
however, that all these steps are still strictly weaker than a Woodin limit of Woodin
cardinals, and it's not known how to transcend this step with a determinacy hypothesis.
Maybe an approach different from the Solovay hierarchy needs to be taken, or maybe
another type of determinacy hypothesis needs to be added to the Solovay hierarchy
theories. Major figures attempting to push this further are Sargsyan, Steel and Trang.
