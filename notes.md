# MDX to HTML

- Turn MDX files into HTML

1. Parse MDX to JSX
   1. A couple ways to do this:
      1. Using MDX bundler or using the standard MDX library (I think it's @mdx/js ?)
      2. Let's try using mdx-bundler for now
2. Render JSX to HTML string using React

Ok, now that this works, how would we make this interactive? Right now, I'm able to serve this html and open it in a browser and it works just fine.

Next thing we need to do is hydrate the component tree on the client side.

1. We need to write the actual JS code that will be served in the client.
2. Import that JS code in the HTML via a script tag.

---

Right now, we're manually coding the Component in both the build-client file and the output html. What we actually want is:

- Generate the Component using MDX bundler
- Generate the HTML file        |
- Generate the client bundle    |  <-- These two can be done in parallel

So right now I'm exporting the mdx component directly. This means I'm generating the component _twice_, once for the html and once for the client bundle.

- Later, we should probably optimize this so that it's only generating the component one time.

- What I actually need to do is to create the component as a jsx _file_.
- Or maybe there's a way around this?
  - According to the mdx-bundler docs, the `getMDXComponent` function is meant to be called on the client; but doesn't this mean we can't render it as html?

---

Yay everything works!

Future updates:

- Split bundle based on what's being used by that particular page

---

Next up:

- Add stylesheets
- Add tests
- Typescript??
- Code splitting
- No JS bundles for pure markdown files
- Support for rendering React components to HTML
