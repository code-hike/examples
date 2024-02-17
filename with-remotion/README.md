## Issues

> Based on Remotion's [Enabling MDX support](https://www.remotion.dev/docs/webpack#enabling-mdx-support)

## ESM import

`codehike/mdx` is an ES module, but Remotion's webpack config needs CommonJS.

```js
// enable-mdx.js
import {remarkCodeHike, recmaCodeHike} from 'codehike/mdx'; // fails

export const enableMdx = (currentConfiguration) => {
  ...
}
```

> Error [ERR_REQUIRE_ESM]: require() of ES Module node_modules\codehike\dist\remark.js from node_modules\@remotion\cli\dist\load-config.js not supported.

One potential workaround could be to use a dynamic import

```js
// enable-mdx.js
export const enableMdx = (currentConfiguration) => {
  const {remarkCodeHike, recmaCodeHike} = await import('codehike/mdx');
}
```

BUT dynamic imports are async and `overrideWebpackConfig` doesn't support async.

```js
// remotion.config.js
Config.overrideWebpackConfig(enableMdx); // can't be async
```

## `jsx: true` not supported

Another issue is that we can't output JSX from MDX files.

```js enable-mdx.js
{
  loader: '@mdx-js/loader',
  options: {
    jsx: true, // fails
  },
}
```

But that's something we can fix on codehike side.

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
