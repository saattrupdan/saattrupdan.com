---
title: Pcf Scales and Squares
meta: The last few posts I've been covering a characterisation of pointclasses that admit scales. To make scale theory even more confusing there's a completely different notion of scale, which really has nothing to do with our previous one --- this one being of a more combinatorial nature.
tags: set theory, infinite combinatorics
---

The last few posts I've been covering a characterisation of pointclasses that admit
scales. To make scale theory even more confusing there's a completely different notion
of scale, which really has nothing to do with our previous one --- this one being of a
more combinatorial nature. To avoid unnecessary confusion I'll call these new objects
pfc scales (but usually they're simply called scales as well, however).

The pcf scales are always associated to some singular cardinal $\kappa$, so let's fix
one of those, and also fix an associated increasing sequence $\left\<\kappa\_i\mid
i<\text{cof }\kappa\right\>$ of regular cardinals cofinal in $\kappa$.  Then a pcf scale
on $\kappa^+$ with respect to $\vec\kappa$ is a sequence $\left\<
f_\alpha\mid\alpha<\kappa^+\right\<$ such that

1. $f_\alpha\in\Pi\_i\kappa\_i$ for every $\alpha<\kappa^+$;
2. $f_\alpha<^\* f_\beta$ for every $\alpha<\beta<\kappa^+$, meaning that
   $f_\alpha(i) < f_\beta(i)$ for a tail of $i<\text{cof }\kappa$;
3. Given any $f\in\Pi\_i\kappa\_i$ there's an $\alpha<\kappa^+$ such that
   $f<^\*f_\alpha$ (i.e. $\vec f$ is a dominating family).

The following ZFC theorem of Shelah shows that we can always find pcf scales. For a
proof of this, see e.g. Eisworth's chapter in the handbook.

> **Theorem (Shelah).** If $\kappa$ is singular then there exists an increasing
> sequence of regular cardinals $\left\<\kappa\_i\mid i<\text{cof }\kappa\right\<$
> cofinal in $\kappa$ with $\text{cof }\kappa<\kappa\_0$ and a pcf scale on $\kappa^+$
> with respect to $\vec\kappa$.

To exceed ZFC we strengthen the notion of pcf scale, and say that $\vec f$ is a very
good pcf scale on $\kappa^+$ with respect to $\vec\kappa$ if it's a pcf scale such that
whenever $\alpha<\kappa^+$ satisfies $\text{cof }\alpha\in(\text{cof }\kappa,\kappa)$
then there's a club $C\subseteq\kappa$ and $i<\text{cof }\kappa$ such that for every
$\beta,\gamma\in C$ with $\beta<\gamma$, $f_\beta(j) < f_\gamma(j)$ holds for every
$j\in(i,\text{cof }\kappa)$.

It turns out that the existence of very good pcf scales are related to the existence of
square sequences, so let's quickly recall what those are.

> **Definition.** Let $\lambda\leq\kappa$ be cardinals. Then $\Box_{\kappa,\lambda}$
> holds if there's a sequence $\left\<C_\alpha\mid\alpha<\kappa^+\text{ limit}\right\<$
> such that for each $\alpha$,
>
> 1. $\emptyset\neq C_\alpha\subseteq P(\alpha)$, $\left|C_\alpha\right|\leq\lambda$
>    and every $C\in C_\alpha$ is club in $\alpha$;
> 2. If $\text{cof }\alpha<\kappa$ then $\text{ot}\(C\)<\kappa$ for every
>    $C\in C_\alpha$;
> 3. $C\cap\beta\in C_\beta$ holds for every $C\in C_\alpha$ and $\beta\in\text{lim
>    }C$.

Recall that the existence of square sequences can be seen as a "non-compactness
property", in that weak compactness implies failure of square principles, as we covered
in a previous post. The following result shows that very good pcf scales are also signs
of non-compactness.

> **Theorem (Cummings-Foreman-Magidor).** Let $\kappa$ be a singular cardinal and
> assume $\Box_{\kappa,\lambda}$ holds for some $\lambda<\kappa$. Then there's a very
> good pcf scale on $\kappa^+$.

Before we dig into the proof, we note that $\Box_{\kappa,<\kappa}$ does not suffice for
this theorem, as is shown in Levine ('15). It's also shown in Gitik & Sharon ('08) that
the existence of a very good pcf scale on $\kappa^+$ doesn't imply the weak square
$\Box_{\kappa,\kappa}$ and in particular doesn't imply $\Box_{\kappa,<\kappa}$ either,
making the existence of very good pcf scales and the existence of
$\Box_{\kappa,<\kappa}$-sequences independent of each other (modulo large cardinals).
Okay, let's dig in.

**Proof**. Pick an increasing cofinal sequence $\vec\kappa$ in $\kappa$ with
$\kappa\_0>\text{cof }\kappa+\lambda$. Let $\vec{\mathcal{C}}$ witness
$\Box_{\kappa,\lambda}$. Build $\left\< g_\alpha\mid \alpha<\kappa^+\right\<$
recursively, where we inductively make sure that $f_\alpha < g_\alpha$ for all
$\alpha<\kappa^+$, with $\vec f$ being the pcf scale on $\kappa^+$, given to us by
Shelah's theorem above.

For $\alpha=0$ we simply let $g\_0 > f\_0$. For successors we again simply choose
$g_{\alpha+1} > f_{\alpha+1},g_\alpha$. Assume lastly that $\alpha$ is a limit. We need
to ensure that

1. $f_\alpha < g_\alpha$;
2. $g_\beta<^\*g_\alpha$ for every $\beta<\alpha$;
3. $\text{sup}\\{\text{sup}\\{g_\beta(i)\mid\beta\in C\\}\mid
   C\in C_\alpha\land\left|C\right|<\kappa\_i\\} < g_\alpha(i)$ for every $i<\text{cof
   }\kappa$.

Points (1) and (2) are simple to achieve, and (c) can be achieved by using the
regularity of $\kappa\_i$. We now check that this actually works. So let
$\alpha<\kappa^+$ satisfy $\text{cof }\alpha\in(\text{cof }\kappa,\kappa)$ and pick
$C\in C_\alpha$. Let $i<\text{cof }\kappa$ be such that $\left|C\right|<\kappa\_i$, let
$\beta,\gamma\in\text{lim }C$ with $\beta<\gamma$, and let $j\in(i,\text{cof} \kappa)$.

Then by (3) of the definition of $\Box_{\kappa,\lambda}$, $C\cap\beta\in C_\beta$ and
$C\cap\gamma\in C_\gamma$. Also, $\beta\in C\cap\gamma$ and
$\left|C\cap\gamma\right|<\kappa\_j$. We chose $g_\beta(j) < g_\gamma(j)$ in the above
condition (3). **QED**
