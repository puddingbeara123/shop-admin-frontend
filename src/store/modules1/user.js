// 专门存储用户的数据，和修改用户数据的方法

import axios from "axios";
// nodejs开发，先暴露一个对象
export default {
    // 命名空间
  namespaced:"user", //相当于id 用dispatch来引用，告诉组件调动哪一个仓库的数据

  state:{
      username: localStorage.getItem("username")||"",
      identity: localStorage.getItem("identity")||"",
  },
  actions:{
    //  {commit,state}固定写法 这个解构的写法


      login(obj,data){
        const {commit,state}=obj;
        // 创建一个Promise对象
            // resolve和reject是两个函数
            // resolve是promise对象.then方法中的函数
            return new Promise((resolve,reject)=>{
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
                // window.history.back();
                // 把用户信息保存到本地存储
                localStorage.setItem("username",message.uname);
                localStorage.setItem("identity",message.realname);

                resolve();
               }
             })   
            }) 
       
      },
      logout({state},fn){
        // 调用退出的接口
        axios({
          url:"/admin/account/logout",
          withCredentials: true,
        }).then(res =>{
          const {status, message}= res.data;
          if(status == 0){
            state.username="";
            state.identity="";

          // 把用户信息保存到本地存储
            localStorage.removeItem("username");
            localStorage.removeItem("identity");

            fn();
          }
        })
      }
  }
    

}