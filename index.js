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

//返回对象类型
function isTypeof(param) {
  var type = typeof param;
  if (type != "object") {
    return type;
  }
  var str = Object.prototype.toString.call(param).toLocaleLowerCase();
  return str.slice(8, str.length - 1);
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
 * @param  {Function} fn    [cb]
 * @param  {Number}   duration [持续时间]
 * @return {Function}         [节流函数]
 */

function throttle(fn, duration) {
  /**
   * [flag 表示延迟函数是否存在]
   * @type {Boolean}
   */
  
  var flag = false; 
  var delayFn = null;
  //实质是间隔执行

  return function() { 
    var self = this;
    args = arguments;
    if (!flag) {
      flag = true;
      fn.apply(self, args);
    } else {
      return false;
    }

    delayFn = setTimeout(function(){
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
  //实质是已间隔时间判断是否在操作

  return function() { 
    var self = this;
    args = arguments;
    if (!flag) {
      flag = true;
    } else {
      clearTimeout(delayFn);
    }
    delayFn = setTimeout(function(){
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

//缓存代理构造器
//
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
    var type = isTypeof(param);
  }
  
}

//dom 元素出现在页面时触发回调 基本思想发布订阅


function ScrollController() {
  var arr = [];
  var $win = $(window);
  var viewHeight = $win.height();

  var controller = function(){

  }
  
  var proto = controller.prototype ;

  proto.init = function(){
    var self = this;

    $(window).on('scroll', function(){
        self.publish();
    });

    return self;
  };

  proto.publish = function(){

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
    arr.forEach(function(item, index){
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

  proto.remove = function(index){
    arr.splice(index, 1);
  };

  proto.add = function(str, callback, options){
    var $dom = $(str);

    if (!$dom.length) {
      console.error('no such dom');
      return ;
    }

    if (isTypeof(callback) != 'function') {
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
  
  return new controller().init(); 
}