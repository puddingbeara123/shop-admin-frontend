<template>
  <div>
    <div class="form-control">
      <div class="buttons">
        <router-link to="goods-add">
          <el-button plain>新增</el-button>
        </router-link>
        <el-button plain @click="handleDelete(idsStr)">删除</el-button>
      </div>
      <div class="inputWidth">
        <el-input placeholder="请输入内容" v-model="searchValue" @keyup.enter="handelSearch()" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handelSearch" ></el-button>.
        </el-input>
      </div>
    </div>
    <div class="table-list">
      <el-table
     
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标题" width="400" align="center">
          <template slot-scope="scope">
            <router-link to="/">
              <div class="goods-info">
                <div class="goods-img">
                  <img :src="scope.row.imgurl">
                </div>
                <p>{{scope.row.title}}</p>
              </div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="categoryname" label="类型" width="150" align="center"></el-table-column>
        <el-table-column label="价格" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>￥{{scope.row.market_price | tofixed}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block paginator">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        align="left"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      pageIndex: 1,
      pageSize: 4,
      totalCount: 0,
      tableData: [],
      idsStr:"",
      id:"",
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
      console.log(val);
      const id=val.id;
      this.$router.push(`/admin/goods-edit/${id}`);
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
        // console.log(res);
        const { data } = res;
        this.tableData = data.message;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalcount;
      });
    }
  },
  mounted() {
   
    this.getList();
  },
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style scoped >
.form-control {
  display: flex;
  justify-content: space-between;
}

.inputWidth {
  width: 280px;
  margin-bottom: 20px;
}
.table-list {
  margin-bottom: 20px;
}
.el-button {
  margin-left: 5px;
}
.goods-info {
  display: flex;
  align-items: center;
}
.goods-info > .goods-img {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 10px;
}
.goods-img > img {
  display: block;
  height: 64px;
}
.router-link-active{
    text-decoration: none;
    color:black;
}
</style>
