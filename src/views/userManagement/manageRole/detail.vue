<template>
  <div class="app-container">
    <Common :id="$route.query.id" :page-type="$route.query.pageType" />
  </div>
</template>

<script>
import Common from './components/common'
export default {
  name: 'Detail',
  components: {
    Common
  }
}
</script>

<style scoped>

</style>
