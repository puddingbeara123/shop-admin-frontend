<template>
  <div class="container">
    <el-container>
      <el-aside width="auto">
        <!-- 3.调用组件 -->
        <div class="logo">Logo</div>
        <!-- 插入侧边栏 -->
        <app-aside :isCollapse="isCollapse" ></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 插入头部栏 -->
          <app-header @onChange="changeCollapse"></app-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入组件
import Aside from "../components/Aside";
import Header from "../components/Header"
// 原生h5标签有aside，不能直接以aside命名
export default {
  name:"admin-index",
  data(){
    return{
      isCollapse:false,
    }
  },
    // 2.注册组件
  components: {
    "app-aside": Aside,
    "app-header":Header,
  },
  methods:{
       changeCollapse(){
            this.isCollapse = !this.isCollapse;
        }
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
.el-header{
  color: #333;
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
  background-color: #495058;
  color:#fff;

}
</style>
