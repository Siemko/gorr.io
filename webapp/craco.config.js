const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: {
    configure: config => {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
      return config;
    },
  },
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {displayName: true, fileName: true, pure: true, minify: true},
      ],
    ],
  },
};
