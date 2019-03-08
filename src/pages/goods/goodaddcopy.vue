<template>
  <div>
     
      <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
       
        <el-form-item label="所属类别" class="statusW">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
     
        <el-form-item label="是否发布" class="statusW">
          <el-switch v-model="form.delivery"></el-switch>
          <span class="tips">*不发布前台则无法显示</span>
        </el-form-item>
         

        <el-form-item label="推荐类型" class="statusW">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="推荐类型" name="styleType"></el-checkbox>
            <el-checkbox label="热门" name="hots"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="内容标题" >
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="副标题">
          <el-input v-model="form.subheading"></el-input>
        </el-form-item>

        <el-form-item label="封面图片" class="statusW">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品货号">
          <el-col :span="12">
             <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-col :span="12">
            <el-input v-model="form.subheading"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="市场价格">
         <el-col :span="12">
           <el-input v-model="form.subheading"></el-input>
         </el-col>
        </el-form-item>
        <el-form-item label="销售价格">
         <el-col :span="12">
          <el-input v-model="form.subheading"></el-input>
        </el-col>
        </el-form-item>

        <el-form-item label="图片相册" class="statusW">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>

        <el-form-item label="内容摘要">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="内容描述" class="editor">
          <quillEditor v-model="form.content"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
      


  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      labelPosition: "right",
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",

      form: {
        title: "",
        subheading: "",
        region: "",
        content:"",
      }
    };
  },
  components: {
    quillEditor
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
      
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
  
};
</script>

<style>
.tips{
        font-size: 12px;
        color:#999;
        vertical-align: middle;
        margin:0 10px;
    }
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* .statusW{
    width:300px;
    text-align: left;
} */

</style>
