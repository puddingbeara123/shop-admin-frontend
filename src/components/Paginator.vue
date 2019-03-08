<template>
  <div class="block paginator mt20" >
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      align="left"
    ></el-pagination>
  </div>
</template>

<script>
export default {
     data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [],
    };
  },
  methods: {
    handelSearch(){
     this.pageIndex=1;
     this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    handleSelectionChange(data) {
      const ids = data.map(v=>{
        return v.id
      })
      const idsStr = ids.join(",");
      this.idsStr=idsStr;
   
    },
    handleEdit(val) {
      this.$router.push({ name: "goods-edit", params: { id: val.id } });
    },
    handleDelete(ids) {
      this.$axios({
        method: "GET",
        url: `http://127.0.0.1:8899/admin/goods/del/${ids}`
      }).then(res => {
        const { message,status } = res.data;
        this.$message({
          message: message,
          type: "success"
        });
        this.getList();
      });
    },
    getList() {
    
      this.$axios({
        method: "GET",
        url: `http://127.0.0.1:8899/admin/goods/getlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        // params: {
        //   pageIndex: this.pageIndex,
        //   pageSize: this.pageSize,
        //   searchvalue: this.searchvalue
        // }
      }).then(res => {
        console.log(res);
        const { data } = res;
        this.tableData = data.message;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalcount;
      });
    }
  },
  mounted() {
    console.log("345");
    this.getList();
  },
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style>
</style>
