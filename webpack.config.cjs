// webpack.config.cjs
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  // For GitHub Pages project sites, assets must be under "/<repo>/"
  const publicPath = process.env.PUBLIC_PATH ?? (isProd ? "" : "/");

  return {
    entry: path.resolve(__dirname, "src/main.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/[name].[contenthash].js" : "assets/[name].js",
      clean: true,
      publicPath,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        // Optional, but keeps HTML injection aligned with output.publicPath
        publicPath,
      }),
    ],

    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",

    devServer: {
      port: 5174,
      hot: true,
      historyApiFallback: true,
      client: { overlay: true },
      static: {
        directory: path.resolve(__dirname, "public"),
      },
    },

    optimization: { splitChunks: { chunks: "all" } },
    performance: { hints: false },
  };
};
