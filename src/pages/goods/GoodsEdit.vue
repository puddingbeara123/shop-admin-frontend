<template>
  <el-col :span="18">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择活动区域">
          <el-option-group
            v-for="(item,index) in categorys"
            v-if="item.parent_id ===0"
            :key="index"
            :label="item.title"
          >
            <el-option
              v-for="(subItem,subIndex) in categorys"
              v-if="subItem.parent_id === item.category_id"
              :key="subIndex"
              :label="`${subItem.category_id} ${subItem.title}`"
              :value="subItem.category_id"
            ></el-option>
          </el-option-group>
        </el-select>

        <!-- <el-option-group v-for="(item,index) in categorys" :key="index" :label="item.title">
          <el-option
            v-for="(subItem,subIndex) in item.group"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
          ></el-option>
        </el-option-group>-->
      </el-form-item>

      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>

      <el-form-item label="文章显示">
        <el-switch v-model="form.is_slide"></el-switch>
      </el-form-item>

      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
      </el-form-item>

      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>

      <el-form-item label="封面图片">
        <!-- 单张图片上传 -->
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :file-list="form.imgList"
        >
           <!-- 封面图片:file-list 是用来存值  img属性是用来预览 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>

      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>

      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>

      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>

      <el-form-item label="图片相册">
        <el-upload
          action="http://127.0.0.1:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleFileList"
          :file-list="form.fileList"
        >
        <!-- 图片墙:file-list 是用来存值和预览 -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>

      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="内容描述" class="editor">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },

  data() {

    return {
      form: {
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        imgList: [],
        fileList: [],
        category_id: "",
        content: "",
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao:"",
      },
      id: "",
      categorys: [],
      // 头像图片
      imageUrl: "",
      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false
    };
  },
 
  methods: {
    onSubmit() {
      console.log(this.id.id);
      this.$axios({
        method:"POST",
        url:`/admin/goods/edit/${this.id.id}`,
        data:this.form,
        // 处理跨域
        withCredentials: true,
      }).then(res=>{
        const {message ,status}=res.data;
        if(status==0){
          this.$message({
                    message: message,
                    type: 'success'
            });
            setTimeout(()=>{
              this.$router.replace("/admin/goods-list");
            },1000)
        }
      })

    },
    handleFileList(res) {
    //   console.log(res);
      this.form.fileList.push(res);
    },

    handleAvatarSuccess(res, file) {
    //   console.log(res);
      // 头像预览，把图片解析成base64字符串
      this.imageUrl = window.URL.createObjectURL(file.raw);
      this.form.imgList = [res];
    },
    // 判断图片是否大于2m， 如果是的话不上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 移除选中的图片
    handleRemove(file, fileList) {
        console.log(fileList);

    if(fileList.length>=1){
       this.form.fileList= fileList;
    }else if(fileList.length===0){
         this.$message({
          message: '至少保留一张图片',
          type: 'warning'
        });
        return;
    }
    
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
     
    this.id= this.$route.params;
    
    this.$axios({
      method: "GET",
      url: `/admin/goods/getgoodsmodel/${this.id.id}`,
    }).then(res => {
      console.log(res);
      const {message} = res.data;
      this.form = message;
      this.imageUrl = message.imgList[0].url;
      this.form.fileList = message.fileList.map(v=>{
        return {
          ...v,
          url:`http://localhost:8899` + v.shorturl
        }
      })
    });
     this.$axios({
      method: "GET",
      url: "admin/category/getlist/goods"
    }).then(res => {
      console.log(res);
      const { message } = res.data;
      // console.log(res.data);
      this.categorys = message;
    });
  }
};
</script>
<style>
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
/* .el-form-item__content{
  width:490px;
} */
.el-main {
  text-align: left;
}
.editor .el-form-item__content {
  line-height: unset;
}
</style>
