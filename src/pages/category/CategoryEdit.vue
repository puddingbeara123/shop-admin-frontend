<template>
  <div>
    <el-col :span="16">
      <el-form ref="form" :model="form">

        <el-form-item label="排序数字">
          <el-col :span="12">
            <el-input v-model="form.sort_id"  placeholder="输入的排序值必须大于选中的类别"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-col :span="12">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类别级别">
          <el-col :span="12">
            <el-input v-model="form.class_layer"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item align="left">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //  这个只是数据初始化 这个数据在渲染的时候可以改
      form: {
        sort_id: "",
        class_layer:"",
        title:"",
        category_id: "",
     
      }
    };
  },
  methods: {
    onSubmit() {
   console.log(this.form);
      this.$axios({
         method: "POST",//重新赋值的this.form属性里面有id的值
        url:`/admin/category/edit/${this.form.id}`,
        data:this.form,
        // 处理跨域
       withCredentials: true,
      }).then(res=>{
        console.log(res)
         const {status,message}=res.data;
         if(status===0){
           this.$message({
             type:"success",
             message
           })
            this.$router.back();
         }

      })
      
    }
  },
  mounted(){
     // 请求当前分类数据
     const {id}=this.$route.params;
      //  console.log(this.$route.params)
     this.$axios({
       url:`/admin/category/getcategorymodel/${id}`
     }).then(res =>{
       const {message,status}=res.data;
      //  console.log(res)
      if(status==0){   
        this.form = message[0];   //重新给this.form赋值
      }
     })
  }
};
</script>

<style>
.statusW {
  float: left;
  width:200px;
}
</style>
