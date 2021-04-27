// 去左空格
export function lTrim(val) {
  if (isString(val)) {
    return val.replace(/^\s*/g, '')
  }
  return val
}

// 去右空格
export function rTrim(val) {
  if (isString(val)) {
    return val.replace(/\s*$/g, '')
  }
  return val
}

// 去除空格可以调用trim()

// 判断是否是string类型
export function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]'
}
