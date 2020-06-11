<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>

      <!-- 表单 -->
      <!-- 账号 -->
      <el-form label-width="80px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input style="width:220px" @blur="checkOldPwd" v-model="oldPwd"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="新密码" prop="newPwd">
          <el-input style="width:220px" v-model="newPwd" ></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="确认密码" prop="newPwd">
          <el-input style="width:220px" v-model="newPwd" ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="sure">确认</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { API_EDITPWD, API_CHECKOLDPWD } from "@/api/apis";
export default {
  data() {
    return {
      value: "",
      oldPwd: "",//保存用户输入的旧密码
      newPwd:'',//保存用户输入的新密码
    };
  },
  methods: {
    // 检查旧密码是否正确
    checkOldPwd() {
      API_CHECKOLDPWD(this.oldPwd, localStorage.id).then(res => {
        console.log("检查旧密码是否正确", res);
        if (res.data.code == 0) {
          this.$message({
            message: "旧密码正确",
            type: "success"
          });
        } else {
          this.$message.error("您输入的旧密码有误，请重新输入");
        }
      });
    },
    // 两次输入的新密码是否一致
    // checkNewPwd1(newPwd1){
    //   console.log('newPwd1:',newPwd1)
     
    // },
    // checkNewPwd2(newPwd1,newPwd2){
    //   console.log('newPwd2:',newPwd2)
    //   if(newPwd1!==newPwd2){
    //     this.$message.error("两次输入的新密码不一致，请重新输入");
    //   }
    // },
    // 修改密码
    sure() {
      API_EDITPWD(this.newPwd, localStorage.id).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改密码成功,请重新登陆!"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>