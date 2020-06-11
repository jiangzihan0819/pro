<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        style="margin:0 10px"
      ></el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="datacount">
      <div id="echarts" style="width: 600px;height:350px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ORDERTOTAL } from "@/api/apis";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts"));
    // console.log(this.data);
    // 开启loading
    myecharts.showLoading();
    API_ORDERTOTAL(this.date).then(res => {
      console.log("订单统计", res);
      //       data	所有订单数据
      // orderTime	下单时间
      // orderAmount	订单金额
      let { orderTime, orderAmount } = res.data;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "下单时间",
            type: "bar",
            data: orderTime
          },
          {
            name: "订单金额",
            type: "bar",
            data: orderAmount
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
.datacount {
  margin-top: 30px;
  background-color: #ffff;
  #echarts {
    margin: 0 auto;
    padding: 15px;
  }
}
</style>