<template>
  <div class="app-container">
    <grid-page
      ref="page"
      :search-func="searchFunc"
      pagination
    >
      <!--filter-->
      <div class="flex-between-center">
        <div class="flex-start-center">
          search
        </div>
        <div>
          <debounce-button>Add</debounce-button>
          <debounce-button>Delete</debounce-button>
        </div>
      </div>
      <!--export-->
      <div class="flex-end-center margin-top-20 margin-bottom-20">
        <span
          class="color-link"
        >Export</span>
      </div>
      <!--table-->
      <grid-table>
        <el-table-column
          prop="id"
          label="ID"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="color-link overflow-ellipsis"
              @click="moveToDetail(scope.row)"
            >{{ scope.row.id | emptyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="name"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span class="overflow-ellipsis">{{ (scope.row.name) | emptyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          min-width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span class="overflow-ellipsis">{{ (scope.row.description) | emptyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="application"
          label="Application"
          min-width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span class="overflow-ellipsis">{{ scope.row.application | emptyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Operate"
          min-width="140"
          align="center"
        >
          <template>
            <div>
              <debounce-button @click="openDeleteRowDialog()">Delete</debounce-button>
            </div>
          </template>
        </el-table-column>
      </grid-table>
    </grid-page>

    <delete-dialog
      :visible.sync="deleteDialogVisible"
      :list="[
        { label: 'ID', value: '1' }
      ]"
      title="Warning Message"
      description="Are you sure that you want to delete this?"
      @delete="deleteRow"
      @cancel="deleteDialogVisible = false"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      deleteDialogVisible: false
    }
  },
  methods: {
    searchFunc() {
      const list = []
      const total = 10
      for (let i = 0; i < total; i++) {
        list.push({
          id: i + 1,
          name: 'san' + i + 1,
          description: 'description',
          application: 'application'
        })
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              list,
              total
            }
          })
        }, 1000)
      })
    },
    moveToDetail(row) {
      this.$router.push({
        path: '/userManagement/ManageUserDetail',
        query: {
          id: row.id
        }
      })
    },
    openDeleteRowDialog() {
      this.deleteDialogVisible = true
    },
    deleteRow() {
      this.deleteDialogVisible = false
      console.log('delete row')
    }
  }
}
</script>

<style scoped>

</style>
