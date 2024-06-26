---
title: Graph Convolutional Neural Networks
meta: This is an introduction to graph convolutional neural networks, also called GCNs. These are approximations of spectral graph convolutions, which are defined using the graph Fourier transform, an analogue of the regular Fourier transform to the graph domain. Aside from going over the theoretical justification for GCNs, I also include some sample code in both PyTorch Geometric and Deep Graph Library (DGL).
tags: data science, graph algorithms
---

As more and more businesses strive toward becoming data-driven, the use of
graph methods for storing relational data has been on the rise (
[\[1\]](https://www.forbes.com/sites/cognitiveworld/2019/07/18/graph-databases-go-mainstream/?sh=6f97faea179d),
[\[2\]](https://www.business-of-data.com/articles/graph-databases),
[\[3\]](https://www.eweek.com/database/why-experts-see-graph-databases-headed-to-mainstream-use/)).
Along with these graph databases comes more opportunities for analysing the
data, including the use of predictive machine learning models on graphs.

The current machine learning models currently used to model graphs are all
variants of the so-called _graph convolutional neural network_, abbreviated
GCNs, so covering that seems a good place to start!

This blog post grew out of my preparation for a London PyTorch MeetUp
presentation I gave last year. You can find my slides from this talk
[here](https://github.com/saattrupdan/talks/blob/master/pytorch-meetup-presentation/presentation.pdf).

This post is part of my series on graph algorithms:

1. <router-link to="/posts/2020-08-07-pagerank">PageRank</router-link>
2. <router-link to="/posts/2020-08-24-deepwalk">DeepWalk</router-link>
3. Graph Convolutional Neural Networks

### A Recap on Convolutional Neural Networks

As the name suggests, the graph **convolutional** neural networks are related
to convolutional neural networks (CNNs). This connection turns out to be a bit
contrived, but we will get to that later. In any case, to make the analogue
clear, let's briefly go over how CNNs work, and also why they won't work out of
the box on graphs.

The purpose of a CNN, say for image classification, is to learn how to
aggregate neighboring pixels. For every pixel we would like to train a function
$k$, that takes in the chosen pixel and all of its neighboring pixels as inputs
and uses that to come up with a representation for the chosen pixel. If we
further make the assumption that $k$ is a _linear_ function, we can represent
it as a 3x3 matrix:

$$ k(x) = \left[\begin{array}{ccc} a&b&c\\\\ d&e&f\\\\ g&h&i \end{array}\right]x $$

This matrix is called a **kernel**, or a **filter**. We can now perform the
[convolution](https://en.wikipedia.org/wiki/Convolution#Discrete_convolution)
of the pixels with this kernel as follows, to update the pixel values:

$$ (\textsf{pixels}\star k)\_{m, n} := \sum\_{i=-1}^1\sum\_{j=-1}^1 k\_{i,j}\textsf{pixels}\_{m-i,n-j} $$

This of course assumes that all pixels have neighbouring pixels in all
directions, so for this to work properly we pad the edges of the image with an
extra pixel. Alternatively, we could choose to simply not update the edge
pixels, which would make the resulting representation be a bit smaller than the
original image.

Instead of training a simple filter, we normally train many filters at the same
time, so that they can learn different aspects of the image. One filter could
learn to recognise vertical lines, another one white space, and so on.

Now, why doesn't this work for graphs? The reason is that graphs don't have the
same kind of neat grid-like structure as images, which in particular means that
nodes in a graph can have wildly different numbers of neighbours. As a matrix
is of a fixed size, it simply cannot adapt to arbitrary graphs. More
specifically, grid-like graphs enjoy the property of having a _shift operator_:
we can shift in the x- and y-axes to get all the neighbours of a given node, a
property general graphs do not have.

### Rephrasing the Problem in the Fourier Domain

The first step to move toward a more general convolution operator is to look at
the conventional convolution operator from a different perspective.

We can map any (measurable) function $f\colon\mathbb R^n\to\mathbb R$ to its
[multi-dimensional discrete-time Fourier
transform](https://en.wikipedia.org/wiki/Multidimensional_transform#Multidimensional_Fourier_transform)
$\textsf{fourier}(f)\colon\mathbb R^n\to\mathbb C$, given as:

$$
\textsf{fourier}(f)(\xi) :=
\sum_{k_1=-\infty}^\infty\sum_{k_2=-\infty}^\infty\cdots\sum_{k_n=-\infty}^\infty f(k_1, k_2, \dots, k_n)e^{-i\xi_1k_1-i-xi_2k_2-\cdots-i\xi_nk_n}
$$

Now, the reason why we care about this transformation, is the following
[Convolution Theorem](<https://en.wikipedia.org/wiki/Convolution_theorem#Functions_of_a_discrete_variable_(sequences)>),
stating that the convolution operation can be rephrased as simple
multiplication in the Fourier domain!

> **The Convolution Theorem.** For any two measurable functions
> $f,g\colon\mathbb R^n\to\mathbb R$ it holds that
> $$ \textsf{fourier}(f\star g) = \textsf{fourier}(f)\textsf{fourier}(g) $$

Now, how does this help us to generalise the convolution operation to general
graphs? What we've done here is moved from _shift operations_ to _Fourier
transforms_, so if we can jump from regular Fourier transforms to _graph_
Fourier transforms, then we can access graph convolutions through this detour.

![We can present this as a diagram, going from convolutions to Fourier
transforms, from Fourier transforms to graph Fourier transforms, and finally to
graph convolutions](/src/assets/img/convolution-fourier.webp)

### From Fourier to Graph Fourier

It turns out that there _is_ an analogue of the Fourier transform to general
graphs. We have to go through yet another couple of hoops, however. First, for
a connected graph $\mathbb G$ with
[adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix)
$A$ we define the
[graph Laplacian](https://en.wikipedia.org/wiki/Laplacian_matrix)
$L := D-A$, where $D$ is the diagonal degree matrix of $\mathbb G$.

The definition of the graph Fourier transform involves the eigenvectors of the
Laplacian, so we first ensure that this matrix is symmetric, as we're then
<router-link to="/posts/2019-06-12-singular-value-decomposition">guaranteed of the existence of eigenvectors</router-link>.
This leads to the following **normalised graph Laplacian**:

$$
\overline L := D^{-\tfrac{1}{2}}LD^{-\tfrac{1}{2}} = I_N - D^{-\tfrac{1}{2}}AD^{-\tfrac{1}{2}},
$$

which _is_ symmetric, by construction, so it has a complete set of orthonormal
eigenvectors $e_1,\dots,e_N$, where $N$ is the number of nodes in $\mathbb G$.
Letting $\lambda_1,\dots,\lambda_N$ be the associated eigenvalues, the **graph
Fourier transform** is then the function induced by:

$$
\textsf{graphFourier}(f)(\lambda_l) := \sum_{n=1}^N f(n)e_l^*(n),
$$

where $(-)^*$ is the complex conjugate. Note here that $f\colon\mathbb
R^N\to\mathbb R$ and $\textsf{graphFourier}(f)\colon\\{\lambda_l\mid
l=1,\dots,N\\}\to\mathbb C$.

### Spectral Graph Convolutions

Now, with the graph Fourier transform in place, we can then take inspiration
from the Convolution Theorem above and define the **spectral graph
convolution** between two functions $f,g\colon V\to\mathbb R$, with $V$ being
the set of vertices of $\mathbb G$, as

$$
f\star g := \textsf{graphFourier}^{-1}(\textsf{graphFourier}(f)\textsf{graphFourier}(g)).
$$

We simply pretend that the same relationship between convolutions and "Fourier
products" also holds in the graph domain, and define the convolution from that
relationship.

We _could_ just stop here, and simply use the spectral graph convolutions. The
problem is that it's incredibly computationally expensive, as the graph Fourier
transform is $O(N^2)$, so the final job is about approximating this as best as
possible.

### Graph Convolutional Neural Networks

In
[Hammond et al. (2011)](https://www.sciencedirect.com/science/article/pii/S1063520310000552)
it was suggested that the spectral graph convolution could be approximated
using the so-called
[Chebyshev polynomials](https://en.wikipedia.org/wiki/Chebyshev_polynomials),
$T_n$, which are given as $T_0(x) = 1$, $T_1(x) := x$ and
$T_{n+1}(x) := 2xT_n(x)-T_{n-1}(x)$. The $K$'th approximation then looks like

$$
f\star g \approx \sum_{k=0}^K f(k)T_k(\widetilde L)g,
$$

where $\widetilde L := \tfrac{2}{\lambda_{\text{max}}}\overline L-I_N$ with $I_N$ being
the $N\times N$ identity matrix and $\lambda_{\text{max}}$ being the largest
eigenvalue of $\overline L$.

In [Kipf and Welling (2017)](https://arxiv.org/abs/1609.02907), the paper where
GCNs were introduced, they make further approximations. Let's put our GCN hat
on, so that $f$ is now the kernel and $g$ is our node feature matrix, and let
us accordingly rename $f$ to $k$ and $g$ to $\textsf{nodeFeatures}$. They make
the following simplifying assumptions:

1. They set the Chebyshev approximation level $K$ to $1$;
2. They set $\lambda_{\text{max}} = 2$;
3. They assume that $k_0 = k_1$.

These assumptions then result in the following approximation:

$$
f\star g \approx k_0(I_N + D^{-\tfrac{1}{2}}AD^{-\tfrac{1}{2}})\textsf{nodeFeatures}.
$$

Are we done yet? Not quite, there is one last problem we need to deal with.
$I_N + D^{-\tfrac{1}{2}}AD^{-\tfrac{1}{2}}$ now has eigenvalues in the range
$[0,2]$, so to avoid vanishing and exploding gradients, we normalise it. This
is done by setting $\widetilde A := A + I_N$ and $\widetilde D_{ii} := \sum_j \widetilde
A_{ij}$, and using the following final approximation:

$$
f\star g \approx k_0(\widetilde D^{-\tfrac{1}{2}}\widetilde A\widetilde D^{-\tfrac{1}{2}})\textsf{nodeFeatures}.
$$

And success, there's our convolution!

### What does it all mean?

Phew, that was a lot. Let's take a step back and think about what this is
actually doing. We're computing a representation for every node in our graph,
so let's assume we are currently dealing with a particular node.

We see that we only have a single learnable parameter, $k_0$, and if we ignore
the final normalisation part of the approximation then the first term, $I_N$,
corresponds to the contribution of the node's own features towards its
representation, and the second term corresponds to the contribution from the
node's neighbouring nodes' features.

We see that we're scaling the neighbouring nodes' features by
$\left(\sqrt{\text{degree}(\textsf{node})}\sqrt{\text{degree}(\textsf{neighbourNode})}\right)^{-1}$,
meaning that we are not simply taking the mean of the neighbouring nodes, but
instead we're also considering the _degrees_ of the neighbours.

If the neighbour is really "popular", then we do not weigh our connection to it
as that important, but if the neighbour has very few connections and we're one
of those lucky few, then we weigh that connection a lot higher. In a situation
where all nodes have the same degree, this collapses into a simple mean,
however.

So, to sum up, after going through a lot of theoretical hoops we ended up with
the _spectral graph convolution_, which is the graph analogue of the regular
convolution used in CNNs. By approximating this down to a linear stage we end
up with something that is computationally tractable, while still maintaining an
approximation to the spectral graph convolution.

### GCNs in Practice: Implementation

Both [PyTorch Geometric](https://github.com/rusty1s/pytorch_geometric) and
[Deep Graph Library](https://www.dgl.ai) have implemented GCNs. The code for
the two frameworks is nearly identical. Here is some sample code for PyTorch
Geometric:

```python
import torch
import torch.nn as nn
import torch geometric as tg
import torch geometric.nn as tgnn

class GCN(nn.Module):
    def __init__(self, in_feats: int, hidden_size: int, num_classes: int):
        super().__init__()
        self.conv1 = tgnn.GCNConv(in_feats, hidden_size)
        self.conv2 = tgnn.GCNConv(hidden_size, num_classes)

    def forward(self, data: tg.data.Data):
        x, edge index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = torch.relu(x)
        x = self.conv2(x, edge_index)
        return x
```

Lastly, here is some sample code for the Deep Graph Library:

```python
import torch
import torch.nn as nn
import dgl
import dgl.nn.pytorch as dglnn

class GCN(nn.Module):
    def __init__(self, in_feats: int, hidden_size: int, num_classes: int):
        super().__init__()
        self.conv1 = dglnn.GraphConv(in feats, hidden size)
        self.conv2 = dglnn.GraphConv(hidden size, num classes)

    def forward(self, graph: dgl.DGLGraph, x: torch.tensor):
        x = self.conv1(graph, x)
        x = torch.relu(x)
        x = self.conv2(graph, x)
        return x
```
