<template>
  <div class="home">
    <div class="top">
      <!-- 总订单 -->
      <div class="btntitle">
        <div class="el-icon-document" style="font-size:60px;"></div>
        <div class="totalcount">
          <p class="total1">总订单</p>
          <p class="total2">{{totalOrder}}</p>
        </div>
      </div>
      <!-- 总销售金额 -->
      <div class="btntitle">
        <div class="el-icon-money" style="font-size:60px;"></div>
        <div class="totalcount">
          <p class="total1">总销售金额</p>
          <p class="total2">{{totalAmount}}</p>
        </div>
      </div>
      <!-- 今日订单数 -->
      <div class="btntitle">
        <div class="el-icon-present" style="font-size:60px;"></div>
        <div class="totalcount">
          <p class="total1">今日订单数</p>
          <p class="total2">{{todayOrder}}</p>
        </div>
      </div>
      <!-- 今日订单数 -->
      <div class="btntitle">
        <div class="el-icon-set-up" style="font-size:60px;"></div>
        <div class="totalcount">
          <p class="total1">今日销售额</p>
          <p class="total2">{{totayAmount}}</p>
        </div>
      </div>
    </div>
    <!-- echarts -->
    <div class="datacount">
      <div id="echarts" style="width: 600px;height:350px;"></div>
    </div>
  </div>
</template>

<script>
//引入echarts
import echarts from "echarts";
import { API_TOTALDATA } from "@/api/apis";
console.log(echarts);
export default {
  data() {
    return {
      totalOrder: 0, //总订单
      totalAmount: 0, //总销售额
      todayOrder: 0, //今日订单
      totayAmount: 0 //今日销售额
    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts"));
    // 开启loading
    myecharts.showLoading();
    API_TOTALDATA().then(res => {
      let {
        totalOrder,
        totalAmount,
        todayOrder,
        totayAmount,
        orderData,
        amountData,
        xData
      } = res.data;
      this.totalOrder = totalOrder; //总订单
      this.totalAmount = totalAmount; //总销售额
      this.todayOrder = todayOrder; //今日订单
      this.totayAmount = totayAmount; //今日销售额
      console.log(res);
      //     xData	x轴数据
      // orderData	订单数据
      // amountData	金额数据
      // totalOrder	总订单
      // totalAmount	总销售额
      // todayOrder	今日订单
      // totayAmount	今日销售额
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData
          }
        ]
      };
      myecharts.setOption(option);
      // 关闭loading
      myecharts.hideLoading();
    });
  }
};
</script>

<style lang="less" scoped>
.home {
  padding: 15px;
}
.top {
  display: flex;
  justify-content: space-around;

  .btntitle {
    background-color: #ffff;
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    padding: 5px 20px 5px 30px;
    .el-icon-document {
      color: #1497db;
    }
    .el-icon-money {
      color: #d73383;
    }
    .el-icon-present {
      color: #1296db;
    }
    .el-icon-set-up {
      color: #30fa3e;
    }
    .totalcount {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .total1 {
        color: #cccc;
      }
      .total2 {
        font-weight: bold;
      }
    }
  }
}

.datacount {
  margin-top: 30px;
  background-color: #ffff;
  #echarts {
    margin: 0 auto;
    padding: 15px;
  }
}
</style>