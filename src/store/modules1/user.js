// 专门存储用户的数据，和修改用户数据的方法

import axios from "axios";

export default {
  namespace:"user",
  state:{
      username:"",
      identity:"",
  },
  actions:{
    //  {commit,state}固定写法 这个解构的写法
      login({commit,state},data){
        axios({
            url:"/admin/account/login",
            method:"POST",
            data,
           withCredentials: true,
         }).then(res => {
           const{status,message}=res.data;
           
           if(status == 1){
             this.$message.error(message);
           }else{
            state.username = message.uname;
            state.identity=message.realname;
             this.$router.back()
           }
         })   
      }
  }
    

}