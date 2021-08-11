<template>
  <el-table
    ref="table"
    :data="tableData"
    border
    highlight-current-row
    v-bind="$attrs"
    style="width: 100%"
    @sort-change="onSortChange"
    v-on="$listeners"
  >
    <slot />
  </el-table>
</template>

<script>
export default {
  name: 'GridTable',
  inject: ['gridContentTable'],
  computed: {
    tableData() {
      if (!this.gridContentTable) {
        return []
      }
      return this.gridContentTable.searchList
    }
  },
  methods: {
    getRef() {
      return this.$refs.table
    },
    onSortChange({ prop, order }) {
      const orderParam = {
        asc: order === 'ascending',
        orderField: order !== null ? prop : ''
      }
      this.gridContentTable.search({ orderParam }, !this.gridContentTable.isSearched)
    }
  }
}
</script>
