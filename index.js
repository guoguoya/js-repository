
////////////////////



////////////////////




//创建随机数函数
function makeRandomNumber(baseNumber) {
  return function() {
    return  Math.floor(Math.random() * baseNumber);
  }
}

//创建范围选择
function makeRangeType(rangeRow) {
  var tot = rangeRow.reduce(function(tot, number){
    return tot + number;
  });
  var getRandomNumber = makeRandomNumber(tot);
  var range = rangeRow.reduce(function(ob, item, index){
    ob[index] = ob[index - 1] + item;
    return ob;
  }, { "-1": 0 });
  var len = rangeRow.length;
  return function() {
    var num = getRandomNumber();
    var pos = -1;
    for (var i = 0 ; i < range.length; i++) {
        if (num < range[i]) {
            pos = i;
            break;
        }
    }
    if (pos == -1) {
        console.error('wrong code');
        return ;
    }
    return pos;
  }
}

//js打开新的窗口(只有在同步的时候有效)
function openWin(url) {
  var dom = document.createElement('a');
  dom.target = "_blank"
  dom.href = url;
  document.body.appendChild(dom);
  dom.click();
}

//同上
function openlink(url) {
  var dom = document.createElement('a');
  dom.href = url;
  document.body.appendChild(dom);
  dom.click();
}

//返回变量类型
function getTypeof(param) {
  var type = typeof param;
  if (type != "object") {
    return type;
  }
  var str = Object.prototype.toString.call(param).toLocaleLowerCase();
  return str.slice(8, str.length - 1);
}

//判断变量类型是否相同

function isEqualType(a, b) {
  return getTypeof(a) === getTypeof(b) ;
}

//包装throw
function invariant(check, mes) {
  if (check) {
    throw new Error('Invariant fail: '+ mes);
  }
}

//创建单例
function singleton(fn) {
  var ob = null;  
  return function() {
      return ob || (ob = fn.apply.(this, arguments));
  }
}

/**
 * [throttle 节流构造器]
 * @param  {Function} fn       [cb]
 * @param  {Number}   duration [持续时间]
 * @return {Function}          [节流函数]
 */

function throttle(fn, duration) {
  /**
   * [flag 表示延迟函数是否存在]
   * @type {Boolean}
   */
  
  var flag = false; 
  var delayFn = null;
  //实质是间隔执行 重复操作时减少请求次数

  return function() { 
    var self = this;
    var args = arguments;

    if (!flag) {
      flag = true;
      fn.apply(self, args);
    } else {
      return false;
    }

    delayFn = setTimeout(function() {
      clearTimeout(delayFn);
      flag = false;
    }, duration || 500);
  }
}

/**
 * [debounce 防抖构造器]
 * @param  {Function} fn    [cb]
 * @param  {[Number]}   delay [间隔时间]
 * @return {[Function]}         [防抖函数]
 */

function debounce(fn, delay) {
  var flag = false; 
  var delayFn = null;
  //实质是以间隔时间判断是否在操作 重复操作时当重复操作结束后执行

  return function() { 
    var self = this;
    var args = arguments;

    if (!flag) {
      flag = true;
    } else {
      clearTimeout(delayFn);
    }

    delayFn = setTimeout(function() {
      clearTimeout(delayFn);
      fn.apply(self, args);
      flag = false;
    }, delay || 500);
  }
}

/**
 *  优化大量dom插入操作（这块在阅读jquery后改进吧）
 * 
 */

function() {


}


//防抖加节流

//缓存fn数据构造器


function proxy(fn) {
  var cache = {};

  return function() {
    var name = [].join.call(arguments, ',');  
    return cache[name] || cache[name] = fn.apply(this, arguments);
  }
}

//内部通用迭代器
var iteratorType = {
  'object': ,
  'function': ,
  'array': ,
}

function makeIterator() {
  var len = arguments.length; 
  var 
  if (len == 0) {
    return console.error('no params');
  }

  if (len == 1) {
    var param = arguments[0];
    var type = getTypeof(param);
  }
  
}

//dom 元素出现在页面时触发回调 基本思想观察者


function ScrollController() {
  var arr = [];
  var $win = $(window);
  var viewHeight = $win.height();

  var controller = function() {
    this.init();
  }
  
  var proto = controller.prototype;

  proto.init = function() {
    var self = this;

    $(window).on('scroll', function() {
        self.publish();
    });

    return self;
  };

  proto.publish = function() {

    var scrollTop = $win.scrollTop() ;
    var Items = this.getItems(scrollTop);
    Items.forEach(function(item, index){
      var cb = item.cb;
      cb.apply(item.item);
    });
  }

  proto.getItems = function(scrollTop) {
    var ret = [];
    var newArr = [];
    arr.forEach(function(item, index) {
      var delayHeight = item.options.delayHeight;
      if (item.top + item.height - delayHeight >= scrollTop && item.top + delayHeight + <= scrollTop + viewHeight) {
        ret.push(item);
      } else {
        newArr.push(item);
      }
    });

    arr = newArr ; 
    return ret ; 

  }

  proto.remove = function(index) {
    arr.splice(index, 1);
  };

  proto.add = function(str, callback, options) {
    var $dom = $(str);

    if (!$dom.length) {
      console.error('no such dom');
      return ;
    }

    if (getTypeof(callback) != 'function') {
      console.error('no callback');
      return ;
    }

    $dom.each(function(index, item){
      var $item = $(item);
      arr.push({
        item: item, 
        top: $item.offset().top,
        cb: callback,
        height: $item.height(),
        options: options
      });
    });
  };
  
  return controller(); 
}

/*普通的字符区别双字节和两个双字节 𠮷 length是读取字符的个数*/
 strLen(text) {
   let result = text.match(/[\s\S]/gu);
   return result ? result.length : 0;
}

/*返回一个函数的名称*/
let fnName = fn => fn.name ? fn.name : /^function\s([a-zA-Z0-9_]+)(\s+)\(/g.exec(fn.valueof())[1];

/**
 * 是否是纯粹的对象
 */

function isPlainObject(obj) {
  if (typeof obj != 'object' || obj == null) {
    return false;
  }

  const proto = Object.getPrototypeOf(obj);
  
  if (proto == null) {
    return true;
  }

  if (object.constructor == Object && object.constructor.prototype == Object.prototype) {
    return true;
  }

  return false; 
}

/**
 * 判断两个数值是否相等
 */


// 34.95 * 100 == 34 * 100 + 0.95 * 100

//可以实现一个高精度10进制运算

// 计算两个数的和

function sum(...rest) {
  let up = 0;
  let baseRadix = 10;
  let numObjs = [];
  let numsArrs = [];

  if (rest.length != 2) {
    throw new Error('arguments\' length must be 2.');
  }


  function wrapNum(num) {
    let newNum = {
      val: '' + num
    };

    if (newNum.val[0] == '-') {
      newNum.type = -1;
      newNum.val = newNum.val.slice(1);
    } else {
      newNum.type = 1; 
    }

    newNum.offset = newNum.val.indexOf('.');

    if (newNum.offset == -1) {
      newNum.val = newNum.val + '.';
      newNum.offset = newNum.val.length - 1;
    }

    newNum.temp = newNum.val.length - newNum.offset - 1;

    return newNum; 
  }

  if (!rest.length) {
    return ;
  }

  rest.forEach(function(item, index) {
    numObjs[index] = wrapNum(item);
  });

  let maxDecimalLen = numObjs[0].temp;

  for (let i = 0; i < numObjs.length; i++) {
    maxDecimalLen =  Math.max(maxDecimalLen, numObjs[i].temp);
  }

  for (let i = 0; i < numObjs.length; i++) {
    numsArrs.push(numObjs[i].val.replace(/([0-9]*)([\.]?)([0-9]*)/, `$1$2$3${'0'.repeat(maxDecimalLen - numObjs[i].temp )}`)
      .split('').map(function(item, index){ return item == '.' ? '.' : item * numObjs[i].type }));
  }

  let sign = 1;

  if (numsArrs[0][0] == '-' && numsArrs[1][0] == '-') {
      sign = -1;
      numsArrs[0].pop();
      numsArrs[1].pop();
  } 

  if (numsArrs[0][0] != '-' && numsArrs[1][0] != '-') {

  }
  let resultArr = [];

  while (numsArrs.length || up) {
    let tempNumsArrs = [];
    let digs = [];

    for (let i = 0; i < numsArrs.length; i++) {
      digs.push(numsArrs[i].pop() || 0);
      if (numsArrs[i].length) {
        tempNumsArrs.push(numsArrs[i]);
      }
    }

    numsArrs = tempNumsArrs;

    if (digs[0] == '.') {
      resultArr.push('.');
    } else {
      let res = 0;

      for (var i = 0; i < digs.length; i++) {
        res += parseInt(digs[i]);
      }

      resultArr.push(((res % 10) + 10) % 10);
    } 
  }

  return sign * Number(resultArr.reverse().join(''));
} 

// 功能：对象合并，深层次合并,以纯粹对象为结构，其他类型为数据元素。
    
function deepMerge(...objArray) {

  if (objArray.length < 2) {
    return;
  }

  const target = objArray[0];

  for (let i = 1; i < objArray.length; i++) {
    for (prop in objArray[i]) {
      if (objArray[i].hasOwnProperty(prop)) {
        if (isPlainObject(objArray[i][prop]) {
          if (target[prop] == undefined) {
            target[prop] = {};
          }
  
          merge(target[prop], objArray[i][prop]);

        } else {
          target[prop] = objArray[i][prop];
        }
      }
    }
  }

  return target;
}

// 数据深拷贝
// 目前只考虑 Object Array 原始类型


// test1 let a = {a:1,b:2,c:[{a:1,b:1},{a:11, b:12}]};
function deepDataCopy(obj) {
  let ret;
  let type = getTypeof(obj);
  if (obj == null) {
    return null;
  }

  if (type == 'array') {
    ret = [];

    for (let i = 0; i < obj.length; i++) {
      ret[i] = deepDataCopy(obj[i]);
    }
  } else if (type == 'object') {
    ret = {};
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {

        if (typeof obj[prop] == 'object') {
            ret[prop] = deepDataCopy(obj[prop]);
        } else {
          ret[prop] = obj[prop];
        }
      }
    }   
  } else {
    return obj;
  }

  return ret;
}

// 拓扑队列


class AsyncArray {
  
  constructor() {
    this.isRunning = false;
    this.array = [];
    this.autorun();

  }

  push(fn) {
    if (typeof fn != 'function') {
      throw new Error('the typeof param must be function');
    }

    this.array.push(this.wrapFn(fn));
    this.autorun();
  }

  wrapFn(fn) {
    return () => {
      fn(() => {
        this.isRunning = false; 
        this.autorun();
      });
    };
  }

  autorun() {
    if (this.isRunning) {
      return;
    } 

    if (this.array.length) {
      this.isRunning = true;
      this.currentFn = this.array.shift();
      this.currentFn();
    } else {
      this.isRunning = false;
    }
  }

  isEmpty() {
    return this.array.length ? false : true;
  }

  length() {
    return this.array.length;
  }
}


class hehe {
  constructor() {
    this.array = [];
  }
}

