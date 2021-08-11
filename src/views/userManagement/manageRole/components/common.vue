<template>
  <div>
    <el-form v-model="form" :rules="rules">
      <!--role name-->
      <el-row>
        <el-col>
          <el-form-item label="Role Name" prop="name">
            <el-input v-model="form.name" :disabled="$isPageDetail(pageType)" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--description-->
      <el-row>
        <el-col>
          <el-form-item label="Description" prop="description">
            <el-input v-model="form.description" :disabled="$isPageDetail(pageType)" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--application-->
      <el-row>
        <el-col>
          <el-form-item label="Application" prop="application">
            <el-input v-model="form.application" :disabled="$isPageDetail(pageType)" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--add-->
      <el-row>
        <el-col class="text-center">
          <el-button :disabled="$isPageDetail(pageType)" @click="add">Add</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { manageRoleDetail } from '@/api/userManagement/manageRole'

export default {
  name: 'Common',
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    pageType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        description: [{ required: true, trigger: 'blur' }],
        application: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.id && this.init()
  },
  methods: {
    init() {
      manageRoleDetail({ id: this.id }, true).then((res) => {
        this.setForm(res.data || {})
      })
    },
    setForm(data) {
      const form = {}
      form.name = data.name
      form.description = data.description
      form.application = data.application
      this.form = form
    },
    getForm() {
      return {
        'name': this.form.name,
        'description': this.form.description,
        'application': this.form.application
      }
    },
    add() {
      console.log('form', this.getForm())
      this.$showFullScreenLoading()
      setTimeout(() => {
        this.$closeFullScreenLoading()
        this.$message({
          message: 'Operate successfully',
          type: 'success'
        })
        this.back()
      }, 2000)
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
