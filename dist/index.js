(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.nineteen = factory());
}(this, (function () { 'use strict';

  var script = {
    name: "NtCol",
    props: {
      // 渲染标签名
      tag: {
        type: String,
        "default": "div"
      },
      // 24为单位 分割
      span: {
        type: Number,
        "default": 0
      },
      // 左偏移
      offset: {
        type: Number,
        "default": 0
      },
      // 右偏移
      push: {
        type: Number,
        "default": 0
      }
    },
    inject: {
      row: {
        "default": null
      }
    },
    computed: {
      gutter: function gutter() {
        if (this.row) {
          var gutter = this.row.gutter;
          return gutter;
        }

        return null;
      }
    },
    render: function render(h) {
      var _this = this;

      var className = [];
      ['span', 'offset', 'push'].forEach(function (prop) {
        if (_this[prop] || _this[prop] === 0) {
          className.push("nt-col-".concat(prop, "-").concat(_this[prop]));
        }
      });
      var style = {};

      if (this.gutter) {
        style.paddingLeft = "".concat(this.gutter / 2, "px");
        style.paddingRight = "".concat(this.gutter / 2, "px");
      }

      return h(this.tag, {
        "class": ["nt-col"].concat(className),
        style: style
      }, this.$slots["default"]);
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-4ef2bb98_0", { source: ".nt-col-span-1[data-v-4ef2bb98] {\n  width: 4.1666666667%;\n}\n.nt-col-offset-1[data-v-4ef2bb98] {\n  margin-left: 4.1666666667%;\n}\n.nt-col-push-1[data-v-4ef2bb98] {\n  margin-left: -4.1666666667%;\n}\n.nt-col-span-2[data-v-4ef2bb98] {\n  width: 8.3333333333%;\n}\n.nt-col-offset-2[data-v-4ef2bb98] {\n  margin-left: 8.3333333333%;\n}\n.nt-col-push-2[data-v-4ef2bb98] {\n  margin-left: -8.3333333333%;\n}\n.nt-col-span-3[data-v-4ef2bb98] {\n  width: 12.5%;\n}\n.nt-col-offset-3[data-v-4ef2bb98] {\n  margin-left: 12.5%;\n}\n.nt-col-push-3[data-v-4ef2bb98] {\n  margin-left: -12.5%;\n}\n.nt-col-span-4[data-v-4ef2bb98] {\n  width: 16.6666666667%;\n}\n.nt-col-offset-4[data-v-4ef2bb98] {\n  margin-left: 16.6666666667%;\n}\n.nt-col-push-4[data-v-4ef2bb98] {\n  margin-left: -16.6666666667%;\n}\n.nt-col-span-5[data-v-4ef2bb98] {\n  width: 20.8333333333%;\n}\n.nt-col-offset-5[data-v-4ef2bb98] {\n  margin-left: 20.8333333333%;\n}\n.nt-col-push-5[data-v-4ef2bb98] {\n  margin-left: -20.8333333333%;\n}\n.nt-col-span-6[data-v-4ef2bb98] {\n  width: 25%;\n}\n.nt-col-offset-6[data-v-4ef2bb98] {\n  margin-left: 25%;\n}\n.nt-col-push-6[data-v-4ef2bb98] {\n  margin-left: -25%;\n}\n.nt-col-span-7[data-v-4ef2bb98] {\n  width: 29.1666666667%;\n}\n.nt-col-offset-7[data-v-4ef2bb98] {\n  margin-left: 29.1666666667%;\n}\n.nt-col-push-7[data-v-4ef2bb98] {\n  margin-left: -29.1666666667%;\n}\n.nt-col-span-8[data-v-4ef2bb98] {\n  width: 33.3333333333%;\n}\n.nt-col-offset-8[data-v-4ef2bb98] {\n  margin-left: 33.3333333333%;\n}\n.nt-col-push-8[data-v-4ef2bb98] {\n  margin-left: -33.3333333333%;\n}\n.nt-col-span-9[data-v-4ef2bb98] {\n  width: 37.5%;\n}\n.nt-col-offset-9[data-v-4ef2bb98] {\n  margin-left: 37.5%;\n}\n.nt-col-push-9[data-v-4ef2bb98] {\n  margin-left: -37.5%;\n}\n.nt-col-span-10[data-v-4ef2bb98] {\n  width: 41.6666666667%;\n}\n.nt-col-offset-10[data-v-4ef2bb98] {\n  margin-left: 41.6666666667%;\n}\n.nt-col-push-10[data-v-4ef2bb98] {\n  margin-left: -41.6666666667%;\n}\n.nt-col-span-11[data-v-4ef2bb98] {\n  width: 45.8333333333%;\n}\n.nt-col-offset-11[data-v-4ef2bb98] {\n  margin-left: 45.8333333333%;\n}\n.nt-col-push-11[data-v-4ef2bb98] {\n  margin-left: -45.8333333333%;\n}\n.nt-col-span-12[data-v-4ef2bb98] {\n  width: 50%;\n}\n.nt-col-offset-12[data-v-4ef2bb98] {\n  margin-left: 50%;\n}\n.nt-col-push-12[data-v-4ef2bb98] {\n  margin-left: -50%;\n}\n.nt-col-span-13[data-v-4ef2bb98] {\n  width: 54.1666666667%;\n}\n.nt-col-offset-13[data-v-4ef2bb98] {\n  margin-left: 54.1666666667%;\n}\n.nt-col-push-13[data-v-4ef2bb98] {\n  margin-left: -54.1666666667%;\n}\n.nt-col-span-14[data-v-4ef2bb98] {\n  width: 58.3333333333%;\n}\n.nt-col-offset-14[data-v-4ef2bb98] {\n  margin-left: 58.3333333333%;\n}\n.nt-col-push-14[data-v-4ef2bb98] {\n  margin-left: -58.3333333333%;\n}\n.nt-col-span-15[data-v-4ef2bb98] {\n  width: 62.5%;\n}\n.nt-col-offset-15[data-v-4ef2bb98] {\n  margin-left: 62.5%;\n}\n.nt-col-push-15[data-v-4ef2bb98] {\n  margin-left: -62.5%;\n}\n.nt-col-span-16[data-v-4ef2bb98] {\n  width: 66.6666666667%;\n}\n.nt-col-offset-16[data-v-4ef2bb98] {\n  margin-left: 66.6666666667%;\n}\n.nt-col-push-16[data-v-4ef2bb98] {\n  margin-left: -66.6666666667%;\n}\n.nt-col-span-17[data-v-4ef2bb98] {\n  width: 70.8333333333%;\n}\n.nt-col-offset-17[data-v-4ef2bb98] {\n  margin-left: 70.8333333333%;\n}\n.nt-col-push-17[data-v-4ef2bb98] {\n  margin-left: -70.8333333333%;\n}\n.nt-col-span-18[data-v-4ef2bb98] {\n  width: 75%;\n}\n.nt-col-offset-18[data-v-4ef2bb98] {\n  margin-left: 75%;\n}\n.nt-col-push-18[data-v-4ef2bb98] {\n  margin-left: -75%;\n}\n.nt-col-span-19[data-v-4ef2bb98] {\n  width: 79.1666666667%;\n}\n.nt-col-offset-19[data-v-4ef2bb98] {\n  margin-left: 79.1666666667%;\n}\n.nt-col-push-19[data-v-4ef2bb98] {\n  margin-left: -79.1666666667%;\n}\n.nt-col-span-20[data-v-4ef2bb98] {\n  width: 83.3333333333%;\n}\n.nt-col-offset-20[data-v-4ef2bb98] {\n  margin-left: 83.3333333333%;\n}\n.nt-col-push-20[data-v-4ef2bb98] {\n  margin-left: -83.3333333333%;\n}\n.nt-col-span-21[data-v-4ef2bb98] {\n  width: 87.5%;\n}\n.nt-col-offset-21[data-v-4ef2bb98] {\n  margin-left: 87.5%;\n}\n.nt-col-push-21[data-v-4ef2bb98] {\n  margin-left: -87.5%;\n}\n.nt-col-span-22[data-v-4ef2bb98] {\n  width: 91.6666666667%;\n}\n.nt-col-offset-22[data-v-4ef2bb98] {\n  margin-left: 91.6666666667%;\n}\n.nt-col-push-22[data-v-4ef2bb98] {\n  margin-left: -91.6666666667%;\n}\n.nt-col-span-23[data-v-4ef2bb98] {\n  width: 95.8333333333%;\n}\n.nt-col-offset-23[data-v-4ef2bb98] {\n  margin-left: 95.8333333333%;\n}\n.nt-col-push-23[data-v-4ef2bb98] {\n  margin-left: -95.8333333333%;\n}\n.nt-col-span-24[data-v-4ef2bb98] {\n  width: 100%;\n}\n.nt-col-offset-24[data-v-4ef2bb98] {\n  margin-left: 100%;\n}\n.nt-col-push-24[data-v-4ef2bb98] {\n  margin-left: -100%;\n}\n.nt-col[data-v-4ef2bb98] {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.nt-col[data-v-4ef2bb98] {\n  display: inline-block;\n  box-sizing: border-box;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["C:\\Users\\Administrator\\Desktop\\Nineteen-ui\\src\\components\\Col\\index.vue","index.vue"],"names":[],"mappings":"AA2EA;EACA,oBAAA;AC1EA;AD4EA;EACA,0BAAA;ACzEA;AD2EA;EACA,2BAAA;ACxEA;ADiEA;EACA,oBAAA;AC9DA;ADgEA;EACA,0BAAA;AC7DA;AD+DA;EACA,2BAAA;AC5DA;ADqDA;EACA,YAAA;AClDA;ADoDA;EACA,kBAAA;ACjDA;ADmDA;EACA,mBAAA;AChDA;ADyCA;EACA,qBAAA;ACtCA;ADwCA;EACA,2BAAA;ACrCA;ADuCA;EACA,4BAAA;ACpCA;AD6BA;EACA,qBAAA;AC1BA;AD4BA;EACA,2BAAA;ACzBA;AD2BA;EACA,4BAAA;ACxBA;ADiBA;EACA,UAAA;ACdA;ADgBA;EACA,gBAAA;ACbA;ADeA;EACA,iBAAA;ACZA;ADKA;EACA,qBAAA;ACFA;ADIA;EACA,2BAAA;ACDA;ADGA;EACA,4BAAA;ACAA;ADPA;EACA,qBAAA;ACUA;ADRA;EACA,2BAAA;ACWA;ADTA;EACA,4BAAA;ACYA;ADnBA;EACA,YAAA;ACsBA;ADpBA;EACA,kBAAA;ACuBA;ADrBA;EACA,mBAAA;ACwBA;AD/BA;EACA,qBAAA;ACkCA;ADhCA;EACA,2BAAA;ACmCA;ADjCA;EACA,4BAAA;ACoCA;AD3CA;EACA,qBAAA;AC8CA;AD5CA;EACA,2BAAA;AC+CA;AD7CA;EACA,4BAAA;ACgDA;ADvDA;EACA,UAAA;AC0DA;ADxDA;EACA,gBAAA;AC2DA;ADzDA;EACA,iBAAA;AC4DA;ADnEA;EACA,qBAAA;ACsEA;ADpEA;EACA,2BAAA;ACuEA;ADrEA;EACA,4BAAA;ACwEA;AD/EA;EACA,qBAAA;ACkFA;ADhFA;EACA,2BAAA;ACmFA;ADjFA;EACA,4BAAA;ACoFA;AD3FA;EACA,YAAA;AC8FA;AD5FA;EACA,kBAAA;AC+FA;AD7FA;EACA,mBAAA;ACgGA;ADvGA;EACA,qBAAA;AC0GA;ADxGA;EACA,2BAAA;AC2GA;ADzGA;EACA,4BAAA;AC4GA;ADnHA;EACA,qBAAA;ACsHA;ADpHA;EACA,2BAAA;ACuHA;ADrHA;EACA,4BAAA;ACwHA;AD/HA;EACA,UAAA;ACkIA;ADhIA;EACA,gBAAA;ACmIA;ADjIA;EACA,iBAAA;ACoIA;AD3IA;EACA,qBAAA;AC8IA;AD5IA;EACA,2BAAA;AC+IA;AD7IA;EACA,4BAAA;ACgJA;ADvJA;EACA,qBAAA;AC0JA;ADxJA;EACA,2BAAA;AC2JA;ADzJA;EACA,4BAAA;AC4JA;ADnKA;EACA,YAAA;ACsKA;ADpKA;EACA,kBAAA;ACuKA;ADrKA;EACA,mBAAA;ACwKA;AD/KA;EACA,qBAAA;ACkLA;ADhLA;EACA,2BAAA;ACmLA;ADjLA;EACA,4BAAA;ACoLA;AD3LA;EACA,qBAAA;AC8LA;AD5LA;EACA,2BAAA;AC+LA;AD7LA;EACA,4BAAA;ACgMA;ADvMA;EACA,WAAA;AC0MA;ADxMA;EACA,iBAAA;AC2MA;ADzMA;EACA,kBAAA;AC4MA;ADxNA;EAiBA,qBAAA;EACA,sBAAA;AC2MA;ADxMA;EACA,qBAAA;EACA,sBAAA;AC2MA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<script>\r\nexport default {\r\n  name: \"NtCol\",\r\n  props: {\r\n    // 渲染标签名\r\n    tag: {\r\n      type: String,\r\n      default: \"div\",\r\n    },\r\n    // 24为单位 分割\r\n    span: {\r\n      type: Number,\r\n      default: 0,\r\n    },\r\n    // 左偏移\r\n    offset: {\r\n      type: Number,\r\n      default: 0,\r\n    },\r\n    // 右偏移\r\n    push: {\r\n      type: Number,\r\n      default: 0,\r\n    },\r\n  },\r\n  inject: {\r\n    row: {\r\n      default: null,\r\n    },\r\n  },\r\n  computed: {\r\n    gutter() {\r\n      if (this.row) {\r\n        const gutter = this.row.gutter;\r\n        return gutter;\r\n      }\r\n      return null;\r\n    },\r\n  },\r\n  render(h) {\r\n    const className = [];\r\n    \r\n    ['span','offset','push'].forEach(prop => {\r\n      if(this[prop] || this[prop] === 0) {\r\n        className.push(`nt-col-${prop}-${this[prop]}`)\r\n      }\r\n    })\r\n\r\n    const style = {};\r\n    if (this.gutter) {\r\n      style.paddingLeft = `${this.gutter / 2}px`;\r\n      style.paddingRight = `${this.gutter / 2}px`;\r\n    }\r\n\r\n    return h(\r\n      this.tag,\r\n      {\r\n        class: [\"nt-col\", ...className],\r\n        style,\r\n      },\r\n      this.$slots.default\r\n    );\r\n  },\r\n};\r\n</script>\r\n\r\n<style lang='scss' scoped>\r\n$namespace: \"nt\";\r\n@mixin b($row) {\r\n  $name: $namespace + \"-\" + $row;\r\n  .#{$name} {\r\n    @content;\r\n  }\r\n}\r\n@for $i from 1 through 24 {\r\n  .nt-col-span-#{$i} {\r\n    width: ($i/24) * 100%;\r\n  }\r\n  .nt-col-offset-#{$i} {\r\n    margin-left: ($i/24) * 100%;\r\n  }\r\n  .nt-col-push-#{$i} {\r\n    margin-left: -($i/24) * 100%;\r\n  }\r\n}\r\n\r\n@include b(col) {\r\n  display: inline-block;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.nt-col {\r\n  display: inline-block;\r\n  box-sizing: border-box;\r\n}\r\n</style>",".nt-col-span-1 {\n  width: 4.1666666667%;\n}\n\n.nt-col-offset-1 {\n  margin-left: 4.1666666667%;\n}\n\n.nt-col-push-1 {\n  margin-left: -4.1666666667%;\n}\n\n.nt-col-span-2 {\n  width: 8.3333333333%;\n}\n\n.nt-col-offset-2 {\n  margin-left: 8.3333333333%;\n}\n\n.nt-col-push-2 {\n  margin-left: -8.3333333333%;\n}\n\n.nt-col-span-3 {\n  width: 12.5%;\n}\n\n.nt-col-offset-3 {\n  margin-left: 12.5%;\n}\n\n.nt-col-push-3 {\n  margin-left: -12.5%;\n}\n\n.nt-col-span-4 {\n  width: 16.6666666667%;\n}\n\n.nt-col-offset-4 {\n  margin-left: 16.6666666667%;\n}\n\n.nt-col-push-4 {\n  margin-left: -16.6666666667%;\n}\n\n.nt-col-span-5 {\n  width: 20.8333333333%;\n}\n\n.nt-col-offset-5 {\n  margin-left: 20.8333333333%;\n}\n\n.nt-col-push-5 {\n  margin-left: -20.8333333333%;\n}\n\n.nt-col-span-6 {\n  width: 25%;\n}\n\n.nt-col-offset-6 {\n  margin-left: 25%;\n}\n\n.nt-col-push-6 {\n  margin-left: -25%;\n}\n\n.nt-col-span-7 {\n  width: 29.1666666667%;\n}\n\n.nt-col-offset-7 {\n  margin-left: 29.1666666667%;\n}\n\n.nt-col-push-7 {\n  margin-left: -29.1666666667%;\n}\n\n.nt-col-span-8 {\n  width: 33.3333333333%;\n}\n\n.nt-col-offset-8 {\n  margin-left: 33.3333333333%;\n}\n\n.nt-col-push-8 {\n  margin-left: -33.3333333333%;\n}\n\n.nt-col-span-9 {\n  width: 37.5%;\n}\n\n.nt-col-offset-9 {\n  margin-left: 37.5%;\n}\n\n.nt-col-push-9 {\n  margin-left: -37.5%;\n}\n\n.nt-col-span-10 {\n  width: 41.6666666667%;\n}\n\n.nt-col-offset-10 {\n  margin-left: 41.6666666667%;\n}\n\n.nt-col-push-10 {\n  margin-left: -41.6666666667%;\n}\n\n.nt-col-span-11 {\n  width: 45.8333333333%;\n}\n\n.nt-col-offset-11 {\n  margin-left: 45.8333333333%;\n}\n\n.nt-col-push-11 {\n  margin-left: -45.8333333333%;\n}\n\n.nt-col-span-12 {\n  width: 50%;\n}\n\n.nt-col-offset-12 {\n  margin-left: 50%;\n}\n\n.nt-col-push-12 {\n  margin-left: -50%;\n}\n\n.nt-col-span-13 {\n  width: 54.1666666667%;\n}\n\n.nt-col-offset-13 {\n  margin-left: 54.1666666667%;\n}\n\n.nt-col-push-13 {\n  margin-left: -54.1666666667%;\n}\n\n.nt-col-span-14 {\n  width: 58.3333333333%;\n}\n\n.nt-col-offset-14 {\n  margin-left: 58.3333333333%;\n}\n\n.nt-col-push-14 {\n  margin-left: -58.3333333333%;\n}\n\n.nt-col-span-15 {\n  width: 62.5%;\n}\n\n.nt-col-offset-15 {\n  margin-left: 62.5%;\n}\n\n.nt-col-push-15 {\n  margin-left: -62.5%;\n}\n\n.nt-col-span-16 {\n  width: 66.6666666667%;\n}\n\n.nt-col-offset-16 {\n  margin-left: 66.6666666667%;\n}\n\n.nt-col-push-16 {\n  margin-left: -66.6666666667%;\n}\n\n.nt-col-span-17 {\n  width: 70.8333333333%;\n}\n\n.nt-col-offset-17 {\n  margin-left: 70.8333333333%;\n}\n\n.nt-col-push-17 {\n  margin-left: -70.8333333333%;\n}\n\n.nt-col-span-18 {\n  width: 75%;\n}\n\n.nt-col-offset-18 {\n  margin-left: 75%;\n}\n\n.nt-col-push-18 {\n  margin-left: -75%;\n}\n\n.nt-col-span-19 {\n  width: 79.1666666667%;\n}\n\n.nt-col-offset-19 {\n  margin-left: 79.1666666667%;\n}\n\n.nt-col-push-19 {\n  margin-left: -79.1666666667%;\n}\n\n.nt-col-span-20 {\n  width: 83.3333333333%;\n}\n\n.nt-col-offset-20 {\n  margin-left: 83.3333333333%;\n}\n\n.nt-col-push-20 {\n  margin-left: -83.3333333333%;\n}\n\n.nt-col-span-21 {\n  width: 87.5%;\n}\n\n.nt-col-offset-21 {\n  margin-left: 87.5%;\n}\n\n.nt-col-push-21 {\n  margin-left: -87.5%;\n}\n\n.nt-col-span-22 {\n  width: 91.6666666667%;\n}\n\n.nt-col-offset-22 {\n  margin-left: 91.6666666667%;\n}\n\n.nt-col-push-22 {\n  margin-left: -91.6666666667%;\n}\n\n.nt-col-span-23 {\n  width: 95.8333333333%;\n}\n\n.nt-col-offset-23 {\n  margin-left: 95.8333333333%;\n}\n\n.nt-col-push-23 {\n  margin-left: -95.8333333333%;\n}\n\n.nt-col-span-24 {\n  width: 100%;\n}\n\n.nt-col-offset-24 {\n  margin-left: 100%;\n}\n\n.nt-col-push-24 {\n  margin-left: -100%;\n}\n\n.nt-col {\n  display: inline-block;\n  box-sizing: border-box;\n}\n\n.nt-col {\n  display: inline-block;\n  box-sizing: border-box;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-4ef2bb98";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = undefined;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  var script$1 = {
    name: "NtRow",
    props: {
      // 渲染标签名
      tag: {
        type: String,
        "default": "div"
      },
      // row的分行
      gutter: {
        type: [String, Number],
        "default": 0
      },
      // 是否开启flex布局
      flex: {
        type: Boolean,
        "default": false
      },
      // flex对齐方式
      justify: {
        type: String,
        "default": "start"
      }
    },
    provide: function provide() {
      return {
        row: this
      };
    },
    computed: {
      style: function style() {
        var ret = {}; // 存在gutter 整体两边间隔不空格

        if (this.gutter) {
          ret.marginLeft = "-".concat(this.gutter / 2, "px");
          ret.marginRight = ret.marginLeft;
        }

        return ret;
      }
    },
    render: function render(h) {
      return h(this.tag, {
        "class": ["nt-row", this.flex ? "nt-row--flex" : "", this.justify !== "start" ? "is-justify-".concat(this.justify) : ""],
        style: this.style
      }, this.$slots["default"]);
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-b3cb04dc_0", { source: ".nt-row[data-v-b3cb04dc] {\n  position: relative;\n  box-sizing: border-box;\n}\n.nt-row--flex[data-v-b3cb04dc] {\n  display: flex;\n}\n.nt-row--flex[data-v-b3cb04dc]:before, .nt-row--flex[data-v-b3cb04dc]:after {\n  display: none;\n}\n.nt-row--flex.is-justify-center[data-v-b3cb04dc] {\n  justify-content: center;\n}\n.nt-row--flex.is-justify-start[data-v-b3cb04dc] {\n  justify-content: flex-start;\n}\n.nt-row--flex.is-justify-space-between[data-v-b3cb04dc] {\n  justify-content: space-between;\n}\n.nt-row--flex.is-justify-space-around[data-v-b3cb04dc] {\n  justify-content: space-around;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["C:\\Users\\Administrator\\Desktop\\Nineteen-ui\\src\\components\\Row\\index.vue","index.vue"],"names":[],"mappings":"AAkEA;EAiCA,kBAAA;EACA,sBAAA;ACjGA;AD+EA;EAqBA,aAAA;ACjGA;ADkGA;EAEA,aAAA;ACjGA;ADmFA;EAkBA,uBAAA;AClGA;ADgFA;EAqBA,2BAAA;ACjGA;AD4EA;EAwBA,8BAAA;AChGA;ADwEA;EA2BA,6BAAA;AC/FA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<script>\r\nexport default {\r\n  name: \"NtRow\",\r\n  props: {\r\n    // 渲染标签名\r\n    tag: {\r\n      type: String,\r\n      default: \"div\",\r\n    },\r\n    // row的分行\r\n    gutter: {\r\n      type: [String, Number],\r\n      default: 0,\r\n    },\r\n    // 是否开启flex布局\r\n    flex: {\r\n      type: Boolean,\r\n      default: false,\r\n    },\r\n    // flex对齐方式\r\n    justify: {\r\n      type: String,\r\n      default: \"start\",\r\n    },\r\n  },\r\n  provide() {\r\n    return {\r\n      row: this,\r\n    };\r\n  },\r\n  computed: {\r\n    style() {\r\n      const ret = {};\r\n      // 存在gutter 整体两边间隔不空格\r\n      if (this.gutter) {\r\n        ret.marginLeft = `-${this.gutter / 2}px`;\r\n        ret.marginRight = ret.marginLeft;\r\n      }\r\n\r\n      return ret;\r\n    },\r\n  },\r\n  render(h) {\r\n    return h(\r\n      this.tag,\r\n      {\r\n        class: [\r\n          \"nt-row\",\r\n          this.flex ? \"nt-row--flex\" : \"\",\r\n          this.justify !== \"start\" ? `is-justify-${this.justify}` : \"\",\r\n        ],\r\n        style: this.style,\r\n      },\r\n      this.$slots.default\r\n    );\r\n  },\r\n};\r\n</script>\r\n\r\n<style scoped lang=\"scss\">\r\n$namespace: \"nt\";\r\n$modifier-separator: \"--\";\r\n$state-prefix: \"is-\";\r\n\r\n@mixin b($row) {\r\n  $name: $namespace + \"-\" + $row;\r\n  .#{$name} {\r\n    @content;\r\n  }\r\n}\r\n\r\n@mixin m($modifier) {\r\n  $selector: &;\r\n  $currentSelector: \"\";\r\n  @each $unit in $modifier {\r\n    $currentSelector: #{$currentSelector +\r\n      & +\r\n      $modifier-separator +\r\n      $unit +\r\n      \",\"}; // &--flex   ->\r\n  }\r\n  @at-root {\r\n    #{$currentSelector} {\r\n      // nt-row--flex\r\n      @content;\r\n    }\r\n  }\r\n}\r\n\r\n@mixin when($state) {\r\n  @at-root {\r\n    // nt-row--flex.is-justify-center\r\n    &.#{$state-prefix + $state} {\r\n      @content;\r\n    }\r\n  }\r\n}\r\n\r\n@include b(row) {\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  @include m(flex) {\r\n    // nt-row-flex\r\n    display: flex;\r\n    &:before,\r\n    &:after {\r\n      display: none;\r\n    }\r\n    // nt-row--flex.is-justify-center\r\n    @include when(justify-center) {\r\n      justify-content: center;\r\n    }\r\n    @include when(justify-start) {\r\n      justify-content: flex-start;\r\n    }\r\n    @include when(justify-space-between) {\r\n      justify-content: space-between;\r\n    }\r\n    @include when(justify-space-around) {\r\n      justify-content: space-around;\r\n    }\r\n  }\r\n}\r\n\r\n// .nt-row-flex {\r\n//   display: flex;\r\n// }\r\n// .nt-row-justify-center {\r\n//   justify-content: center;\r\n// }\r\n// .nt-row-justify-end {\r\n//   justify-content: flex-end;\r\n// }\r\n// .nt-row-justify-space-between {\r\n//   justify-content: space-between;\r\n// }\r\n// .nt-row-justify-space-around {\r\n//   justify-content: space-around;\r\n// }\r\n\r\n// @include b(row) {\r\n//   position: relative;\r\n//   box-sizing: border-box;\r\n//   @include utils-clearfix;\r\n\r\n//   @include m(flex) {\r\n//     display: flex;\r\n//     &:before,\r\n//     &:after {\r\n//       display: none;\r\n//     }\r\n\r\n//     @include when(justify-center) {\r\n//       justify-content: center;\r\n//     }\r\n//     @include when(justify-end) {\r\n//       justify-content: flex-end;\r\n//     }\r\n//     @include when(justify-space-between) {\r\n//       justify-content: space-between;\r\n//     }\r\n//     @include when(justify-space-around) {\r\n//       justify-content: space-around;\r\n//     }\r\n//   }\r\n// }\r\n</style>",".nt-row {\n  position: relative;\n  box-sizing: border-box;\n}\n.nt-row--flex {\n  display: flex;\n}\n.nt-row--flex:before, .nt-row--flex:after {\n  display: none;\n}\n.nt-row--flex.is-justify-center {\n  justify-content: center;\n}\n\n.nt-row--flex.is-justify-start {\n  justify-content: flex-start;\n}\n\n.nt-row--flex.is-justify-space-between {\n  justify-content: space-between;\n}\n\n.nt-row--flex.is-justify-space-around {\n  justify-content: space-around;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-b3cb04dc";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = undefined;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      {},
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  function main (Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
    Vue.component(__vue_component__$1.name, __vue_component__$1);
  }

  return main;

})));
