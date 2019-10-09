# JS基础总结

### 1.var变量声明输出的结果

```javascript
var a = 10;
console.log(a); //10
var  b ;
console.log(b); //undefined
c = 20;
console.log(c); //20
console.log(d); // d is not defined 报错
```

### 2.数据类型

#### 2.1基本数据类型

```javascript
var num = 10; //number
console.log(typeof (num));

var str = '123'; //string
console.log(typeof (str));

var flag = true; //Boolean
console.log(typeof (flag));

var undefined = undefined; //undefined未定义类型
console.log(typeof (underfined));

var obj1 = null; //null 空 
console.log(typeof (obj1)); //null是一个bug，类型输出为object
console.log(Object.prototype.toString.call(null));//原型检测时，输出[object null]
```

#### 2.2 复杂数据类型

```javascript
var obj = {};  //对象类型 默认值为null
console.log(typeof (obj)); //object
```

#### 2.3数据类型的转换

   ①转换成字符串类型：

```javascript
var num = 123.45;
console.log(num.toString());  //123.45字符型
console.log(String(num)); //undefined,null等特殊值需要用String
```

   ②转换成数值类型：

```javascript
var str = '123.45px'
console.log(parseInt(str));  //123
console.log(parseFloat(str));  //123.45
console.log(Number(str));  //NaN
```

   ③转换成布尔类型:

```javascript
console.log(Boolean(0)); //false
//转换为false的五种情况：0 '' null undefined NaN ，false的输出值也为false
// 其他的值都转换为true：非0和非空;
```

   ④隐式转换：

```javascript
任意类型加（+）字符串 会转换为字符串；
任意类型' - * /  '会转换为数值
```

   ⑤特殊情况：

```javascript
//NaN 不是一个数字
//isNaN()  不是数字 
console.log(isNaN("wo"));  //true
```

   ⑥字符串拼接：

```javascript
var a = "10";
var b = "20";
var c = a + b; 
console.log(c); //"1020"
```

### 3.条件判断

#### 3.1单向判断

```javascript
if (条件满足) {
    //执行语句
}
```

#### 3.2双向判断

```javascript
if (条件满足) {
    //执行语句
} else {
    //条件不满足执行
}
```

#### 3.3三元运算符

```javascript
条件 ? 条件满足返回 : 条件不满足返回(双向判断的简写)
```

#### 3.4多向判断

```javascript
if (条件1满足) {
    //执行语句1
} else if (条件2满足) {
    //执行语句2
} else if (条件3满足) {
    //执行语句3
} else {
    //以上都不满足,执行这里
}
```

#### 3.5精准判断

```javascript
switch(条件){
	case 条件1:
		 语句1;
		 break;
	case 条件2:
		 语句2;
		 break;
		 .....
	default:
		最后的语句;
		break;
}
```

#### 3.6总结

```javascript
1.if和switch的区别?
	if适合用于确定范围的判断
	switch适合用于确定的具体值判断
2.switch的注意点
	switch的条件比较是全等(===)
	break可以省略,但是会穿透执行.
```

### 4.循环  

```javascript
   必须有三个条件: 开始条件,条件范围,条件增量
```

#### 4.1 for循环

```javascript
var sum = 0;
for (var i = 0;i < 10;i++){
    sum += i; 
}
console.log(sum);  //45
```

#### 4.2 while循环

```javascript
var sum = 0;
var i = 0;
while (i < 10) {
    sum += i;
    i++;
}
console.log(sum);  //45
```

#### 4.3 do while循环

```javascript
var sum = 0;
var i = 1;
do {
    sum += i;
    i++
} while (i < 10);
console.log(sum);  //45
```

#### 4.4 总结

```javascript
1.三种循环之间的区别?
for适用于循环次数确定的情况,while和do-while适用于循环次数未知的情况
while是先判断,再执行, do-while是先执行一次,再判断

2.continue 和 break
continue:跳过当前循环 继续下次循环
break:跳出整个循环 直接结束整个循环体
```

### 5.数组

#### 概念

```javascript
var arr = [];  //数组可以存多个值,建议存同类型的值,但是可以存任意类型的值
```

```javascript
var arr = [1,2,3,4,5];
console.log(arr.length);  //输出数组长度5
console.log(arr[0]);    //数组的下标(索引) ：0开始;输出数组第一个元素1；
arr[0]=10;      //表示将数组中的第一个元素修改或者赋值为0
console.log(arr);  //[10, 2, 3, 4, 5]
```

#### 二维数组

```javascript
定义：
var arr = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5]
];
遍历：
var abc = [];
for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
        abc[abc.length] = arr[i][j];
    }
}
console.log(abc);
```

### 6.函数

```javascript
作用: 封装功能,可以复用

语法: 定义 + 调用

定义: 
function 函数名(参数1,参数2...){
	//执行语句
	return 结果;
}

调用:
函数名(值);  //可以将函数的返回值存到变量中使用 
function fn(a=10,b=20){//形参默认值}
fn(20，20);


命名函数：
function fn () { };
fn();  //在上下调用的可以

匿名函数：
var 变量名 = function () { };
变量名();  //必须在函数体下面调用！
```

```javascript
形参: 函数定义的时候的参数,本质上是一个局部变量；形参有默认值，同时实参也有默认值，会以实际参数的值为准

实参: 函数调用的时候的参数,需要传入一个具体的值；如果实参没有值，形参有值，会以形参是指为准。

内置实参对象: arguments  使用中括号数组的方式获取实参;所有实参的集合
```

### 7.对象

#### 7.1 概念

```javascript
对象: 就是将现实事物抽象为功能代码.  将现实世界的东西,用对象的语法格式来表示
对象的语法:  对象中有 属性和 方法；万物皆对象
```

#### 7.2 创建对象的三种方式

```javascript
1.字面量：
var obj = {
    name = 'xxxx';
    sex = 'xx';
}
//有两种调用方式
console.log(obj.name,obj.sex);
console.log(obj['name'],obj['sex'])
```

```javascript

2.new Object ():
var obj = new Object();
obj.name = 'xxxx';
obj.sex = 'xx';
obj.smile = function (){
    console.log('xxx');
}
//调用方式
console.log(obj.name,obj.sex);
console.log(obj['name'],obj['sex'])
console.log(obj.smile());
```

```javascript
3.构造函数：
function Person(name,age){
this.name= name;
this.age=age; //this 谁调用谁 this就指向谁
this.sayHi=function(){}
};
//调用方式
var smile = new Person ('开心',3);
console.log(smile.name)


function person() {
this.name = "smile";
this.age = 3; // this 在函数的内部谁调用谁，this就指向谁
console.log(typeof (this));
}
var p1 = new person();
console.log(p1.name);
console.log(p1.age); 
```

#### 7.3 对象的遍历 for-in

```javascript
for(var key in Obj){
console.log(key);  //key是属性名
console.log(Obj[key]);  //Obj[key]是属性值
}
```

### 8.内置对象

#### 8.1 Math对象
```javascript
Math.PI     //圆周率  
Math.floor()    //向下取整
Math.ceil()     //向上取整
Math.round()     //四舍五入就近取整（负0.5取值为1）!
Math.abs()     //绝对值
Math.max()、Math.min()     //求最大值、最小值
Math.random()       //获取范围在[0,1）内的随机数
```

```javascript
任意区间随机数公式:
Math.floor(Math.random() * (max - min + 1) + min);
```

#### 8.2 Date()对象

```javascript
 var date = new Date();   //获取当前时间
```

```javascript
日期的代码：
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
var w = date.getDay();
var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
console.log('今天是：' + y + '年' + m + '月' + d + '日 ' + arr[w]);
```

```javascript
时间的代码：
function time() {
    var hou = date.getHours();
    hou = hou < 10 ? '0' + hou : hou;
    var min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = date.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;
    return hou + ':' + min + ':' + sec;
}
console.log(time());
```

```javascript
//倒计时的代码：
function countDown(time) {
    var nowTime = +new Date();
    var inputTime = +new Date(time);
    var times = (inputTime - nowTime) / 1000;
    var d = parseInt(times / 60 / 60 / 24); // 天
    d = d < 10 ? '0' + d : d;
    var h = parseInt(times / 60 / 60 % 24); //时
    h = h < 10 ? '0' + h : h;
    var m = parseInt(times / 60 % 60); // 分
    m = m < 10 ? '0' + m : m;
    var s = parseInt(times % 60); // 当前的秒
    s = s < 10 ? '0' + s : s;
    return d + '天' + h + '时' + m + '分' + s + '秒';
}
console.log(countDown('2019-8-31 17:00:00'));  //写上截止时间
```

#### 8.3 字符串对象

```javascript
1.indexOf(要查找的字符,开始位置)  开始位置不写默认从0开始，找不到返回-1  ----查找字符
2.charAt(字符位置)      给一个位置，返回该位置的字符                   ----获取字符
3.subStr(开始位置，截取个数)  返回截取的字符串结果                     ----截取字符
4.replace(要替换的字符,替换的新字符)                                  ----替换字符
5.join(连接符)  将数组通过连接符连接，返回字符串                       ----连接字符
6.split(连接符) 将字符根据连接符分割成多个值的数组,返回数组             ----分割字符
7.toUpperCase()  将字符串转换为大写                                  ----转换成大写
8.toLowerCase()  将字符串转换为小写                                  ----转换成小写
```

#### 8.4 数组对象

```javascript
0.检测是否为数组
var a = [1,2,3,4,5];
console.log(a instanceof Array);  //instanceof 运算符
console.log(Array.isArray(a));    //Array.isArray();
```

```javascript
1.push()  后面添加元素                      
2.pop()   后面删除元素                   

3.unshift() 前面添加元素
4.shift()   前面删除元素
  
5.reverse()  翻转数组
6.sort()     排序数组

arr.sort(function(a,b){
return a-b;  //升序
})

arr.sort(function(a,b){
return b-a;  //降序
});

7.concat()  合并数组
var arr3 = arr1.concat(arr2);
```

```javascript
8.splice  删除/修改/添加数组
arr.splice(开始位置);   //从开始位置删除到最后
arr.splice(开始位置,删除个数); //从开始位置删除几个

//新增内容
arr.splice(开始位置,0,新增元素); 
arr.splice(1,0,'a','b');  //在索引1元素之前插入a和b

//替换内容
arr.splice(开始位置,删除个数,新增元素);
arr.splice(1,1,'d'); //在索引为1开始删除一个元素，替换为d
```

```javascript
9.indexOf()  查找数组中的元素位置
arr.indexOf(元素);  //返回元素的索引位置,如果没有返回-1
arr.indexOf(元素,开始位置); //从开始位置继续向后找.
arr.lastIndexOf(元素)  //返回元素索引位置，如果没有返回-1，从后往前找
```

```javascript
10.tostring() 转换为字符串
eg:数组转换为字符串
arr.toString(); 将数组中的每个元素用逗号链接成字符串
```

```javascript
11.join() 数组拼接分隔符                
arr.join(); //默认以逗号连接数组，拼接成字符串
arr.join(分隔符); //以分隔符连接数组元素，拼接成字符串
```

### 9.其他问题

#### 9.1 变量的命名规范

```javascript
1.字母,数字,下划线,$等组合,
2.数字不能开头
3.不能是关键字
4.不能是中文
5.建议使用驼峰命名
```

#### 9.2 输出打印 

```javascript
alert()  弹出
prompt(); 输入框
console.log()  打印
console.dir()  详细打印
document.write();  输出
```

#### 9.3 转义字符
```javascript
\n   换行
\t   空格 tab制表符 
```

#### 9.4 预解析

```javascript
变量声明和函数声明提前
```

#### 9.5 JS作用域

```javascript
作用域和作用域链：
全局作用域：作用域所有代码执行的环境（整个script内部，或一个独立的JS文件）
局部作用域：作用域函数内的代码环境，也称函数作用域
作用域链：内部函数访问外部函数的变量，采取的是链式查找的方式来决定取哪个值，这种结构我们称之为作用域链，遵循就近原则
```

#### 9.6 局部变量和全局变量(都是针对函数而言)

```javascript
JS中没有局部作用域，但是ES6中有！
全局变量： 
1.在括号外面直接写的变量,在任何位置都可以使用
2.在函数内部，未使用var声明但直接赋值的变量
局部变量：
1.形参就是局部变量
2.函数内部的变量就是局部变量
```

#### 9.7 this和new的理解

```javascript
this的指向问题：
	1.函数在定义this的时候是不确定的,只有在调用的时候才可以确定
    2.一般函数直接执行,内部this指向全局window
    3.this的指向,谁调用指向谁
    4.构造函数中的this   对象的实例
new在执行时会做四件事情
    1.new会在内存中创建一个新的空对象
    2.new会让this指向这个新的对象
    3.执行构造函数里面的代码,目的是给这个新对象加属性和方法
    4.new会返回这个新对象,所以构造函数里面不需要return
```

#### 9.8 运算符和优先级

```javascript
1.()
2.++  --  !
3.先* / % 后+ - 
4.< > <= >= == != === !==
5.先&& 后||
6.赋值运算符

注意：
等于和不等于  ==  ===  !=  !==
++a 和 a++
&&  并且
||  或者
！  取反
```

