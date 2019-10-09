# Jquery总结

### 1.jQuery 中 DOMContentLoaded 的两种书写方式

```javascript
$(function() {
    // 我们的代码...(推荐使用)
});
```

```javascript
$(document).ready(function() {
    // 我们的代码...
});
```

### 2.DOM 对象和 jQuery 对象 转换

- DOM 对象转 jQuery 对象

```javascript
var oDiv = document.querySelector('div'); // DOM 对象
// DOM 对象转 jQuery 对象，用 $() 包起来
$(oDiv).css('background', 'red');
```

- jQuery 对象转 DOM 对象

```javascript
var $div = $("div"); // jQuery 对象
两种方式：
1.$div[0]   //后面加上[0]的方式，不是索引号的意思
2.$div.get(0)
```

### 3.jQuery 选择器

#### 3.1基本的选择器

```javascript
$("#box") // ID 选择器
$(".box") // class 选择器

$("div:eq(1)") // 筛选选择器
$("div").eq(1) // 和上面效果一样，推荐
```

#### 3.2筛选方法

```javascript
$("div").parent() // 注意：以下都是方法，不是一个属性，使用的时候要加括号！！

$("ul").children() // 指的是亲儿子
$("ul").children("li") // 指的是亲儿子，并且亲儿子是li

$("ul").find()     // find 指的是所有的后代

$("ul").siblings() // ul 的所有兄弟

$("ul").siblings("span") // ul 的兄弟并且是span
```

```javascript
$("ul").prevAll()     // ul 前面所有的兄弟
$("ul").prevAll("div")     // ul 前面所有的兄弟并且是 div

hasClass()    // 判断一个元素是否有某个 class，如果有返回 true
```

### 4.隐式迭代

```css
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

```javascript
$("div").css("background", "red");
```

- $("div") 指的是一个伪数组，我们设置样式的时候并没有明确的遍历这个伪数组，jQuery 内部偷偷帮我们进行了遍历，这就是隐士迭代
- 隐式迭代把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法

### 5.jQuery样式操作 

- css

```javascript
$("div").css("width"); // 获取选择到的第一个 div 的宽度，并且带单位
```

```javascript
$("div").css("width", 100); // 设置所有的 div 的宽度为100px
```

```javascript
// 给一个元素设置一组样式
$("div").css({
    width: 100,
    height: 60,
    lineHeight: "30px"
});
```

- css

```javascript
$("div").css("width"); // 获取选择到的第一个 div 的宽度，并且带单位
```

```javascript
$("div").css("width", 100); // 设置所有的 div 的宽度为100px
```

```javascript
// 给一个元素设置一组样式
$("div").css({
    width: 100,
    height: 60,
    lineHeight: "30px"
});
```

### 6.jQuery 效果

- show(时间，动画效果，回调函数) / hide() / toggle()
- slideDown() / slideUp() / slideToggle()
- fadeIn() / fadeOut() / fadeToggle() / fadeTo(时间，透明度)

### 7.animate，自定义动画

```javascript
$("div").animate({
    width: 500,
    left: 500
}, 时间，动画效果，回调函数);
```

- stop(): 一般在做动画之前要使用 stop() 来停止上次的动画，stop()加在动画的前面！

### 8.属性操作

- 元素固有属性值

```javascript
$("a").prop("href"); // 获取
$("a").prop("href", "www.baidu.com"); // 设置
```

- 元素自定义属性值

```javascript
$("a").attr("index"); // 获取
$("a").attr("index", 111); // 设置
```

- 数据缓存（刷新就没有了）

```javascript
// 适用于数据量稍微多的情况下
$('span').data('myName', 'ifer'); // 在 span 标签上缓存了数据 myName，内容是 ifer
// <div data-index="11"></div>
$('span').data('index'); // 获取自定义属性 date-index
```
 
### 9.内容操作

 - `$("div").html()`，可读可写

```javascript
$("div").html(); // 获取 div 的 innerHTML
$("div").html("<strong>hello</strong>"); // 设置 div 的 innerHTML
```

- `$("div").text()`

相当于原生 JS innerText，使用方法同上

- `$("input").val()`

用来操作表单元素的，例如 input

```javascript
$("input").val(); // 获取
$("input").val(11); // 设置
```

### 10.jQuery 遍历元素

 - `$("div").each()`

```javascript
// 设置所有 div 的背景颜色为 red
$("div").css("backgroundColor", "red");

// 可以用来对一组 div 做差异化的操作，例如设置不同的背景颜色
var arr = ["red", "blue", "green"];
$("div").each(function(i, domEle) {
    $(domEle).css("backgroundColor", arr[i]);
});
```

- `$.each`

也可以实现和上面相同的操作，但是一般我们更喜欢用来遍历数据，例如：

```javascript
var obj = {
    name: 'pink',
    age: 18
};

$.each(obj, function(attr, val) {
    console.log(attr, val);
});
```

### 11.jQuery 元素操作

- 创建元素

```javascript
// 创建一个空标签 div
$("<div>")
// 创建带内容的 div
$("<div>hello world</div>")
```

- 添加元素

```javascript
// 添加到 body 子元素的最后面
$("body").append($div);
// 添加到 body 子元素的最前面
$("body").prepend($div);

// 把 $div 添加到 ul 的前面，兄弟关系
$("ul").before($div);
// 把 $div 添加到 ul 的后面，兄弟关系
$("ul").after($div);
```

- 删除元素

```javascript
$("ul").remove(); // 删除 ul 包括里面的所有内容
$("ul").empty(); // 清空 ul 里面的内容，推荐
$("ul").html(""); // 清空 ul 里面的内容
```

### 12.jQuery 尺寸

- `$("div").width()`，获取 div 的宽度，例如 `width: 100px`，获取的就是100

```javascript
$("div").width(200); // 设置 div 的宽度为 200px
```

- `$("div").innerWidth()`，获取 div 的宽度，包括 padding

- `$("div").outerWidth()`，获取 div 的宽度，包括 padding 和 border，相当于原生 JS 的 offsetWidth

- `$("div").outerWidth(true)`，获取 div 的宽度，包括 padding 和 border 和 margin

### 13.jQuery 位置

- `$("div").offset()`，获取div到**文档**的距离，得到的是一个**对象**，和父级是否有定位无关，还可以用来设置，例如：

```javascript
$("div").offset({
    top: 100,
    left: 50
});
```

- `$("div").position()`，获取 div 到有定位的父级，相当于原生JS的 offsetTop，注意不能用来设置

```javascript
// 获取div到有定位父级的left值
console.log($("div").position().left);
```

- `$(document).scrollTop()`，文档被卷去的高度，也是可以设置的，例如:

```javascript
$(document).scrollTop(0);
```

### 14.绑定事件 

```javascript
// 之前给同一个元素绑定多个事件
$("btn").click(function() {
    // 事件处理程序
});
$("btn").mouseover(function() {
    // 事件处理程序
});
```

```javascript
// 使用 on 优化上面的操作，绑定多个事件做不同的操作
$("btn").on({
    click: function() {
        // 操作1
    },
    mouseover: function() {
        // 操作2
    }
});
```

```javascript
// 给同一个元素绑定多个事件做相同的操作
$("btn").on("click mouseover", function() {
    // this => btn
});
```

```javascript
// 事件委托的写法
$("ul").on("click", "li", function() {
    // 操作
    // this => li
});
```

### 15.事件解绑 off()

```javascript
// 解绑了 div 上的所有事件
$("div").off();
// 解绑了 div 上的 click 事件
$("div").off("click");
// 解绑事件委托形式的
$("ul").off("click", "li");
```

### 16.事件只触发一次 one()

```javascript
// btn 只会触发一次点击
$("btn").one("click", function() {})
```

### 17.自动触发事件

```javascript
// 主动触发事件的第一种方式
$(".btn").click();
$(".btn").mouseover();
```

```javascript
$(".btn").trigger("click");
```

```javascript
// 和 trigger 的差异是：triggerHandler 不会触发默认行为，例如光标闪动
$(".btn").triggerHandler('click')
```

### 18.插件 

- 全屏滚动插件使用http://www.dowebok.com/demo/2014/77/
- 瀑布流插件（waterfall），jQuery 之家，jQuery 插件库，推荐 Github 搜索，https://github.com/duitang/waterfall
- 懒加载插件使用，lazyload，https://github.com/tuupola/lazyload
