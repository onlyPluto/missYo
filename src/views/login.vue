<template>
  <div class="login d-flex justify-center align-center">
    <v-sheet
      class="bar d-flex justify-end align-center"
      height="45"
      color="#0808084d"
    >
      <div>
        <img src="@/assets/img/github.png" />
        <img src="@/assets/img/weixin.png" />
        <img src="@/assets/img/find.png" />
      </div>
    </v-sheet>
    <v-card
      class="box d-flex flex-column justify-center align-center"
      height="600"
      width="500"
      color="#00000060"
    >
      <img class='mt-n14 mb-10' src="@/assets/img/name4.png" />
      <div class='d-flex flex-column align-center'>
        <v-text-field
        placeholder="请输入用户名"
        color="orange darken-1"
        full-width
        dense
        v-model='username'
      ></v-text-field>
      <v-text-field
        placeholder="请输入密码"
        type="password"
        color="orange darken-1"
        full-width
        dense
        v-model='password'
      ></v-text-field>
      <v-btn @click='login' width=150 rounded color="orange darken-1">登录</v-btn>
      </div>
      <div class="bottom d-flex justify-space-around align-center">
        <a href="">注册</a>
        <a href="">忘记密码</a>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username:'',
      password:'',
    };
  },
  mounted() {
    
  },
  methods: {
    login(){
      this.$router.push('/home')
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/bg1.jpg");
  background-size: cover;
}
.bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  div {
    display: flex;
    align-items: center;
    img {
      margin: 0px 15px;
      height: 28px;
      width: 28px;
    }
  }
}
.box {
  position: relative;
  div{
    width: 75%;
    margin:20px 0px;
  }
  img {
    width: 450px;
  }
  .bottom{
    position: absolute;
    bottom:0;
    width:inherit;
    height:50px;
  }
}
</style>
