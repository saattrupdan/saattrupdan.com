---
title: A Brief Overview of Forcing Notions
meta: In this day and age we got a massive jungle of forcing notions, each with it's own very specific purpose and technicalities. For set theorists who aren't specialists in forcing theory this might seem daunting when stumbling across open questions that cry out for a forcing solution. I'm precisely one of those people, and this is my attempt at providing a brief non-technical toolkit of various forcing notions. I won't go into how any one of the notions are defined --- I'll purely talk about their properties.
tags: set theory, forcing
---

In this day and age we got a massive jungle of forcing notions, each with it's own very
specific purpose and technicalities. For set theorists who aren't specialists in
forcing theory this might seem daunting when stumbling across open questions that cry
out for a forcing solution. I'm precisely one of those people, and this is my attempt
at providing a brief non-technical toolkit of various forcing notions. I won't go into
how any one of the notions are defined --- I'll purely talk about their properties.

The forcing notions that I'll be considering here are the following, accompanied by a
brief description of what they do.

- **Cohen forcing**, denoted $\text{Add}(\kappa,\mu)$, adds $\mu$ many subsets of
  $\kappa$;
- **Collapsing forcing**, denoted $\text{Col}(\lambda,\kappa)$, collapses $\kappa$ to
  $\lambda$;
- **Sacks forcing** adds a Sacks real;
- **Příkrý forcing** adds a cofinal $\omega$-sequence to a measurable $\kappa$;
- **Magidor forcing** is a generalisation of Příkrý forcing and adds a cofinal
  $\lambda$-sequence to a measurable $\kappa$ for $\lambda$ regular;
- **Radin forcing** is a generalisation of Magidor forcing and adds a club subset of
  $\kappa$;
- **Namba forcing** adds an $\omega$-sequence to $\omega\_2$;
- **Random forcing** adds a random real.

We see that Cohen, Sacks and Random forcing are concerned with adding subsets of a
given cardinal, Příkrý, Magidor, Radin and Namba add cofinal sequences to the cardinal
in question, and the collapsing forcing adds not only a cofinal sequence, but a
surjection. How do we choose which forcing to use, if we, say, want to add a cofinal
sequence then? How are they different? We can at least spot some differences if we look
at general properties they satisfy --- we'll be concerned with chain
conditions, closure and weak homogeneity here. Again, I won't define these, but state a
few results as to what these properties can be used for.

> **Consequences of general forcing properties.** Let $\mathbb P$ be a forcing notion.
>
> 1. If $\mathbb P$ has the $\kappa$-chain condition then it preserves cardinals above
>    $\kappa$, and also preserves $\kappa$ if it's regular;
> 2. If $\mathbb P$ is $\kappa$-closed then it doesn't add any ${<}\kappa$-sequences,
>    so in particular also preserves cardinals $\leq\kappa$;
> 3. If $\mathbb P$ is weakly homogeneous then every generic set which can be definable
>    with parameters from $V$ is really an element of $V$, and also
>    $\textsf{HOD}^{V^{\mathbb P}}=\textsf{HOD}^V(\mathbb P)$.

As for which of the above forcings satisfy which properties, here's a handy chart:

![A table describing the properties different forcing
notions](src/assets/img/forcing-notions.webp)

These generalised properties are of course not the only difference between forcing
notions though, so we also mention a handful of specialised properties the different
forcings have. First of all, one might be interested in whether the forcing adds reals
or not. Of the above, only the following adds reals:

- $\text{Add}(\omega,\mu)$ adds $\mu$ Cohen reals;
- Sacks forcing adds a Sacks real;
- Random forcing adds a random real;
- $\text{Col}(\omega,\kappa)$ adds a surjection from $\omega$ onto $\kappa$, which is
  then a real in the extension.

Now, moving away from the general properties, the forcings also have specific
peculiarities that are worth knowing about. I've picked out a few of them here --- most
of these are basic and can be found in standard texts such as [Jech
('03)](https://mathscinet.ams.org/mathscinet-getitem?mr=1940513) or [Schindler
('14)](https://mathscinet.ams.org/mathscinet-getitem?mr=3243739).

1. All the forcings preserve $\aleph\_1$, except the collapsing forcing whenever
   $\lambda=\omega$;
2. Cohen forcing forces $\diamondsuit(S)$ for every stationary $S\subseteq\kappa$;
3. $\text{Col}(\kappa^+,2^\kappa)\Vdash\textsf{CH}\_\kappa$;
4. If $V\neq L$ and $\varphi$ is a true $\Pi^1\_3$ sentence then $L[x]\models\varphi$,
   where $x$ is a Sacks real;
5. Příkrý forcing preserves all cardinals and all cofinalities except $\kappa$'s,
   doesn't add bounded subsets of $\kappa$ and preserves Jónssonness of the measurable
   $\kappa$;
6. Radin forcing preserves measurability of the measurable $\kappa$, and preserves all
   cardinals;
7. If $\kappa=\kappa^{<\kappa}$ is regular, uncountable and satisfies
   $\textsf{CH}\_\kappa$, then Cohen forcing, collapsing forcing, Příkrý forcing,
   Magidor forcing and Namba forcing all add a $\kappa^+$-Suslin tree. ([Brodsky-Rinot
   '16](https://doi.org/10.1215/00294527-2019-0011)).

There's still a lot to take in, but I suppose the main gist is to figure out what the
goal is, zoom in on the handful of forcings that achieve that, and then have a look at
their more specialised properties and, fingers crossed, there's one of them solving the
problem at hand.

Oh, and as always, if you find any mistakes or think I left out something important,
please let me know!
