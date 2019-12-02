# 数字翻滚

### es6版本

> js采用了ES6的class编写，尽量使用chrome浏览器来查看，可以使用babel转成ES5，或者通过babel的网站在线转换。动画使用css3。

#### 功能支持
- 默认最小位数
- 翻滚速度
- 分隔符
- 当数字为零时是否有动画
- 保留几位小数

1. 调用接口

```sh
var odo1 = new numberRoll('.Odometer', {
  len: 8, //设置默认位数
  num: "2466", //初始化值
  speed: 1000, //动画速度
  symbol: ',', //分割符
  dot: 0 //保留几位小数点
})
// 更新数据
odo1.update(3235)
```
2. 以下是基本的css
```sh
.number-animate {
  line-height: 45px;
  height: 45px;
  font-size: 40px;
  overflow: hidden;
  display: inline-block;
  position: relative;
  color: yellow
}

.number-animate .number-animate-dot {
  width: 40px;
  float: left;
  text-align: center;
  background: #222;
  margin: 0 1px
}

.number-animate .number-animate-dom {
  width: 40px;
  text-align: center;
  float: left;
  position: relative;
  top: 0;
  background: #222;
  margin: 0 1px
}

.number-animate .number-animate-dom span,
.number-animate .number-animate-dot span {
  float: left;
  width: 100%;
  height: 45px;
  line-height: 1;
}
```
> 简单效果

![截图](../images/rollNum.gif)

### vue版本

#### 功能支持
- 默认最小位数
- 翻滚速度
- 分隔符
- 自定义背景图片和自定义背景图片width

> vue版本数字翻滚的是背景图片，并且切图要求高，不能有1px像素之差。因为是翻滚的是背景图片所以你要切图如下：

![截图](../images/numberBig.png)

在自己项目组件库里新建rollNum.vue,写下如下代码
```sh
<template>
  <div :class="['number-animate', setting.className]" :style="{height: `${pHeight}px`}">
    <template v-for="(item, index) in numArr">
      <div class="number-animate-dom" v-if="!isNaN(Number(item))" :key="index" :data-num="item">
        <img
          class="number-animate-numImg"
          :src="require(`@/images/${setting.imgName}`)"
          :style="{width: setting.mWidth}"
        />
      </div>
      <div
        v-else
        class="number-animate-dot"
        :key="index"
        :style="{height: `${pHeight}px`}"
      ><span class="dot">{{setting.symbol}}</span></div>
    </template>
  </div>
</template>

<script>
export default {
  name: "numRoll",
  data() {
    return {
      setting: {
        num: "", // 必须 翻滚数字
        className: "", // 必须， 唯一性
        imgName: "", // 必须 图片名字
        len: null, //设置默认最小位数
        speed: 1000, // 动画速度
        symbol: "", // 分隔符
        mWidth: "auto", // 默认值 图片大小
        zero: false // 当数字为零时是否有动画
      },
      numArr: [],
      pHeight: 0,
      parentDom: null
    };
  },
  props: {
    options: {
      type: Object
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.extend(this.setting, this.options);
      this.numToArr(this.setting.num);
      this.$nextTick(() => {
        this.parentDom = document.querySelector(`.${this.setting.className}`);
        this.animate();
      });
    },
    // 数字转数组并且不足位数补零
    numToArr(num) {
      num = parseFloat(num).toFixed(this.setting.dot);
      let arrStr =
          typeof num === "number" ? num.toString().split("") : num.split(""),
        next = [];
      let arrLen = arrStr.length;
      if (arrLen <= this.setting.len) {
        for (let _len = 0; _len < this.setting.len - arrLen; _len++) {
          arrStr.unshift(0);
        }
      }
      if (this.setting.symbol) {
        arrStr.reverse();
        for (let i = 0; i < arrStr.length; i++) {
          if (i !== 0 && i % 3 === 0) {
            next.push(this.setting.symbol, arrStr[i]);
          } else {
            next.push(arrStr[i]);
          }
        }
        next.reverse();
      }
      this.numArr = next.length?next : arrStr.reverse();
    },
    // 设置动画
    animate() {
      let $dom = this.parentDom.querySelectorAll(".number-animate-dom");
      if ($dom && $dom.length) {
        this.$nextTick(() => {
          this.pHeight = $dom[0].offsetHeight / 10;
          for (let o of $dom) {
            let num = o.getAttribute("data-num");
            if (this.setting.zero) {
              num = num == 0 ? 10 : num;
            }
            // 每一个number-animate-span高度 offsetHeight = height + padding + border
            o.style["transform"] = o.style["-webkit-transform"] =
              "translateY(" +
              (num === "." ? -11 * this.pHeight : -num * this.pHeight) +
              "px)";
            o.style["transition"] = o.style["-webkit-transition"] =
              (num === "." ? 0 : this.setting.speed / 1000) + "s";
          }
        });
      }
    },
    // 更新
    update(num) {
      this.numToArr(num);
      this.$nextTick(() => {
        this.animate();
      });
    },
    // 浅拷贝
    extend(x, y) {
      for (let i in y) {
        x[i] = y[i];
      }
    }
  }
};
</script>
<style lang="stylus">
.number-animate
  overflow: hidden
  display: inline-block
  position: relative
  .number-animate-dom
    text-align: center
    float: left
    position: relative
    .number-animate-numImg
      display: block
  .number-animate-dot
    width: 16px
    float: left
    position relative
    text-align: center
    .dot
      position absolute
      bottom 0
</style>
```

在其他页面上调用如下
```sh
// 首先引入组件
import numRoll from "./common/numRoll";
// 声明组件
components: {
  numRoll
},
// 使用组件
<numRoll ref="num1" :options="options"></numRoll>
// data里定义options
options: {
  num: 4654433,
  len: 14,
  symbol: ',',
  mWidth: '60px',
  className: "num1",
  imgName: 'numberBig.png'
},
```

> 简单效果

![截图](../images/rollNum1.gif)
![截图](../images/rollNum2.gif)
![截图](../images/rollNum3.gif)

> tips: 注意组件传了图片名字，所以组件里图片位置是相对的，如果应用到你自己的项目里，你需要修改图片地址。我是利用vue-cli2构建项目webpack配置了@代表src目录下images文件夹里面

```sh
<img
  class="number-animate-numImg"
  :src="require(`@/images/${setting.imgName}`)"
  :style="{width: setting.mWidth}"
/>
```

[代码地址](https://github.com/giserman001/case-demo/tree/master/%E6%95%B0%E5%AD%97%E7%BF%BB%E6%BB%9A)
#### 后续
你如果不满意现有功能可以自己扩展，或者评论给我，我会收到issues.