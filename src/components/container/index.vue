<template>
  <section class="nt-container" :class="{ 'is-vertical': isVertival }">
    <slot />
  </section>
</template>
<script>
export default {
  name: "NtContainer",
  props: {
    direction: String,
  },
  computed: {
    /* 
      这里用了一个小技巧，this.$slots.default 获取的是默认插槽中的所有 vnodes 节点，然后对他们遍历，通过 vnode.componentOptions.tag 来判断这个 vnode 是不是 <nt-header> 或者是 <nt-footer>。vnode.componentOptions 并不在官网 API 里，但是对于熟读 Vue 源码的人来说并不陌生。
    */
    isVertival() {
      // 垂直
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        // 水平
        return false;
      } else {
        return this.$slots && this.$slots.default
          ? // this.$slots返回的是一个Object {}
            // Object中每一个对象key为slot名 value为 <Array>vNode 包含对应名称插槽内的VnodeArray
            this.$slots.default.some((vNode) => {
              // Vue源码中vNode.componentOptions.tag拿到Vnode组件的名称
              // vNode.componentOptions只是组件才属性才生效
              const tag = vNode.componentOptions.tag;
              return tag === "el-header" || "el-footer";
            })
          : false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$namespace: "nt";
$modifier-separator: "--";
$state-prefix: "is-";

@mixin b($row) {
  $name: $namespace + "-" + $row;
  .#{$name} {
    @content;
  }
}

@mixin when($state) {
  @at-root {
    // nt-row--flex.is-justify-center
    .#{$state-prefix + $state} {
      @content;
    }
  }
}

@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}

@include when(vertical) {
  flex-direction: column;
}
</style>
