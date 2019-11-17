export function debounce(func, delay) {
    let timer = null

    return function(...args) {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  //正则表达式 字符串匹配
  export function formatDate(date, fmt) {

    //1.获取年份
    //y+  -> 1个或者多个y
    /**
     * test
     */
    //yyyy-MM-dd
    //2019-11-27
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    //RegEXP.$1 代表全局匹配到的结果   2019


    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };

  //补零算法 例如 4小时4分4秒
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };