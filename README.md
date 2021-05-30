## 0.技术点



**==JavaScript==**

* ~~原型链~~
* ~~递归~~
* ~~继承 原型继承 构造函数继承 组合继承~~
* ~~深拷贝~~
* promise
* 手写ajax
* 冒~~泡和捕获~~
* ~~事件代理~~
* ~~事件循环~~
* js轮播实现
* call apply bind
* 复杂元素数组去重
* 依赖注入

**==HTML CSS==**

* 盒模型
* 浮动的原理和清除浮动
* 伪类伪元素
* flex
* 自定义变量
* 行内元素和块级元素的区别
* position有哪些值
* 

**==网络==**

* 浏览器缓存
* 简单请求和复杂请求
* 浏览器渲染过程



# 1.防抖与节流

## 防抖：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

````javascript
//监听按钮的点击事件，间隔为500ms
document.getElementById('btn').addEventListener('click',handler(foo,500));
function handler(fn,wait=200){
  let timer = null;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this,arguments)
    }, wait);
  }
}
function foo(){
  console.log(Math.random());
}
````



## 节流：指定时间间隔内只会执行一次任务

````javascript
document.getElementById('btn').addEventListener('click',handler(foo,2000));
function handler(fn,wait=500){
  let pre = Date.now()
  return function (){
    let now = Date.now()
    if(now - pre > wait){
      fn.apply(this,arguments)
      pre = Date.now()
    }
  }
}
function foo(){
  console.log(Math.random());
}


function foo(arg){
  console.log(arg);
}
//防抖函数
//三个参数：需要执行防抖处理的函数，延迟时间，传递给fn的参数
function debounce(fn,delay,...arg){
  console.log('防抖函数被执行了');
  let timer = null;
  //返回一个立即执行函数
  return (function (...arg){
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,arg)
    }, delay);
  })(arg)
}
debounce(foo,1000,'我是参数1','我是参数2')
````



# 2. set、map、weakmap

## ==Set==

### 什么是set?

Set 是 “无重复的值的数组 (Array) ”,本质还是对象

### 要点：

* Set内部判断两个值是都相等使用的算法叫做'same-value equality'，与'==='相似，主要区别是Set内部认为NaN等于自身，而严格相等运算符认为NaN不等于自身
* Set内部，两个对象总是不相等的

### 属性和方法

* size：返回实例的成员总数
* add：添加某个值，返回Set实例本身
* delete：删除某个值，返回一个布尔值
* has：判断参数是否属于实例，返回布尔值
* clear：清除所有实例成员，没有返回值

### 遍历操作

* keys()
* values()
* entries()
* forEach()

==可以直接用for...of循环遍历Set==

==数组的map和filter方法可直接用于Set,需要先转成数组==

### 利用Set实现并集、差集和交集

````javascript
let a = new Set([1,2,3])
let b = new Set([3,4,5])

// 并集
console.log(new Set([...a,...b]));
// 差集
console.log(new Set(
  [...a].filter(v=>{
    if(b.has(v)) return v
  })
));
// 交集
console.log(new Set(
  [...a].filter(v=>{
    if(b.has(v)) return v
  })
));
````

## ==Map==

Map提供一种==值-值==的数据结构，它的键不再局限于字符串，而可以是任何类型的值

==参数==：任何具有Iterator接口且成员都是一个==双元素数组==的数据结构都可以作为Map构造函数的参数

````javascript
let m = new Map([['name','zhiyi'],['age',18]])

//实际上，构造函数执行的是如下的算法
let item = [
  ['name','zhiyi'],
  ['age',18]
]
let m = new Map()

item.forEach(([key,value])=>{
  map.set(key,value)
})
````

如果对同一个键多次赋值，后面的值会覆盖前面的值

读取未定义的键，返回undefined

==Map的键实际上是和内存地址绑定的，只要内存地址不一样，就视为两个键==

### 属性和方法

* size：返回成员总数
* set：设置键值对，返回整个Map结构，可以链式调用
* get：读取key对应的键值
* has：判断，返回布尔值
* delete：返回布尔值
* clear：清除，没有返回值

### 遍历

* keys()：返回键名的遍历器
* values()：返回键值的遍历器
* entries()：返回成员的遍历器
* forEach()：遍历所有成员

## ==weakMap==

只接受对象作为键名，null除外

设计目的在于，有时我们想在某个对象上存放一些数据，但这会形成对目标元素的引用，一旦不需要这个元素，必须手动删除这个引用，否则垃圾回收机制不会释放目标元素的内存，而weakMap对元素的引用属于弱引用，垃圾回收不将该引用考虑在内

weakMap与Map在API上有两个区别：

* 没有遍历操作
* 没有size属性

因为weakMap对自身内部的键是否存在完全不可预测，因此无法遍历，也无法提供size属性



# 3.对象的浅拷贝和深拷贝

## 浅拷贝

Object.assign

使用...扩展运算符

## 深拷贝

递归

````javascript
function copy(target){
  // 判断传入的是数组还是对象，生成相应的结果
  let result = Array.isArray(target)?[]:{}
  //获取目标自身的可枚举属性名
  let keys = Object.keys(target)
  for(let key of keys){
    if(typeof obj[key] === 'object' && obj[key] !== null){
      result[key] = copy(target[key])  //递归
    }else{
      result[key] = target[key]
    }
  }
  return result
}
````

# 4.递归

````javascript
//求和1~num
function foo(num){
  if(num === 1){
    return num
  }else{
    return num + foo(num-1)
  }
}
console.log(foo(5));


````

# 5.异步，宏任务和微任务

````javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
````

# 6.手写new

````javascript
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
````

# 7.判断数组的方法

```javascript
Object.prototype.toString.call()
Array.isArray()
instanceof
constructor

let arr = [1,2,3]
Object.prototype.toString.call(arr)   //"[object Array]"
Array.isArray(arr)   //true
arr instanceof Array  //true
arr.constructor === Array  //true
```

# 8.数组



## 创建一个数组

```javascript
var arr = new Array(element0, element1, ..., elementN);
var arr = Array(element0, element1, ..., elementN);
var arr = [element0, element1, ..., elementN];
//第三种方法是首选

//Array.of()   用于将一组值转化为数组  为了弥补构造函数Array()的不足
Array.of(1,2,3)   //[1,2,3]


//Array.from()
//用于将两类对象转为数组：1.类似数组的对象   2.可遍历的对象(包括Set和Map)
//只要部署了Iterator接口的数据结构，Array.from()就可将其转为数组
```

## 关于length

````javascript
//写一个小于数组元素数量的值会缩短数组，写0会彻底清空数组
const a = [1,2,3]
a.length = 0

//使用length，可以方便地向数组尾部添加元素
let color = ['red','blue']
color[color.length] = 'yellow'  //['red','blue','yellow']
````

## join方法

```javascript
//将数组元素连接成字符串
let arr = [1,2,3]
console.log(arr.join('-'))  //1-2-3
```

## sort() 排序

==根据MDN上对`Array.sort()`的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。==

```javascript

/*
如果第一个参数要排在第二个参数前面，返回-1
第一个参数要排在第二个参数后面，返回1
相等，返回0
*/
const arr = [0,1,12,3,6,10,0,15,5]

let a = arr.sort(function (value1,value2){
  if(value1 > value2){
    return 1
  }else if(value1 < value2){
    return -1
  }else{
    return 0
  }
})
console.log(a);  //[ 0, 0, 1, 3, 5, 6, 10, 12, 15 ]
```



## push和pop  

向数组尾部==添加==和==移出==元素



## unshift和shift  

向数组头部==添加==和==移出==元素



## slice 切片



## map、filter、some、every



## find findIndex

## includes



# 9.正则表达式



## 创建

```javascript
//方法一  字面量
var re = /ab+c/;

//方法二  构造函数  可用于动态创建
var re = new RegExp("ab+c");
```

 ## 频率修饰词

```javascript
?：零次或一次
*：零次或多次
+：一次或多次
{m,n}：m至n次
```

## 通配符

```javascript
.：匹配任何字符
\d：匹配0~9
\D：匹配非数字
\s：匹配空白字符，如空格，制表符，回车符，换行符
\S：匹配非空白字符
\w：匹配单词字符，0-9，26个英文字母和下划线
\W：匹配所有非单词字符
^：匹配开头
$：匹配结尾
[ ]：
( )：分组
| : 或
```



# 10.数组题

```javascript
//合并两个数组
let a = ['A','B','C','D']
let b = ['A1','A2','B1','B2','C1','C2','D1','D2']

let temp = a.map((item)=>{
  return item + 3
})
let s = [...temp,...b].sort().map((item)=>{
  if(item.includes('3')){
    return item.split('')[0]
  }else{
    return item
  }
})
s  //['A1','A2','A','B1','B2','B','C1','C2','C','D1','D2','D']
```

```javascript
//拍平数组
let arr = [1,2,[3,4,[5,6]],[7,8,9]]

//方法一
console.log([...arr.toString().split(',')].map((item)=>{
  return Number(item)
}));


//方法二  递归
let temp = []
function foo(array){
  for(let item of array){
    if(item instanceof Array){
      foo(item)
    }else{
      temp.push(item)
    }
  }
}
foo(arr)
console.log(temp);
```

# 11.隐式类型转换

```javascript
//因为==会进行隐式类型转换 所以我们覆盖toString方法就可以了
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}
```

# 12.实现一个sleep函数

```javascript
const sleep = (time)=>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve('success')
    }, time);
  })
}
async function foo(fn){
  await sleep(3000)
  fn()
}
function a(){
  console.log('函数执行');
}
foo(a)   //3秒后打印'函数执行'
```

```javascript
function foo(){
  console.log('我是foo函数');
}
async function sleep(fn,time){
  await new Promise((resolve,reject)=>{
    setInterval(() => {
      resolve()
    }, time);
  })
  fn()
}
sleep(foo,5000)
```



# 13.数据埋点





# 14.实现 (5).add(3).minus(2) 功能     5+3-2

```javascript
Number.prototype.add = function(num){
	return this + num
}
Number.prototype.minus = function(num){
  return this - num
}
(5).add(3).minus(2)   //6
```



# 15.使用正则表达式

```javascript
//test
let str = 'abcABCab'
let reg = /ab/
let result = reg.test(str)
console.log(result);  //true

//match   字符串方法，返回能够匹配的数组或者null
let str = 'abcABCab'
let reg = /ab/g
let result = str.match(reg)
console.log(result);  //['ab','ab']

//search  返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1
let str = 'abcABCab'
let reg = /ab/g

let result = str.search(reg)
console.log(result);   //0

//replace   使用正则查找字符串，然后用第二个参数替换
let str = 'abcABCab'
let reg = /ab/g
let result = str.replace(reg,'RR')
console.log(result);  //RRcABCRR

//split  

```



# 16.数组的reduce方法

```javascript
array.reduce((pre,now,index,arr)=>{   //前一项的值，当前项，当前项索引，数组

},init)    //可选参数，初始值
```

* 计算数组的和

```javascript
let a = [1,2,3,4,5]
let result = a.reduce((pre,now)=>{
  return pre + now
})
console.log(result);   //15
```

* 数组去重

```javascript
let color = ['red','blue','yellow','red']

let result = color.reduce((pre,now)=>{
  if(!pre.includes(now)){
    pre.push(now)
  }
  return pre
},[])

console.log(result);
//[ "red", "blue", "yellow" ]
```

# 17.计算数组元素出现的次数

```javascript
let color = ['red','blue','yellow','red']

function foo(arr){
  let obj = {}
  for(let item of arr){
    if(!(item in obj)){
      obj[item] = 1
    }else{
      obj[item] = ++obj[item]
    }
  }
  return obj
}

let result = foo(color)
console.log(result);
```

# 18.获取数组最大值

```javascript
let num = [1, 4, 6, 0, 5, 34, 9, 11]

let result = num.reduce((pre, now) => {
  return pre > now ? pre : now
})

console.log(result);  //34
```

# 19.事件委托

事件流分为三个阶段： 事件捕获、到达目标、事件冒泡

大多数情况下，事件处理程序会被添加到事件流的==冒泡阶段==，因为跨浏览器兼容性好

### ==事件处理程序==

①	HTML事件处理程序

```javascript
<button id='btn' onclick="test()">按钮</button>    //点击输出123
function test(){
  console.log(123)
}
/*
写在HTML元素中，注意函数后面带小括号，可用于传递参数
缺点：HTML和JavaScript强耦合
*/
```

②	DOM0事件处理程序

```javascript
/*
将HTML与JavaScript分离
首先获取操作对象的引用，然后将函数赋值给元素的onclick等属性，作为元素的方法
因此，事件处理程序(函数)会在元素的作用域中运行，this指向元素
将元素的属性值设置为null，可以移除事件处理程序，b.onclick = null
*/
<button id='btn'>按钮</button>
let b = document.getElementById('btn')
    b.onclick = function(e){
      console.log(this);
      console.log(e);
    }
```

③	DOM2事件处理程序

```javascript
/*
添加：addEventLister(事件名，处理函数，布尔值)
移除：removeEventLister()
*/
<button id='btn'>按钮</button>
document.getElementById('btn').addEventListener('click',function(){
    console.log(123);
  })
```

事件委托：利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件

​				 在JavaScript中，页面中事件处理程序的数量与页面整体性能直接相关，首先，每个函数都是对象，都占用内存空间，对象越多，性能越差

```html
<div id='box'>
    <button id='btn1' data-num='123'>按钮1</button>
    <button id='btn2' data-num='123'>按钮2</button>
    <button id='btn3' data-num='123'>按钮3</button>
 </div>

<script>
  function foo1(){
    console.log('我是按钮1');
  }
  function foo2(){
    console.log('我是按钮2');
  }
  function foo3(){
    console.log('我是按钮3');
  }
  document.getElementById('box').addEventListener('click',function(e){
    //获取用户具体点击了哪个按钮
    let target = e.target.id
    switch (target) {
      case 'btn1':
        foo1()
        break;
      case 'btn2':
        foo2()
        break;
      case 'btn3':
        foo3()
        break;
      default:
        break;
    }
  })
</script>
```

# 20.事件循环

<img src="/Users/anzhi/Desktop/笔记/WechatIMG3.png" alt="WechatIMG3" style="zoom: 67%;" />

==浏览器为了能够使JavaScript内部的task与DOM任务有序执行，会在前一个task执行完毕后，在下一个task执行开始前，对页面进行重新渲染（render），这里说的task就是宏任务==

```javascript
task -> rander -> task -> ...
```

事件循环就是靠异步执行任务的方式来解决单线程的弊端

1.一开始，整个脚本作为一个宏任务执行

2.执行过程中，同步代码立刻执行，宏任务进入宏任务队列，微任务进入微任务队列

3.当前宏任务执行完出队，读取微任务了列表，有则依次执行

4.执行浏览UI线程的渲染工作

5.检查是否有web Worker任务，有则执行

6.执行完本轮的宏任务，回到第二步，循环

==宏任务：==

* script(整体代码)
* setTimeout  setInterval
* I/O
* UI渲染

==微任务：==

* Prmise.then
* await

# 21.async和await

```javascript
async function foo(){
    console.log('函数开始');
    await t()
    console.log('函数结束')
  }
  function t(){
    console.log('我是await后面的函数');
  }
  foo()
  console.log('脚本结束');
/*
函数开始
我是await后面的函数
脚本结束
函数结束
*/
```

await是一个让出线程的意思，紧跟await的表达式会先执行一遍，然后将await下一行的代码加入到微任务中，最后跳出整个async函数来执行后面的代码

==await后面的代码相当于Promise中的then调用，所以会加入到微任务==

# 22.原型链与继承

构造函数、原型、实例的关系

```javascript
/*
构造函数都有有个原型对象，原型有一个属性指回构造函数
实例有一个内部指针指向原型
构造函数与实例之间没有直接关系，他们通过原型连接在一起
*/
function Person(name){
  this.name = name
}
let ins = new Person('zhiyi')

console.log(Person.prototype === ins.__proto__);
console.log(Person === Person.prototype.constructor);
```

==每个函数都有prototype属性==

原型链的关键：构造函数的原型指向一个新对象或另一个构造函数

==继承==

1.原型链继承

缺点：①如果原型中包含引用值，则在所有实例中共享

​		   ②子类型在实例化时不能给父类型的构造函数传参

```javascript
function father(name,age){
  this.name = name
  this.age = age
}
function son(info){
  this.info = info
}
//继承
son.prototype = new father()
//实例化的同时无法向父类构造函数传参
let instance = new son('我是子类的信息')
```

2.盗用构造函数(经典继承)

在子类的构造函数中调用父类构造函数，这样既可以传参，又可以避免引用类型的值在所有实例中共享

缺点：必须在父类的构造函数中定义方法，才能被子类使用。并且，子类无法访问父类原型上的方法

​			子类只是在构造函数中调用了父类的构造函数，并没有将原型指向父类，所以无法访问父类原型上的方法

​			子类想继承父类的方法。就必须将方法定义在父类的构造函数中

3.组合继承

综合原型继承和经典继承的优点

```javascript
function father(name,age){
  this.name = name
  this.age = age
}
father.prototype.say = function(){
  console.log('我是父类的方法');
}
function son(name,age,info){
  father.apply(this,[name,age])  //盗用构造函数
  this.info = info
}
son.prototype = new father()  //原型继承

let ins1 = new son('zhiyi',10,'xinxi')
let ins2 = new son('qie',30,'seven')

/*
通过盗用构造函数，解决引用值的问题
通过原型链继承，解决方法必须定义在父类构造函数中的问题
*/
```



# 23.如何判断对象的类型

通过构造函数判断

```javascript
let a = /abc/
let b = [1,2,3]
let c = {name:'zhiyi'}
let d = 'seven'
let e = 123

let result = [a,b,c,d,e]

for(let item of result){
  console.log(item.constructor.name);
}
/*
RegExp
Array
Object
String
Number
*/

//缺点：如果对象不是使用的默认原型，则可能没有constructor
```

使用 Object.prototype.toString

```javascript
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

```



# 24.数组去重

利用es6中的Set

```javascript
let arr = [1,2,3,4,5,1,6,2]

let s = new Set(arr)

let result = Array.from(s)

console.log(result);
```

利用reduce方法

```javascript
let arr = [1,2,3,4,5,1,6,2]

let result = arr.reduce((pre,now)=>{
  if(!pre.includes(now)){
    pre.push(now)
  }
  return pre
},[])

console.log(result);
```

复杂元素去重

```javascript

```



# 25.浅复制和深复制

浅复制：如果源对象某个属性的值对对象，那么目标对象复制的是这个对象的引用，==源对象改变，目标对象也跟着改变==

```javascript
//方法一
let source1 = {
  name:'zhiyi',
  age:16
}

let source2 = {
  name:'seven',
  info:{
    grade:'A级'
  }
}

let target = {...source2}

//方法二
let source1 = {
  name:'zhiyi',
  age:16
}

let source2 = {
  name:'seven',
  info:{
    grade:'A级'
  }
}

let target = {}
Object.assign(target,source2)

```

深复制

```javascript
//不足：没有考虑循环引用

let source1 = [1,2,3,[4,5],6]

let source2 = {
  name:'seven',
  info:{
    grade:'A级'
  }
}

function deepClone(value){
  let temp = value instanceof Array?[]:{}
  for(let key in value){
    if(typeof value[key] == 'object'){
      temp[key] = deepClone(value[key])
    }else{
      temp[key] = value[key]
    }
  }
  return temp
}

let r = deepClone(source1)
```

# 26.call、apply、bind

核心：将函数指定为目标对象的方法

==fn.call(obj)的含义就是将fn指定为obj的方法==

```javascript
Function.prototype._call = function(context,...arg){
    if(context == null || context == undefined){
      context = window
    }
    let specialPrototype = Symbol('特殊属性')
    //将函数赋值给上下文对象
    context[specialPrototype] = this
    //调用
    let result = context[specialPrototype](...arg)
    // 删除
    delete context[specialPrototype]
    //如果函数有返回值，就返回它
    return result
  }
```

bind   返回一个闭包函数

```javascript
Function.prototype._bind = function(context,...arg){
    if(context == null || context == undefined){
      context = window
    }
    //获取调用函数
    let that = this
    // 返回闭包
    return function (){
      let specialPrototype = Symbol('特殊属性')
      //将函数赋值给上下文对象
      context[specialPrototype] = that
      //调用
      let result = context[specialPrototype](arg)
      //删除
      delete context[specialPrototype]
      return result
    }
  }
```

# 27.合并两个数组，元素交叉排列

```javascript
let arr1 = [1,2,3]
let arr2 = ['x','y','z']

function handler(arr1,arr2){
  let temp = []
  for(let i=0;i<arr1.length;i++){
    temp.push(arr1[i],arr2[i])    //重点
  }
  return temp
}

console.log(handler(arr1,arr2));
```

# 28.交替合并字符串

给你两个字符串 `word1` 和 `word2` 。请你从 `word1` 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。

```javascript
示例：
输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"
解释：字符串合并情况如下所示：
word1：  a   b   c
word2：    p   q   r
合并后：  a p b q c r
```

```javascript
function handler(word1,word2){
  let temp = []
  if(word1.length>word2.length){
    for(let i=0;i<word2.length;i++){
      temp.push(word1[i],word2[i])
    }
    temp.push(word1.slice(word2.length - word1.length,word1.length))
  }else if(word1.length<word2.length){
    for(let i = 0;i<word1.length;i++){
      temp.push(word1[i],word2[i])
    }
    temp.push(word2.slice(word1.length - word2.length,word2.length))
  }else{
    for(let i=0;i<word2.length;i++){
      temp.push(word1[i],word2[i])
    }
  }
  return temp.toString().replace(/,/g,'')
}
```

 # 29.反转字符串数组

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

```javascript
示例：
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

```javascript
var reverseString = function(s) {
    const n = s.length;
    for (let left = 0, right = n - 1; left < right; ++left, --right) {
        [s[left], s[right]] = [s[right], s[left]];
    }
};
```

# 30. a++ 和 ++a的区别

```javascript
let a = 10
let b = a++
let c = ++a

console.log(b,c);   // 10,12
```

# 31. 统计一致字符串的数目

给你一个由不同字符组成的字符串 allowed 和一个字符串数组 words 。如果一个字符串的每一个字符都在 allowed 中，就称这个字符串是 一致字符串 。

```javas
示例：
输入：allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
输出：2
解释：字符串 "aaab" 和 "baa" 都是一致字符串，因为它们只包含字符 'a' 和 'b' 。
```

```javascript
//我的答案
function handler(allowed,words){
  let counter = 0
  let allowed_arr = [...allowed]

  words.forEach(item => {
    let temp = [...item]
    let num = 0
    temp.forEach(element=>{
      if(allowed_arr.includes(element)){
        num++
      }
    })
    if(num == temp.length){
      counter++
    }
  });

  return counter
}
```

```javascript
//官方： 使用了数组的every方法
function handler(allowed,words){
  let counter = 0
  let allowed_arr = [...allowed]
  
  words.forEach(element => {
   let result =  [...element].every((item)=>{
      return allowed_arr.includes(item)
    })
    result && counter++
  });

  return counter
}
```

# 32.寻找数组的中心索引

给你一个整数数组 nums，请编写一个能够返回数组 “中心索引” 的方法。

数组 中心索引 是数组的一个索引，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引回 -1 。如果数组有多个中心索引，应该返回最靠近左边的那一个。

注意：中心索引可能出现在数组的两端。

```javascript
输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
中心索引是 3 。
左侧数之和 (1 + 7 + 3 = 11)，
右侧数之和 (5 + 6 = 11) ，二者相等。
```

```javascript
//我的答案
function handler(num){
  let result = -1
  let length = num.length
  for(let index in num){
    let front = num.slice(0,index).reduce((pre,now)=>{
      return pre+now
    },0)
    let after = num.slice(index,length).reduce((pre,now)=>{
      return pre+now
    },0) - num[index]

    if(front == after){
      result = index
      break
    }
  }
  return result
}
```

```javascript
/*
思路

记数组的全部元素之和为 total\textit{total}total，当遍历到第 iii 个元素时，设其左侧元素之和为 sum\textit{sum}sum，则其右侧元素之和为 total−numsi−sum\textit{total}-\textit{nums}_i-\textit{sum}total−numsi​−sum。左右侧元素相等即为 sum=total−numsi−sum\textit{sum}=\textit{total}-\textit{nums}_i-\textit{sum}sum=total−numsi​−sum，即 2×sum+numsi=total2\times\textit{sum}+\textit{nums}_i=\textit{total}2×sum+numsi​=total。

当中心索引左侧或右侧没有元素时，即为零个项相加，这在数学上称作「空和」（empty sum\text{empty sum}empty sum）。在程序设计中我们约定「空和是零」。
*/
var pivotIndex = function(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (2 * sum + nums[i] === total) {
            return i;
        }
        sum += nums[i];
    }
    return -1;
};

```

# 33.let和var的区别

```javascript
最重要的区别，let是块状作用域，var是函数作用域
var 存在变量提升，使用尚未声明的变量显示undefined
let 不存在变量提升，使用未声明的变量报错
与var不同，使用let在全局作用域中声明的变量不会作为window对象的属性

```

# 34.闭包练习

```javascript
function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}
 
var f1 = Foo(),
    f2 = Foo();
f1();
f1();
f2();
// 0,1,0
```

# 35.内部属性[[Class]]是什么？

```javascript
所有typeof返回值为'object'的对象都包含一个内部属性class,这个属性无法直接访问
一般通过object.prototype.toString()查看

Object.prototype.toString.call([1,2,3])
//[object Array]
```

# 36.undefined和null

```javascript
undefined和null都是基本数据类型
undefined代表未定义
null代表空对象
逻辑上讲，null代表空指针，这也是typeof null会返回object的原因
console.log(undefined == null)   //true
console.log(undefined === null)  //false
```

# 37.获取原型的方法

```javascript
o.__proto__
o.constructor.prototype
Object.getPrototypeOf(o)
```

# 38.NaN

意思是'不是数值'，用于表示本来要返回数值的操作失败了，而不是抛出错误

isNaN和Number.isNaN的区别

```javascript
Number.isNaN更好吧
它会判断传入的参数是不是数字，因此更稳定
```



# 39.类型转换

| 值           | 字符串      | 数字    | 布尔值 |
| ------------ | ----------- | ------- | ------ |
| undefined    | 'undefined' | ==NaN== | false  |
| null         | 'null'      | 0       | false  |
| true         | 'true'      | 1       |        |
| false        | 'false'     | 0       |        |
| ''  空字符串 |             | 0       | false  |
| '1.2'        |             | 1.2     | true   |
| 'seven'      |             | NaN     | true   |
| 0            | '0'         |         | false  |
| -0           | '0'         |         | false  |
| NaN          | 'NaN'       |         | false  |
| Infinity     | 'Infinity'  |         | true   |
| -Infinity    | '-Infinity' |         | true   |
| 1            | '1'         |         | true   |

# 40.阻止事件冒泡

```javascript
let btn = document.querySelector('#btn')

btn.addEventListener('click',handler)


function handler(e){
  console.log(123);
  e.stopPropagation();    //阻止冒泡
}
```

# 41.手写AJAX

```javascript
// 新建XMLHttpRequest对象
let request = new XMLHttpRequest()
// 参数
let data = new FormData()
data.append('name','qieling')
// 定义回调函数
request.onreadystatechange = function(){
  if(request.readyState == 4){
    if( request.status == 200){
      console.log('网络请求成功');
      console.log(request.response);
    }else{
      console.log(`网络请求错误：${request.response}`);
    }
  }else{
    console.log('网络请求中');
  }
}
request.open('post','http://127.0.0.1:3000/hello')
request.send(data)
```



# 42. 练习题

```javascript
1.
以下代码执行后，控制台的输出是：
var a = 10;
function a(){}
console.log(typeof a)
/*
输出number

函数提升优先级高于变量提升，所以代码等价于
function a(){}
var a；
a = 10;
console.log(typeof a)
*/
============================================================================
2.

找出数组 arr 中重复出现过的元素
输入：[1, 2, 4, 4, 3, 3, 1, 5, 3]
输出：[1, 3, 4]

方法一：
function duplicates(arr) {
  let a = arr.sort()
  let temp = []
  for(let i in a){
      let next = Number(i)+1
      if(a[i]==a[next]){
        temp.push(a[i])
      }
  }
  return Array.from(new Set(temp))   
}
先排序，然后对比自己和后面的元素是否相同，相同则加入数组，最后还需要用Set去重
因为可能重复的元素不止两个

方法二：
function duplicates(arr) {
    let result = [];
    for(var i = 0;i < arr.length; i++){
        for(var j = i+1; j < arr.length; j++){
            if(arr[i] === arr[j] && result.indexOf(arr[j]) === -1) {
                result.push(arr[j]);
                break;
            }
        }
    }
    return result;
}

============================================================================
  
  
```

# 43.!!运算符的作用

```javascript
//将右侧的值转换成布尔值
console.log(!!null)  //false
console.log(!!1)  //true
```

# 44.一元运算符

*可以使用一元运算符将字符串转换成数字*

```javascript
console.log(typeof +'1')  //Number
console.log( +'dsfg');  //NaN
```

# 45.&&和||运算符的短路应用

```javascript
&& 逻辑与 当两个值全是true时，才能返回true
|| 逻辑或 当两个值有一个是true时，就返回true

==短路==
//要理解短路的应用，只需要记住 '没必要' 三个字
  
value1 && value2
如果value1是true，则必须验证value2的值，并返回value2的值
如果value1是false,则没有必要验证value2的值，因为整个表达式已经注定是false,所以会直接返回value1的值，然后就此打住，不再验证value2

value1 || value2
如果value1是true，则没必要去验证value2的值，因为整个表达式的期望值就是true,此时已经满足条件，所以直接返回value1的值，不再去验证value2

```

# 46.Math的方法

```javascript
let num = 2.4
console.log(Math.ceil(num));  //向上 3
console.log(Math.floor(num)); //向下 2
console.log(Math.round(num)); //四舍五入 2
console.log(Math.random());   //随机生成0到1的小数

```

# 47.如何将一个字符串转化为数字

```javascript
let num = '2.4'
//使用Number()
console.log(Number(num));  //2.4
// 使用一元操作符
console.log(+num);    //2.4
//将字符串解析成一个整数
console.log(parseInt(num));    //2
//将字符串解析成一个浮点数
console.log(parseFloat(num));   //2.4
```

# 48.数组的随机排序

```javascript
//方法一 利用sort()
let arr = ['red','blue','yellow','green','black']

let result = arr.sort((v1,v2)=>{
  return 0.5 - Math.random()
})
console.log(result);
```

```javascript
//方法二 利用splice()
let arr = ['red','blue','yellow','green','black']

function randomArray(array){
  let result = []
  while(array.length>0){
    //生成一个起点
    let randomIndex = Math.floor(Math.random()*array.length)
    //从数组中取出一个元素,array的length减1
    let item = array.splice(randomIndex,1)[0]
    //推入新数组
    result.push(item)
  }
  return result
}

console.log(randomArray(arr));
```

# 49.手写instanceof方法

```javascript
/*
参数
left：左值
right：右值
*/
// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
function myInstanceof(left,right){
  //获取对象的原型
  let proto = Object.getPrototypeOf(left)
  //获取构造函数的原型
  let prototype = right.prototype
  while(true){
    //找到原型，返回true
    if(proto == prototype){
      return true
    }
    //找到原型链的最后，是null，返回false
    if(!!proto){
      return false
    }
    //继续寻找原型的原型
    proto = Object.getPrototypeOf(proto)
  }
}
```

# 50.有哪些操作造成内存泄露？

* 意外的全局变量
* 被遗忘的计时器或者回调函数
* 脱离DOM的引用
* 闭包

# 51.全局常量

在大型项目中，对于一些常用的变量，可单独建立文件，导出常量，供其他地方使用

```javascript
//common.js
const URL = 'https://www.baidu.com'
export {URL}

home.vue
import {URL} from'./common.js'
```

# 52.鼠标坐标

clientX：鼠标相对于浏览区可视区域的水平偏移量，不包括已滚动的部分

srceenX：鼠标相对于电脑屏幕的水平偏移量

pageX：鼠标相对于整个页面左上角的水平偏移量，包括被已滚动的部分

offsetX：鼠标相对于触发事件的元素的水平偏移量