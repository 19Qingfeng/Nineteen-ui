<script>
export default {
  name: "NtCol",
  props: {
    // 渲染标签名
    tag: {
      type: String,
      default: "div",
    },
    // 24为单位 分割
    span: {
      type: Number,
      default: 0,
    },
    // 左偏移
    offset: {
      type: Number,
      default: 0,
    },
    // 右偏移
    push: {
      type: Number,
      default: 0,
    },
  },
  inject: {
    row: {
      default: null,
    },
  },
  computed: {
    gutter() {
      if (this.row) {
        const gutter = this.row.gutter;
        return gutter;
      }
      return null;
    },
  },
  render(h) {
    const className = [];
    
    ['span','offset','push'].forEach(prop => {
      if(this[prop] || this[prop] === 0) {
        className.push(`nt-col-${prop}-${this[prop]}`)
      }
    })

    const style = {};
    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`;
      style.paddingRight = `${this.gutter / 2}px`;
    }

    return h(
      this.tag,
      {
        class: ["nt-col", ...className],
        style,
      },
      this.$slots.default
    );
  },
};
</script>

<style lang='scss' scoped>
$namespace: "nt";
@mixin b($row) {
  $name: $namespace + "-" + $row;
  .#{$name} {
    @content;
  }
}
@for $i from 1 through 24 {
  .nt-col-span-#{$i} {
    width: ($i/24) * 100%;
  }
  .nt-col-offset-#{$i} {
    margin-left: ($i/24) * 100%;
  }
  .nt-col-push-#{$i} {
    margin-left: -($i/24) * 100%;
  }
}

@include b(col) {
  display: inline-block;
  box-sizing: border-box;
}

.nt-col {
  display: inline-block;
  box-sizing: border-box;
}
</style>