1. 浏览器滚动条样式修改（兼容IE）
```
滚动条样式修改（谷歌等浏览器）
/* 公共的滚动条的样式 */
.scrollBar::-webkit-scrollbar{
    width: 11px;
}
/* 滚动槽 */
.scrollBar::-webkit-scrollbar-track{
    background: #2b3a47;
    width: 3px;
    overflow: hidden;
}
/* 滚动条滑块 */
.scrollBar::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: #066eb9;
    width: 20px;
}
IE下滚动条样式
.scrollBar{
    /*三角箭头的颜色 （IE下滚动条颜色设置）*/
    scrollbar-arrow-color: #066eb9;
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: #066eb9;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: transparent;
    /*滚动条阴影*/
    scrollbar-shadow-color: transparent;
    /*滚动条轨道颜色*/
    scrollbar-track-color: #2b3a47;
}
```
2. 三角形样式
```
-webkit-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
.tipBox:after{
position: absolute;
bottom: -10px;
width: 0;
height: 0;
left: 13%;
margin-left: -10px;
content: " ";
border-top: 10px solid #0d4bae ;
border-left: 10px solid transparent ;
border-right: 10px solid transparent ;
```
3. 渐变色兼容写法（iE）
```
div {
      background-image: -webkit-gradient(linear, 0 50%, 100% 50%, from(rgba(11, 145, 236, 1)), to(rgba(95, 226, 255, 1)));
      filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#0b91ec, endColorstr=#5fe2ff);
      background: -ms-linear-gradient(left,#0b91ec 0%,#5fe2ff 100%);
}
```
4. 判断对象中是否有key
```
obj.hasOwnProperty('value'))
```
5. VW解决移动端自适应
>  https://juejin.im/entry/5aa09c3351882555602077ca

6. git撤销工作区所有修改的代码(没有add和commit)
```
git checkout .
```
7. 场景：同事进行版本回退，并且线上也进行版本会退了，我要把我本地版本代码版本同步线上（tips:我的本地版本比线上要超前），可以使用： git reset --hard origin/dev进行版本同步

8. Windows下Git多账号配置，同一电脑多个ssh-key的管理 
https://www.cnblogs.com/popfisher/p/5731232.html

9. axios发送请求几个技巧
> ![d474b627ea7532236e09ce2f0700c214.png](en-resource://database/433:1)
> ![4f4752785701538d063f6cd379b478da.png](en-resource://database/432:1)
> ![281c705cd22bd207f7c4f45ff3f9fe56.png](en-resource://database/431:1)

10. 时间格式化正则（YYYY-MM-DD || YYYY/MM/DD 
> YYYY[(-|/|.)MM][(-|/|.)DD]


