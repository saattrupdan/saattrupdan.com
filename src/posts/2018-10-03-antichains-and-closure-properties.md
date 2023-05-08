---
title: Antichains and Closure Properties
meta: There are many different properties that forcings can have, whose consequences are usually well-known. As an example, intuitively, closure properties of forcings yield preservation of cardinals below, and antichain properties yield preservation of cardinals above. But these properties seem mostly to be studied individually, so Stamatis Dimopoulos and I set out to find these folklore results about which combinations of closure properties and antichain properties can consistently hold.
tags: set theory, infinite combinatorics
---

There are many different properties that forcings can have, whose consequences are
usually well-known. As an example, intuitively, closure properties of forcings yield
preservation of cardinals below, and antichain properties yield preservation of
cardinals above. But these properties seem mostly to be studied individually, so
[Stamatis Dimopoulos](https://st-dimopoulos.github.io/) and I set out to find these
folklore results about which combinations of closure properties and antichain
properties can consistently hold.

Let's start off by recalling a few definitions. A forcing notion $\mathbb P$ is
**${<}\kappa$-closed** if every chain in $\mathbb P$ of length ${<}\kappa$ has a lower
bound in $\mathbb  P$. We can increase the strength of this by saying that it's
**${<}\kappa$-directed closed** if every directed system of size ${<}\kappa$ has a
lower bound in $\mathbb P$. We can also weaken ${<}\kappa$ closure by considering the
following game for $\kappa$ many rounds.

$$
\begin{array}{cccccccccc}
  \text{I} & 1_{\mathbb P} && p\_1 && p\_2 && \cdots\\\\
  \text{II} && p\_0 && p\_3 && \cdots
\end{array}
$$

Here $p_\alpha\in\mathbb P$ and $p_{\alpha+1}\leq p_\alpha$ for all $\alpha<\kappa$.
Player I wins iff they can keep on playing throughout all the rounds. We then say
$\mathbb P$ is **$\kappa$-strategically closed** if player I has a winning strategy in this
game. Note that every ${<}\kappa$-closed $\mathbb P$ is also $\kappa$-strategically
closed.

The last closure property I want to use here is **${<}\kappa$-distributive**, which
means that any $\prec$-chain of maximal antichains has a $\prec$-lower bound, where
$A\prec B$ iff every $a\in A$ is below some $b\in B$. By letting player I follow their
winning strategy in which player II plays elements of the antichains, we see that every
$\kappa$-strategically closed $\mathbb P$ is also ${<}\kappa$-distributive. So far so
good.

We can informally describe these closure properties as enforcing the poset to be tall.
The in some sense orthogonal view of enforcing the poset to be slim can be formalised
using antichain properties. Here $\mathbb P$ has the **$\lambda$-chain condition**
(or **$\lambda$-cc**) if every antichain of $\mathbb P$ has size ${<}\lambda$.

Now the overall question is: can a poset be both tall and slim? It turns out that there
are (ZFC-provable) restrictions to this. We have to exclude the "trivial case", which
is when $\mathbb P$ is too slim, which is to say that it isn't really branching in any
significant way. At the very minimum we should thus require that $\mathbb P$
is **atomless**, which is to say that every $p\in\mathbb P$ have incompatible
extensions. Basically every forcing notion satisfies this.

If we didn't restrict to the atomless forcings then we would have anomalies like just
viewing $\kappa$ as a (non-atomless) forcing, which trivially is both
$<\kappa$-directed closed and also has the $2$-cc. We then get our first restriction.

> **Proposition (folklore).** Let $\kappa$ be uncountable regular. Then every atomless
> $\kappa$-strategically closed $\mathbb P$ does not have the $\kappa$-cc.

**Proof**. Fix a winning strategy $\sigma$ for player I in the game. We are going to
construct by simultaneous recursion two sequences $\left\<
p_\alpha\mid\alpha<\kappa\right\>$ and $\left\< q_{\alpha+1}\mid\alpha<\kappa\right\>$
such that

1. $\left\< p_\alpha\mid\alpha<\kappa\right\>$ is a decreasing sequence
2. $\left\< q_{\alpha+1}\mid\alpha<\kappa\right\>$ is an antichain
3. $q_{\alpha+1} < p_\alpha$ holds for all $\alpha<\kappa$
4. the $p_\alpha$'s are player I's $\sigma$-moves in a play of the game

For the base case simply set $p\_0:=1_{\mathbb P}$. If $p_\alpha$ has been defined such
that $\left\< p_\xi\mid\xi\leq\alpha\right\>$ is the sequence of player I's moves in a
play of the game, then let $p_{\alpha+1}$ be player I's $\sigma$-response to whatever
player II plays after $p_\alpha$ in the game. We can use that $\mathbb P$ is atomless
to fix some $q_{\alpha+1} < p_\alpha$ incompatible with $p_{\alpha+1}$.

If $\left\< p_\xi\mid\xi<\alpha\right\>$ and $\left\< q_{\xi+1}\mid\xi<\alpha\right\>$
have been defined for some limit $\alpha<\kappa$ then use $\sigma$ on the play thus far
to get $p_\alpha$. At the end of the construction, $\left\<
q_{\alpha+1}\mid\alpha<\kappa\right\>$ is then an antichain of size $\kappa$, showing
that $\mathbb P$ does not have the $\kappa$-cc. **QED**

We can get a lot of closure if we allow $\mathbb P$ to be a bit wider:

> **Fact (folklore).** If $\kappa=\kappa^{<\kappa}$ then $\kappa$-Cohen forcing
> $\text{Add}(\kappa,1)$ is both ${<}\kappa$-directed closed and has the $\kappa^+$-cc.

**Proof**. For the closure we simply take the union of any directed system of size
${<}\kappa$, which works as $\kappa=\kappa^{<\kappa}$ implies that $\kappa$ is regular.
The forcing has size $\kappa^{<\kappa}=\kappa$, so it has the $\kappa$-cc. **QED**

So these previous two results give an idea of what happens to all the properties with
the 'closed' adjective in them. But distributivity still remains, and indeed, the
scenario is different here, by the following.

> **Fact (folklore).** Forcing with a $\kappa$-Suslin tree is both
> ${<}\kappa$-distributive and has the $\kappa$-cc.

**Proof**. By definition of a Suslin tree, it has the $\kappa$-cc, and every
$\kappa$-tree has height $\kappa$ and is thus ${<}\kappa$-distributive. **QED**

Since we can always force a $\kappa$-Suslin tree on inaccessible $\kappa$ (or
$\kappa=\omega\_1$) we get that we can consistently get a forcing satisfying both of
these properties. This is as far as we can go however:

> **Proposition (folklore).** Let $\kappa$ be uncountable regular. Then every atomless
> ${<}\kappa$-distributive $\mathbb P$ does not have the $\lambda$-cc for any
> $\lambda<\kappa$.

**Proof**. We recursively build a coherent sequence $\left\<
A_\alpha\mid\alpha\leq\lambda\right\>$ of maximal antichains of $\mathbb P$. Let
$A\_0:=\\{1_{\mathbb P}\\}$. Assuming $A_\alpha=\\{a_\xi\mid\xi<\eta\\}$ has been built
(for some $\eta$), we use that $\mathbb P$ is atomless to find incompatible
$p_\xi^{(0)},p_\xi^{(1)}\leq a_\xi$. Then set
$A_{\alpha+1}:=\\{p_\xi^{(0)},p_\xi^{(1)}\mid\xi<\eta\\}$. At limit stages
$\delta\leq\lambda$ we use ${<}\kappa$-distributivity of $\mathbb P$ to define
$A_\delta$. Note that $|A_\alpha|\geq|\alpha|$ for all $\alpha\leq\lambda$, so
$A_\lambda$ is an antichain of size at least $\lambda$, showing that $\mathbb P$ can't
have the $\lambda$-cc. **QED**

So we get that the following overview of the compatibility of these forcing properties,
along with some examples of forcing posets in each category ([download a high-quality
PDF of this here](/diagrams/forcing-compatibility.pdf)):

<img src="/src/assets/img/forcing-compatibility.webp" alt="A diagram showing the
relations between various forcing properties" class="invert-on-darkmode" />
