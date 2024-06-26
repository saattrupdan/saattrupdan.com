---
title: Evaluating Confidence
meta: We introduce confidence intervals for sample statistics, both using normal theory with t-distributions and also using modern bootstrap methods, and includes a dummy example of Danish coffee consumption. This is the first post in a series about quantifying uncertainty in machine learning models.
tags: data science, uncertainty estimation
---

This post will be the first post where I'm delving into quantifying uncertainty of statistical models. We start with the classical _confidence interval_, used to estimate uncertainty of statistics about the data that we are working with. Computing confidence intervals can be done using _normal theory_, which is the classical approach, and _bootstrapping_, which is more flexible but also more computationally demanding.

This post is part of my series on quantifying uncertainty:

1. Confidence intervals
2. <router-link to="/posts/2020-02-26-parametric-prediction">Parametric prediction intervals</router-link>
3. <router-link to="/posts/2020-03-01-bootstrap-prediction">Bootstrap prediction intervals</router-link>
4. <router-link to="/posts/2020-03-09-quantile-regression">Quantile regression</router-link>
5. <router-link to="/posts/2020-04-05-quantile-regression-forests">Quantile regression forests</router-link>
6. <router-link to="/posts/2021-04-04-doubt">Doubt</router-link>
7. <router-link to="/posts/2022-11-19-monitoring-with-uncertainty">Monitoring with uncertainty</router-link>

### What is a confidence interval?

Confidence intervals are about measuring how confident you are in a given _population statistic_ based on your current sample. A population statistic is simply a number associated to your dataset at hand, where typical examples of these are the mean, variance and standard deviation, but this can be any function. Useful population statistics also include the maximum, minimum and $\alpha$-percentiles for $\alpha\in(0,1)$.

Now, for a given population statistic $\rho$ and some $\alpha\in(0,1)$, an **$\alpha$-confidence interval for $\rho$** is an interval $(a,b)\subset\mathbb R$ such that, if we were to draw infinitely many samples and compute new confidence intervals for those in the same way, then the _true value_ for $\rho$ would be contained in $(100 * \alpha)$% of the intervals.

As a running example, say we would like to find the mean amount of money spent on coffee in Denmark per year, measured in the local currency DKK. There is a true answer to this, call it $\mu$, but it would be quite time-consuming to compute $\mu$ as we would have to ask every single Dane. Instead, we randomly ask 10 people and get a sample of size $n = 10$:

|  #1  | #2  | #3  |  #4  | #5  |  #6  | #7  |  #8  |  #9  | #10 |
| :--: | :-: | :-: | :--: | :-: | :--: | :-: | :--: | :--: | :-: |
| 1000 |  0  | 545 | 2100 | 400 | 1200 | 500 | 1200 | 1500 | 900 |

![The distribution of the coffee data, which is quite right-skewed.](/src/assets/img/coffee-data.webp)

We can now compute the mean of these to get the sample mean $\bar x = 934.50$. Say that we are given a 75% confidence interval $(850, 950)$, computed for this particular sample. This would mean that, were we to repeat the process of asking 10 random people and computing their mean coffee expenditure, the true mean $\mu$ would belong to 75% of the intervals. In other words, if we put on a [Bayesian hat](https://en.wikipedia.org/wiki/Credible_interval) for a few seconds, there's a 75% chance that the true mean $\mu$ belongs to our interval $(850, 950)$. It says nothing about _where_ $\mu$ would be located within the interval. It turns out that $\mu\approx 1,105$, so our interval turned out to be a fluke.

### Computing a confidence interval: parametric case

A confidence interval depends on the _true_ distribution of our statistic, so if we happen to have some information about that then that makes things a lot easier. Of course, if we knew the distribution exactly and if our statistic only depends upon the distribution (which is the case for all the statistics I mentioned above) then we could simply compute the true value for our statistic and be done with it. In practice we would, by analytic means, figure out what <router-link to="/posts/2019-05-15-poisson">family of distributions</router-link> the statistic belongs to, and then attempt to estimate the parameters of the specific distribution.

Let us continue with our coffee example. Our desired statistic in this case is the (arithmetic) mean $\mu$, and it turns out that our sample means $\bar x$ asymptotically follow the normal distribution $ N(\mu, \tfrac{\sigma^2}{\sqrt{n}})$ with $\sigma^2$ being the true population variance, as I described in an <router-link to="/posts/2019-06-05-normal">earlier post</router-link>. Unfortunately, we do _not_ know the true population variance, so we would need to approximate that. A natural guess for this could be

$$ \frac{1}{n}\sum\_{i=1}^n (x_i - \bar x)^2, \tag{1}$$

which equals roughly $245,083$ in our example. The problem with this is that it is a _biased estimator_, meaning if we sampled infinitely many times then the average value of this estimate would _not_ equal the true variance. This can be seen if we compute the [expectation](https://en.wikipedia.org/wiki/Expected_value) of $(1)$:

$$
  \begin{align}
    \mathbb E\left[\frac{1}{n}\sum_{i=1}^n(x_i-\bar x)^2\right] &= \frac{1}{n}\sum_{i=1}^n(\mathbb E[x_i^2] + \mathbb E[\bar x^2] - 2\mathbb E[x_i\bar x])\\\\
    &= \frac{1}{n}\sum_{i=1}^n\left((\mu^2+\sigma^2) + \mathbb E\left[\frac{1}{n^2}\sum_{j=1}^nx_j\sum_{k=1}^nx_k\right] - \frac{2}{n}\sum_{j=1}^n\mathbb E[x_ix_j]\right)\\\\
    &= \frac{1}{n}\sum_{i=1}^n\left(\mu^2+\sigma^2 + \frac{n-1}{n}\mu^2 + \frac{\mu^2+\sigma^2}{n} - 2\mu^2 - \frac{2}{n}\sigma^2\right)\\\\
    &= \frac{1}{n}\sum_{i=1}^n\frac{n+1-2}{n}\sigma^2\\\\
    &= \frac{n-1}{n}\sigma^2,
  \end{align}
$$

using that $\text{Var}(x_i) = \mathbb E[x_i^2] - \mathbb E[x_i]^2$. This shows us that an unbiased estimate of $\sigma^2$ can be achieved by defining our sample variance as

$$ s^2 := \frac{1}{n-1}\sum\_{i=1}^n (x_i - \bar x)^2. $$

In our example this is about $272,315$, which is quite a lot different from the biased sample estimate above. Now, with the sample variance at hand we would then hope that $\bar x\sim N(\mu, \tfrac{s^2}{n})$, so that $(\Phi^{-1}(0.025), \Phi^{-1}(0.975))$ would constitute a 95% confidence interval with $\Phi$ being the [CDF](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for $ N(\mu, \tfrac{s^2}{n})$. But this is unfortunately *not* the case, but instead it turns out that $(\bar x - \mu)(\tfrac{s}{\sqrt{n}})^{-1}$ asymptotically follows a [$t$-distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution) with $n-1$ degrees of freedom, which is an approximation to the normal distribution:

![Comparison between the normal- and t-distribution, showing that as the degrees of freedom gets large, the t-distribution converges to the normal distribution. Both are bell curves.](/src/assets/img/t-vs-norm.webp)

If we thus let $F$ be the CDF of the t-distribution then our desired interval would be

$$ (\bar x - F^{-1}(0.025)\cdot\tfrac{s}{\sqrt{n}}, \bar x + F^{-1}(0.975)\cdot\tfrac{s}{\sqrt{n}}) \approx \bar x\pm 2.26\cdot\tfrac{s}{\sqrt{n}}, $$

which in our example would be $934.50 \pm 2.26\cdot \tfrac{\sqrt{272,315}}{\sqrt{10}} \approx 373$, i.e. $(562, 1307)$. We see that the true mean $\mu = 1,105$ _does_ appear within the interval.

One thing to note about confidence intervals is that **the larger the sample size, the narrower the confidence interval**. This can be seen directly from the above-mentioned fact that $\bar x\sim N(\mu, \tfrac{\sigma^2}{n})$: the bell curve will become more and more sharp as $n\to\infty$.

### Computing a confidence interval: non-parametric case

The above section assumed that we knew the distribution of our statistic. That is all well and good when such statistics have a known distribution, such as the mean. But what if we are dealing with an unconventional statistic with an unknown distribution? Thankfully there is an easy fix for this: the bootstrap.

[Bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_%28statistics%29) is the statistician's slang for sampling with replacement. What we do is simply start with a sample, and then _resample_ our sample a bunch of samples _with_ replacement (to ensure independence), each having the same size as our original sample (so the _bootstrapped samples_ will have duplicates). We can then compute our statistic for every bootstrapped sample and look at the distribution of these. Note that we are now dealing with three "layers": the _true_ statistic $\rho$, the _sample_ statistic $\widehat\rho$, and all our _bootstrapped statistics_ $\rho_b$ for every bootstrap sample _b_.

The remarkable thing about bootstrapping is that **the distribution of the bootstrapped statistics approximates the distribution of the sample statistics**. To get a rough intuition of why this should be the case, consider the variance $\text{Var}(\widehat\rho)$ of our sample statistic. If we now compute a bunch of bootstrapped versions of the statistic, $\rho_b$ for each bootstrap sample $b$, and let $s^2$ be the sample variance of these, then

$$ s^2 = \frac{1}{B}\sum*{b=1}^B\rho_b^2 - \left(\frac{1}{B}\sum*{b=1}^B\rho*b\right)^2 \to*{B\to\infty} \mathbb E[\widehat\rho^2] - \mathbb E[\widehat\rho]^2 = \text{Var}(\widehat\rho) $$

by the <router-link to="/posts/2019-06-05-normal">law of large numbers</router-link>. And as we are sampling with replacement, we can simply pick some very large $B$ to get a good estimate.

To compute the confidence intervals, we first compute the bootstrap residuals $\delta_b := \widehat{\rho} - \rho_b$ for every bootstrap sample $b$, and let $\delta_\alpha$ be the $\alpha$-percentile of the $\delta_b$'s. The **bootstrapped $\alpha$-confidence interval** is then $(\widehat\rho - \delta_{1-\alpha}, \widehat\rho - \delta_\alpha)$.

Let's compute a bootstrapped confidence interval for our coffee example. The **first step** is to resample our data $B$ many times and compute our desired statistic, which in our case is the mean. Let's set $B = 5,000$ and compute:

```python
def get_bootstrap_statistics(sample, statistic, nbootstraps: int = 5000):
    bootstrap_statistics = np.empty(nbootstraps)
    for b in range(nbootstraps):
        resample = np.random.choice(sample, size = sample.size,
            replace = True)
        bootstrap_statistics[b] = statistic(resample)
    return bootstrap_statistics

coffee_sample = [1000, 0, 545, 2100, 400, 1200, 500, 1200, 1500, 900]
bstats = get_bootstrap_statistics(coffee_sample, np.mean)
plt.hist(bstats, color = 'green', bins = 'auto')
plt.title('Distribution of bootstrapped means')
plt.show()
```

![A roughly normally distributed collection of bootstrapped means.](/src/assets/img/bootstrapped-means.webp)

By pulling out the 95%-confidence interval with the `np.percentile` function we get the interval $(585, 1280)$, which happens to be $50$ units narrower than the one we achieved through normal theory above. This won't always be the case, but in our situation we shouldn't think that the law of large numbers could "calibrate" the distribution of $\bar x$ to be approximately normal when $n$ is so small, especially since we saw our data isn't quite normally distributed. This is relevant because for $(\bar x - \mu)(\tfrac{s}{\sqrt{n}})^{-1}$ to be $t$-distributed with $n-1$ degrees of freedom we are assuming that $\bar x$ is approximately normal.
