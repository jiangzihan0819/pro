<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right; padding: 10px;" type="primary">保存</el-button>
      </div>

      <!-- 店铺名称 -->
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称">
          <el-input v-model="form.name" style="width:400px"></el-input>
        </el-form-item>

        <!-- 活动区域 -->
        <el-form-item label="活动区域">
          <el-input style="width:400px" type="textarea" :rows="2" v-model="textarea"></el-input>
        </el-form-item>

        <!-- 店铺头像 -->
        <el-form-item label="活动时间">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="    border: 1px dashed #d9d9d9;
    border-radius: 6px;width:178px"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input style="width:400px"></el-input>
        </el-form-item>

        <!-- 配送时间 -->
        <el-form-item label="配送时间">
          <el-input style="width:400px"></el-input>
        </el-form-item>

        <!-- 描述配送 -->
        <el-form-item label="描述配送">
          <el-input style="width:400px"></el-input>
        </el-form-item>

        <!-- 店铺评分 -->
        <el-form-item label="店铺评分">
          <el-input style="width:400px"></el-input>
        </el-form-item>

        <!-- 销量 -->
        <el-form-item label="销量">
          <el-input style="width:400px"></el-input>
        </el-form-item>

        <!-- 活动 -->
        <el-form-item label="活动" style="width:450px">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无线橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="value1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { API_SHOP_INFO } from "@/api/apis";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      textarea: "",
      imageUrl: "",
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
    onSubmit() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove() {}
  },
  created() {
    //     id	id
    // name	店铺名称
    // bulletin	公告
    // avatar	店铺头像
    // deliveryPrice	配送费
    // deliveryTime	送达时间
    // description	描述
    // score	评分
    // sellCount	销量
    // supports	活动
    // pics	店铺图片
    // date	营业时间
    // minPrice	起送价格
    // 获取店铺详情
    API_SHOP_INFO().then(res => {
      console.log("店铺管理", res);
    });
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
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
</style>