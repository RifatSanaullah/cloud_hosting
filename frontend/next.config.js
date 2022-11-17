// module.exports = {
//   devIndicators: {
//     autoPrerender: false,
//   },
//   resolve: {
//     fallback: {
//         "fs": false
//     },
// }
// };

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "path": false,
          "os": false,
        }
      }
      return config
    },
  }
}
