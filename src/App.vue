<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template> 

<script>
export default {
  name: "app",
 mounted(){
   this.$axios({
     url:"/admin/account/islogin",
     withCredentials: true, //一定要加跨域，这样后台才能记住已经登陆的信息
   }).then(res=>{
    console.log(res);
     if(res.data.code==="nologin"){
     this.$router.push("/login");
     }
   })
 }
};
</script>

<style>
*{
  margin:0;
  padding:0;
}
.mt20{
  margin-top:20px;
}
</style>
