<template>
  <div>
    <div class="inputs">
      <el-select placeholder="全部" v-model="statusPayment" class="searchL" @change="hanleStatusChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-input placeholder="请输入内容"  v-model="searchValue" class="input-with-select searchR">
        <el-button slot="append" icon="el-icon-search" @click="handelSearch" ></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt20">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="订单ID" width="80"></el-table-column>
      <el-table-column prop="user_name" label="会员名称" width="120"></el-table-column>
      <el-table-column prop="area" label="地址" width="200"></el-table-column>
      <el-table-column prop="expressTitle" label="快递" width="100"></el-table-column>
      <el-table-column prop="statusName" label="状态" width="120"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <app-page></app-page> -->
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
// import Paginator from "../../components/Paginator";

export default {
  //     components: {
  //     "app-page": Paginator,
  //   },
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
      orderstatus: 0,
      searchValue: "",
      statusPayment:"",
      // vipname: "vanyb",
      options: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "待付款"
        },
        {
          value: 3,
          label: "已发货"
        },
        {
          value: 4,
          label: "已签收"
        },
        {
          value: 5,
          label: "取消"
        }
      ]
    };
  },
  methods: {
    handelSearch(){
       this.pageIndex=1;
        getOrder();
    },
    hanleStatusChange() {
      this.orderstatus = val;
      getOrder();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrder();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getOrder();
    },
    getOrder() {
      this.$axios
        .get(
          `http://localhost:8899/admin/order/getorderlist?orderstatus=${
            this.orderstatus
          }&vipname=${this.searchValue}&pageIndex=${this.pageIndex}&pageSize=${
            this.pageSize}`
        )
        .then(res => {
          console.log(res);
          const { data } = res;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.tableData = data.message;
          this.totalCount = data.totalcount;
        });
    }
  },
  mounted() {
    // 请求页面的数据
    this.getOrder();
  }
};
</script>

<style>
.inputs {
  text-align: right;
}
.searchL {
  width: 200px;
  margin-right: 10px;
}
.searchR {
  width: 250px;
}
</style>
