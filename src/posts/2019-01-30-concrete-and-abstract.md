---
title: Concrete and Abstract
meta: Abstraction is so common in mathematics that we usually don't bat an eye when jumping between different levels of abstraction. There are many cases in which such an abstraction makes concepts clearer, as it cuts away all unneccesary bits of information, and also many cases in which something more concrete makes things easier to work with, as we have more information about how our objects of study actually look like. I'll give a few well-known examples of this phenomenon from mathematics, and argue that it occurs in several (perhaps subtle) places in set theory as well.
tags: set theory
---

Abstraction is so common in mathematics that we usually don't bat an eye when jumping
between different levels of abstraction. There are many cases in which such an
abstraction makes concepts clearer, as it cuts away all unneccesary bits of
information, and also many cases in which something more concrete makes things easier
to work with, as we have more information about how our objects of study actually look
like. I'll give a few well-known examples of this phenomenon from mathematics, and
argue that it occurs in several (perhaps subtle) places in set theory as well.

![Art by Patrick D. Connors](/src/assets/img/concrete-and-abstract.webp)

Just to be clear on the terminology that I'll use in this blog post, I'll call the two
modes of thinking the concrete method/viewpoint and the abstract method/viewpoint. This
terminology comes from the theory of C\*-algebras, in which the concrete C\*-algebras
are all algebras of operators on a Hilbert space, and the abstract C\*-algebras are
complex Banach algebras with an isometric involution that satisfies the C\*-equality
(for more information on this, see [Ilijas Farah's
book](http://www.math.yorku.ca/~ifarah/ilijas-book.pdf)). The point here is that the
concrete ones are more hands-on, being explicit operators, and we can't a priori say
much about the elements of an abstract C\*-algebra. They turn out to be exactly the
same class of structures however, so it is really about a change in viewpoint.

The thesis that I'll propose here is that it's easier to build concrete objects and
also easier to work internally with concrete objects, like working with operators
rather than arbitrary elements of a C\*-algebra, but it's easier to work with abstract
objects, like producing structure-preserving maps between abstract C\*-algebras is
easier as it's more clear which conditions we need to impose on them to preserve the
structure.

Another mathematical example comes from group theory, where the concrete groups would
be subgroups of the permutations of some set X, and the abstract groups are the
algebras satisfying the well-known group laws. Here [Cayley's
Theorem](https://en.wikipedia.org/wiki/Cayley%27s_theorem) informs us that the class of
concrete groups and the class of abstract groups are just the same. If we restrict
ourselves to finite groups then we could even take the concrete groups as groups of
matrices (the so-called [linear groups](https://en.wikipedia.org/wiki/Linear_group)),
still arriving at the same class as the class of all finite abstract groups.

In set theory I'd like to propose three instances of this concrete/abstract phenomenon:
one in forcing, one in hierarchies and one in inner model theory.

_Concrete_ forcing would be the approach using partially ordered sets, where abstract
forcing uses complete boolean algebras; once again it's well-known that the two
approaches are equivalent (See e.g. Jech). I've previously written a post on some
differences between these two approaches, where I also emphasise that forcing
iterations are a lot easier to deal with in the abstract approach, but _constructing_
forcings are a lot easier in the concrete setting --- I don't think I've ever seen a
forcing which wasn't built either as a partially ordered set or built from other
forcings (like various (co)limits).

The second example is how we build and work with (set-theoretical) universes. I'd argue
that the concrete hierarchy is the $V_\alpha$-hierarchy and the abstract hierarchy is
the $H_\kappa$-hierarchy --- I've also written a blog post on these hierarchies. Again,
both hierarchies yield the same universe. A main difference between these two
approaches is that the $V_\alpha$-hierarchy is built from below and the $H_\kappa$ from
above, meaning that we kind of have to build new universes using the $V_\alpha$'s
(assuming that these are the two hierarchies are the ones available; in more structured
settings we also have the $L_\alpha$-hierarchy, the $J_\alpha$-hierarchy and their
relativised versions). The $V_\alpha$ approach is also great with it's associated
notion of rank, which allows us to move between ordinals and sets. When it comes to
working with the hierarchies however, I find the $H_\kappa$ approach a lot simpler. An
example of this could be the difference between working with elements of $V_{\kappa+1}$
and $H_{\kappa^+}$, where working with the former requires us to work with coding all
the time, which is just not needed in the latter.

The last example of this phenomenon that I'd like to mention is in inner model theory,
more precisely in terms of how we work with canonical iterable structures, known
as mice. These structures are basically built as the constructible universe L, but
where we also add on [extenders](https://en.wikipedia.org/wiki/Extender_(set_theory))
coding elementary embeddings. The question then becomes where we add on these
extenders: every extender has an _index_, also known as it's length, which is the
ordinal at which the extender appears in the model. There are two main indexing
schemes: the [Mitchell-Steel
indexing](https://mathscinet.ams.org/mathscinet-getitem?mr=1300637) and the [Jensen
indexing](https://mathscinet.ams.org/mathscinet-getitem?mr=1876087).

I'd say that the MS indexing qualifies as the concrete approach and Jensen-indexing as
the abstract one. Firstly, when we construct new mice we usually find the appropriate
extenders as derived from true extenders in V, and a Jensen-indexed extender in V would
be a witness to the existence of a superstrong cardinal, but all our mice are
(currently) built below a superstrong cardinal! MS indexing doesn't imply that, which
is why all mice (as far as I know) are built using MS indexing. If we then want to work
with Jensen indexing, we take an MS indexed mouse and re-index it to Jensen indexing.
It's usually a lot more convenient to work with $\lambda$-indexed extenders however,
one instance being that we get [amenability for
free](https://mathscinet.ams.org/mathscinet-getitem?mr=1876087), which in the MS
indexed case we have to work with the so-called [amenable
coding](https://mathscinet.ams.org/mathscinet-getitem?mr=2768698) of the extender.
There are many (technical) points at which Jensen indexing just makes life a lot
easier, including [the proof of $\Box_\kappa$ in certain
mice](https://mathscinet.ams.org/mathscinet-getitem?mr=1860606).

The point I want to make here is not to set up a polarisation of concrete versus
abstract, but rather the opposite: by identifying two different, but equivalent,
approaches as the concrete and abstract approach, I'd argue that it becomes clearer to
which contexts we may want to use one approach over the other, rather than seeing them
as either/or, or even good/bad.
