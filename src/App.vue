<template>
  <div id="app">
    <div class="title">
      <span>登录</span>
    </div>

    <div class="usename">
      <span class="user">账号</span>
      <el-input class="pass" v-model="input1" type="text" placeholder="请输入账户"></el-input>
    </div>

    <div class="password">
      <span class="psd">密码</span>
      <el-input class="pass" v-model="input2" type="password" placeholder="请输入密码"></el-input>
    </div>

    <div class="buttons">
      <el-row>
        <el-button type="primary" plain @click="submit">提交</el-button>
        <el-button type="primary" plain @click="reset">重置</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      input1: "",
      input2: ""
    };
  },
  methods: {
    submit: function() {
      var usename = this.input1;
      var password = this.input2;
      var userdetail = { usename, password };
      console.log(userdetail);
    },
    reset: function() {
      this.input1 = "";
      this.input2 = "";
    }
  }

  // mounted(){
  //   this.$axios.get("https://api.github.com/users").then(res=>{
  //     console.log(res.data);
  //   })
  // }
};
</script>

<style>
#app {
  margin: 100px auto;
  width: 500px;
}
.title {
  text-align: center;
  color: #409eff;
  margin: 0 auto;
  width: 100%;
  line-height: 50px;
  font-size: 20px;
}
.usename {
  display: flex;
  width:100%;
}
.password {
  padding-top: 20px;
  display: flex;

}
.user,.psd{
    display:flex;
    width:60px;
    justify-content: center;
    align-items:center;
}

.buttons {
  width: 100%;
  text-align: center;
  margin: 20px auto;
}
</style>
