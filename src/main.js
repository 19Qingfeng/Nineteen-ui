import ColCmp from "./components/Col/index.vue"
import RowCmp from "./components/Row/index.vue"
import Container from "./components/Container/index.vue"

export default function (Vue) {
  Vue.component(ColCmp.name, ColCmp)
  Vue.component(RowCmp.name, RowCmp)
  Vue.component(Container.name, Container)
}