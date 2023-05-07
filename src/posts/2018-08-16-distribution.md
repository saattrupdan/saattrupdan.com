---
title: Distribution
meta: The notion of distributivity comes from the Latin word distribut-, meaning "divided up", and has since evolved into how mathematics deals with things that are divided up. This starts back in school when we learn that a(b + c) = ab + ac. This property can be generalised in the language of Boolean algebras, still maintaining the intent of dealing with divided stuff, leading to the axiom of choice being a notion of distributivity as well!
tags: set theory, axiom of choice
---

The notion of distributivity comes from the Latin word _distribut-_, meaning "divided
up", and has since evolved into how mathematics deals with things that are divided up.
This starts back in school when we learn that $a\cdot (b+c)=ab+ac$. This property can
be generalised in the language of Boolean algebras, still maintaining the intent of
dealing with divided stuff, leading to the axiom of choice being a notion of
distributivity as well!

<center>
  <img
    src="/src/assets/img/distribution.webp"
    alt="Equations showing the distributive property in action for arithmetic"
    style="width: min(400px, 100%);"
    class="invert-on-darkmode"
  />
</center>

As mentioned above, the distributive property for numbers is the well-known
property $a\cdot (b+c)=ab+ac$, which holds (by definition) in any ring. From this
property we also get that $(a+b)(c+d)=ac+ad+bc+bd$, which we can write as

$$ \Pi_{k<2}\Sigma_{l<2}a_{k,l} = \Sigma_{f:2\to 2}\Pi_{k<2} a_{k,f(k)}. $$

This can then be generalised from 2 terms consisting of 2 numbers to m terms consisting
of n numbers, yielding the following property:

$$
\Pi_{k < m}\Sigma_{l < n}a_{k,l} = \Sigma_{f:m\to k}\Pi_{k < m} a_{k,f(k)}.\qquad (1)
$$

Alright, so far so good. Let's move away from the numbers now and work in any boolean
algebra $\mathbb B$ which we further require to be complete, meaning that all joins
(sums) and meets (products) exist. We can then look at the following property of
$\mathbb B$, where $X,Y$ are arbitrary sets:

$$
\Pi_{x\in X}\Sigma_{y\in Y}a_{x,y} = \Sigma_{f:X\to Y}\Pi_{x\in X} a_{x,f(x)},\qquad
(2)
$$

i.e. exactly the same as before in $(1)$, but we've just replaced a few letters. We
call this property **$(X,Y)$-distributivity**. If the numbers admitted a boolean
algebra structure with addition and multiplication then $(1)$ would show that the
numbers are $(m,n)$-distributive for all $m,n<\omega$.

But is this property just.. true? Working in the boolean algebra of all sets, $(2)$ is
saying that

$$
\bigcap\_{i\in I}\bigcup\_{j\in J}X_{ij}=\bigcup\_{f\in J^I}\bigcap\_{i\in I}X_{if(i)},
$$

which can be seen to be equivalent to the axiom of choice!  So this generalised kind of
distributivity at least requires choice. But alas, we can find complete boolean
algebras that aren't distributive. Let's have a look at the boolean algebra $B/I_\mu$
of Borel sets modulo Lebesgue null sets with inclusion, which can be shown to be
complete.

Define $A\_0$ as the collection of all intervals of the form $[n,n+1]$, then define
$A\_1$ as the collection of all intervals of the form $[n,n+1/2]$ or $[n+1/2,n+1]$, and
so on. Then the intersection $A:=\bigcap\_n A\_n$ only consists of singletons. Fix some
measure one set $B$ and define $a_{n,k}$ such that

$$ \\{a_{n,k}\mid k<\omega\\}=\\{B\cap a\mid a\in A\_n\\}\qquad (3). $$

Note then that $\sum\_i a_{n,k}=B$ for every $n<\omega$, so that the left-hand side of
$(2)$ is $B$ (here $X=Y=\omega$). Let's look at the right-hand side. For every
$f:\omega\to\omega$ let $B\_f:=\prod\_n a_{n,f(n)}$, which by $(3)$ is a singleton,
which has measure zero. This means that $\sum\_f B\_f=0$ as well, but $0\neq B$. Thus
$B/I_\mu$ is not $(\omega,\omega)$-distributive.

Okay, so that was a non-example at least. Now, why do we care about distributivity?

> **Fact.** A complete boolean algebra is $(\kappa,\lambda)$-distributive if and only
> if forcing with it doesn't add any new functions $f:\kappa\to\lambda$.

Oh, right. That sure does look useful.

This for instance shows that $B/I_\mu$ must add a new function $f:\omega\to\omega$,
i.e. a new real number; these new real numbers are called **random reals**. The above
also shows that forcing with a complete boolean algebra of sets will never add any new
sequences if and only if the axiom of choice holds.
