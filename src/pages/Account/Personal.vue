<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span slot="title">管理员信息</span>
    </div>
    <div class="content" :data="userlist" @selection-change="columnSelectChange">
      <p>
        管理员ID:
        <span prop="id">{{this.id}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        账号:
        <span prop="account">{{this.account}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        用户组:
        <span prop="userGroup">{{this.userGroup}}</span>
      </p>
      <el-divider></el-divider>
      <p>
        创建时间:
        <span prop="ctime">{{this.ctime}}</span>
      </p>
      <el-divider></el-divider>
      <div>
        <h3 class="text" prop="imgUrl">管理员头像:</h3>

        <!-- 头像上传 -->
        <el-upload
          :data="data"
          :show-file-list="false"
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
           :on-success="handleAvatarSuccess"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 修改头像 -->
        <el-button @click="changeAvatar" type="primary" size="mini">修改头像</el-button>
      </div>
    </div>
  </el-card>
</template>




<script>
import { API_GETPERSON } from "@/api/apis";
export default {
  data() {
    return {
      // 用户数据对象
      info: {},
      imgUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
      userlist: [], //用户列表
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      data: { id: localStorage.id }
    };
  },
  methods: {
    handleAvatarSuccess(){
      window.Location.reload
    },
    changeAvatar() {},
    columnSelectChange(selection) {
      this.ids = selection.map(item => item.id);
    }
  },
  created() {
    API_GETPERSON(localStorage.id).then(res => {
      console.log(res);
      this.id = res.data.accountInfo.id;
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.imgUrl = res.data.accountInfo.imgUrl;
      this.ctime = res.data.accountInfo.ctime;
    });
  }
};
</script>

<style lang="less" scoped>
.content {
  .text {
    margin-bottom: 30px;
  }
  .el-button {
    margin-top: 20px;
  }
  /deep/.avatar-uploader .el-upload {
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>