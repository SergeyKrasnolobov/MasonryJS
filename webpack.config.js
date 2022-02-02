const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "[name].bundle.js",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader?name=./fonts/[name].[ext]",
          },
        ],
      },

      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: "file-loader?name=./static/[name].[ext]",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/img",
        to: "img",
      },
    ]),
  ],
};
