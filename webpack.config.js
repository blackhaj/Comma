const path = require("path");

module.exports = {
  entry: "./client/index.js",
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: '/,',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // ORDER MATTERS (LAST in the list gets done first)
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: "/build/",
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
