<template>
  <el-col :span="18">
    <el-form ref="form" v-model="form" label-width="80px">
      <el-form-item label="订单id">
        <span class="tip">{{form.id}}</span>
      </el-form-item>

      <el-form-item label="快递单号">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="快递费用">
        <el-input v-model="form.express_fee"></el-input>
      </el-form-item>

      <el-form-item label="收件人">
        <el-input v-model="form.accept_name"></el-input>
      </el-form-item>

      <el-form-item label="收货电话">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>

      <el-form-item label="收货手机">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>

      <el-form-item label="收货邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="收货地区">
        <el-input v-model="form.area"></el-input>
      </el-form-item>

      <el-form-item label="总金额">
        <el-input v-model="form.order_amount"></el-input>
      </el-form-item>

      <el-form-item label="收货地址">
        <el-input type="textarea" v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item label="收货备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="form.orderstatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      form: {
        express_no: "",
        id: ""
      },
      options: [
        {
          value: 1,
          label: "待付款"
        },
        {
          value: 2,
          label: "已付款"
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
    onSubmit() {
      console.log("submit!");
      this.$axios({
        url:`/admin/order/updateorder`,
        method: "POST",
        data:{
          orderinfo:this.form
        },
        withCredentials: true
      }).then(res=>{
        const {message} =res.data;
        this.$message({
          message:"修改成功",
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.back();
        }, 1000)
      })

    }
  },
  mounted(){
    // console.log(this.$route.params)
    const id = this.$route.params.id;
    this.id =id;
    this.$axios({
      url:`/admin/order/getorderdetial/${id}`,
    }).then(res => {
      console.log(res)
     const {message}=res.data;
     this.form=message.orderinfo;
    
    })
  }
};
</script>

<style>
</style>
