"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
  mode: mode,

  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./index.js",
  },
  output: {
    filename: filename("js", "scripts"),
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

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
        test: /\.(jpe?g|png|gif|svg)$/i,
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

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: filename("css", "styles") }),
    new HTMLWebpackPlugin({ template: "./index.html" }),
    new ImageMinimizerPlugin({
      severityError: "warning",
      minimizerOptions: {
        plugins: [
          ["gifsicle", { optimizationLevel: 3, interlaced: true }],
          ["imagemin-mozjpeg", { quality: 50 }],
          ["pngquant", { quality: [0.7, 0.8] }],
          [
            "svgo",
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        ],
      },
    }),
  ],

  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 8082,
  },
};
