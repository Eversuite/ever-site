/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    require("path").join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
  ],
  theme: {
    extend: {
      fontFamily: {
        "evercore": ["EVERCORE"],
        "ardela": ["ArdelaEdgeX01"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    ...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")()
  ]
};