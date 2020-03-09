# HTML5新特性-上传下载

关于Blob，ArrayBuffer、File、FileReader和FormData的区别可[参考](https://www.cnblogs.com/youhong/p/10875190.html) 

[[toc]]

### 前言
HTML5 中提供的文件API在前端中有着丰富的应用，上传、下载、读取内容等在日常的交互中很常见。而且在各个浏览器的兼容也比较好，包括移动端，除了 IE 只支持 IE10 以上的版本。想要更好地掌握好操作文件的功能，先要熟悉每个API。

### FileList 对象和 file 对象

HTML 中的 input[type="file"] 标签有个 multiple 属性，允许用户选择多个文件，FileList对象则就是表示用户选择的文件列表。这个列表中的每一个文件，就是一个 file 对象。

file 对象的属性：
1. name : 文件名，不包含路径。
2. type : 文件类型。图片类型的文件都会以 image/ 开头，可以由此来限制只允许上传图片。
3. size : 文件大小。可以根据文件大小来进行其他操作。
4. lastModified : 文件最后修改的时间。

```html
<input type="file" id="files" multiple>
<script>
    var elem = document.getElementById('files');
    elem.onchange = function (event) {
    	var files = event.target.files;
    	for (var i = 0; i < files.length; i++) {
    	    // 文件类型为 image 并且文件大小小于 200kb
            if(files[i].type.indexOf('image/') !== -1 && files[i].size < 204800){
                console.log(files[i].name);
            }
    	}
    }
</script>
```
::: warning 注意
input 中有个 accept 属性，可以用来规定能够通过文件上传进行提交的文件类型。

accept="image/*" 可以用来限制只允许上传图像格式。但是在 Webkit 浏览器下却出现了响应滞慢的问题，要等上好几秒才弹出文件选择框。

解决方法就是将 * 通配符改为指定的 MIME 类型。

```html
<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png">
```
:::



### Blob 对象
Blob 对象相当于一个容器，可以用于存放二进制数据。它有两个属性，size 属性表示字节长度，type 属性表示 MIME 类型。

> ////     filename，摘取了常用的部分
  ////    'doc'        => 'application/msword',
  ////    'bin'        => 'application/octet-stream',
  ////    'exe'        => 'application/octet-stream',
  ////    'so'         => 'application/octet-stream',
  ////    'dll'        => 'application/octet-stream',
  ////    'pdf'        => 'application/pdf',
  ////    'ai'         => 'application/postscript',
  ////    'xls'        => 'application/vnd.ms-excel',
  ////    'ppt'        => 'application/vnd.ms-powerpoint',
  ////    'dir'        => 'application/x-director',
  ////    'js'         => 'application/x-javascript',
  ////    'swf'        => 'application/x-shockwave-flash',
  ////    'xhtml'      => 'application/xhtml+xml',
  ////    'xht'        => 'application/xhtml+xml',
  ////    'zip'        => 'application/zip',
  ////    'mid'        => 'audio/midi',
  ////    'midi'       => 'audio/midi',
  ////    'mp3'        => 'audio/mpeg',
  ////    'rm'         => 'audio/x-pn-realaudio',
  ////    'rpm'        => 'audio/x-pn-realaudio-plugin',
  ////    'wav'        => 'audio/x-wav',
  ////    'bmp'        => 'image/bmp',
  ////    'gif'        => 'image/gif',
  ////    'jpeg'       => 'image/jpeg',
  ////    'jpg'        => 'image/jpeg',
  ////    'png'        => 'image/png',
  ////    'css'        => 'text/css',
  ////    'html'       => 'text/html',
  ////    'htm'        => 'text/html',
  ////    'txt'        => 'text/plain',
  ////    'xsl'        => 'text/xml',
  ////    'xml'        => 'text/xml',
  ////    'mpeg'       => 'video/mpeg',
  ////    'mpg'        => 'video/mpeg',
  ////    'avi'        => 'video/x-msvideo',
  ////    'movie'      => 'video/x-sgi-movie',


#### 如何创建
Blob 对象可以使用 Blob() 构造函数来创建。
```js
var blob = new Blob(['hello'], {type:"text/plain"});
```

Blob 构造函数中的第一个参数是一个数组，可以存放 <font color=#ec7259>二进制数据、ArrayBuffer对象、ArrayBufferView 对象、Blob对象和字符串</font>。

Blob 对象可以通过 slice() 方法来返回一个新的 Blob 对象。

```js
var newblob = blob.slice(0,5, {type:"text/plain"});
```
slice() 方法使用三个参数，均为可选。第一个参数代表要从Blob对象中的二进制数据的起始位置开始复制，第二个参数代表复制的结束位置，第三个参数为 Blob 对象的 MIME 类型。

canvas.toBlob() 也可以创建 Blob 对象。toBlob() 使用三个参数，第一个为回调函数，第二个为图片类型，默认为 image/png，第三个为图片质量，值在0到1之间。
```js
var canvas = document.getElementById('canvas');
canvas.toBlob(function(blob){ console.log(blob); }, "image/jpeg", 0.5);
```

#### 下载文件
Blod 对象可以通过 window.URL 对象生成一个网络地址，结合 a 标签的 download 属性来实现下载文件功能。
比如把 canvas 下载为一个图片文件.

```html
<canvas id="canvas"><canvas>
<script>
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d'); 
  ctx.fillStyle = 'green'; 
  ctx.fillRect(10, 10, 100, 100);
  canvas.toBlob(function(blob){
      // 使用 createObjectURL 生成地址，格式为 blob:null/fd95b806-db11-4f98-b2ce-5eb16b38ba36
      // 这里有兼容问题
      // if (window.navigator.msSaveOrOpenBlob) {
      //   navigator.msSaveBlob(blob, fileName);
      // } else {
      //   var url = URL.createObjectURL(blob);
      //   var a = document.createElement('a');
      //   a.download = 'canvas';
      //   a.href = url;
      //   // 模拟a标签点击进行下载
      //   a.click();
      //   // 下载后告诉浏览器不再需要保持这个文件的引用了
      //   URL.revokeObjectURL(url);
      // }
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.download = 'canvas';
      a.href = url;
      // 模拟a标签点击进行下载
      a.click();
      // 下载后告诉浏览器不再需要保持这个文件的引用了
      URL.revokeObjectURL(url);
  });
</script>
```
也可以将字符串保存为一个文本文件。

```html
<button onclick="test()">点击</button>
<script>
    var blob = new Blob(['hello'], {type:"text/plain"});
    console.log(blob, 'blob')
    function test() {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.download = 'text'
      a.href = url
      // 模拟a标签点击进行下载
      a.click();
      // 下载后告诉浏览器不再需要保持这个文件的引用了
      URL.revokeObjectURL(url);
    }
</script>
  ```


### FileReader 对象
FileReader 对象主要用来把文件读入内存，并且读取文件中的数据。通过构造函数创建一个 FileReader 对象
```js
var reader = new FileReader();
```
该对象有以下方法：

* abort：中断读取操作。
* readAsArrayBuffer：读取文件内容到ArrayBuffer对象中。
* readAsBinaryString：将文件读取为二进制数据。
* readAsDataURL：将文件读取为data: URL格式的字符串(图片：base64)。
* readAsText：将文件读取为文本。

在常见的应用就是在客户端上传图片之后通过 readAsDataURL() 来显示图片。

FileReader实现图片预览

```html
<input type="file" id="files" accept="image/jpeg,image/jpg,image/png">
<img src="blank.gif" id="preview">
<script>
    var elem = document.getElementById('files'),
        img = document.getElementById('preview');
    elem.onchange = function () {
    	var files = elem.files,
          reader = new FileReader();
          reader.readAsDataURL(files[0]);
    	if(files && files[0]){
    	    reader.onload = function (ev) {
            //注意： 此时里面的ev.target.result是base64
            img.src = ev.target.result;
    	    }
    	}
    }
</script>
FileReader结合blob实现上传下载（没啥意义，只做练习）
```html
<input type="file" id="files" accept="image/jpeg,image/jpg,image/png">
  <img src="blank.gif" id="preview">
  <script>
      var elem = document.getElementById('files');
    elem.onchange = function () {
    	var files = elem.files,
          reader = new FileReader();
          reader.readAsDataURL(files[0]);
    	if(files && files[0]){
    	    reader.onload = function (ev) {
            //注意： 此时里面的ev.target.result是base64
            var blob = convertBase64UrlToBlob(ev.target.result)
            console.log(blob, 'blob')
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.download = '图片';
            a.href = url;
            // 模拟a标签点击进行下载
            a.click();
            // 下载后告诉浏览器不再需要保持这个文件的引用了
            URL.revokeObjectURL(url);
    	    }
    	}
    }
    //base64转blob（方法很多）
    function convertBase64UrlToBlob(base64){
      var type =base64.split(",")[0].match(/:(.*?);/)[1];//提取base64头的type如 'image/png'    
      var bytes=window.atob(base64.split(',')[1]);//去掉url的头，并转换为byte (atob:编码 btoa:解码)
      //处理异常,将ascii码小于0的转换为大于0
      //var ab = new ArrayBuffer(bytes.length);//通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
      var ia = new Uint8Array(bytes.length);
      for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
      }
      return  new Blob( [ia] , {type :type});
    }
  </script>
  ```


FileReader结合Blob实现上传文件后本地下载（没啥意义，只做练习）
```html
<input type="file" id="files">
<img src="blank.gif" id="preview">
<script>
    var elem = document.getElementById('files'),
        img = document.getElementById('preview');
    elem.onchange = function () {
      var files = elem.files, reader = new FileReader();
      reader.readAsText(files[0], 'gb2312'); // 注意这里指定 字符编码（中文）
      if(files && files[0]){
        reader.onload = function (ev) {
          console.log('111', ev)
          var blob = new Blob([ev.target.result], {type:"text/plain"});
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.download = 'canvas';
          a.href = url;
          // 模拟a标签点击进行下载
          a.click();
          // 下载后告诉浏览器不再需要保持这个文件的引用了
          URL.revokeObjectURL(url);
        }
      }
    }
</script>
```
FileReader结合Blob实现上传文件后预览（没啥意义，只做练习）
```html
<input type="file" id="files">
<img src="blank.gif" id="preview">
<script>
    var elem = document.getElementById('files'),
        img = document.getElementById('preview');
    elem.onchange = function () {
      var files = elem.files, reader = new FileReader();
      reader.readAsText(files[0], 'gb2312'); // 注意这里指定 字符编码（中文）
      if(files && files[0]){
        reader.onload = function (ev) {
          console.log('111', ev)
           $('body').append('<pre>'+ ev.target.result +'</pre>')
        }
      }
    }
</script>
```

但是在一些手机上竖着拍照上传照片时会有bug，会发现照片倒了，包括三星和iPhone。。。解决方案这里不做讲解，有兴趣可以查看： [移动端图片上传旋转、压缩的解决方案](https://github.com/lin-xin/blog/issues/18) 

#### 数据备份与恢复
FileReader 对象的 readAsText() 可以读取文件的文本，结合 Blob 对象下载文件的功能，那就可以实现将数据导出文件备份到本地，当数据要恢复时，通过 input 把备份文件上传，使用 readAsText() 读取文本，恢复数据。
代码跟上面功能类似，这里不重复，具体的应用可以参考： [notepad](https://github.com/lin-xin/notepad) 

#### Base64 编码
在 HTML5 中新增了 atob 和 btoa 方法来支持 Base64 编码。它们的命名也很简单，b to a 和 a to b，即代表着编码和解码。


::: warning 注意
一般图片（文本）base64编码是:
```js
<img src="data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5B…EoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=">
```
前面有：<font color=#ec7259>data:image/gif;base64,</font>  但是通过btoa()方法转化base64不带逗号前面这个，   所以在对接前后端时后端返回图片base64是不带 <font color=#ec7259>data:image/gif;base64,</font> 此时你要拼接上才可以放在img标签src上显示
:::



```js
var a = "https://lin-xin.github.io";
var b = btoa(a);
var c = atob(b);

console.log(a);     // https://lin-xin.github.io
console.log(b);     // aHR0cHM6Ly9saW4teGluLmdpdGh1Yi5pbw==
console.log(c);     // https://lin-xin.github.io
```

::: warning 注意
但是参数中带中文，已经超出了8位ASCII编码的字符范围，浏览器就会报错。所以需要先对中文进行 encodeURIComponent 编码处理。
```js
var a = "哈喽 世界";
var b = btoa(encodeURIComponent(a));
var c = decodeURIComponent(atob(b));
console.log(b);     // JUU1JTkzJTg4JUU1JTk2JUJEJTIwJUU0JUI4JTk2JUU3JTk1JThD
console.log(c);     // 哈喽 世界
```
:::