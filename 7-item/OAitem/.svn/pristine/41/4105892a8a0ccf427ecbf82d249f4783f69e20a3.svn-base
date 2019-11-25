const path = require("path");
const webpack = require("webpack");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/style/_var.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        images: path.resolve(__dirname, "./src/images/"),
        components: path.resolve(__dirname, "./src/components/"),
        views: path.resolve(__dirname, "./src/views/"),
        treeselect: "@riophae/vue-treeselect"
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Ajax: [path.resolve(__dirname, "src/js/common/axios"), "default"],
        jquery: "jquery",
        Utils: [path.resolve(__dirname, "src/js/common/utils"), "default"]
      })
    ]
  },
  devServer: {
    port: 80
  }
};
