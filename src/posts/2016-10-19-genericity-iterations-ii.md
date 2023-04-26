---
title: Genericity iterations II
meta: This post finishes the proof of Woodin's genericity iteration theorem, assuming the results related to the extender algebra, introduced in the previous post.
tags: set theory, inner model theory
---

In the last blog post we set the scene by constructing the extender algebra, and proved
that to capture a real x it suffices to make sure that $x\models
i_{0,\alpha}^T(\Gamma)$ for some countable iteration tree T. Here we provide the
construction of T and rounding off the proof.

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-10-05-genericity-iterations-i">Genericity Iterations I</router-link>
2. Genericity Iterations II

Recall that we're trying to prove the following theorem:

> **Theorem (Woodin).** Let M be a countable $(\omega,\omega\_1+1)$-iterable mouse and
> $\delta$ a countable ordinal. Assume that, in M, $\delta$  is Woodin, realised by
> extenders on the M-sequence. Then there is a $\delta$-cc forcing $\mathbb Q\subset
> V_\delta^M$ such that given any real x there is a countable iteration tree T on
> M following M's strategy with last model $M_\alpha$ such that $i_{0,\alpha}^T$ exists
> and x is $i_{0,\alpha}^{T}(\mathbb Q)$-generic over $M_\alpha$.

We'll now start the construction of our iteration. This part of the proof is very
similar to the proof of the comparison lemma between mice -- the strategy is simply to
iterate away the extenders we don't like.

Start by setting $M\_0:=M$, and assume now that $M_\alpha$ has been constructed for some
$\alpha<\omega\_1$ and that the tree so far doesn't have any drops. Assume without loss
of generality that $x\not\models i_{0,\alpha}(\Gamma)$ and let E be an extender on the
$M_\alpha$-sequence of minimal length witness this. Player I then plays $E_\alpha^T:=E$
and the game continues. This strategy for player I determines the tree T. The following
technical claim ensures that this is actually an iteration, and that the elementary
embeddings $i_{\gamma,\beta}^T$ exist.

> **Claim.** The above iteration is (a) normal and (b) no drops occur.

**Proof.** For (a) let $\gamma<\alpha$; we have to show that $\text{lh }E_\gamma<\text{lh
}E_\alpha$. Assume it's not the case, so that $E_\alpha$ is on the $M_\gamma$-sequence
since $M_\gamma$ and $M_\alpha$ agree below $\text{lh }E_\gamma$. Now by construction,
$E_\alpha$ violates an axiom of $i_{0,\alpha}(\Gamma)$ satisfied by x, and this induces
an axiom of $i_{0,\gamma}(\Gamma)$ it violates as well [to see that $\nu(E_\alpha)$ is
an $M_\gamma$-cardinal, note that since $\nu(E_\gamma)$ is an $M_\gamma$-cardinal, any
$M_\alpha$-cardinal $\leq\nu(E_\gamma)$ is an $M_\gamma$-cardinal as well. As
$\nu(E_\alpha)<\text{lh }E_\alpha\leq\text{lh }E_\gamma$, the fact that no
$M_\alpha$-cardinals occur in $(\nu(E_\gamma),\text{lh }E_\gamma)$ then implies that
$\nu(E_\alpha)\leq\nu(E_\gamma)]$. To show (b) we need to show that $E_\alpha$ measures
all subsets of $\kappa:=\text{crit }E_\alpha$ in $M_\gamma$. But $\nu(E_\gamma)$ is an
$M_\gamma$-cardinal, $\kappa<\nu(E_\gamma)$ and $M_\gamma$ agrees with $M_\alpha$ below
$\nu(E_\gamma)$. **QED**

This finishes the definition of player I's strategy in the iteration game. All that
remains is to show that this process terminates at a countable step, so assume it's not
the case. The following argument again has close similarities with the contradiction in
the proof of the comparison lemma. Let

$$ \pi:H:=\text{cHull}^{V_\eta}(\text{trcl }x\cup\{T,\omega\_1\})\to V_\eta $$

be the uncollapse with $\eta$ sufficiently large and set $\alpha:=\text{crit
}\pi=\bar\omega\_1=\omega\_1^H$. We first claim that $\bar T=T\upharpoonright\alpha+1$.
Since $\text{crit }\pi=\alpha$ we get that $\bar T\upharpoonright\alpha=
T\upharpoonright\alpha$ straight away, using that M is countable. Also,
$[0,\alpha]\_{\bar T}=[0,\omega\_1]\_T\cap\alpha$. This means that $[0,\alpha]\_{\bar T}$
has limit order type, and any branch of an iteration tree must be closed below its
supremum by definition of tree order, so $\alpha\in[0,\omega\_1]\_T$, implying that
$[0,\alpha]\_{\bar T}=[0,\alpha]\_T$. We can then conclude that $\bar
T=T\upharpoonright\alpha+1$ since $\omega\_1^H=\alpha$ and the direct limit construction
is absolute to H. In particular it holds that $M_\alpha^T=M_\alpha^{\bar T}$, so if we
define $\delta^\*:=i_{0,\alpha}^T(\delta)=i_{0,\alpha}^{\bar T}(\delta)$ we get that
$V_{\delta^\*}^{M_\alpha^{\bar T}}=V_{\delta^\*}^{M_\alpha^T}$. This means for
any $y=i_{0,\alpha}^T(\bar y)\in V_{\delta^\*}^{M_\alpha^T}$,

$$
\pi(y)=\pi(i_{0,\alpha}^{\bar T}(\bar y))=i_{0,\omega\_1}^T(\bar
y)=i_{\alpha,\omega\_1}^T(i_{0,\alpha}^T(\bar y))=i_{\alpha,\omega\_1}^T(y)
$$,

so that $\pi\upharpoonright
V_{\delta^\*}^{M_\alpha^T}=i_{\alpha,\omega\_1}^T\upharpoonright
V_{\delta^\*}^{M_\alpha^T}$ and $\text{crit }i_{\alpha,\omega\_1}^T=\text{crit
}\pi=\alpha$. Letting $\beta+1=\text{succ}\_T(\alpha)$, we have that $\text{crit
}E_\beta^T=\text{crit }i_{\alpha,\omega\_1}^T=\alpha$ and we have an axiom

$$
\bigvee_{\xi<\alpha}\varphi_\xi\leftrightarrow\bigvee_{\xi<\lambda}i_{E_\beta}(\left<\varphi_\gamma\mid\gamma<\alpha\right>)\_\xi
$$

of $i_{0,\beta}(\Gamma)$ induced by $E_\beta$ which is false of x, meaning that the
right hand side is true of x and the left hand side is false of x. But note that
$\bigvee_{\xi<\alpha}\varphi_\xi\in V_{\delta^\*}^{M_\alpha^T}$ and
$\lambda<\nu(E_\beta)$, so since generators aren't moved along branches of iteration
trees, we get that

$$
x\models\bigvee_{\xi<\lambda} i_{E_\beta}
(\left<\varphi_\gamma\mid\gamma<\alpha\right>)\_\xi = \bigvee_{\xi<\lambda}
i_{\alpha,\omega\_1} (\left<\varphi_\gamma\mid\gamma < \alpha\right>)\_\xi =
\bigvee_{\xi<\lambda} \pi(\left<\varphi_\gamma\mid\gamma < \alpha\right>)\_\xi
$$.

But as $x\not\models\bigvee_{\xi<\alpha}\varphi_\xi$, we get
$x\not\models\pi(\bigvee_{\xi<\alpha}\varphi_\xi)$ as well since $\pi(x)=x$,
contradicting the above. This contradiction finishes the proof of our theorem. **QED**

These genericity iterations can be generalised to capture arbitrary sets of ordinals
rather than just reals, and sample applications include various absoluteness results.
For more on these generalisations and applications, see "The Extender Algebra and
$\Sigma^2\_1$-absoluteness" by Ilijas Farah.
