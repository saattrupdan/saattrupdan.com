---
title: From Mice to Determinacy
meta: Last time we proved that mice M with finitely many Woodins know about projective sets, using Woodin's genericity iterations and the notion of mice understanding sets of reals. But what good is a projectively aware mouse? To give an example of the usefulness of this property, we show that the existence of these projectively aware mice yields determinacy of sets of reals.
tags: set theory, inner model theory, genericity iterations
---

Last time we proved that mice M with $n<\omega$ Woodins knows about $latex
\bf\Sigma^1_{n+1}$ sets A, meaning $A\cap M\in M$, using Woodin's genericity
iterations and the notion of mice understanding sets of reals. But what good is a
projectively aware mouse? To give an example of the usefulness of this property, we
show that the existence of these projectively aware mice yields determinacy of sets of
reals, shown by Neeman ('02).

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-10-05-genericity-iterations-i">Genericity Iterations I</router-link>
2. <router-link to="/posts/2016-10-19-genericity-iterations-ii">Genericity Iterations II</router-link>
3. <router-link to="/posts/2017-12-18-projective-understanding-via-woodins">Projective Understanding via Woodins</router-link>
4. From Mice to Determinacy
5. <router-link to="/posts/2018-01-20-projectively-correct-mice">Projectively Correct Mice</router-link>

Before we do that, however, let's abstract away from the Woodins. We want to isolate
the key features of the genericity iterations, and the following notion does exactly
that.

> **Definition.** Let M be a mouse and $\eta\in o(M)$. Then we say that M absorbs reals
> at $\eta$ if whenever $\xi<\eta$, $x\in\mathbb R$ and $i:M\to N$ is an iteration
> below $\xi$ then there exists an iteration $j:N\to P$ below $i(\eta)$ with
> $\text{crit} j\>i(\xi)$ and $x\in P[g]$ for some P-generic
> $g\subseteq\text{Col}(\omega,j(i(\eta)))$.

By using genericity iterations we then get that M will always absorb reals at its
Woodin cardinals. This is even close to being an equivalence: if
$M\models\textsf{ZFC}^-+\delta^+\text{exists}$ and if M absorbs reals at $\delta$ then
either $\delta$ is Woodin or a limit of Woodins in M.

Now, recall from our last post that a mouse M understands a set of reals at
$\eta\<o(M)$ if there's a term $\tau$ such that whenever P is an iterate of M and
$g\subseteq\text{Col}(\omega,i(\eta))$ is P-generic then $A\cap P[g]=i(\tau)^g$. We now
also say that M captures A at $\eta$ if M absorbs reals at $\eta$ and understands A at
$\eta$, and say that M Suslin-understands (Suslin-captures) A at $\eta$ if the
corresponding forcing term witnessing it is of the form $p[\check T]$ for a tree $T\in
M$ on some $\omega\times\kappa$.

Our theorem from last time then says that whenever M captures $B\subseteq\mathbb R^2$
at some $\eta$ then M understands $\exists^{\mathbb R}B$ at every $\xi<\eta$. To yield
determinacy from this we have to require M to have some more specialised knowledge of
the set of reals in question.

> **Theorem.** Let A be a set of reals and assume that there's a countable mouse M
> Suslin-capturing both A and $\lnot A$, where the trees witnessing this are
> homogeneous in M. Then A is determined.

**Proof.** Let $\tau=p[\check T]$ and $\tau'=p[\check S]$ witness that M
Suslin-captures A and $\lnot A$ at $\eta$, respectively. Since T is homogenous in M it
thinks that p[T] is determined, using the Martin-Steel theorem that we've covered in a
previous post. Let $\sigma\in M$ be a winning strategy, say for player I without loss
of generality.

Assume A is not determined, so that there's a play $y\in\mathbb R$ following $\sigma$,
but where player I loses; i.e. that $x\notin A$. Use that M absorbs reals at $\eta$ to
yield an iteration $i:M\to N$ with $y\in N[g]$ for some N-generic
$g\subseteq\text{Col}(\omega,\eta)^N$. But since M understands A and $\lnot A$ at
$\eta$ we get that $i(\tau)^g=A\cap N[g]$ and $i(\tau')^g=\lnot A\cap N[g]$. This means
that that $y\in i(\tau')=p[i(S)]$ by definition of $y$, so that

$$ N[g]\models\exists x\in p[i(S)]: x\text{ follows }i(\sigma), $$

which makes sense as $i(S)$ and $i(\sigma)$ are elements of N[g]. But then absoluteness
of wellfoundedness yields that this is true in N as well, so elementarity of $i$ then
contradicts that $\sigma$ is winning in M. **QED**

The clause concerning the homogeneity of the trees may seem a bit forced, but recall
the Martin-Steel result from our previous post that if $\delta\_0<\delta\_1$ are Woodin
cardinals of M then whenever $T,S\in M$ project to complements after forcing with
$\text{Col}(\omega,\delta\_1)$, they're homogeneous in M. This means that we get the
following corollary.

> **Corollary.** Let A be a set of reals and let M be a countable mouse with Woodins
> $\delta\_0<\delta\_1$. Assume that M Suslin-captures both A and $\lnot A$ at
> $\delta\_1$. Then A is determined.

The Woodins here are really used in their full force, and not simply a way to get
genericity iterations, so it seems that we have to move to the more 'concrete' Woodin
cardinals rather than only assuming that M absorbs reals. This corollary might still
seem a bit niche, but this is precisely the result which is used again and again in the
core model induction to yield determinacy results. More on that some other time.
