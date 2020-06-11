<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px">
        <el-form-item label="商品名称" >
          <el-input style="width:400px" v-model="name"></el-input>
        </el-form-item>

        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.cateName"
              :value="item.cateName"
              
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number v-model="price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success='succ'
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" :rows="2" v-model="goodsDesc" style="width:400px"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { API_CATEGORIES , API_ADD_GOODS} from "@/api/apis";
export default {
  data() {
    return {
      textarea: "",
      num: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      categories: [],
      name:'',//商品名称
      category:'',//商品分类
      price:'',//商品价格
      goodsDesc:'',//商品描述
      imgUrl:''//商品图片地址
    };
  },
  methods: {
    succ(response){
      console.log(response)
      this.imgUrl=response.imgUrl
    },
    handleChange() {},

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加商品
    onSubmit() {
      API_ADD_GOODS(this.name,this.category,this.price,this.imgUrl,this.goodsDesc).then(res=>{
        console.log('添加商品',res)
        window.location.reload()
      })
    }
  },
  created() {
    // 查询所有分类名称
    API_CATEGORIES().then(res => {
      console.log("获取商品分类", res);
      this.categories = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

