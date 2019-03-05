<template>
  <div>
    <div class="form-control">
      <div class="buttons">
        <router-link to="goods-add">
          <el-button plain>新增</el-button>
        </router-link>
        <el-button plain @click="handleDelete(selectedRows)">删除</el-button>
      </div>
      <div class="inputWidth">
        <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="table-list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标题">
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
        <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
        <el-table-column prop="market_price" label="价格" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete([scope.row])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block paginator">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchvalue: "",
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [],
      selectedRows: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
       this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.getList();
    },
    handleEdit(val) {
      this.$router.push({ name: "goods-edit", params: { id: val.id } });
    },
    handleDelete(list = []) {
      if (list.length === 0) {
        return;
      }
      const arr = list.map(v => {
        return v.id;
      });
      this.$axios({
        method: "GET",
        url: `http://127.0.0.1:8899/admin/goods/del/${arr.join(",")}`
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        this.$message({
          message,
          type: "success"
        });
        this.getList();
      });
    },
    getList() {
      console.log("123");
      this.$axios({
        method: "GET",
        url: `http://127.0.0.1:8899/admin/goods/getlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
          // searchvalue: this.searchvalue
        }
      }).then(res => {
        console.log(res);
        const { message, pageIndex, pageSize, totalcount } = res.data;
        this.tableData = message;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalCount = totalcount;
      });
    }
  },
  mounted() {
    console.log("345");
    this.getList();
  }
};
</script>

<style>
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
</style>
