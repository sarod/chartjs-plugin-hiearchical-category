var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  externals: {
    "chart.js": {
      commonjs: "chart.js",
      commonjs2: "chart.js",
      amd: "chart.js",
      root: "Chart",
      var: "Chart"
    }
  }
};
