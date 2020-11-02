// const path = require("path")
// const babel = require(");
import path from "path"
import babel from "rollup-plugin-babel"
import VuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
export default {
  input: path.resolve(__dirname, "./src/main.js"),
  output: {
    file: path.resolve(__dirname, "./dist/index.js"),
    name: "nineteen",
    format: "umd",
    globals: {
      vue: "Vue"
    }
  },
  plugins: [
    VuePlugin( /* VuePluginOptions */ ),
    postcss(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}