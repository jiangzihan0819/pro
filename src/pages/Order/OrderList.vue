<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 第一排输入框 -->
        <div style="
    margin-bottom: 10px;
">
          订单号
          <el-input
            placeholder="订单号"
            v-model="orderNo"
            size="mini"
            style="width:150px;margin-right:10px"
          ></el-input>收货人
          <el-input placeholder="收货人" v-model="consignee" size="mini" style="width:150px"></el-input>手机号
          <el-input placeholder="手机号" v-model="phone" size="mini" style="width:150px"></el-input>订单状态
          <el-input placeholder="订单状态" v-model="orderState" size="mini" style="width:150px"></el-input>
        </div>

        <!-- 时间选择器 -->
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker
            size="mini"
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 310px;margin-bottom: 10px;"
          ></el-date-picker>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </div>

        <!-- 表格 -->
        <el-table :data="orderlist" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="90"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="80"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="240"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="140"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block" style="
    margin-top: 20px;
">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="sizelist"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ordertotal"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { API_ORDER_LIST, API_ORDER_SEARCH } from "@/api/apis";
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
      value2: "",
      // 分页
      orderlist: [], //商品列表
      sizelist: [5, 10, 15], //可以选择的每页显示的条数
      currentPage: 1,
      pageSize: 5, //每一页显示的条数
      ordertotal: 0, //总条数
      // 参数

      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //手机号
      orderState: "", //订单状态
      date: [] //时间范围
    };
  },
  methods: {
    // 封装刷新
    refreshOrderList(opage) {
      API_ORDER_LIST(opage, this.pageSize).then(res => {
        console.log("获取订单列表", res);
        res.data.data.forEach(item => {
          console.log('item',item)
        });

        this.orderlist = res.data.data;
        this.ordertotal = res.data.total;

        this.orderNo = res.data.data.orderNo;
        console.log("1", res.data.data.orderNo);
        this.consignee = res.data.data.consignee;
        this.phone = res.data.data.phone;
        this.orderState = res.data.data.orderState;
        this.date = JSON.stringify(res.data.data.orderState);
      });
    },
    // 查看订单详情
    handleClick() {
      this.$router.push('/order/order-details')
       // 跳转到详情页
      //  this.$router.push({
      //    name:"order-details",
      //    params:{
      //      id:row.id
      //    }
      //  });
      // console.log(row)
    },
    handleSizeChange(newPagesize) {
      this.pageSize = newPagesize;
      this.refreshOrderList(this.currentPage);
    },
    handleCurrentChange(opage) {
      // 跳转到对应页码去
      this.refreshOrderList(opage);
    },
    // 查询
    search() {
      API_ORDER_SEARCH(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.date
      ).then(res => {
        console.log(res);
        this.currentPage = 1;
        this.refreshOrderList();
      });
    },
    
  },
  created() {
    this.refreshOrderList(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.el-input__inner {
  width: 150px;
}
</style>