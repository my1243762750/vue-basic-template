<template>
  <div class="grid-page">
    <div v-loading="loading" class="grid-page-body">
      <div v-if="showHeader" class="grid-page-header padding-bottom-20">
        <slot name="header" />
      </div>
      <slot />
    </div>
    <div v-if="pagination" class="grid-page-footer">
      <el-pagination
        class="my-pagination"
        background
        :current-page="page.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="page.pageSize"
        layout="total, prev, pager, next"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// 功能：查询列表、翻页、
export default {
  name: 'GridPage',
  provide() {
    return {
      gridContentTable: this
    }
  },
  props: {
    searchFunc: { // 查询列表 方法
      type: Function,
      default: () => void 0
    },
    showEmpty: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchList: [], // 查询结果
      page: { // 分页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      isSearched: false,
      loading: false,
      columnList: []
    }
  },
  computed: {
    showHeader() {
      return !!this.$slots.header
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search(params = {}, forbiddenSearch = false) {
      this.searchParams = Object.assign({}, this.searchParams, params)
      if (this.pagination) {
        const { pageNum, pageSize } = this.page
        this.searchParams = Object.assign({}, this.searchParams, { pageNum, pageSize })
      }
      !forbiddenSearch && this.getData()
    },
    resetSearch(params = {}) {
      this.searchParams = Object.assign({}, this.searchParams, params)
      if (this.pagination) {
        this.page.pageNum = 1
        this.page.pageSize = 10
        this.total = 0
        const { pageNum, pageSize } = this.page
        this.searchParams = Object.assign({}, this.searchParams, { pageNum, pageSize })
      }
      this.getData()
    },
    getData(isRefresh) {
      this.isSearched = true
      this.loading = true
      this.searchFunc(this.searchParams).then(result => {
        const data = result.data
        if (this.pagination) {
          const { total = 0, list = [] } = data || {}
          this.page.total = total
          this.searchList = list
          this.redirectPrev(list, total, isRefresh)
        } else {
          this.searchList = data || []
        }
        this.loading = false
        // eslint-disable-next-line no-return-assign
      }).catch(() => this.loading = false)
    },
    refresh() {
      this.getData('refresh')
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.search()
    },
    redirectPrev(list, total, isRefresh) {
      if (list.length === 0 && total > 0 && this.page.pageNum > 1) {
        this.page.pageNum = this.page.pageNum - 1
        this.search()
      } else if (!isRefresh && total === 0 && this.showEmpty) {
        this.$message.error('No matching record.')
      }
    },
    setColumnList(column = {}) {
      const isAdded = this.columnList.some(item => item.label === column.label)
      if (isAdded) {
        return
      }
      this.columnList.push(column)
    },
    getColumnVisible(label) {
      const column = this.columnList.find(item => item.label === label)
      if (!column) {
        return true
      }
      return column.visible !== false
    }
  }
}
</script>

<style scoped lang="scss">
  .my-pagination {
    text-align: right;
    margin-top: 50px;

    /*.active {
      background: #409EFF !important;
    }*/
    .el-pagination__total {
      background-color: #f4f4f5;
      padding: 0 10px;
      border-radius: 2px;
      color: #606266;
      font-weight: bold;
    }
  }
</style>
