## Issues

## ESM import

```js enable-mdx.js
import {remarkCodeHike, recmaCodeHike} from 'codehike/mdx';
```

> Error [ERR_REQUIRE_ESM]: require() of ES Module node_modules\codehike\dist\remark.js from node_modules\@remotion\cli\dist\load-config.js not supported.

## dynamic import()

```js remotion.config.js
Config.overrideWebpackConfig(enableMdx);
```

`enableMdx` can't be async, so we can't do:

```js enable-mdx.js
export const enableMdx = (currentConfiguration) => {
	const {remarkCodeHike, recmaCodeHike} = await import('codehike/mdx');
}
```

## `jsx: true` not supported

```js enable-mdx.js
{
  loader: '@mdx-js/loader',
  options: {
    jsx: true, // fails
  },
}
```

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
