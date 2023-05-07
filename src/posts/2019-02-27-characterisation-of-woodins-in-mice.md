---
title: Characterisations of Woodins in Mice
meta: I've previously mentioned an interesting characterisation of Woodin cardinals, that they are more or less characterised by the fact that we can do genericity iterations with them, i.e., that we can "capture reals" when Woodin cardinals are present. This is an exercise in the core model induction book, and Stefan Mesken recently found a way to solve this (see his solution here), which I'll be presenting here.
tags: set theory, inner model theory
---

I've previously mentioned an interesting characterisation of Woodin cardinals, that
they are more or less characterised by the fact that we can do genericity iterations
with them, i.e., that we can "capture reals" when Woodin cardinals are present. This is
an exercise in the [core model induction
book](https://ivv5hpp.uni-muenster.de/u/rds/core_model_induction.pdf), and [Stefan
Mesken](https://www.stefanmesken.info/) recently found a way to solve this ([see his
solution here](https://github.com/KappaDistributive/CMINotes/blob/master/CMI.pdf)),
which I'll be presenting here.

I've previously introduced the notion of absorbing reals, but let's recall it here for
convenience:

> **Definition.** Let M be a premouse, $\Sigma$ an iteration strategy for M and
> $\delta\in o(M)$. Then we say that $(M,\Sigma)$ absorbs reals at $(\eta, \delta)$ if
> there exists an iteration $i:N\to P$ by $\Sigma$ living on $(\eta, \delta)$ such that
> $x\in P[g]$ for some P-generic $g\subseteq\text{Col}(\omega,i(\delta))$. We also say
> that $(M,\Sigma)$ absorbs reals at $\delta$ if it absorbs reals at $(\eta,\delta)$
> for all $\eta<\delta$.

The characterisation is then this, which is Exercise 1.4.5 in the core model induction
book:

> **Proposition.** Let M be a premouse, $\delta\in o(M)$ such that
> $M\models\textsf{ZFC}^-+\delta^+$ exists. Then $(M,\Sigma)$ absorbs reals at $\delta$
> iff $\delta$ is either a Woodin cardinal in M or a limit of Woodin cardinals in M.

**Proof**. The backwards direction is by using genericity iterations, which I've
previously covered, so we show the forwards direction. Firstly we may assume that M is
countable, as otherwise we could take a countable hull
$N:=\text{cHull}^M(\\{\delta\\})$ and work with N and its pulled back version of
$\Sigma$.

Assume that $\delta$ is not Woodin in M; we'll show that it's a limit of Woodins in M.
Let $\eta<\delta$ be an ordinal and define $\delta^\*\in(\eta,\delta]$ to be the least
ordinal which absorbs reals at $(\eta,\delta)$. We will show that $\delta^\*$ is in
fact Woodin in M, so assume it's not. Since Woodins always absorb reals we get that
there are no Woodins in the interval $(\eta,\delta^\*]$ in M.

As M doesn't have any Woodins in the interval $(\eta,\delta^\*]$ we get that any
$\Sigma$-iteration living on $(\eta,\delta^\*)$ is guided by Q-structures, so that $M$
can define $\Sigma$ as

$$
\Sigma(T)=b\text{ iff }\text{Col}(\omega,T)^M\Vdash Q(\check b,\check{T})\text{ exists
and }M(\check{T})\trianglelefteq Q(\check b,\check{T}).
$$

For more information about Q-structures, see e.g. John Steel's [handbook
chapter](https://mathscinet.ams.org/mathscinet-getitem?mr=2768698) or [my MSc
thesis](https://github.com/saattrupdan/MSc-thesis/blob/master/main.pdf). The reason why
the Q-structures exist in the generic extension is by using absoluteness of
wellfoundedness.

Now let $T$ be an iteration tree on M living on $(\eta,\delta^\*)$ with last model P
such that $M\in P[g]$ with $g\subseteq\text{Col}(\omega, i^{T}(\delta^\*))$ P-generic.
Then $i\upharpoonright (\delta^\*)^{+M}\in M\subseteq P[g]$ by the above. But
$i\upharpoonright(\delta^\*)^{+M}$ is cofinal in $i(\delta^\*)^{+P}$, making it
singular in P[g]. But it's regular in P and $\text{Col}(\omega,i(\delta^\*))^P$ has the
$i(\delta^\*)^{+P}$-cc, so it's also regular in P[g], a contradiction! So $\delta^\*$
is Woodin in M, and $\delta$ is thus a limit of Woodins in M. **QED**
