import { Button } from 'element-ui'
import debounce from 'lodash.debounce'

export default {
  name: 'el-debounce-button',
  mixins: [Button],
  props: {
    debounce: {
      type: Number,
      default: 300
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  watch: {
    debounce() {
      this.__debounce = undefined
    }
  },
  methods: {
    handleClick(e) {
      if (!this.__debounce) {
        this.__debounce = debounce(() => {
          this.$emit('click', e)
        }, this.debounce, { trailing: true })
      }
      this.__debounce()
    }
  }
}
