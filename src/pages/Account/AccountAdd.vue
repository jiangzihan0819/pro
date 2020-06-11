<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>

      <!-- 表单 -->
      <el-form label-width="80px"  >
        <!-- 账号 -->
        <el-form-item label="账号" >
          <el-input style="width:220px" v-model="account"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input style="width:220px" type="password" v-model="password"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="用户组">
          <el-select placeholder="请选择用户组" v-model="userGroup">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入账号添加
import { API_ADDACCOUNT } from "@/api/apis";
export default {
  data() {
    return {
      value: "",
      // 添加账号表单
        account: "",
        password: "",
        userGroup: ""
    };
  },
  methods: {
    // 添加账号
    submitForm() {
        API_ADDACCOUNT(this.account,this.password,this.userGroup).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加账号成功",
              type: "success"
            });
          }else{
            this.$message.error('添加账号失败');            
          }
        });
    },
    
    resetForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>