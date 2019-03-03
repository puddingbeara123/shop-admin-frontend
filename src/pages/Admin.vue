<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <!-- 3.调用组件 -->
        <div class="logo">Logo</div>
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入组件
import Aside from "../components/Aside";
// 原生h5标签有aside，不能直接以aside命名
export default {
  name:"admin-index",
    // 2.注册组件
  components: {
    "app-aside": Aside
  }
};
</script>

<style>
.container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  display:flex;
  flex-direction:column;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logo{
  height:60px;
  line-height: 60px;
  background-color: #495058;
  color:#fff;
  text-align: center;
  font-size:20px;
}
</style>
