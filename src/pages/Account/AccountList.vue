<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>

      <!-- 表格 -->
      <el-table
        :data="userlist"
        style="width: 100%"
        stripe
        @selection-change="columnSelectChange"
        ref="multipleTable"
      >
        <!-- 单选框 -->
        <el-table-column type="selection" width="75"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="account" label="账号" width="200"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组" width="220"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="ctime" label="创建时间" width="240"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-popconfirm title="确认删除这条用户数据吗?">
              <el-button
                slot="reference"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)
"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="sizelist"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-bottom:10px"
      ></el-pagination>

      <!-- 按钮 -->
      <el-button type="danger" @click="batchDel" size="mini">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()" size="mini">取消选择</el-button>

      <!-- 点击编辑弹出来的模态框 -->
      <el-dialog title="修改账号" :visible.sync="Visible" width="400px">
        账号
        <el-input
          placeholder="账号"
          v-model="account"
          prop="account"
          style="margin-bottom:20px; width:295px"
          width="300px"
        ></el-input>
        <br />用户组
        <el-input
          placeholder="用户组"
          v-model="userGroup"
          prop="userGroup"
          style="margin-bottom:20px; width:295px"
          width="300px"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  API_DELACCOUNT,
  API_GETLIST,
  API_BATCHDEL,
  API_EDITACCOUNT
} from "@/api/apis";

export default {
  data() {
    return {
      userlist: [], //用户列表
      currentPage: 1, //当前显示的页数（默认1）
      pagesize: 5, //每页显示的条数
      sizelist: [5, 10, 15, 20],
      total: 0, //总条数
      batchdel: [], //存放要批量删除的数据
      Visible: false, //模态框是否显示
      account: "",
      userGroup: "",
      s:''
    };
  },
  created() {
    this.refreshTable(this.currentPage);
  },
  methods: {
    //封装发送请求刷新表格数据
    refreshTable(page) {
      API_GETLIST(page, this.pagesize).then(res => {
        this.userlist = res.data.data; //把后台数据传给userlist
        this.total = res.data.total;
        console.log(res);
      });
    },
    // 页数改变触发
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshTable(this.currentPage);
    },
    //点击页码，页码跳转时触发的函数
    handleCurrentChange(page) {
      // 跳转到对应页码去
      this.refreshTable(page);
    },
    // 删除账号
    handleDelete(row) {
      API_DELACCOUNT(row.id).then(res => {
        console.log(res);
        this.$message({
          message: "用户数据删除成功!",
          type: "success"
        });
        this.refreshTable(this.currentPage);
      });
    },
    // 编辑
    handleEdit(index,row) {
      this.rows=row
      console.log(row);
      console.log(this.s);
      this.Visible = true; //模态框显示
    },
    saveAdd() {
      // console.log(index)
      // console.log(row)
      this.Visible = false; //模态框显示
      API_EDITACCOUNT(this.rows.id, this.account, this.userGroup).then(res => {
        console.log(res);
        console.log(this.rows.id);
        // console.log(localStorage.id)
        // console.log(this.account)
        // console.log(this.userGroup)
      });
    },
    // 批量删除
    batchDel() {
      // 判断有没有选中的要删除的选项
      if (!this.ids || this.ids.length == 0) {
        this.$message.error("请先选择要删除的选项");
        return;
      }

      this.$confirm("此操作将删除所有选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        // 发请求
        API_BATCHDEL(JSON.stringify(this.ids)).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.refreshTable(this.currentPage);
          }
        });
      });
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 改变
    columnSelectChange(selection) {
      this.ids = selection.map(item => item.id);
    }
  }
};
</script>

<style lang="less" scoped>
</style>