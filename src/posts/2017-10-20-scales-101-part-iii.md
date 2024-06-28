---
title: Scales 101 - Part III
subtitle: Moving to L(R)
meta: The last two posts covered the 'classical' theory of scales, meaning the characterisation of the scaled pointclasses in the projective hierarchy. The natural generalisation of this characterisation is then to figure out which of the pointclasses at the levels of L are scaled. This is exactly what Steel ('83) did, and I'll sketch the results leading up to this characterisation in a couple of blog posts. This characterisation is also precisely what's used in organising the induction in core model inductions up to AD in L(R).
tags: set theory, descriptive set theory
---

The last two posts covered the 'classical' theory of scales, meaning the
characterisation of the scaled pointclasses in the projective hierarchy. Noting that
$\bf\Sigma^1\_n=\bf\Sigma\_n^{J\_0(\mathbb R)}$ and
$\bf\Pi^1\_n=\bf\Pi\_n^{J\_0(\mathbb R)}$, the natural generalisation of this
characterisation is then to figure out which of the $\bf\Sigma\_n^{J_\alpha(\mathbb
R)}$ and $\bf\Pi\_n^{J_\alpha(\mathbb R)}$ classes are scaled, for $\alpha>0$. This is
exactly what Steel ('83) did, and I'll sketch the results leading up to this
characterisation in a couple of blog posts. This characterisation is also precisely
what's used in organising the induction in core model inductions up to
$\textsf{AD}^{L(\mathbb R)}$.

This post is part of a series on scales:

1. <router-link to="/posts/2017-10-06-scales-101-part-i">Scales 101 - Part I: What &
   Why?</router-link>
2. <router-link to="/posts/2017-10-13-scales-101-part-ii">Scales 101 - Part II: Where &
   How?</router-link>
3. Scales 101 - Part III: Moving to L(R)
4. <router-link to="/posts/2017-10-27-scales-101-part-iv">Scales 101 - Part IV: Leaving
   a Gap</router-link>

To be able to analyse $L(\mathbb R)$ in the depth that we need, we have to introduce
some fine structure. This is mostly completely analogous to the fine structure of $L$,
so I'll just mention a few results that we'll need, without proof. The first one is
that condensation still holds in our new setting.

> **Theorem (Condensation).** If $M\prec\_1 J_\alpha(\mathbb R)$ and $V_{\omega+1}\in M$
> then $M\cong J_\beta(\mathbb R)$ for some $\beta\leq\alpha$.

Next up, recall that there are uniformly $\Sigma\_1^{J_\alpha}$ surjections
$g_\alpha:[\omega\alpha]^{<\omega}\to J_\alpha$, as shown in Jensen ('72). Here's the
analogue.

> **Proposition.** There are uniformly $\Sigma\_1^{J_\alpha(\mathbb R)}$ surjections
> $f_\alpha:[\omega\alpha]^{<\omega}\times\mathbb R\to J_\alpha(\mathbb R)$.

The last fine structural fact that we'll need is the existence of definable Skolem
functions. As in the case of $L$, also shown in Jensen ('72), this is a consequence of
uniformisation.

**Theorem.** Whenever $\rho\_n(J_\alpha(\mathbb R))\neq\mathbb R$ holds,
$J_\alpha(\mathbb R)$ satisfies $\Sigma_{n+1}$ uniformisation, so that
$J_\alpha(\mathbb R)$ has a $\Sigma_{n+1}$ Skolem function.

Here $\rho\_n(M)$ is the $n$'th projectum as usual, and $\rho\_n(J_\alpha(\mathbb
R))=\mathbb R$ just means $\rho\_n(J_\alpha(\mathbb R))=0$. The requirement on the
projectum is necessary, as shown in the last part of Steel ('83). This is all the fine
structure that we'll need, so let's return to the scales.

Moschovakis ('83) showed that to find scales on a given set, it suffices to construct
a certain game representation of the set. We need a definition.

> **Definition.** A closed game representation of a set $A$ is a pair $(\lambda
> x.G\_x,\alpha)$ such that
>
> 1. $G\_x$ is a closed game on $\mathbb R\times\alpha$ of length $\omega$
> 2. There exists a binary relation
>    $Q\subset(\omega^{<\omega})^{<\omega}\times\alpha^{<\omega}$ such that player I
>    has a winning quasi-strategy in $G\_x$ iff $x\in A$, and $u=(\vec y,\vec\beta)$ is
>    winning for player I iff $Q(\left\< x\upharpoonright n,y\_0\upharpoonright
>    n,\dots,y\_n\upharpoonright n\right\<,\left\<\beta\_0,\dots,\beta\_n\right\<)$
>    holds, where $n=\text{lh}(\vec y)=\text{lh}(\vec\beta)$.

We then have the following result due to Martin and Steel, building on the construction
in Moschovakis ('83). To make the statement slightly more clear we introduce some
notation. If $(\lambda x.G\_x,\alpha)$ is a closed game representation of $A$ then
define the binary relation $A\_k$ for $k<\omega$ as $A\_k(x,u)$ iff $u$ is a partial play
in $G\_x$ of length $k$ from which player I has a winning quasi-strategy.

> **Theorem (Moschovakis-Martin-Steel).** Let $(\lambda x.G\_x,\alpha)$ be a closed
> game representation of $A$ and let $\gamma\in\textsf{On}$ be such that
> $\alpha<\omega\gamma$ and $A\_k\in J_\gamma(\mathbb R)$ for every $k<\omega$. Then
> $\text{Det}(J_\gamma(\mathbb R))$ implies that there is a scale on $A$ in
> $J_\gamma(\mathbb R)$.

This is the primary, indeed only, method we'll use to construct every scale we need.
The first major theorem on the scale property is the following.

> **Theorem (Steel '83).** For $\alpha>0$ and assuming $\text{Det}(J_\alpha(\mathbb
> R))$ holds, $\Sigma\_1^{J_\alpha(\mathbb R)}$ has the scale property (note that it's
> lightface).

I've written up the full proof of this theorem here, but to just have an idea of what
goes on I'll give a (very rough) outline of the proof here. We pick some
$A\in\Sigma\_1^{J_\alpha(\mathbb R)}$ and want to produce a
$\Sigma\_1^{J_\alpha(\mathbb R)}$-scale on $A$. To find this scale we use the above
Moschovakis-Martin-Steel theorem, so the plan is to come up with a game representation.
The case where $\alpha$ is a limit is ever so slightly simpler, so that's the case I'll
focus on in this sketch.

Let $\varphi\_0(v)$ be a $\Sigma\_1$ formula defining $A$; i.e. that $x\in A$ iff
$J_\alpha(\mathbb R)\models\varphi\_0[x]$. Further, for $\beta<\alpha$, define the sets

$$ A^\beta:=\\{x\in A\mid J\_\beta(\mathbb R)\models\varphi_0[x]\\}, $$

so that $A=\bigcup_{\beta<\alpha} A^\beta$. The plan is then to construct closed game
representations $(\lambda x.G^\beta\_x, \beta)$ on each of the $A^\beta$'s and then
"glue" the corresponding scales together to get a scale on $A$ in such a way that the
new "glued up" scale is a $\Sigma\_1^{J_\alpha(\mathbb R)}$-scale on $A$. Here's a
typical run of $G^\beta\_x$.

$$
\begin{array}{cccccccc}
\text{I} & i\_0,x\_0,\eta\_0 && i\_1,x\_2,\eta\_1 && \cdots\\\\
\text{II} && x\_1 && x\_3 && \cdots
\end{array}
$$

where $i\_k\in\\{0,1\\}$, $x\_k\in\mathbb R$ and $\eta\_k<\omega\beta$ for all
$k<\omega$. The idea behind the game is that player I tries to construct a
$J$-structure $J_\gamma(\mathbb R)\models\varphi\_0[x]$ with $\gamma\leq\beta$. To do
this we stitch together a theory $T$ such that whenever $M\models T$ we have to have
that $M=J_\gamma(\mathbb R)$ and $M\models\varphi\_0[x]$ --- the $i\_k$'s are the ones
encoding this theory $T$. The theory isn't completely sufficient however, as it can't
encode the second-order property of being wellfounded and it doesn't control which
reals $M$ contains. The solution to the first issue is the $\eta\_k$'s, which encode an
order-preserving map $o(M)\to\omega\beta$, and the second issue is solved by requiring
that the $x\_k$'s are reals of $M$ and capture the truth of statements involving reals
over $M$.

There's a part of the proof which I'd like to emphasize. To show that the resulting
scale satisfies our definability requirement, a (simply definable) notion of an honest
play is introduced, and the key lemma is then that, for player I, playing honestly is
equivalent to winning the game (this is analogous to the fact that in closed games,
player I playing non-losing plays is winning). That honest plays are winning is quite
straight-forward, but I find the proof of the converse quite ingenious, a proof that's
due to Woodin.

What he does is consider the statement "if $u$ is a winning play then it's honest",
call it $\vartheta$, and the strategy is then to show that whenever $M$ is a countable
transitive model of $\textsf{ZF}+\textsf{DC}$ then $M\models\vartheta$, which suffices
to show that $\textsf{ZF}+\textsf{DC}\vdash\vartheta$. So, consider such an $M,u$ and,
in $M$, let $\Sigma$ be a winning strategy starting from $u$. Then define $\mathbb P$
to be the poset of all partial plays extending $u$ and following $\Sigma$ and force
with $\mathbb P$.

The generic supplies us with a "generic play" of the game which is winning,
circumventing the use of $\textsf{AC}$. It's then relatively simple to show that $u$ is
honest in the generic extension, and absoluteness of honesty then gives us honesty in
$M$. This way of using forcing as a choice principle also reminds me of the proof I
sketched for the Hahn-Banach theorem, where an ultrafilter acted as the "glue" instead
of a generic, producing a canonical element.

If you're interested in the full proof, here you go. This was then the first step to
finding scaled pointclasses, and next time we'll use this result to find boldface
scaled pointclasses as well, utilising the notion of a gap. More on that next time.
