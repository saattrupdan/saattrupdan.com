---
title: A Crash Course in Vue.js
meta: This post covers the making of a personal website with Vue.js, including all the lessons I've personally learnt along the way from creating this very website. Everything is open sourced, so you can freely copy the code and tweak it to create your own website!
tags: web development, vue
---

Creating a website these days seems to be a lot more complicated than what it used to
be, with a vast plethora of Javascript frameworks that seemingly keep on multiplying
endlessly. Even after picking one, these frameworks are being developed at a fast pace,
resulting in many new versions that aren't backwards compatible, leaving most
StackOverflow answers outdated.

Nevertheless, after having had my trusty static [Beautiful
Jekyll](https://beautifuljekyll.com/) website, I decided to take the plunge and code up
a website from scratch. This post covers the basics of the Vue.js framework, which I
ended up using, along with several lessons learnt along the way. My website is
[completely open source](https://github.com/saattrupdan/saattrupdan.com), so my hope is
that the code along with this blog post could kickstart your own personal website, in
case you desire one such.

Also, a disclaimer: I'm still a Vue.js beginner, with only a few months of experience
at this point, so take everything I say with many grains of salt.

This post is part of a series on Vue.js:

1. A Crash Course in Vue.js
2. <router-link to="/posts/2023-09-28-dark-mode-in-vuejs">Dark Mode in
   Vue.js</router-link>

### Hello World with a Foot

There are several web development frameworks out there these days. Should you go with
[React](https://react.dev/), [Angular](https://angular.io/), [Vue](https://vuejs.org/),
[Svelte](https://svelte.dev/) or something completely different?

It seems that Angular is the most complicated one out of those four, which seemed a bit
too overkill for a simple personal website. Svelte is very new compared to the others,
meaning that there is currently a lack of learning resources, making it a bit harder
for beginners like me to get started. So my choice was either React or Vue, and I
somewhat arbitrarily opted for Vue. Maybe it was simply a nice balance between being
the underdog and having a reasonably sized community 🤷

Anyway, what's Vue all about? Essentially, it's all about _components_ (which seems
like is the case for all of the above frameworks as well). These are small building
blocks of your website, such as a menu, a footer, the content of a blog post, and so
on. As with classical websites, these consist of three parts: HTML for the actual
content of the component, CSS for the styling, and Javascript for any code that belongs
to that component. In Vue these components are bundled together in separate files, with
a special `.vue` extension.

A simple "Hello World" main component (usually called `App.vue`) could simply look
like:

```html
<script setup></script>

<template>
  <p>Hello, world!</p>
</template>

<style scoped></style>
```

In this example we see the three parts. All the Javascript is put in the `<script
setup>` tag, HTML belongs to the `<template>` tag, and all CSS styling lies within the
`<style scoped>` tag. We of course only have HTML in this example, so let's try adding
a basic footer as a separate component. We thus create a separate `Footer.vue`
component, like so:

```html
<script setup>
  const year = new Date().getFullYear();
  const name = "Your name here";
</script>

<template>
  <div class="footer">
    <p class="copyright">© {{ year }} {{ name }}</p>
  </div>
</template>

<style scoped>
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: #f2f2f2;
  }
  .copyright {
    font-size: 13px;
    text-align: center;
  }
</style>
```

This simply adds a footer containing a copyright statement with some basic styling.
Note that we can use the `year` and `name` Javascript variables directly in the HTML
part as `{ { year } }` and `{ { name } }` - handy!

Adding this component to our `App.vue` file then looks like the following:

```html
<script setup>
  import Footer from "./Footer.vue";
</script>

<template>
  <div class="main-view">
    <p>Hello, world!</p>
  </div>
  <footer />
</template>

<style scoped>
  .main-view {
    margin-top: 80px;
    margin-bottom: 150px;
  }
</style>
```

Note that I added some top and bottom margins around the main view. The reason for this
is to ensure that there's enough room for both the footer and a header (we'll build the
header below).

That's all well and good, but how do you make these `.vue` files into an actual
website? This requires a bit of boiler plate code, but the easiest way to automate this
initialisation of a project is to use the `create-vue` package. Simply write `npm init
vue@3` in your terminal, name your project and simply say "No" to everything. This
creates a folder with the following basic structure

```plain-text
.
├── README.md
├── index.html
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets/img
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── TheWelcome.vue
│   │   ├── WelcomeItem.vue
│   │   └── icons
│   │       ├── IconCommunity.vue
│   │       ├── IconDocumentation.vue
│   │       ├── IconEcosystem.vue
│   │       ├── IconSupport.vue
│   │       └── IconTooling.vue
│   └── main.js
└── vite.config.js
```

For our basic example, let's remove all the files in the `components` folders and add
in our `Footer.vue` component, and replace `App.vue` with our file defined above. To
keep things simple, let's remove the CSS styling as well, by deleting the three files
in the `assets/img` folder and adding an empty `main.css` file in there. We end up with the
following structure:

```plain-text
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets/img
│   │   └── main.css  <-- empty
│   ├── components
│   │   └── Footer.vue
│   └── main.js
└── vite.config.js
```

If we now run `npm install && npm run dev` in the terminal, we'll see our fancy new
website, with a working footer component!

### Adding navigation

It's not really a website if we can't navigate to other pages, so let's add that. Vue
is really good at so-called _Single Page Applications_ (SPAs), which technically
speaking consists of a single page, but still allows for navigation. Instead of
redirecting the page to a new page, the "navigation" stays on the same page but
_updates_ all the content on the page! We call these "virtual pages" _views_. The
result is way faster than using normal multi-page applications.

#### `vue-router`

Adding navigation on an SPA with Vue is done using a module called `vue-router`. We
simply install it with `npm install vue-router`. With it installed, let's set up some
views, `HelloWorld.vue` and `HelloAnotherWorld.vue`, both of which we put in a folder
`views`:

```html
<template>
  <p>Hello, world!</p>
</template>
```

```html
<template>
  <p>Hello, another world!</p>
</template>
```

Note that I left out the Javascript and CSS part of the components - these are not
really necessary if they're empty anyway. We also need to change our main component
`App.vue`, which is the main view. We add a new `router-view` tag, which is updated
with the component belonging to the current URL:

```html
<script setup>
  import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="main-view">
    <router-view :key="$route.fullPath" />
  </div>
  <footer />
</template>

<style scoped>
  .main-view {
    margin-top: 80px;
    margin-bottom: 150px;
  }
</style>
```

**Top tip**: Including `:key="$route.fullPath"` in the `router-view` ensures that the
views are updated properly when the URLs change.

Next, we change the `main.js` file to the following, which sets up the _routes_,
coupling URLs to views:

```javascript
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HelloWorld from "./views/HelloWorld.vue";

import "./assets/img/main.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Hello world",
      component: HelloWorld,
    },
    {
      path: "/another-world",
      name: "Hello another world",
      component: () => import("./views/HelloAnotherWorld.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
```

**Top tip**: By specifying `() => import('./views/HelloAnotherWorld.vue')` instead of
importing `HelloAnotherWorld` and using that directly ensures that `HelloAnotherWorld`
is loaded _lazily_, so we don't have to spend resources loading it when we enter the
site.

Our repo structure now looks like the following:

```plain-text
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets/img
│   │   └── main.css  <-- empty
│   ├── components
│   │   └── Footer.vue
│   ├── main.js
│   └── views
│       ├── HelloAnotherWorld.vue
│       └── HelloWorld.vue
└── vite.config.js
```

If we now run `npm run dev` again, we will now see the `HelloWorld` view, and if we go
to `http://localhost:517x/another-world` then we'll see the `HelloAnotherWorld` view.
Hooray! 🎉

#### Adding a Top Menu

So far the navigation is quite opaque, requiring the user to know the URLs of the other
views. To make things a bit easier, let's add a top menu with some navigation, with a
`Header` component. The key bit here is to use `router-link` tags instead of normal
anchor tags, as they allow navigation to other views without actually loading a new
page:

```html
<template>
  <div class="header">
    <nav class="navbar">
      <router-link class="nav-item" to="/"> Hello world </router-link>
      <router-link class="nav-item" to="/another-world">
        Hello another world
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
    background-color: #f2f2f2;
  }
  .navbar {
    display: flex;
    justify-content: end;
    padding: 1.3rem 1.3rem;
  }
  .nav-item {
    margin-left: 25px;
  }
</style>
```

We insert this `Header` component the same way we inserted the `Footer` component,
inside the `App.vue` main file:

```html
<script setup>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";
</script>

<template>
  <header />
  <div class="main-view">
    <router-view :key="$route.fullPath" />
  </div>
  <footer />
</template>

<style scoped>
  .main-view {
    margin-top: 80px;
    margin-bottom: 150px;
  }
</style>
```

And voilà, a top menu!

### Blog posts!

So far we have a website that allows for multiple views, with associated navigation,
and a header and footer. That alone could be sufficient for your needs, in which case I
would skip to the "Deploying the Website" section below.

I'll here be covering how I managed to set up a blog on my website. A blog is a bit
more complex compared to normal static views, as we need to load in _all_ the blog
posts, present them, and we need to dynamically update a `Blog` view with the content
of the blog post. I'll keep it relatively simple and high level, and not get too bogged
down in the details here.

My overall idea was to have a `Blog` view, which displays all the blog post titles, and
clicking on these takes you to a `Post` view, whose content is then updated according
to an associated Markdown file.

#### Working with Markdown Files

My first problem was how to deal with Markdown files in Vue at all. Luckily there is a
Vue plugin called `vite-plugin-md` which essentially converts Markdown files into Vue
components, so that we can use them like we did with our `Header` and `Footer`
components above. As always, we install it simply as `npm install vite-plugin-md`. We
also need to change the `vite.config.js` file to the following, which allows our app to
use the Markdown files:

```javascript
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";

export default defineConfig({
  plugins: [Vue({ include: [/\.vue$/, /\.md$/] }), Markdown()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
```

The only new lines here is the `Markdown` import from our new plugin, including it in
the `plugins` list, and including Markdown files in the Vue build process, to make sure
that they are included when we deploy our website. With this setup, we can now simply
import Markdown files in our views as `import Post from 'my-awesome-post.md` and use
them as `<Post/>`, just like normal components.

There's a problem though: we don't _know_ the names of all the posts in advance, and we
don't want to manually add more imports everytime we finish a new blog post. Instead,
we should have a folder containing the blog posts, and it should simply import all of
these and set them up properly. This is what we'll be doing next, in our `Blog` view.

#### Adding a `Blog` View

Our `Blog` view is the first time we really need a bit of Javascript to handle the
dynamic loading of the Markdown posts. We start by creating a new folder, `posts`,
inside the `src` folder (I tried moving it out to the root of the repositori, but that
doesn't seem to work). Let's add a couple of posts to the folder, `my-awesome-post.md`
and `my-awesome-second-post.md`:

```markdown
# What a Nice Post!

Here's some content.
```

```markdown
# What a Nice Second Post!

Here's some more content.
```

Our repo structure now looks like the following:

```plain-text
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets/img
│   │   └── main.css
│   ├── components
│   │   ├── Footer.vue
│   │   └── Header.vue
│   ├── main.js
│   ├── posts
│   │   ├── my-awesome-post.md
│   │   └── my-awesome-second-post.md
│   └── views
│       ├── HelloAnotherWorld.vue
│       └── HelloWorld.vue
└── vite.config.js
```

We next create our `Blog` view. Within it we would firstly like to extract an array of
all the names of our posts within the `posts` folder. In Javascript this can be done
with `Object.keys(import.meta.globEager('@/posts/*.md'))`, where `@` indicates the
`src` folder here. `import.meta.globEager` returns a dictionary with filenames as keys
and modules as values, and we're only interested in the keys for now here.

This will return the full path to the posts, however, so we trim them and remove the
`.md` suffix as well, to get an array `postNames` containing the two names
`my-awesome-post` and `my-awesome-second-post`. Our Javascript part of the `Blog` view
thus looks like this:

```html
<script setup>
  const postNames = Object.keys(import.meta.globEager('@/posts/*.md')).map(
    (file) => file.split('/').slice(-1)[0].slice(0, -3)
  )
</script>
```

We next need to define the HTML part of the view. This is where we'll be using our
first Vue _directive_, which are special keywords we can use within the HTML part of
our components. In this case we'll be using the `v-for` directive, which
allows us to iterate over an array defined in the Javascript part of the component. The
HTML part of the `Blog` view then ends up looking like this:

```html
<template>
  <h1>Blog</h1>
  <div v-for="postName in postNames">
    <router-link :to="`/posts/${postName}`">{{ postName }}</router-link>
  </div>
</template>
```

Note here that we're suddenly using `:to` instead of `to` inside the `router-link` tag.
This is yet another Vue directive and is really a short-hand for `v-bind:to`. This
allows us to not simply put in a fixed value inside the `to` argument, but instead add
Javascript that connects the value of `to` to the different `postName` values.

Also, we're linking to `/posts/${postName}`, but we haven't actually defined that route
yet. That's the next step, along with adding a `Post` view.

#### Adding a `Post` View

The last part of the blog is adding a view for the individual blog posts. This view
will _depend_ on the ID of the blog post, so we need to feed in an ID somehow. In Vue,
this is done using something called `props`. These are simply variables that we can
feed into a component, which it can then use internally. In this case, we want to feed
in the ID, and we specify that the view expects an ID using the `defineProps` function.

We also need to import the Markdown post. Unfortunately Vue does not support importing
dynamic components as `import PostContent from '../posts/${id}.md'`; that only works
for static paths. Instead, we can achieve it using `defineAsyncComponent`:

```html
<script setup>
  import { defineAsyncComponent } from "vue";
  const { id } = defineProps({ id: { type: String, required: true } });
  const PostContent = defineAsyncComponent(() => import(`../posts/${id}.md`));
</script>

<template>
  <PostContent />
</template>
```

In a nutshell, this view takes in an ID, loads in the associated blog post, and
displays it. Next up, we need to add a new route, and also add a new link to our
top menu. For the route, we simply add the following to the list of `routes` inside
`main.js`:

```javascript
{
  path: '/posts/:id',
  name: 'Post',
  component: () => import('./views/Post.vue'),
  props: true,
},
```

Note the `:id` keyword here, which states that whatever we'll put after `/posts/` will
be used as the `id` and be sent to the view. We need `props: true` here as well, to
ensure that this `id` is actually being sent to the `Post` view.

Lastly, we add a link to the blog in the top menu by simply adding the following line
to the `Header` component:

```html
<router-link class="nav-item" to="/posts">Blog</router-link>
```

And that's it!

### Deploying the Website

We now have a working website which we can run locally, so let's try to get it live.
After a lot of research I ended up with [vercel](https://vercel.com), mostly because it
supports both web frameworks like Vue.js as well as Python applications.

Simply install it with `npm install --global vercel`, and then run the `vercel` command
in your repo. This will deploy the website to a test environment where you can check if
everything is as it should be. If that's the case then you can run `vercel --prod` to
deploy it properly, all free of charge.

On the `vercel` website you can then attach the website to a custom domain if you own
one, and also link it up to your GitHub/GitLab/Bitbucket repo, to automatically deploy
when new changes are pushed to the repo.

### Wrapping up

We did lots in this post! We started from absolutely nothing, and managed to build a
working website with navigation as well a blog using content from Markdown files, and
deployed the website using `vercel`.

Now, the website is not the _prettiest_, as I've focused mostly on the functionality
and not spent a long time on styling. However, as my own website (the one you're
currently on) was built using almost exactly the same structure, you can get inspired
from the styling and other various extra features, as the code is all [open
source](https://github.com/saattrupdan/saattrupdan.com).

Have fun coding 😊
