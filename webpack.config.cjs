const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/main.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/[name].[contenthash].js" : "assets/[name].js",
      clean: true,
      publicPath: "/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".mjs"],
      // Helps with ESM packages that omit extensions in imports.
      fullySpecified: false,
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              // IMPORTANT: ensure JSX is transformed (react-jsx).
              configFile: path.resolve(__dirname, "tsconfig.webpack.json"),
            },
          },
          exclude: /node_modules/,
        },
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset" },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
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
