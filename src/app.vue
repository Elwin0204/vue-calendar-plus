<template>
  <div id="app">
    <vue-calendar-plus
      :firstDayOfWeek="7"
      mode="multiple"
      placeholder="请输入月" />
  </div>
</template>
<script>
  import VueCalendarPlus from './calendar'
  export default {
    name: 'App',
    components: {
      VueCalendarPlus
    }
  }
</script>
<style lang="less" scoped>
#app {
  .app {
    color: red;
  }
}
</style>