<template>
  <div class="detail">
    <h4>订单id:</h4>
    <p>
      <span>订单id:</span>
      {{data.orderinfo.id}}
    </p>
    <p>
      <span>会员名称:</span>
      {{data.orderinfo.user_name}}
    </p>
    <p>
      <span>地址:</span>
      {{data.orderinfo.area}}
    </p>
    <p>
      <span>快递:</span>
      {{data.orderinfo.expressTitle}}
    </p>
    <p>
      <span>状态:</span>
      {{data.orderinfo.status}}
    </p>
    <p>
      <span>购买时间:</span>
      {{data.orderinfo.payment_time}}
    </p>
    <br>
    <h4>订单商品列表</h4>
    <el-table :data="data.goodslist" style="width: 100%">
      <el-table-column label="商品" width="400">
        <template slot-scope="scope">
            <div class="goods-info" type="flex" justify="space-between">
              <div class="goods-img">
                <img :src="scope.row.imgurl" class="imgs">
              </div>
              <p>{{scope.row.goods_title}}</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="goods_no" label="类型" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="价格"></el-table-column>
    </el-table>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      id: 0,
      data: {
        orderinfo: {},
        goodslist: {}
      }
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    this.$axios({
      method: "GET",
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      console.log(res);
      const { message } = res.data;
      this.data.orderinfo = message.orderinfo;
      this.data.goodslist = message.goodslist;
    });
  }
};
</script>

<style scoped>
.goods-info {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 10px;
}
.imgs {
  height: 64px;
  width: 64px;
  margin-right:10px;
}
.router-link-active{
    text-decoration: none;
    color:black;
}
</style>
