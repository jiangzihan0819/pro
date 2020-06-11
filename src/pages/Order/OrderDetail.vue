<template>
  <div class="order-details">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button
          class="rightBtn"
          @click="editInfo"
          type="primary"
          icon="el-icon-edit"
        >{{ disable? "修改信息" : "保存修改"}}</el-button>
      </div>
      <div>
        <!-- 卡片内容:详情内容 -->
        <el-form
          ref="detailsform"
          :model="detailsform"
          label-width="80px"
          slot="content"
          :disabled="disable"
        >
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="detailsform.orderNo"></el-input>
          </el-form-item>
          <!-- 下单时间 -->
          <el-form-item label="下单时间">
            <el-input v-model="detailsform.orderTime"></el-input>
          </el-form-item>
          <!-- 电话号码 -->
          <el-form-item label="电话号码">
            <el-input v-model="detailsform.phone"></el-input>
          </el-form-item>
          <!-- 收件人 -->
          <el-form-item label="收件人">
            <el-input v-model="detailsform.consignee"></el-input>
          </el-form-item>
          <!-- 地址 -->
          <el-form-item label="送货地址">
            <el-input v-model="detailsform.deliverAddress"></el-input>
          </el-form-item>
          <!-- 送达时间 -->
          <el-form-item label="送达时间">
            <el-input v-model="detailsform.deliveryTime"></el-input>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注">
            <el-input type="textarea" v-model="detailsform.remarks"></el-input>
          </el-form-item>
          <!-- 订单金额 -->
          <el-form-item label="订单金额">
            <el-input v-model="detailsform.orderAmount"></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="detailsform.orderState" placeholder="请选择订单状态">
              <el-option label="未受理" value="未受理"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>   

<script>
import { API_ORDER_DETAIL, API_ORDER_EDIT } from "@/api/apis";
import moment from "moment";

export default {
  // 数据
  data() {
    return {
      // 详情列表
      detailsform: {
        id: ""
      },
      // 表单禁用
      disable: true
    };
  },

  // 创建后
  created() {
    this.getInfo();
    // 获取订单详情
    // API_ORDER_DETAIL(this.id).then(res => {
    //   console.log("获取订单详情", res);
    //   this.id = this.$route.params.id;
    //   console.log(res.data.id)
    // });
  },

  methods: {
    // 获取信息
    async getInfo() {
      // console.log(this.$route.params);
      // 将传过来的id赋值给本地
      this.id = this.$route.params.id;
      // 发送ajax获得信息
      let { data } = await API_ORDER_DETAIL({
        id: this.id
      });
      console.log(data);
      // 修改时间格式
      data.orderTime = moment(data.orderTime).format("YYYY-MM-DD HH:mm:ss");

      // 赋值渲染
      this.detailsform = data;
    },

    // 修改信息按钮
    async editInfo() {
      // 将表单禁用解开
      this.disable = !this.disable;

      if (this.disable) {
        // 发送ajax
        let { code } = await API_ORDER_EDIT(this.detailsform);
        if (code === 0) {
          // 重新渲染页面数据
          this.getInfo();
          this.$route.push("/order/order-list");
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
.order-details {
  .el-form {
    width: 420px;
    .el-select {
      width: 100%;
    }
  }
}
.rightBtn {
  position: fixed;
  right: 50px;
}
</style>