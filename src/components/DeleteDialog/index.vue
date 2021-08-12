<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="close"
      :width="width"
      :append-to-body="true"
    >
      <div class="">
        <div class="font-title">
          <i class="el-icon-warning color-warning font-16" />
          <span class="margin-left-12">{{ description }}</span>
        </div>
        <div v-for="item in list" :key="item.label + item.value" class="margin-top-20">
          <span class="margin-left-27">{{ item.label }}:</span>
          <span class="margin-left-12">{{ item.value | emptyFilter }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <debounce-button @click="deleteRows">{{ deleteButtonText }}</debounce-button>
        <debounce-button @click="cancel">Cancel</debounce-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteDialogIndex',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    description: {
      type: String,
      default: 'Description'
    },
    list: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    deleteButtonText: {
      type: String,
      default: 'Delete'
    },
    width: {
      type: String,
      default: '550px'
    }
  },
  methods: {
    deleteRows() {
      this.$emit('delete')
    },
    cancel() {
      this.$emit('cancel')
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
