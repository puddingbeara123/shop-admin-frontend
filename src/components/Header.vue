<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>Admin</div>
  </el-row>
</template>

<script>
export default {
methods:{
    handleToggle:function(){
        this.$emit("onChange");
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
