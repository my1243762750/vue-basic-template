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

    // global property
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
    // time format string
    Vue.prototype.$dateTimeFormat = 'dd/MM/yyyy HH:mm:ss'
    Vue.prototype.$dateTimeValueFormat = 'yyyy/MM/dd HH:mm:ss'
    Vue.prototype.$dateFormat = 'dd/MM/yyyy'

    // filter
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
    Vue.filter('emptyFilter', function(value, symbol = '--') {
      return emptyHandle(value, symbol)
    })
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

    // component
    Vue.component('GridPage', GridPage)
    Vue.component('GridTable', GridTable)
    Vue.component('DebounceButton', DebounceButton)
    Vue.component('DeleteDialog', DeleteDialog)

    // directive
    // todo
  }
}
