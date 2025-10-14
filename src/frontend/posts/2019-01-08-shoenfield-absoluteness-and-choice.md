---
title: Shoenfield Absoluteness and Choice
meta: Absoluteness of wellfoundedness and Shoenfield absoluteness are two absoluteness results in set theory that are both used incredibly often. But what if we want to apply the result to absoluteness between arbitrary models M and N, rather than absoluteness between V and L? It turns out that our models have to satisfy dependent choice in both absoluteness results, and in Shoenfield absoluteness we have to ensure that the models are of "similar height".
tags: set theory
---

Absoluteness of wellfoundedness and Shoenfield absoluteness are two absoluteness
results in set theory that are both used incredibly often. But what if we want to apply
the result to absoluteness between arbitrary models $M$ and $N$, rather than
absoluteness between $V$ and $L$? It turns out that our models have to satisfy
dependent choice in both absoluteness results, and in Shoenfield absoluteness we have
to ensure that the models are of "similar height".

![Picture of a mountain reflected in a
lake](/src/frontend/assets/img/shoenfield-absoluteness-and-choice.webp)

We start with the absoluteness of wellfoundedness, where the following standard proof
turns out to not require power set, but do require DC.

> **Theorem (Absoluteness of wellfoundedness).** Let $R\subseteq X\times X$ be a binary
> relation on some set $X$. Then wellfoundedness of $R$ is absolute between transitive
> models of $\textsf{ZF}^-+\textsf{DC}$.

**Proof**. It suffices to show that wellfoundedness of a binary relation $R$ can be
described in a $\Delta\_1^{\textsf{ZF}^-+\textsf{DC}}$ fashion.

Firstly wellfoundedness of $R$ is equivalent (over $\textsf{ZF}^-+\textsf{DC}$) to
there being no function $f:\omega\to X$ such that $f(n+1)Rf(n)$ for all $n<\omega$,
which is clearly a $\Pi\_1$ statement. Secondly, wellfoundedness of $R$ is also
equivalent (over $\textsf{ZF}^-$) to there existing a ranking function
$r:X\to\textsf{On}$; i.e., that $r(x)=\sup\\{r(y)+1\mid yRx\\}$, which is a $\Sigma\_1$
statement. **QED**

In the above proof we only needed DC to show the $\Pi\_1$ part, meaning that
wellfoundedness is always downwards absolute between transitive models of
$\textsf{ZF}^-$. The next few lemmas lead up to Shoenfield absoluteness, where they
treat $\Pi^0\_1(x)=\Pi^1\_0(x)$ sets and $\Pi^1\_1(x)$ sets, respectively.

> **Lemma (ZF+DC).** Let $x\in\mathbb R$. Then for every $\Pi^0\_1(x)$ set
> $A\subseteq\mathbb R^n$ there's a tree $T\in L[x]$ on $\omega^n$ such that $A=[T]$.

**Proof**. For notational ease let's assume that $n=1$. Let $A=\\{z\in\mathbb
R\mid\forall k<\omega:\varphi(z\upharpoonright k,x)\\}$ for $\varphi(u,v)$ a $\Pi^0\_1$
formula, and define

$$ T:=\\{s\in{^{<\omega}\omega}\mid\exists y\in A: s\subseteq y\\}. $$

Note that $T\in L[x]$ and clearly $A\subseteq[T]$, so let $y\in [T]$. Then
$y\upharpoonright n\in T$ for all $n<\omega$, so that $\textsf{DC}$ implies that
there's a sequence $\left\< y\_k\mid k<\omega\right\<$ of $y\_k\in A$ such that
$y\upharpoonright k\subseteq y\_k$, which implies that $\varphi(y\upharpoonright k,x)$
holds for all $k<\omega$, making $y\in A$. **QED**

> **Lemma (ZF+DC).** Let $x\in\mathbb R$. Then every $\Pi^1\_1(x)$ set
> $A\subseteq\mathbb R^n$ is the projection of a tree $S\in L[x]$ on
> $\omega^n\times\omega\_1$.

**Proof**. Assume for notational simplicity that $n=1$. Let $A\subseteq\mathbb R$ be
$\Pi^1\_1(x)$, so that $\mathbb R\setminus A=pB$ for some $\Pi^0\_1(x)$ set $B$. By the
above lemma there's a tree $T\in L[x]$ such that $B=[T]$, so that $\mathbb R\setminus
A=p[T]$, meaning that $y\in A$ iff $T\_y$ is wellfounded.

Note that, using replacement, $T\_y$ is wellfounded iff it can be ranked by a function
$f:T\_y\to\omega\_1$, meaning that $s\supsetneq t$ implies that $f(s) < f(t)$ for all
$s,t\in T\_y$. We can pick such a ranking function with codomain $\omega\_1$ since
wellfoundedness of $T\_y$ implies that $|T\_y|=\aleph\_0$.

Now define a tree $S\in L[x]$ on $\omega\times\omega\_1$ as follows. Fix a bijection
$e:\omega\to{^{<\omega}\omega}$ such that, for every $s\in{^{<\omega}\omega}$,
$n<\text{lh}(s)$ implies that $e^{-1}(s\upharpoonright n) < e^{-1}(s)$. For
$s\in{^{<\omega}\omega}$ define

$$
T\_s := \\{t\in{^{<\omega}\omega} \mid
\text{lh}(t)\leq\text{lh}(s)\land(s\upharpoonright\text{lh}(t),t)\in T\\}
$$

and then define $S\subseteq{^{<\omega}\omega}\times{^{<\omega}\omega\_1}$ as $(s,t)\in
S$ iff $\text{lh}(s)=\text{lh}(t)$ and that

$$
\forall k,l<\text{lh}(s)[(e(k)\in T\_s\land e(l)\in T\_s\land e(k)\supsetneq
e(l))\Rightarrow t(k) < t(l)].
$$

Note that $S\in L[x]$ since $T\in L[x]$. For $(s,t),(s',t')\in S$ we set
$(s,t)\leq\_S(s',t')$ iff $s\supseteq s'$ and $t\supseteq t'$. Then $y\in A$ iff $S\_y$
is illfounded iff $y\in p[S]$. **QED**

> **Theorem (Shoenfield absoluteness).** Let $x\in\mathbb R$. Then every
> $\Sigma^1\_2(x)$ sentence is absolute between transitive models $M\subseteq N$ of
> $\textsf{ZF}+\textsf{DC}$ such that $\omega\_1^N,x\in M$.

**Proof**. Let $\varphi(v)$ be a $\Sigma^1\_2$ formula, so that
$\varphi(v)\equiv\exists y\in\mathbb R\psi(v,y)$ for a $\Pi^1\_1$-formula $\psi(v,w)$.
If $M\models\varphi[x]$ then trivially $N\models\varphi[x]$ by upwards absoluteness of
$\Pi\_1$-formulas, so assume instead that $N\models\varphi[x]$. Define

$$ A:=\\{y\in\mathbb R^N\mid N\models\psi[x,y]\\}\in N, $$

so that $A\neq\emptyset$ by assumption. As $A$ is a $\Pi^1\_1(x)$ set in $N$, the above
lemma implies that we get that $A=p[T]$ for a tree $T\in L[x]^N$ on
$\omega\times\omega\_1^N$, so that $y\in A$ iff $T\_y$ is illfounded in $N$.

Pick some $y\in A$. Then $T\_y$, and in particular also $T$, is illfounded in $N$.
Since $\omega\_1^N,x\in M$ we get that $T\in M$ as well, so that absoluteness of
wellfoundedness yields some $y'\in A\cap M\neq\emptyset$, concluding
$M\models\varphi[x]$. **QED**

We see that the only thing we needed $\omega\_1^N,x\in M$ for was to ensure that the
resulting tree was in indeed in $M$, to make sure that we could use absoluteness of
wellfoundedness.
