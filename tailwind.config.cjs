/** @type {import("tailwindcss").Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				evercore: ['EVERCORE'],
				ardela: ['ArdelaEdgeX01'],
				futura: ['Futura PT Web Book']
			}
		}
	},
	plugins: [
		require('postcss-import'),
    	require('tailwindcss/nesting')(require('postcss-nesting')),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
};
