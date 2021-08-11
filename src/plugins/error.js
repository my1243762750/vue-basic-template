let Vue

export default {
  install(_Vue) {
    Vue = _Vue

    // 只在vue 2.2.0+ 可用
    Vue.config.errorHandler = function(err, vm, info) {
      console.log('===== Vue.config.errorHandler 全局捕获错误信息start=====')
      console.error('错误信息:', err)
      console.error('vue 实例', vm)
      console.error('错误信息', info)
      console.log('===== Vue.config.errorHandler 全局捕获错误信息end=====')
      console.log('')
    }

    window.onerror = function(message, source, line, column, error) {
      console.log('===== window.onerror 全局捕获错误信息start=====')
      console.error('message', message)
      console.error('source', source)
      console.error('line', line)
      console.error('column', column)
      console.error('error', error)
      console.log('===== window.onerror 全局捕获错误信息end=====')
      console.log('')
    }
  }
}
