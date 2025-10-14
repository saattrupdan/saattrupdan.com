---
title: HOD Models of Determinacy
meta: In the late 90's it was shown by Steel and Woodin that HOD of L(R) exhibits mouse-like behaviour, and since then there's been a great interest in finding the HODs of other models than L(R). I'll here give a (non-exhaustive) overview of both which HODs have been shown to have this mouse-like structure and also explain the general strategy used so far in finding these mice.
tags: set theory, determinacy
---

HOD is the proper class of all sets $x$ such that both $x$ and all the
elements of the transitive closure of $x$ are definable using ordinal parameters.
HOD is a model of ZFC, but in general its structure is not really known. In the late
90's it was shown by Steel and Woodin that $\textsf{HOD}^{L(\mathbb R)}$ exhibits
mouse-like behaviour, and since then there's been a great interest in finding the HODs
of other models than $L(\mathbb R)$. I'll here give a (non-exhaustive) overview
of both which HODs have been shown to have this mouse-like structure and also explain
the general strategy used so far in finding these mice.

This post is part of a series on determinacy:

1. <router-link to="/posts/2017-01-11-an-overview-of-determinacy-axioms">An Overview of
   Determinacy Axioms</router-link>
2. <router-link to="/posts/2017-01-25-determinacy-from-woodins-i">Determinacy From
   Woodins I</router-link>
3. <router-link to="/posts/2017-02-08-determinacy-from-woodins-ii">Determinacy From
   Woodins II</router-link>
4. <router-link to="/posts/2017-02-22-determinacy-from-woodins-iii">Determinacy From
   Woodins III</router-link>
5. <router-link to="/posts/2017-04-05-from-determinacy-to-a-woodin-i">From Determinacy
   to a Woodin I</router-link>
6. <router-link to="/posts/2017-05-10-from-determinacy-to-a-woodin-ii">From Determinacy
   to a Woodin II</router-link>
7. <router-link to="/posts/2017-05-24-the-structure-of-games">The Structure of
   Games</router-link>
8. <router-link to="/posts/2017-06-07-borel-determinacy">Borel
   Determinacy</router-link>
9. HOD Models of Determinacy
10. <router-link to="/posts/2017-07-14-limitations-of-zfc-determinacy">Limitations of
    ZFC Determinacy</router-link>
11. <router-link to="/posts/2018-08-02-mice-and-long-games">Mice and Long
    Games</router-link>

Let's start off with some history. Interest in studying the structure of HOD started in
the beginning of the 80's, where three out of the fourteen famous [Delfino
problems](https://andrescaicedo.files.wordpress.com/2008/04/vdp-finalversion-withreferences.pdf) involved
HOD. Assuming $AD+V=L(\mathbb R)$,

- is every regular cardinal $<\Theta$ measurable? (yes, shown by Moschovakis and
  Kechris)
- is there a $\kappa$ which is $2^\kappa$-supercompact in HOD? (no, shown
  by Woodin and Shelah)
- does HOD satisfy GCH? (yes, shown by Steel and Woodin)

The positive solution to the last question sparked a lot of interest, since
Steel showed even more than just GCH - he showed the remarkable fact that, assuming
$AD^{L(\mathbb R)}$, $\textsf{HOD}^{L(\mathbb R)}$ is a mouse below $latex
\Theta$, the least ordinal $\alpha$ to which there is no surjection $latex
f:\mathbb R\to\alpha$. This was the kickoff to a great deal of HOD research, and Woodin
showed that the full HOD of $L(\mathbb R)$ is a new kind of mouse, having both an
extender sequence and a fragment of its own iteration strategy as predicates - this
breed of mice is now called hod mice.

A natural question is then if this is something peculiar to $L(\mathbb R)$ or if
it also holds in other HODs. Investigating the HOD of $L[x]$ turned out to be
incredibly hard, but the model $L[x,g]$ turned out to be more amenable to an
approach analogous to Steel's approach to $L(\mathbb R)$, where $g$ is
$L[x]$-generic for collapsing the least inaccessible of $L[x]$ to be $latex
\aleph\_1$. This has very recently been generalised by Sargsyan and Uhlenbrock to the
HOD of $M\_n(x,g)$.

Abstracting away, we can also view $L(\mathbb R)$ as simply a special case of a
model satisfying $\textsf{ZF}+\textsf{AD}^+$, where $\textsf{AD}^+$ is an
ostensibly stronger version of $\textsf{AD}$. Taking this approach, we can then
beef up this theory and ask about the HOD of the least model satisfying that theory.
This has resulted in a HOD analysis of the least model of the various $latex
\Theta$-theories floating around.

That was a bit of an overview. Let's now dig down into how these HODs are being
investigated. As a representative example, let's take a look at the simplest instance:
the HOD of $L[x,g]$. Let's assume (boldface) ${\bf\Delta}^1\_2$-determinacy,
which is equivalent to the existence of $M\_1^\sharp$ and $x^\sharp$ for all
reals $x\in\mathbb R$. Strictly speaking we could do with the weaker assumption
that

$$
L[x]\models"\Delta^1\_2\text{-determinacy and there exists an inaccessible cardinal}",
$$

but having $M\_1^\sharp$ makes the argument a bit more clean. Fix some $x\in\mathbb R$
such that $M\_1^\sharp\in L[x]$. Firstly, our hypothesis implies that $M\_1^\sharp$ has
a unique iteration strategy $\Sigma\_0$, so we can construct the direct limit of all
$\Sigma\_0$-iterates $N$ of $M\_1^\sharp$ such that
$N|(\delta^N)^{+N}\in\text{HC}^{L(\mathbb R)}$, where $\delta^N$ is the Woodin cardinal
of $N$. Call this direct limit $M_\infty^+$ and its Woodin cardinal $\delta_\infty$.

The problem with working with $M_\infty^+$ is that it doesn't exist within $L[x,g]$, so
we want to build an internal directed system of mice. I'll leave out the technical
details, but roughly speaking the system consists of all countable mice inside of
$L[x,g]$ which looks like $M\_1^\sharp$ (remember we're in $L[x,g]$, so countable here
means of size less than the first inaccessible of $L[x]$). This then yields the direct
limit $M_\infty\subseteq L[x,g]$.

To show that $M_\infty$ is a well-founded model, we define an elementary map
$\sigma:M_\infty\to M_\infty^+$, which suffices as $M_\infty^+$ is well-founded as it's
a $\Sigma\_0$-iterate of $M\_1^\sharp$. This map $\sigma$ is defined as taking $x\in
M_\infty$, pulling it back to a mouse which is in both directed systems (the existence
of such a mouse has to be shown here) and then going up to $M_\infty^+$ via the direct
limit map. We also get that $\sigma\upharpoonright\delta_\infty+1=\text{id}$, so that
in particular the two direct limits have the same Woodin cardinal.

To recap, we've now got an internal limit $M_\infty\subseteq L[x,g]$ and an external
limit $M_\infty^+$ which agree below their common Woodin cardinal $\delta_\infty$.
Since our internal directed system was definable in $L[x,g]$, we get that

$$ M\_\infty\subseteq\textsf{HOD}^{L[x,g]}. $$

The next step is to show the opposite inclusion, for which we need a so-called derived
model resemblance. First, let define $\alpha^\*$ for any ordinal $\alpha$ to be the
image of $\alpha$ inside $M_\infty$, yielding a function $F(\alpha):=\alpha^\*$.
The derived model of $M_\infty$ is $M_\infty[h]$, where $h$ is $M_\infty$-generic for
collapsing the least inaccessible $\kappa_\infty$ of $M_\infty$ strictly above
$\delta_\infty$ to be $\aleph\_1$. The derived model resemblance then implies that

$$
L[x,g]\models\varphi[\alpha\_1,\dots,\alpha\_n] \Leftrightarrow
M_\infty[h]\models\varphi[\alpha\_1^\*,\dots,\alpha\_n^\*]
$$

for any formula $\varphi$ and ordinals $\alpha\_1,\dots,\alpha\_n$. The next step is then
to show that

$$ \textsf{HOD}^{L[x,g]}=L[M_\infty,F]. (1) $$

We get the right-to-left inclusion simply because both $M_\infty$ and $F$ are
$L[x,g]$-definable. For the other direction the first thing to show (which I'll skip
here) is that $\textsf{HOD}^{L[x,g]}=L[A]$ for an $L[x,g]$-definable
$A\subset\aleph\_2^{L[x,g]}$. Given this fact we can then use the above resemblance to
transfer the fact over to $M_\infty$, so that $A$ lies in $L[M_\infty,F]$, yielding
(1).

Now let $\Lambda$ be the restriction of $\Sigma\_0$ to trees $T$ on $M_\infty$ such that
$T\in M_\infty|\kappa_\infty$. The last step is then showing that

$$ \textsf{HOD}^{L[x,g]}=L[M_\infty,\Lambda], $$

which is done by showing that $\Lambda$ is definable using $M_\infty$ and $F$, and then
using (1). Summarising, HOD was found by

1. Cooking up a directed system of mice
2. Showing that we can transfer truths between $L[x,g]$ and the derived model of the direct limit
3. Establishing that HOD is of the form $L[A]$ for some $L[x,g]$-definable $A$
4. Using (2) and (3) to show that HOD is of the form $L[M_\infty,F]$ for some $F$
5. Defining a partial strategy of $M_\infty$ from $F$.

This strategy is basically what's going on in the $L(\mathbb R)$ cases as well,
and I suspect this is also what's happening with minimal models of $latex
\Theta$-theories.
