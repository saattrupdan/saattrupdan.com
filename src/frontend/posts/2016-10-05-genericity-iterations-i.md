---
title: Genericity Iterations I
meta: This post introduces Woodin's invention of genericity iterations, which more or less states that any real number is at most an iteration and a forcing away! (given that you're living in an iterable structure and assuming a large cardinal hypothesis) In this post we start the proof of the theorem, which includes the introduction of the extender algebra.
tags: set theory, inner model theory, genericity iterations
---

<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;">
  <p style="width: 80%;">
    In this very first blog post I thought that I would start out with something that
    really intrigued me when I first read it: Woodin's invention of genericity iterations.
    The statement is very surprising, and the proof seems so distinct from anything else
    I've seen in set theory. The theorem more or less says that any real is at most an
    iteration and a forcing away! (given that you're living in an iterable structure and
    assuming a large cardinal hypothesis)
  </p>
  <img src="/src/frontend/assets/img/genericity-iteration.webp" style="width: unset;" />
</div>

This post is part of a series on genericity iterations:

1. Genericity Iterations I
2. <router-link to="/posts/2016-10-19-genericity-iterations-ii">Genericity Iterations II</router-link>
3. <router-link to="/posts/2017-12-18-projective-understanding-via-woodins">Projective Understanding via Woodins</router-link>
4. <router-link to="/posts/2017-12-29-from-mice-to-determinacy">From Mice to Determinacy</router-link>
5. <router-link to="/posts/2018-01-20-projectively-correct-mice">Projectively Correct Mice</router-link>

The more precise statement is the following:

> **Theorem (Woodin).** Let M be a countable $(\omega,\omega\_1+1)$-iterable mouse and
> $\delta$ a countable ordinal. Assume that, in M, $\delta$ is Woodin, realised by
> extenders on the M-sequence. Then there is a $\delta$-cc forcing $\mathbb Q\subset
> V_\delta^M$ such that given any real x there is a countable iteration tree T on
> M following M's strategy with last model $M_\alpha$ such that $i_{0,\alpha}^T$ exists
> and x is $i_{0,\alpha}^{ T}(\mathbb Q)$-generic over $M_\alpha$.

The proof I'll give is more or less the proof in Steel's handbook article. The
surprising thing about the proof is that the elements of $\mathbb Q$ is
really infinitary formulas! Let $L_{\delta,\omega}$ be the language of propositional
logic with $\omega$ many variables $v\_n$, where we furthermore allow conjunctions and
disjunctions of size $<\delta$.

Provability of this logic is just using the usual logical axioms and deduction rules,
where we're furthermore also allowed to infer $\bigwedge_{\xi<\kappa}\varphi_\xi$ if
$\varphi_\xi$ holds for every $\xi<\kappa$, for some $\kappa<\delta$. We can interpret
any real as a model of this language by stipulating that $x\models v\_n$ iff $n\in x$
and then recursively expand this to the other formulas. Note that the logic is sound
with respect to all reals. We're going to consider the following theory $\Gamma$,
consisting of the axioms

$$
\bigvee_{\alpha<\kappa}\varphi_\alpha\leftrightarrow\bigvee_{\alpha<\lambda}
i\_E(\left<\varphi_\xi\mid\xi<\kappa\right>)\_\alpha,
$$

where E is on the M-sequence, $\text{crit }E=\kappa\leq\lambda$ and $\nu\_E$ is a
cardinal in M such that $ i_E(\left<\varphi*\xi\mid\xi<\kappa\right>) \upharpoonright
\lambda \in M|\nu_E$. To this theory $\Gamma$ we consider the so-called Lindenbaum
algebra, which is a Boolean algebra consisting of equivalence classes of
$L*{\delta,\omega}$-formulas, where two formulas $\varphi$ and $\psi$ are equivalent
iff $\Gamma\vdash\varphi\leftrightarrow\psi$, and we set $[\varphi]\leq[\psi]$ iff
$\Gamma\vdash\varphi\to\psi$. This particular instance of the Lindenbaum algebra is
called the extender algebra and is denoted by $\mathbb Q$. An important feature of
$\mathbb Q$ is the following.

> **Proposition.** The extender algebra is $\delta$-cc in M and therefore also a
> complete Boolean algebra in M.

**Proof.** Assume it's not the case and let $
A:=\left<\varphi_\alpha|\alpha<\delta\right\>$ be an antichain in $\mathbb Q$. Fix some
$\kappa<\delta$ which is A-reflecting, witnessed by an extender F on the M-sequence.
Let $\lambda\in(\kappa,\delta)$ be large enough so that $\varphi_\kappa\in
V_\lambda^M$ and let E be the trivial completion of $F\upharpoonright\lambda$. It then
holds that $i\_E(A)\upharpoonright\kappa+1=A\upharpoonright\kappa+1$, so that

$$
i\_E(\bigvee_{\alpha<\kappa}\varphi_\alpha) \upharpoonright \kappa+1 =
\bigvee_{\alpha\leq\kappa}\varphi_\alpha
$$

and then

$$
\Gamma\vdash\bigvee_{\alpha<\kappa}\varphi_\alpha\leftrightarrow
\bigvee_{\alpha\leq\kappa}\varphi_\alpha.
$$

But this means that
$[\varphi_\kappa]\leq[\bigvee_{\alpha<\kappa}\varphi_\alpha]\leq[\varphi_\xi]$ for some
$\xi<\kappa$, a contradiction. Finally, since $\sum_{\alpha<\kappa}[\varphi_\alpha] =
[\bigvee_{\alpha<\kappa}\varphi_\alpha]$ for $\kappa<\delta$, $\mathbb Q$ is closed
under $<\delta$-sums and every sum is of size $<\delta$ since $\mathbb Q$ is
$\delta$-cc. **QED**

The first step towards "capturing" our real x is the following.

> **Proposition.** For any real x, if $x\models\Gamma$ then $G\_x:=\\{[\varphi]\mid
> x\models\varphi\\}$ is a $\mathbb Q$-generic ultrafilter over M and $x\in M[G\_x]$.

**Proof.** We need $x\models\Gamma$ to make sure that $G\_x$ is well-defined on
equivalence classes: if $\Gamma\vdash\varphi\leftrightarrow\psi$ then $x\models\varphi$
iff $x\models\psi$ by soundness of our logic. It's not too hard to show that $G\_x$ is
an ultrafilter, so towards showing that it's generic let
$\left<[\varphi_\alpha]\mid\alpha<\gamma\right\>$ be a maximal antichain. Then
$\gamma<\delta$ as $\mathbb Q$ is $\delta$-cc, so
$[\bigvee_{\alpha<\gamma}\varphi_\alpha]=1$. In particular $
\Gamma\vdash\bigvee_{\alpha<\gamma}\varphi_\alpha$, so $\Gamma\vdash\varphi_\xi$ for
some $\xi<\gamma$. Soundness then entails that $x\models\varphi_\xi$, meaning that
$[\varphi_\xi]\in G\_x$. Lastly, to show that $x\in M[G\_x]$ we note that $i\in x$ iff
$[v\_i]\in G\_x$, making x definable from $G\_x$. QED

The strategy now is then to somehow make an arbitrary real x satisfy $x\models\Gamma$,
so that the above proposition supplies us with what we want. This is exactly what the
genericity iteration is about. We're going to iterate M to some $M_\alpha$ which
satisfies $x\models i_{0,\alpha}(\Gamma)$, so that the above propositions relativised
to $M_\alpha$ proves the theorem. The construction of this iteration is the content of
the next blog post. Stay tuned!
