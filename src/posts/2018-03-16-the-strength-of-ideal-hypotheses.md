---
title: The Strength of Ideal Hypotheses
meta: Last time we delved into the world of ideals and their associated properties, precipitousness and saturation. We noted that these properties could be viewed as a measure of "how close" a cardinal is to being measurable, and furthermore that all the properties are equiconsistent; i.e. that the existence of a precipitous ideal on some $\kappa$ is equiconsistent with the existence of a measurable cardinal. But we can do better.
tags: set theory, ideal theory
---

Last time we delved into the world of ideals and their associated properties,
precipitousness and saturation. We noted that these properties could be viewed as a
measure of "how close" a cardinal is to being measurable, and furthermore that all the
properties are equiconsistent; i.e. that the existence of a precipitous ideal on some
$\kappa$ is equiconsistent with the existence of a measurable cardinal. But we can do
better.

![A different kind of
saturation.](/src/assets/img/the-strength-of-ideal-hypotheses.webp)

Recall that starting from a measurable $\kappa$ we get that $\omega\_1$ carries a
precipitous ideal after forcing with $\text{Col}(\omega,{<}\kappa)$. [Jech et al
('80)](https://mathscinet.ams.org/mathscinet-getitem?mr=560220) in fact showed that if
we further force with a certain poset of clubs we get that, in the final extension,
even the nonstationary ideal $latex \text{NS}\_{\omega\_1}$ on $\omega\_1$ is
precipitous.

> **Fact 1.** $\text{NS}\_{\omega\_1}$ precipitous is equiconsistent with a measurable.

A lot of questions then arise at this point. What about $\text{NS}\_\kappa$ for
cardinals $\kappa>\omega\_1$? What about stronger properties such as saturation of the
ideals? Before we get too excited however, [Gitik & Shelah
('97)](https://mathscinet.ams.org/mathscinet-getitem?mr=1363421) throw a spanner in the
works with their seminal $\textsf{ZFC}$ result saying that $\text{NS}\_\kappa$
can never be saturated when $\kappa>\omega\_1$. This still leaves us with the question
of how strong a hypothesis the precipitousness of $\text{NS}\_\kappa$ is for various
$\kappa>\omega\_1$, and also how strong a hypothesis the saturation of
$\text{NS}\_{\omega\_1}$ is. Recall that $\text{NS}\_{\lambda^+}$ is never
$\lambda^+$-saturated, so in terms of saturation properties we can't assume anything
stronger about $\text{NS}\_{\omega\_1}$.

As for the first question, this was (essentially) resolved prior to the Gitik-Shelah
result mentioned above: [Jech
('84)](https://mathscinet.ams.org/mathscinet-getitem?mr=763898) showed that
precipitousness of $\text{NS}\_\kappa$ implies that $\kappa$ is measurable of high
Mitchell order in the core model $K$, and [Gitik
('95)](https://mathscinet.ams.org/mathscinet-getitem?mr=1357746) showed "the converse"
that if we start with a measurable of high Mitchell order then there's a forcing
extension in which $\text{NS}\_\kappa$ is precipitous. Here I added the scare quotes as
it's not really an exact equiconsistency, as there are some technical differences
between the lower and upper bounds. But we get close. Sufficiently close.

> **Fact 2.** For regular $\kappa>\omega\_1$, precipitousness of $\text{NS}\_\kappa$ is
> consistency-wise in the realm of a measurable with high Mitchell order.

As for the second question of the strength of the saturation, or even the
presaturation, of $\text{NS}\_{\omega\_1}$, this was nearly resolved in the 90's.
Firstly, as I mentioned last time, [Shelah
('98)](https://mathscinet.ams.org/mathscinet-getitem?mr=1623206) showed that, assuming
the existence of a Woodin cardinal, there's a forcing extension in which
$\text{NS}\_{\omega\_1}$ is saturated. In the other direction [Steel
('96)](https://mathscinet.ams.org/mathscinet-getitem?mr=1480175) used the machinery of
core models to prove that, assuming the existence of a measurable cardinal, the
presaturation of $\text{NS}\_{\omega\_1}$ implies that there's an inner model with a
Woodin cardinal. All that prevented us from having an equiconsistency at this point was
then just that measurable cardinal, which at the time was used to construct the core
model $K$.

It wasn't until years later that [Jensen & Steel
('13)](https://mathscinet.ams.org/mathscinet-getitem?mr=3135495) managed to get rid of
this assumption of a measurable, establishing the equiconsistency. [Claverie &
Schindler ('12)](https://mathscinet.ams.org/mathscinet-getitem?mr=2963017) improved
this even result further, by showing that the strongness of $\text{NS}\_{\omega\_1}$ is
equiconsistent with a Woodin, where an ideal is strong if $j(\omega\_1^V)=\omega\_2^V$
with $j:V\to M$ being the generic embedding --- every presaturated ideal is clearly
strong.

> **Fact 3.** The saturation, presaturation and strongness of $\text{NS}\_{\omega\_1}$
> are all equiconsistent with a Woodin.

Is this then the end of the story? Almost. There is a notion which is stronger than
saturation but which $\text{NS}\_{\omega\_1}$ can still consistently satisfy. Say an
ideal $I$ on $\kappa$ is dense if $P(\kappa)/I$ has a dense subset of size $\kappa$.
Then every dense ideal is saturated, and [Woodin
('10)](https://mathscinet.ams.org/mathscinet-getitem?mr=2723878) has shown, via an
elaborate modification of his $\mathbb P_{\text{max}}$ forcing, that density of
$\text{NS}\_{\omega\_1}$ is equiconsistent with $\textsf{AD}$, which he had previously
shown is equiconsistent with a limit of Woodins. We arrive at our last fact.

> **Fact 4.** Density of $\text{NS}\_{\omega\_1}$ is equiconsistent with a limit of
> Woodins.

This then concludes our journey. Aside from being an analysis of these ideals, these
results also seem to give the impression that the steps from measurables to Woodins to
a limit of Woodins are somehow "natural" in the large cardinal hierarchy, corresponding
to natural properties holding of the canonical normal ideal on the smallest uncountable
cardinal.
