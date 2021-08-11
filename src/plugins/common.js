import { timeout } from '@/utils/time'
import { dic } from '@/utils/dic'
import { getDateTime, emptyHandle } from '@/utils'
import GridPage from '@/components/GridPage/GridPage'
import GridTable from '@/components/GridPage/GridTable'
import DebounceButton from '@/components/DebounceButton/debounce'
import DeleteDialog from '@/components/DeleteDialog'

let Vue

export default {
  install(_Vue) {
    Vue = _Vue

    // 全局属性
    // dic
    Vue.prototype.$dic = dic
    Vue.prototype.$isPageAdd = function(val) {
      return val === dic.pageType.add.value
    }
    Vue.prototype.$isPageDetail = function(val) {
      return val === dic.pageType.detail.value
    }
    // loading
    Vue.prototype.$showFullScreenLoading = function(_timeout) {
      _timeout = _timeout || timeout
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.fullscreenLoading = loading
      setTimeout(() => {
        loading.close()
      }, _timeout)
    }
    Vue.prototype.$closeFullScreenLoading = function() {
      this.fullscreenLoading.close()
    }
    Vue.prototype.$copy = function(data) {
      const url = data
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      // 选择对象;
      oInput.select()
      // 执行浏览器复制命令
      document.execCommand('Copy')
      this.$message({
        message: '已成功复制到剪切板',
        type: 'success'
      })
      oInput.remove()
    }
    // 全局时间格式化
    Vue.prototype.$dateTimeFormat = 'dd/MM/yyyy HH:mm:ss'
    Vue.prototype.$dateTimeValueFormat = 'yyyy/MM/dd HH:mm:ss'
    Vue.prototype.$dateFormat = 'dd/MM/yyyy'

    // 全局filter
    // 金额校验
    Vue.filter('priceFilter', function(num) {
      if (num === undefined || num === null || num === '') return '--'
      num = num.toString().replace(/\$|\,/g, '')
      if (isNaN(num)) {
        num = '0'
      }
      const signs = num >= 0 ? '' : '-'
      num = Math.abs(num)
      num = Math.floor(num * 100 + 0.50000000001)
      let cents = num % 100
      num = Math.floor(num / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
          num.substring(num.length - (4 * i + 3))
      }
      return signs + num + '.' + cents
    })
    // 空值处理
    Vue.filter('emptyFilter', function(value, symbol = '--') {
      return emptyHandle(value, symbol)
    })
    // 时间处理
    Vue.filter('dateFilter', function(time, delimiterDate = '/') {
      const dateTime = getDateTime(time)
      if (!dateTime) {
        return emptyHandle(dateTime)
      }
      const { year, month, day } = dateTime
      return day + delimiterDate + month + delimiterDate + year
    })
    Vue.filter('timeFilter', function(time, delimiterDate = '/', delimiterTime = ':') {
      const dateTime = getDateTime(time)
      if (!dateTime) {
        return emptyHandle(dateTime)
      }
      const { hour, minute, second } = dateTime
      return hour + delimiterTime + minute + delimiterTime + second
    })
    Vue.filter('dateTimeFilter', function(time, delimiterDate = '/', delimiterTime = ':') {
      const dateTime = getDateTime(time)
      if (!dateTime) {
        return emptyHandle(dateTime)
      }
      const { year, month, day, hour, minute, second } = dateTime
      return day + delimiterDate + month + delimiterDate + year + ' ' + hour + delimiterTime + minute + delimiterTime + second
    })

    // 组件
    Vue.component('GridPage', GridPage)
    Vue.component('GridTable', GridTable)
    Vue.component('DebounceButton', DebounceButton)
    Vue.component('DeleteDialog', DeleteDialog)

    // 防抖事件指令
    Vue.directive('debounce', {
      bind: function(el, binding) {
        const timeout = binding.arg || 500
        let timer
        el.addEventListener('click', () => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            // 关键点：vue的自定义指令传递的参数binding如果是一个函数，则通过binding.value()来执行
            binding.value()
          }, timeout)
        })
      }
    })
    // 权限指令
    Vue.directive('permission', {
      inserted(el, binding, vnode, oldVnode) {
        const { value } = binding
        const { tabAndButtonPermissions } = vnode.context.$store.state.user || []
        const flag = tabAndButtonPermissions.find((item) => {
          return item.uri === value
        })
        !flag && el.parentNode.removeChild(el)
      }
    })
  }
}
