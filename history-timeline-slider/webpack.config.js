const webpack = require("webpack")
const path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const IS_DEV = process.env.NODE_ENV === "dev"

const dist = path.join(__dirname, "dist")
const dirNode = "node_modules"
const dirSrc = path.join(__dirname, "src")
const dirStyle = path.join(dirSrc, "sass")

module.exports = {
  entry: [path.join(dirSrc, "index.js"), path.join(dirStyle, "main.scss")],

  output: {
    path: dist,
  },

  resolve: {
    modules: [dirNode, dirSrc, dirStyle],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /assets\.(jpe?g|png|gif|svg|fnt|webp)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]"
          },
        },
      },
      {
        test: /font\.(woff2?)$/,
        loader: "file-loader",
        options: {
          name(file) {
            return "[hash].[ext]"
          },
        },
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
