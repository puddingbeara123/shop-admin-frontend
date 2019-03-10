<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>{{username}} {{identity}}</div>
    <a href="javascript:void(0)" @click="handleLogout">退出</a>
  </el-row>
</template>

<script>

import {mapState} from "vuex";

export default {
   computed:{
      ...mapState("user",{
        // 下面两种写法都可以获取store的值
         username: "username",
          identity: state => state.identity
      })
   },
methods:{
  
    handleToggle:function(){
        this.$emit("onChange");
    },
    handleLogout:function(){
      this.$store.dispatch("user/logout",()=>{
        this.$router.push("/login")
     
      })
    }
}
};
</script>

<style scoped>
.header{
    height:60px;
  
}
 .el-icon-back{
        cursor: pointer;
    }
</style>
