# MDX-to-HTML

Minimalist static site generator with MDX support, built with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) and [esbuild](https://github.com/evanw/esbuild).

## Getting Started

1. To get started, first clone the repo and install dependencies:

```
git clone https://github.com/narendrasss/mdx-to-html.git
cd mdx-to-html
yarn install
```

2. Then, compile the TS files:

```
yarn build
```

3. Finally, run the `compile` command passing in the path to your MDX file:

```
yarn compile ./my/mdx/file.mdx
```

This will generate two files in the `dist` folder — `<mdx-file-name>.html` and `<mdx-file-name>.js`, where `<mdx-file-name>` is the name of the mdx file that you passed in the previous step. Now, you're good to open the HTML file in your browser!

## Notes

### Theming

- Currently, there's no support for adding styles to the HTML file ([#2](https://github.com/narendrasss/mdx-to-html/issues/2))
- In the future, I hope to include ways to add a custom layout component

### Supported File Formats

- Only `.md` and `.mdx` files are supported at the moment. In the future, I hope to add support for React components as well ([#3](https://github.com/narendrasss/mdx-to-html/issues/3))

### Optimizations

- The generated JS bundles are currently **not optimized**. Currently, the React and ReactDOM bundles are included in every generated JS file. Ideally this should be separated into separate bundles that can be reused ([#4](https://github.com/narendrasss/mdx-to-html/issues/4))
