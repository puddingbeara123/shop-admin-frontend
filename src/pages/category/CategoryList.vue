<template>
  <div class="category">
     <div class="form-control">
        <div class="buttons">
          <router-link to="category-add">
            <el-button plain @click="handleToCateAdd">新增</el-button>
          </router-link>
        </div>
    </div> 
    <el-row  type="flex" justify="space-between" class="tree-header mt20" >
      <span>类别</span>
       <span>排序</span>
       <span>操作</span>
    </el-row>
      <el-col :span="24" class="pb20">
        <div class="custom-tree-container">
          <div class="block">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span><el-input v-model="data.sort_id" @blur="handleEnter(data)" size="mini" ></el-input></span>
                <span>
                  <el-button type="text" size="mini" @click="handleEdit(data)">编辑</el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
     return {
   data :[]
    }
   
  },
   mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      let { message } = res.data;
      console.log(res);

      message = message.sort((a,b)=>{
         return a.category_id - b.category_id;
        //  这个逻辑有bug,如果用category_id来排序就可以新增页面，如果用sort_id排序就可以更改排序
      })
    
      // 最终的结果的数组
      let arr = [];

      // 递归函数
      function loop(arr, item) {
        arr.forEach(v => {

          // 最重要的判断，判断item的id是否和父级的category_id相等，
          // 如果相等的话就把item加入到当前分类下children
          if (v.category_id == item.parent_id) {
            // 判断当前的分类是否有children属性
            if (!v.children) {
              //没有的话初始化为空数组
              v.children = [];
            }

            // 加入到当前分类下children
            v.children.push({
              ...item,
              id: item.category_id,
              label: item.title
            });
            return;
          }

          // 如果不符合上面的条件，继续递归判断当前分类的子元素
          if (v.children) {
            loop(v.children, item);
          }
        });
      }

      message.forEach(v => {
        // 如果是顶级的分类直接加入到arr
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
          // 如果不是顶级分类，通过递归函数去查找父级分类
          loop(arr, v);
        }
      });

      this.data = arr;
    });
  },
  methods: {
   handleEnter(data){
     console.log(data)
     this.$axios({
       method:"post",
       url:`/admin/category/edit/${data.category_id}`,
       data,
       withCredentials: true
     }).then(res=>{
        const { status, message } = res.data;
        if(status == 0){
          this.$message({
            type: "success",
            message
          });
        }
        // this.$router.go(0);
     })
   },
    
   
    handleEdit(data) {
      // console.log(data);
      const id  = data.id
      // console.log(id);
      this.$router.push(`/admin/category-edit/${id}`);
    },
   
    handleToCateAdd(){
      this.$router.push("/admin/category-add");
    }
  }
};
</script>

<style scoped >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.category >>> .el-input--mini .el-input__inner {
  width: 60px;
  height: 18px !important;
  line-height: 18px !important;
}
.tree-header{
  background-color: #fff;
   padding: 10px;
}
.pb20{
  padding-bottom:20px;
  background-color: #fff;
}
</style>
