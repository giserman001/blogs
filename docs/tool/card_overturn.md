# css3卡片翻转
> 远古时期利用jq做翻转效果不仅繁琐，而且效果不是很好，随着css3的普及，那么动画也就更加简单和炫酷！

#### 可以学到的知识
1. css3的transition使用，transition（默认值：all 0s ease 0s） 属性是一个简写属性，用于设置四个过渡属性：
  . transition-property
  . transition-duration
  . transition-timing-function
  . transition-delay
  > tips: 这里有个坑：一般我们设置 transition-delay 都是0  但是这里需要加上单位 s(秒) 否则属性会无效

2. classList属性的使用
  1）classList属性返回元素的类名，作为DOMTokenList对象
  2）该属性用于在元素中添加，移除及切换css类
  3）classList属性是只读的，但可以用如下方法和属性。
    . 添加class属性--add()
    . 删除class="addp1"--remove()
    . 在元素中切换类名---toggle()
    . 实例：获取元素的类名
    . 判断元素是否存在某个class---contains()
    . 返回类名在元素中的索引值。索引值从0开始---item()
    . 查看类名的个数--length
3. backface-visibility属性使用 一般设置成 hidden 表示隐藏背面

#### 效果图如下

![截图](../images/overTurn.gif)

#### 主要代码
> html部分
```sh
<div class="box turnboxs">
  <div>正</div>
  <div>反</div>
</div>
```
```css
.box {
  position: relative;
}
.box div {
  height: 300px;
  text-align: center;
  line-height: 300px;
  border: 1px solid pink;
  width: 200px;
  position: absolute;
  font-size: 40px;
  left: 0px;
  color: #fff;
  top: 0px;
  transition: all 0.4s ease 0s;
  -webkit-transition: all 0.4s ease 0s;
  -moz-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  /* 隐藏背面 */
  backface-visibility: hidden;
}
.box div:first-child {
  background: red;
  transform: rotateY(0deg)
}
.box div:last-child {
  background: blue;
  transform: rotateY(180deg)
}
/* 翻转加一个class */
.box.turn div:first-child {
  transform: rotateY(-180deg);
}
.box.turn div:last-child {
  transform: rotateY(0deg);
}
```
> js部分
```js
<script>
  document.querySelector('.turnboxs').onclick = function () {
    this.classList.toggle('turn')
    return false
  }
</script>
```
