<template>
  <header :style="{ height }">
    <slot />
  </header>
</template>

<script>
export default {
  name: "NtHeader",
  props: {
    height: {
      type: String,
      default: "60px",
    },
  },
};
</script>

<style lang="scss" scoped>
$namespace: "nt";
$--header-padding: 10px;

@mixin b($row) {
  $name: $namespace + "-" + $row;
  .#{$name} {
    @content;
  }
}

@include b(header) {
  flex-shrink: 0;
}

@include b(header) {
  padding: $--header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
