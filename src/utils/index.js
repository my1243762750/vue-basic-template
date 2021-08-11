/**
 * Created by MeiYang on 2021/08/10.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param time
 * @returns {null|{month: (*|number), hour: any, year: number, day: any, minute: any, second: any}}
 */
export function getDateTime(time) {
  if (!time) {
    return null
  }
  time = new Date(handlerUTCorGMT(time))
  const year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  }
}

/**
 * 时间处理
 * @param dateTime
 * @returns {string|*}
 */
export function handlerUTCorGMT(dateTime) {
  if (dateTime && dateTime.indexOf('T') > -1) {
    const strDateTimeArr = dateTime.split('T')
    const strDate = strDateTimeArr[0]
    let strTime = strDateTimeArr[1]
    if (strTime && strTime.indexOf('.') > 0) {
      strTime = strTime.split('.')[0]
    } else if (strTime && strTime.indexOf('Z') > 0) {
      strTime = strTime.split('Z')[0]
    }
    return (strDate + ' ' + strTime).replace(/-/g, '/')
  }
  return dateTime.replace(/-/g, '/')
}

/**
 * 参数转大写
 * @param response
 * @returns {{}}
 */
export function toLowerCaseResponseHeader(response) {
  const result = {}
  for (const key in response) {
    result[key.toLowerCase()] = response[key]
  }
  return result
}

/**
 * 文件下载
 * @param res
 */
export function download(res) {
  const getName = (str) => {
    const defaultName = 'file'
    if (!str) {
      return defaultName
    }
    const strList = str.split(';')
    const fileNameStr = strList.filter((item) => {
      return item.toLowerCase().indexOf('filename') > -1
    })
    const fileNameList = fileNameStr[0].split('=') || []
    let fileName = fileNameList[1]
    if (fileName) {
      fileName = fileName.replace(/"/g, '')
    }
    return fileName || defaultName
  }
  let headers = res.headers || {}
  headers = toLowerCaseResponseHeader(headers)
  // 获取响应头主要获取附件名称
  const contentDisposition = headers['content-disposition']
  // 获取类型类型和编码
  const contentType = headers['content-type']
  // 构造blob对象,具体看头部提供的链接地址
  const blob = new Blob([res.data], {
    type: contentType
  })
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, getName(contentDisposition))
  } else {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = getName(contentDisposition)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

/**
 * 空值处理
 * @param value
 * @param symbol
 * @returns {*|string}
 */
export function emptyHandle(value, symbol = '--') {
  if (value === 0) {
    return value
  }
  return value || symbol
}
