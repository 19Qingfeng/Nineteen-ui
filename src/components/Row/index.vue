<script>
export default {
  name: "NtRow",
  props: {
    // 渲染标签名
    tag: {
      type: String,
      default: "div",
    },
    // row的分行
    gutter: {
      type: [String, Number],
      default: 0,
    },
    // 是否开启flex布局
    flex: {
      type: Boolean,
      default: false,
    },
    // flex对齐方式
    justify: {
      type: String,
      default: "start",
    },
  },
  provide() {
    return {
      row: this,
    };
  },
  computed: {
    style() {
      const ret = {};
      // 存在gutter 整体两边间隔不空格
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [
          "nt-row",
          this.flex ? "nt-row--flex" : "",
          this.justify !== "start" ? `is-justify-${this.justify}` : "",
        ],
        style: this.style,
      },
      this.$slots.default
    );
  },
};
</script>

<style scoped lang="scss">
$namespace: "nt";
$modifier-separator: "--";
$state-prefix: "is-";

@mixin b($row) {
  $name: $namespace + "-" + $row;
  .#{$name} {
    @content;
  }
}

@mixin m($modifier) {
  $selector: &;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector +
      & +
      $modifier-separator +
      $unit +
      ","}; // &--flex   ->
  }
  @at-root {
    #{$currentSelector} {
      // nt-row--flex
      @content;
    }
  }
}

@mixin when($state) {
  @at-root {
    // nt-row--flex.is-justify-center
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

@include b(row) {
  position: relative;
  box-sizing: border-box;
  @include m(flex) {
    // nt-row-flex
    display: flex;
    &:before,
    &:after {
      display: none;
    }
    // nt-row--flex.is-justify-center
    @include when(justify-center) {
      justify-content: center;
    }
    @include when(justify-start) {
      justify-content: flex-start;
    }
    @include when(justify-space-between) {
      justify-content: space-between;
    }
    @include when(justify-space-around) {
      justify-content: space-around;
    }
  }
}

// .nt-row-flex {
//   display: flex;
// }
// .nt-row-justify-center {
//   justify-content: center;
// }
// .nt-row-justify-end {
//   justify-content: flex-end;
// }
// .nt-row-justify-space-between {
//   justify-content: space-between;
// }
// .nt-row-justify-space-around {
//   justify-content: space-around;
// }

// @include b(row) {
//   position: relative;
//   box-sizing: border-box;
//   @include utils-clearfix;

//   @include m(flex) {
//     display: flex;
//     &:before,
//     &:after {
//       display: none;
//     }

//     @include when(justify-center) {
//       justify-content: center;
//     }
//     @include when(justify-end) {
//       justify-content: flex-end;
//     }
//     @include when(justify-space-between) {
//       justify-content: space-between;
//     }
//     @include when(justify-space-around) {
//       justify-content: space-around;
//     }
//   }
// }
</style>
