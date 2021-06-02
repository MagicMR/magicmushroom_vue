<template>
  <v-container>
    <br>
    <br>
    <br>
    <v-alert
        border="top"
        colored-border
        type="error"
        elevation="2"
    >
      <br>
      <div class="text-h3">
        该模块暂未开启！！！
      </div>
      <br>
    </v-alert>
    <div  class="d-flex justify-center mb-6 py-16">
        <v-btn
            text
            class="text-h6"
            color="primary"
            @click="$router.push('/home')"
        >返回首页</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
name: "Unopened"
}
</script>

<style scoped>

</style>