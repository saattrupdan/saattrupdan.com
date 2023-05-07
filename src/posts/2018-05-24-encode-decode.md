---
title: Encode/Decode
meta: There's a very neat way of encoding any set as a set of ordinals, which has the somewhat peculiar feature of it being hard (which here meaning that it requires the axiom of choice) to encode sets, but easy to decode them. Like some kind of a very ineffective crypto-system.
tags: set theory
---

There's a very neat way of encoding any set as a set of ordinals, which has the
somewhat peculiar feature of it being hard (which here meaning that it requires the
axiom of choice) to encode sets, but easy to decode them. Like some kind of a very
ineffective crypto-system.

<img
  src="/src/assets/img/encode-decode.webp"
  alt="A diagram showing the steps to encode an arbitrary set as a set of ordinals, and
  how to decode the ordinals back to the original set"
  class="invert-on-darkmode"
/>

Let's start out with the encoding process. If we're given a set $X$ and want to
encode it as a set of ordinals, we first "unpack" our set, meaning that we pass to its
transitive closure $\text{tc}(\\{X\\})$, which is defined recursively as $latex
\text{tc}\_0(\\{X\\}):=\\{X\\}$,

$$
\text{tc}\_{n+1}(\\{X\\}):=\text{tc}\_n(\\{X\\})\cup\\{y\mid\exists
x\in\text{tc}\_n(\\{X\\}): y\in x\\}
$$

and finally $\text{tc}(\\{X\\}):=\bigcup_{n<\omega}\text{tc}\_n(\\{X\\})$. Now, our
next step is to use the axiom of choice to find a well-ordering $\prec$ of
$\text{tc}(\\{X\\})$, because then there exists a unique ordinal $\alpha$ such that

$$ (\text{tc}(\\{X\\}),\prec)\cong(\alpha,\in). $$

Let $\varphi:\text{tc}(\\{X\\})\to\alpha$ be the underlying bijection. We can then take
the point-wise image under $\varphi\times\varphi$ of the membership relation
$\in\upharpoonright\text{tc}(\\{X\\})$ to achieve a binary relation
$E\subseteq\alpha\times\alpha$, giving us a new isomorphism

$$ (\text{tc}(\\{X\\}),\in)\cong(\alpha,E). $$

Letting $\kappa$ be the cardinality of $\alpha$ we also have a bijection
$\psi:\alpha\to\kappa$ (without using choice since $\alpha$ is an ordinal), so by now
taking the point-wise image of $E$ under $\psi\times\psi$, we end up with a binary
relation $F\subseteq\kappa\times\kappa$.

Next up, we have the canonical [Gödel pairing
function](https://mathoverflow.net/a/112082/38602), a bijective
function $G:\kappa\times\kappa\to\kappa$ --- here we're using that $\kappa$, being a
cardinal, is closed under this function. By taking that point-wise image of $F$ under
$G$, we wind up with a set of ordinals $A\subseteq\kappa$. This, is our encoding of
$X$. The thing that made this encoding hard was that we had to rely on the axiom of
choice to pull out the well-ordering $\prec$ along the way.

Now, let's start out with the encoded set $A\subseteq\alpha$ and begin the decoding
procedure. First of all, since the Gödel pairing function works the same way in every
universe, we can extract the binary relation $F\subseteq\kappa\times\kappa$ from $A$,
by taking the point-wise image of $A$ under $G^{-1}$. Now we consider $(\kappa,F)$,
which satisfies the requirements for taking the [Mostowski
collapse](https://en.wikipedia.org/wiki/Mostowski_collapse_lemma), so we retrieve the
isomorphism

$$ (\text{tc}(\\{X\\}),\in)\cong(\kappa,F) $$

by uniqueness of the collapse, using that $\text{tc}(\\{X\\})$ is in fact transitive.
But now that we have extracted $\text{tc}(\\{X\\})$, we can from this also extract $X$,
since $X$ is the unique element of $\text{tc}(\\{X\\})$ which isn't an element of any
$Y\in\text{tc}(\\{X\\})$. This encoding procedure doesn't refer to the well-ordering
$\prec$ at all!

A consequence of this encoding-decoding procedure is that, given any set $X$, we can
find a set of ordinals $A$ such that $X\in L[A]$: by simply letting $A$ encode $X$, we
get that $A=A\cap L[A]\in L[A]$ as $L[A]$ contains all the ordinals, so we can perform
the above decoding process inside $L[A]$ to extract $X$.
