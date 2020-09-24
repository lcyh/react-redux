const fs = require("fs");
const path = require("path");
const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
// const lessToJS = require("less-vars-to-js");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

// const themeVariables = fs.readFileSync(
//   path.resolve(__dirname, "./src/theme.less.js"),
//   "utf8"
// );

const themeVariables = require("./src/theme.less");
console.log("themeVariables", themeVariables);
module.exports = override(
  addDecoratorsLegacy(),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
    },
  })
);
