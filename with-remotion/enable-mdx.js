const chConfig = {
	components: {code: 'Code'},
	syntaxHighlighting: {
		theme: 'github-dark',
	},
};

export const enableMdx = async (currentConfiguration) => {
	const {remarkCodeHike, recmaCodeHike} = await import('codehike/mdx');
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
								remarkPlugins: [[remarkCodeHike, chConfig]],
								recmaPlugins: [[recmaCodeHike, chConfig]],
								// jsx: true, // fails
							},
						},
					],
				},
			],
		},
	};
};
