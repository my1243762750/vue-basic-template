function initRoleList() {
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
  return {
    list,
    total
  }
}

function getRoleDetail(id) {
  if (!id) {
    return {}
  }
  const { list } = initRoleList()
  return (list || []).find((item) => {
    return id + '' === item.id + ''
  })
}

module.exports = [
  // manage role list
  {
    url: '/vue-admin-template/userManagement/manageRole/list',
    type: 'get',
    response: config => {
      const data = initRoleList()
      return {
        code: 200,
        data
      }
    }
  },

  // manage role detail
  {
    url: '/vue-admin-template/userManagement/manageRole/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      const detail = getRoleDetail(id)
      return {
        code: 200,
        data: detail
      }
    }
  }
]
