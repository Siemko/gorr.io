const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: {
    configure: config => {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
      return config;
    },
  },
};
