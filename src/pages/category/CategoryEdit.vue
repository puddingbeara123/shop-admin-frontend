<template>
  <div>
    <el-col :span="16">
      <el-form ref="form" :model="form" :label-position="labelPosition">
        <el-form-item label="所属父类别">
          <el-select v-model="form.region" placeholder="请选择" class="statusW">
            <el-option label="手机通讯" value="shanghai"></el-option>
            <el-option label="摄影摄像" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序数字">
          <el-col :span="12">
            <el-input v-model="form.subheading"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-col :span="12">
            <el-input v-model="form.subheading"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类别级别">
          <el-col :span="12">
            <el-input v-model="form.subheading"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item align="left">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
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
.statusW {
  float: left;
  width:200px;
}
</style>
