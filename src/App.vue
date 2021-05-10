<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      //在登录页隐藏app-bar
      is_login:true
    }
  },
  methods:{
    foo(){
      this.is_login = false
    }
  }
};
</script>
<style lang='scss' scoped>

</style>
