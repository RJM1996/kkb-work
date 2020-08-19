const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  devtool: 'source-map',
  // 入口
  entry: {
    index: "./src/index.js",
  },

  // 输出
  output: {
    // path 一定要是绝对路径
    path: path.resolve(__dirname, "dist"),
    // [name] => 映射 entry 中的对应的 key
    filename: "./js/[name].js",
  },

  module: {
    // 不同的模块解析规则
    rules: [
      // 每一个对象就是一种模块的解析规则 - loader
      {
        // 用来匹配当前载入的模块规则
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // outputPath 还是相对于全局的 outputPath
            outputPath: "./images",
            // 一个资源的 url 并不等同与资源的绝对存储路径
            // 打包后文件的 url
            publicPath: "./images",
            // 小于 100 字节转成 base64 格式
            limit: 100,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            // loader: "style-loader",
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // 启用/禁用 url() 处理
              url: true,
              // 启用/禁用 @import 处理
              import: true,
              // 启用/禁用 Sourcemap
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "index.html",
      template: "./template/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
  ],
};
