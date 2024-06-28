---
title: Projectively Correct Mice
meta: In a previous post we proved that whenever a countable mouse M has n Woodins it understands projective sets. As we mentioned back then, this is not as good as being correct about these sets. Now, what does it then take for a mouse to be projectively correct?
tags: set theory, inner model theory, genericity iterations
---

In a previous post we proved that whenever a countable mouse M has n Woodins
it understands $\bf\Pi^1_{n+1}$ sets, implying that whenever A is such a set it holds
that $A\cap M\in M$. As we mentioned back then, this is not as good as being correct
about these sets, which would mean that $A\cap M\neq\emptyset$ whenever A of course is
non-empty as well. Another way to phrase this is to say that $V\models\sigma$ iff
$M\models\sigma$ for every $\bf\Pi^1_{n+1}$-sentence. Now, what does it then take for a
mouse to be projectively correct?

This post is part of a series on genericity iterations:

1. <router-link to="/posts/2016-10-05-genericity-iterations-i">Genericity Iterations I</router-link>
2. <router-link to="/posts/2016-10-19-genericity-iterations-ii">Genericity Iterations II</router-link>
3. <router-link to="/posts/2017-12-18-projective-understanding-via-woodins">Projective Understanding via Woodins</router-link>
4. <router-link to="/posts/2017-12-29-from-mice-to-determinacy">From Mice to Determinacy</router-link>
5. Projectively Correct Mice

Recall what it means for M to understand a set of reals A at some ordinal $\eta < o(M)$.
Roughly speaking, we got a forcing term $\tau$ in M for the collapse of $\eta$ to be
countable, which represents A in the sense that $A\cap M[g]=\tau^g$ whenever
$g\subseteq\text{Col}(\omega,\eta)^M$ is M-generic. Now, M captures A if it understands
it and absorbs reals at $\eta$, roughly meaning that we can do genericity iterations at
$\eta$, as if it was a Woodin cardinal.

Using this terminology, M captures all $\bf\Pi^1_{n+1}$ sets of reals if M has n
Woodins. Simply capturing won't do to yield correctness though --- here we further
require the forcing terms witnessing the capturing to be of the form $p[\check T]$,
where $T\in M$ is a tree on $\omega\times X$ for some X. We call this Suslin capturing.
Let's firstly show that this suffices for what we want to do.

> **Lemma.** Let M be a countable mouse, A a set of reals and assume that M
> Suslin-captures A. Then $A\neq\emptyset$ implies $M\cap A\neq\emptyset$.

**Proof.** Assume M Suslin-captures A at $\eta < o(M)$ via $T\in M$, and let $x\in A$.
Use that M absorbs reals at $\eta$ to get an iteration $i:M\to N$ and a generic
$g\subseteq\text{Col}(\omega,i(\eta))^N$ such that $x\in N[g]$. But since M understands
A at M we get that $N[g]\cap A=p[T]$, so that $x\in p[T]$. Then absoluteness of
wellfoundedness and elementarity implies that $M\models p[T]\neq\emptyset$. But note
that $A\cap M=p[T]$ by applying understanding with $i=\text{id}$ and g trivial, so that
$A\cap M\neq\emptyset$. **QED**

This then means that if M Suslin-captures both $A$ and $\lnot A$ then M is correct
about ${\bf\Sigma^1\_1}(A)$ sentences. Okay, brilliant, Suslin-capturing suffices! But
how do we know whether our favorite mouse actually Suslin-captures some (perhaps
complicated) set of reals? This is where the following theorem helps us out.

> **Theorem.** Let M be a countable mouse, $A\subseteq\mathbb R^2$ and assume that M
> Suslin-captures A at $\eta < o(M)$. Then M also Suslin-captures $\exists^{\mathbb R}A$
> and $\forall^{\mathbb R}A$ at every $\xi<\eta$.

Before we commence with the proof let's just note a few considerable corollaries.
Firstly note that every M Suslin-understands $\Sigma^1\_1$ sets of reals, by the proof
of Shoenfield's absoluteness theorem. The above theorem then implies that M
Suslin-captures every $\bf\Sigma^1_{n+1}$ set of reals whenever M has n Woodins. A
first consequence of this is then that M is $\bf\Sigma^1_{n+1}$-correct whenever M has
n Woodins (and thus projectively correct when it has a limit of Woodins). A second
consequence, using the corollary from my last post, is that the existence of a
countable mouse with $n>1$ Woodins implies that every $\bf\Sigma^1_{n+1}$ set of reals
is determined. Now, on with the proof. Buckle up.

**Proof.** Let $T\in M$ witness the Suslin-capturing of A and fix a $\xi<\eta$. We'll
start by showing that M Suslin-captures $\forall^{\mathbb R}A$ at $\xi$, and it will
turn out that a slightly simpler argument shows the corresponding fact for
$\forall^{\mathbb R}A$. To Suslin-capture $\forall^{\mathbb R}A$ we need to build a
tree $U\in M$ which witnesses that $\forall^{\mathbb R}A\cap N[g]=p[i(U)]$ whenever
$i:M\to N$ is an iteration of M and $g\subseteq\text{Col}(\omega,i(\xi))^N$ is
N-generic. Purely for notational convenience we'll assume that $i=\text{id}$ in the
following.

> _**The construction of the tree U**_
>
> Our tree will be a tree on $\omega^3\times M|(\gamma+1)$, where $\gamma < o(M)$
> satisfies that $T\in M|\gamma$ and $M|\gamma\models\textsf{KP}$ ([Kripke-Platek set
> theory](https://en.wikipedia.org/wiki/Kripke%E2%80%93Platek_set_theory)). Instead of
> going into the gritty details of the construction, we'll simply describe a blueprint.
>
> Let $L$ be the language of premice along with countably many constant symbols $\langle
> c\_n\mid n<\omega\rangle$. U is then the tree of attempts to construct a quadruple
> $\langle x,y,z,j\rangle$ satisfying the following.
>
> - $x,y,z\in\mathbb R$;
> - y encodes a complete Henkin theory $S\_y$ of a pointwise definable $L$-structure
>   $R\_y$ such that $\sigma\in S\_y$, where $\sigma$ is the $L$-sentence
>   $c\_4\Vdash_{\text{Col}(\omega,c\_0)}(1\Vdash_{\text{Col}(\omega,c\_1)}\forall
>   v\langle c\_3,v\rangle\in p[c\_2])$;
> - z encodes a proof of the $\Sigma^1\_1(x,y)$ sentence saying that there exists an
>   $R\_y$-generic $h\subseteq\text{Col}(\omega,c\_0)^{R\_y}$ such that
>   $x=(c\_3^{R\_y})^h$ and $c\_4^{R\_y}\in h$;
> - $j:R\_y\to M|(\gamma+1)$ is an elementary embedding such that $j(\langle
>   c\_0^{R\_y},c\_1^{R\_y},c\_2^{R\_y}\rangle)=\langle \xi,\eta,T \rangle$.

Now, let's see that this actually works, so let $x\in p[U]$. We need to show that
$x\in\forall^{\mathbb R}A$, so let $y\in\mathbb R$ be arbitrary. By definition of U we
have an embedding $j:R\to M$ such that, letting $\bar p:=j^{-1}(p)$ for every
$p\in\text{ran}(j)$, there's an R-generic $\bar g\subseteq\text{Col}(\omega,\bar\xi)^R$
such that $x\in R[\bar g]$ and whenever $\bar
h\subseteq\text{Col}(\omega,\bar\eta)^{R[\bar g]}$ is $R[\bar g]$-generic it holds that
$R[\bar g,\bar h]\models\forall v\langle x,v\rangle\in p[\bar T]$.

<img
    src="/src/assets/img/projectively-correct-mice.webp"
    class="centered-image"
    style="width: min(500px, 100%);"
/>

We now want to apply elementarity of j to move this scenario over to the M-side. We
firstly need to be sure that the universal quantifier appearing in $\sigma$ includes
$y$ as well though, so we first need to catch this real. If we let $\Sigma$ be M's
iteration strategy then the pullback strategy $\Sigma^j$ makes R iterable, so that we
can absorb y at $\bar\eta$, meaning that there's an iteration $\tilde i:R\to P$ and a
P-generic $\bar h\subseteq\text{Col}(\omega,\tilde i(\bar\eta))^P$ such that $y\in
P[\bar h]$. We also ensure that $\text{crit}(\tilde i)>\bar\xi$, so that we don't
change any of the above forcing facts about R.

Let $i:M\to Q$ be the iteration of M corresponding to $\tilde i:R\to P$ and $\tilde
j:P\to Q$ the lift of $j:R\to M$. Then elementarity of $\tilde j$ yields that there's a
Q-generic $g\subseteq\text{Col}(\omega,\xi)^Q$ such that $x\in Q[g]$ and, letting
$h\subseteq\text{Col}(\omega,i(\eta))^Q$ correspond to $\bar h$, $Q[g,h]\models\forall
v\langle x,v\rangle\in p[i(T)]$. But $y\in Q[g,h]$, so in particular $\langle
x,y\rangle\in p[i(T)]$. As M understands A via T and y was arbitrary this means that
$x\in\forall^{\mathbb R}A$.

Now, for the other inclusion, let $x\in\forall^{\mathbb R}A\cap M[g]$ --- we want to
show that $x\in p[U]$. Since M Suslin-captures A at $\eta$ via T we get that
$M\models\sigma$, where $\langle c\_0^M,c\_1^M,c\_2^M,c\_3^M,c\_4^M\rangle=\langle
\xi,\eta,T,\tau,p\rangle$, where $x=\tau^g$ and $p\in g$ is some condition. As
$M|\gamma\models\textsf{KP}$ it can define wellfounded parts of relations belonging to
it, so that $M|(\gamma+1)\models\sigma$ as well. Now, working in M[g] we can find
$\tilde j:R[g]\to M|(\gamma+1)[g]$ with R countable and everything relevant in
$\text{ran}(j)$. Let $j:=\tilde j\upharpoonright R$, $z\in\mathbb R$ encode a proof of
$x=(c\_3^R)^g$ and $y\in\mathbb R$ encode the $L$-theory of R. It's then clear that
$\langle x,y,z,j\rangle\in[U]$

The proof of the $\exists^{\mathbb R}A$ case is nearly identical. We simply replace the
universal quantifier in $\sigma$ with an existential one, and without having to catch
$y$. **QED**
