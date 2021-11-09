export { } // to make it a module

declare global { // to access the global type String
  interface Date {
    /**
     * 日期格式
     * @param  {[type]} fmt [description]
     * @return {string}     [description]
     */
    format(fmt): string

  }
}

/**
 * date string format
 * @param {[type]} fmt like yyyy-MM-dd or yyyy/mm/dd or yyyyMMdd...
 */
Date.prototype.format = function(fmt) {
  return formatDate(this, fmt)
}

function formatDate(date: Date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
