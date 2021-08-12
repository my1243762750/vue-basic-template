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
          <debounce-button @click="moveToDetail({}, $dic.pageType.add.value)">Add</debounce-button>
          <debounce-button @click="deleteRows">Delete</debounce-button>
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
              @click="moveToDetail(scope.row, $dic.pageType.detail.value)"
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
import { manageRoleList } from '@/api/userManagement/manageRole'

export default {
  name: 'Index',
  data() {
    return {
      searchFunc: (e) => manageRoleList(e),
      deleteDialogVisible: false
    }
  },
  methods: {
    moveToDetail(row = {}, pageType) {
      this.$router.push({
        path: '/userManagement/manageRoleDetail',
        query: {
          id: row.id,
          pageType
        }
      })
    },
    openDeleteRowDialog() {
      this.deleteDialogVisible = true
    },
    deleteRow() {
      this.deleteDialogVisible = false
      console.log('delete row')
    },
    deleteRows() {
      console.log('deleteRows')
    }
  }
}
</script>

<style scoped>

</style>
