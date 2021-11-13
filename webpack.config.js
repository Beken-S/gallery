"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") mode = "production";

const filename = (ext, dir = "") => {
  if (dir !== "") {
    return mode === "development"
      ? `${dir}/[name].${ext}`
      : `${dir}/[name].[contenthash].${ext}`;
  }
  return mode === "development"
    ? `[name].${ext}`
    : `[name].[contenthash].${ext}`;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./index.js",
  },
  output: {
    filename: filename("js", "scripts"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist/assets"),
    hot: true,
    port: 3000,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: filename("css", "styles") }),
    new HTMLWebpackPlugin({ template: "./index.html" }),
  ],
  module: {
    rules: [
      { test: /\.html$/i, use: ["html-loader"] },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
      {
        test: /\.mp3$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/sounds/[hash][ext][query]",
        },
      },
      {
        test: /\.mp4$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/video/[hash][ext][query]",
        },
      },
    ],
  },
};
