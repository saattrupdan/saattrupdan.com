---
title: Dark Mode in Vue.js
meta: Implementation of a simple dark mode component in Vue.js.
tags: web development, vue
---

It seems like implementing a dark mode setup is becoming the "hello world" of web
development these days, so in the spirit of that, here we are, in this follow-up to my
<router-link to="/posts/2023-04-03-crash-course-in-vue">previous post on getting
started with Vue.js</router-link>.

I wanted to be create a **dead simple** dark mode component with *no* dependencies, and
I'll go over what I ended up with here. This was heavily inspired by [Tobias Quante's
blog
post](https://dev.to/tqbit/create-your-own-dark-mode-toggle-component-with-vue-js-1284)
on the same topic, so make sure to give that one a read as well! This switch is what's
implemented here on this website, so you can see it in action here, in the top-left
corner.

This post is part of a series on Vue.js:

1. <router-link to="/posts/2023-04-03-crash-course-in-vue">A Crash Course in
   Vue.js</router-link>
2. Dark Mode in Vue.js


## Global State?

The big question when it comes to setting up dark mode is really how you're going to
manage the style switching throughout your site in a global manner.

One way to do it would be to introduce a global `darkmode` state and use this
throughout all your components to determine the appropriate CSS styling for each
element, but this (a) very quickly gets out of hand, and (b) creates a lot of coupling
between your components. The new [Pinia](https://pinia.vuejs.org/) state management
system for Vue.js makes this a bit easier, but it still didn't feel quite right for me.
Is there another way?

It turns out there is! Rather than using a state management system to keep track of a
global state, we can let CSS do the heavy lifting for us! CSS has had its own notion of
variables all the way back since (at least) 2016, and these variables can have global
scope. We can define global variables in our `main.css` file as follows:

```css
:root {
  --blue: #6495ed;
  --white: #faf0e6;
}
```

To use these variables in our components, we simply use the `var` function. Here's an
example:

```html
<style scoped>
  .blue-background {
    background: var(--blue);
  }
</style>
```

And that's it! We'll use this idea to build our dark mode component in the next
section.


## Flicking the Switch

With the notion of CSS global variables at hand, we now have a rough strategy: we want
the dark mode switch to change the value of these global variables, as this will then
automatically propagate to the rest of the website. But how do we switch?

In [Tobias Quante's blog
post](https://dev.to/tqbit/create-your-own-dark-mode-toggle-component-with-vue-js-1284)
that I mentioned above, he does this by adding a `darkmode` class to the root element
and redefining the variables there. I.e., we could extend the example above as follows:

```css
:root {
  --blue: #6495ed;
  --white: #faf0e6;
}
:root.darkmode {
  --blue: #1c66ef;
  --white: #d2d6db;
}
```

To toggle dark mode on and off, he would then grab the root element with
`document.documentElement` and manually add/remove the `darkmode` class to it:

```javascript
function setTheme(theme) {
  document.documentElement.className = theme;
}
```

This works wonders, but I really wanted to keep the actual styling and variable
declarations separate to avoid too much clutter, but that's probably just my OCD
kicking in. In any case, I ended up defining a separate YAML file with my variables,
which would be something like this:

```yaml
lightmode:
  blue: '#6495ed'
  white: '#faf0e6'

darkmode:
  blue: '#1c66ef'
  white: '#d2d6db'
```

To turn on dark mode, I would then set these as properties to the root element:

```javascript
  function enableDarkMode() {
    for (let [key, value] of Object.entries(cssVariables.darkmode)) {
      document.documentElement.style.setProperty(`--${key}`, value)
    }
  }
```

To keep track of whether we're in dark mode or not, we simply define a `darkmode`
reactive variable, which we flick inside `enableDarkMode` and the corresponding
`disableDarkMode` function.

Lastly, to have a sensible default, we enable/disable dark mode based on the user's
system defaults:

```javascript
if (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches) {
  darkmode.value = true
  enableDarkMode()
} else {
  darkmode.value = false
  disableDarkMode()
}
```

All set! We've now got the flicking machine working - time to bundle it all together
into a neat component.


## Putting it to Work

We have have the backend building blocks we need to make our component. We follow the
same "slider" idea as in Tobias' post, albeit tweaked to our setup here:

```html
<template>
  <div class="container">
    <input
      @change="darkmode ? disableDarkMode() : enableDarkMode()"
      id="checkbox"
      type="checkbox"
      class="checkbox"
    />
    <label for="checkbox" class="label transition">
      <span class="icon">🌙</span>
      <span class="icon">☀️</span>
      <div :class="['toggle', 'transition', darkmode ? 'checked' : '']"></div>
    </label>
  </div>
</template>
```

Note here that the `input` element is purely there to allow the user to slide the
slider, which we in turn use to disable/enable dark mode. The `label` element is the
actual slider, and we can again let CSS do the heavy lifting when it comes to actually
sliding the slider, using a `checked` class, defined as follows:

```css
.checked {
  transform: translateX(20px) !important;
}
```

This `checked` class, coupled with a transition, creates a great sliding effect. I find
it amusing that the user is really clicking the `input` element, which calls either
`disableDarkMode` or `enableDarkMode`, which in turn changes the `darkmode` variable,
and _that_ is what triggers the slider to move. But all of this is hidden, of course,
and the user gets the feeling that they are pressing the slider itself, making it move.

And that's it! Have a look at the full code in the section below for the sake of
completeness, and to make it easier for you to try it out 😊


## All Together

Here's the full code of `components/DarkModeButton.vue`, the dark mode component:

```html
<script setup>
  import { ref } from 'vue'
  import cssVariables from '@/assets/css-variables.yaml'

  // Get the root element, where all the CSS variables are stored
  const root = document.documentElement

  // Initialise the `darkmode` variable
  const darkmode = ref(null)

  // Function that enables dark mode by setting all the dark mode CSS variables
  function enableDarkMode() {
    darkmode.value = true
    for (let [key, value] of Object.entries(cssVariables.darkmode)) {
      root.style.setProperty(`--${key}`, value)
    }
  }

  // Function that disables dark mode by setting all the light mode CSS variables
  function disableDarkMode() {
    darkmode.value = false
    for (let [key, value] of Object.entries(cssVariables.lightmode)) {
      root.style.setProperty(`--${key}`, value)
    }
  }

  // Initialise the dark mode depending on the user's preferences
  if (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches) {
    darkmode.value = true
    enableDarkMode()
  } else {
    darkmode.value = false
    disableDarkMode()
  }
</script>

<template>
  <div class="container">
    <input
      @change="darkmode ? disableDarkMode() : enableDarkMode()"
      id="checkbox"
      type="checkbox"
      class="checkbox"
    />
    <label for="checkbox" class="label transition">
      <span class="icon">🌙</span>
      <span class="icon">☀️</span>
      <div :class="['toggle', 'transition', darkmode ? 'checked' : '']"></div>
    </label>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 100;
  }
  .checkbox {
    display: none;
  }
  .label {
    width: 40px;
    border-radius: 50px;
    border: 1px solid var(--text-color);
    padding: 5px;
    background: var(--bg-dark-mode-toggle);
    cursor: pointer;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
  }
  .icon {
    font-size: 12px;
  }
  .toggle {
    position: absolute;
    background-color: var(--bg-secondary);
    border-radius: 70%;
    height: 20px;
    width: 20px;
    transform: translateX(0);
  }
  .toggle.checked {
    transform: translateX(20px) !important;
  }
  .transition {
    transition: all 0.3s ease;
    -webkit-transition: all 0.3 ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
  }
</style>
```

This of course refers to the `assets/css-variables.yaml` file, which in my case looks
like this:

```yaml
lightmode:
  bg-primary: '#F5F4F2'
  bg-secondary: 'white'
  bg-box: '#e4e0e0'
  bg-table: '#e8e8e8'
  bg-code-1: '#e3e3e3'
  bg-code-2: '#ececec'
  bg-dark-mode-toggle: '#bcbcbc'
  text-color: '#3b3c36'
  quote-color: '#808080'
  image-brightness: '100%'
  image-inversion: '0%'

darkmode:
  bg-primary: '#2d2d2d'
  bg-secondary: '#393939'
  bg-box: '#393939'
  bg-table: '#3d3d3d'
  bg-code-1: '#3a3a3a'
  bg-code-2: '#3d3d3d'
  bg-dark-mode-toggle: '#777777'
  text-color: '#dedede'
  quote-color: '#c0c0c0'
  image-brightness: '80%'
  image-inversion: '100%'
```
