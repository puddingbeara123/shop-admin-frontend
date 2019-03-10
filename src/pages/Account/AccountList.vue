<template>
  <div>
    <el-row type="flex" class="row-bg" justify="end">
      <div class="inputWidth">
        <el-input placeholder="请输入会员名" v-model="searchvalue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>.
        </el-input>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" prop="user_name" width="120"></el-table-column>
      <el-table-column label="手机号码" prop="mobile" width="150"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
      <el-table-column label="注册时间" prop="reg_time" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block paginator mt20">
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
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0
    };
  },
  methods: {
      getAccountList() {
      console.log(123)
      this.$axios({
        method: "get",
        url: `/admin/account/getlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
           console.log(123)
        // console.log(res);
        const { message, pageIndex, pageSize, totalcount } = res.data;
        this.tableData = message;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalCount = totalcount;
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.pageSize = 5
      getAccountList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageSize = val;
      getAccountList();
    },
    handelSearch() {
        getAccountList();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
  
  },
  mounted() {
    this.getAccountList();
  }
};
</script>

<style>
.inputWidth {
  width: 280px;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
