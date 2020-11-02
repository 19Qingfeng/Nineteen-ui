import ColCmp from "./components/Col/index.vue"
import RowCmp from "./components/Row/index.vue"

export default function(Vue) {
  Vue.component(ColCmp.name, ColCmp)
  Vue.component(RowCmp.name, RowCmp)
}