<template>
  <div class="login-form">
    <div class="login-form-header">登录</div>
    <el-form :model="formData" status-icon  label-width="60px">
      <el-form-item label="账号">
        <el-input v-model="formData.uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="formData.upwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-list">
        <el-button type="primary" @click="submitForm(formData)">提交</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        uname: "",
        upwd: ""
      }
   
    };
   
  },
  methods: {
    submitForm(formName) {

      // this.$axios({
      //    url:"/admin/account/login",
      //    method:"POST",
      //    data:this.formData,
      //   withCredentials: true,
      // }).then(res => {
      //   const{status,message}=res.data;
        
      //   if(status == 1){
      //     this.$message.error(message);
      //   }else{
      //     this.$router.back()
      //   }
      // })

      // user/是命名空间
      this.$store.dispatch("user/login",this.formData).then(res =>{
        this.$router.back();
      });
    },
    resetForm(formName) {
    
      this.formData = {
        uname: "",
        upwd: ""
      };
      
    }
  }
};
</script>
<style>
.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -120px 0 0 -250px;
}
.login-form-header{
        color:#66b1ff;
        text-align: center;
        line-height: 2;
        margin-bottom:20px;
        padding-left:50px;
    }

.button-list {
  text-align: center;
}

</style>
