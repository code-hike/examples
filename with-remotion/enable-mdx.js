// import {remarkCodeHike, recmaCodeHike} from 'codehike/mdx';

export const enableMdx = (currentConfiguration) => {
	// const {remarkCodeHike, recmaCodeHike} = await import('codehike/mdx');
	return {
		...currentConfiguration,
		module: {
			...currentConfiguration.module,
			rules: [
				...(currentConfiguration.module?.rules
					? currentConfiguration.module.rules
					: []),
				{
					test: /\.mdx?$/,
					use: [
						{
							loader: '@mdx-js/loader',
							options: {
								// remarkPlugins: [remarkCodeHike],
								// recmaPlugins: [recmaCodeHike],
								// jsx: true, // fails
							},
						},
					],
				},
			],
		},
	};
};
