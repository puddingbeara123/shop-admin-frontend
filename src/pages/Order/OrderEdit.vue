<template>
  <el-col :span="18">
    <el-form ref="form" :model="form" label-width="80px">
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
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="收货电话">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="收货手机">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="收货邮箱">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="收货地区">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="总金额">
        <el-input v-model="form.express_no"></el-input>
      </el-form-item>

      <el-form-item label="收货地址">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="收货备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="form.region">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style>
</style>
