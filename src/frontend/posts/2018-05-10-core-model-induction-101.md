---
title: Core Model Induction 101
meta: Mentioning the core model induction to a fellow set theorist is akin to mentioning that you're a mathematician to the layman --- you receive a reaction which is struck by a delightful mix of terror and awe. My humble goal with this blog post is not to offer a "fix-all" solution to this problem, but rather to give a vague (but correct) explanation of what's actually¬†going on in a core model induction, without getting too bogged down on the details.
tags: set theory, core model theory
---

Mentioning the core model induction to a fellow set theorist is akin to mentioning that
you're a mathematician to the layman --- you receive a reaction which is struck by a
delightful mix of terror and awe. My humble goal with this blog post is not to offer a
"fix-all" solution to this problem, but rather to give a vague (but correct)
explanation of what's actually going on in a core model induction, without getting too
bogged down on the details.

<img src="/src/frontend/assets/img/core-model-induction-101.webp" alt="The Scream painting
with a young man instead" class="centered-image" style="width: min(500px, 100%);" />

This post is part of a series on core model theory:

1. <router-link to="/posts/2017-04-26-what-is-k">What is K?</router-link>
2. Core Model Induction 101
3. <router-link to="2018-10-22-applied-core-model-theory-i">Applied Core Model
   Theory I</router-link>
4. <router-link to="2018-11-13-applied-core-model-theory-ii">Applied Core Model
   Theory II</router-link>
5. <router-link to="2018-11-26-applied-core-model-theory-iii">Applied Core Model
   Theory III</router-link>
6. <router-link to="2019-03-31-core-model-induction-the-pointclass-perspective">Core
   Model Induction: The Pointclass Perspective</router-link>

I'll only focus on the (chronologically) first type of core model induction --- showing
$\textsf{AD}^{L(\mathbb R)}$. This is primarily because I have no idea what happens in
the other ones. Now, before we start, why is this an interesting thing to do? First of
all, it's interesting for consistency-strength questions. Woodin has shown that
$\textsf{AD}^{L(\mathbb R)}$ is equiconsistent  with the existence of infinitely many
Woodins, and showing that your favorite hypothesis entails the consistency of such
Woodins can (at this point) only be shown using the core model induction. Unless, of
course, you show something a lot stronger from your hypothesis, like the existence of a
superstrong --- but now you're being pedantic. Second of all, what's quite remarkable
is that we not only get consistency proofs, but we get something holding in $V$. We get
determinacy of a lot of sets. It's hands-on. That's useful. Okay, let's get started.

We call the core model induction an "induction", which is maths for "showing something
holds for all relevant stuff". Here we're trying to show that every set of reals in
$L(\mathbb R)$ is determined. Another way of phrasing that is to show that every level
of $L(\mathbb R)$ satisfies $\textsf{AD}$; i.e. that $J_\alpha(\mathbb
R)\vDash\textsf{AD}$ for every ordinal $\alpha$. So we at least sound like we're doing
an induction. Now, what is usually the case in inductive proofs is that we have a
clever way of splitting "everything relevant" into chunks that are similar. For
induction on the naturals we split up into two chunks: zero and all the successors.
We can and will also form some chunks here in the core model induction --- note that
"everything relevant" in this case is the class of ordinals.

Firstly, a very neat result by Kechris & Woodin ('83) shows that we don't have have to
go through all the ordinals, but it suffices to show that $J_{\alpha+1}(\mathbb
R)\vDash\textsf{AD}$ whenever there's a new scaled set of reals appearing in
$J_{\alpha+1}(\mathbb R)$ --- call such $\alpha$ critical. The exact definition of a
"scaled set" is not important (but if you're interested then check out my blog post
series on scales). The thing is that we have a complete characterisation of all the
critical ordinals --- we can split up the ordinals into a handful of chunks and we now
only have to check that $J_{\alpha+1}(\mathbb R)\vDash\textsf{AD}$ for $\alpha$ a
representative for each chunk. I should probably note that the two most important
chunks have been given names: they're called "the inadmissable case" and "the
end-of-gap case".

<img src="/src/frontend/assets/img/core-model-induction-101-diagram.webp" alt="A diagram of the
critical ordinals in L(R)" class="invert-on-darkmode" />

Okay, we've narrowed it down. But if we're now dealing with a particular chunk, how do
we actually show that $J_{\alpha+1}(\mathbb R)\vDash\textsf{AD}$? This is where we
do another splitting-into-chunks, aka we do a subinduction. Because all the sets of
reals in $J_{\alpha+1}(\mathbb R)$ are precisely the ones definable (with parameters)
over $J_\alpha(\mathbb R)$ and we have a definability hierarchy, let's induct over
that! So we have to show that, for all $n<\omega$, every
$\bf\Sigma_{n+1}^{J_\alpha(\mathbb R)}$ set of reals is determined. Again we can split
up into two chunks here: the zero chunk and the successor chunk.

Let's focus on the zero case for a while, meaning that we're trying to show that every
$\bf\Sigma\_1^{J_\alpha(\mathbb R)}$ set of reals is determined. This is where mice
enter the picture. More specifically, Neeman has shown that for a set of reals $A$ to
be determined it suffices to find a certain breed of mouse which captures $A$ (again,
for details, check out my blog post series on mouse capturing). So what the zero case
is about is then finding a mouse which captures a given $\bf\Sigma\_1^{J_\alpha(\mathbb
R)}$ set.

The successor case is then, naturally, about looking for a mouse which captures a given
$\bf\Sigma_{n+2}^{J_\alpha(\mathbb R)}$ set of reals, given that we can find mice
capturing $\bf\Sigma_{n+1}^{J_\alpha(\mathbb R)}$ sets. It turns out that it suffices
just to stick with the same breed as in the zero case, but where the mouse now has
$n+1$ extra Woodin cardinals --- I touched upon this in a previous post. The reason why
it's called a "core model induction" and not, say, a "mouse induction", is what we do
at successor stages. To get the extra Woodin we take advantage of a dichotomy, saying
that either a mouse with an extra Woodin exists, or the core model exists --- the
successor stage is then about disproving the existence of such core models.

So, to sum up, a core model induction can be seen as having a zero case and a successor
case, where the zero case is split up into the chunks of critical ordinals --- two
notable chunks are the inadmissable case and the end-of-gap case. This zero case about
finding a mouse capturing stuff. The successor case (also sometimes called the
projective case) is also about finding a mouse capturing stuff, but here we assume we
already got a mouse, and we want to find a new one with an extra Woodin cardinal.
