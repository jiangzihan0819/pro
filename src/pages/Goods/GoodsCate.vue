<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类</span>
        <el-button
          style="float: right; padding: 3px 0;width:80px; font-size:16px"
          type="primary"
          @click="addCate"
        >添加分类</el-button>
      </div>
      <!-- 下面表格 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="index" width="120" label="序号"></el-table-column>
        <el-table-column property="cateName" label="分类名称" width="350"></el-table-column>
        <el-table-column label="是否启用" width="350">
          <el-switch v-model="value" active-color="#13ce66">1</el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <el-button @click="open" size="mini">编辑</el-button>
          <el-button @click="delCate" type="danger" inputPlaceholder="分类名称" size="mini">删除</el-button>
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
        :total="pagesTotal"
      ></el-pagination>

      <!-- 点击添加分类弹出的模态框 -->
      <el-dialog title="添加分类" :visible.sync="dialogVisible" width="400px">
        分类名称
        <el-input
          v-model="cateName"
          placeholder="分类名称"
          style="margin-bottom:20px; width:295px"
          width="300px"
        ></el-input>
        <span>是否启用</span>
        <el-switch v-model="isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 点击编辑分类弹出的模态框 -->
      <el-dialog title="编辑分类" :visible.sync="Visible" width="400px">
        编辑分类
        <el-input
          v-model="cateName"
          placeholder="分类名称"
          style="margin-bottom:20px; width:295px"
          width="300px"
        ></el-input>
        <span>是否启用</span>
        <el-switch v-model="isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// API_DELCATE
import {
  API_GETCATELIST,
  API_ADDCATE,
  API_DELCATE,
  API_EDIT_CATE
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [], //商品分裂列表
      isUse: true, //开关按钮默认是否开启
      cateName: "", //保存新添的分类名称
      currentPage: 1, //默认当前显示的页数1
      pagesize: 5, //每一页现实的条数
      sizelist: [5, 10, 15],
      pagesTotal: 0, //总分类条数

      value: true, //模态框的开关
      dialogVisible: false, //模态框是否显示
      state: "", //是否启用开关
      id:'',
      Visible: false
    };
  },
  methods: {
    // 获取商品分类
    refreshList(catePage) {
      API_GETCATELIST(catePage, this.pagesize).then(res => {
        console.log(res);
        // console.log('currentPage',this.currentPage)
        let val = res.data.data
        if (val) {
          val.forEach(item => {
            if (item.state == 1) {
              item.state = true;
            } else {
              item.state = false;
            }
          });
        }
        this.tableData = res.data.data;
        this.pagesTotal = res.data.total;
      });
    },
    // 添加分类
    addCate() {
      this.dialogVisible = true;
    },
    // 删除分类
    delCate(row) {
      this.id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        API_DELCATE(this.id).then(res => {
          console.log(this.id);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.refreshList(this.currentPage);
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    // 模态框保存(确认添加)
    saveAdd() {
      this.dialogVisible = false;
      API_ADDCATE(this.cateName, this.state).then(res => {
        // console.log(this.cateName)
        // console.log(this.state)
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "添加商品分类成功",
            type: "success"
          });
        } else {
          this.$message.error("添加商品分类失败");
        }
      });
    },

    handleCurrentChange(catePage) {
      this.refreshList(catePage);
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshList(this.currentPage);
    },
    // 编辑
    open(row) {
      this.Visible = true;
      this.id = row.id;
      this.cateName = row.cateName;
      this.state = row.state;
    },
    // 确认编辑
    saveEdit() {
      API_EDIT_CATE(this.id, this.cateName, JSON.stringify(this.state)).then(
        res => {
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功咯！",
              type: "success"
            });
            this.refreshList(this.currentPage);
          } else {
            this.$message.error("修改失败！");
          }
        }
      );
      this.Visible = false;
    }
  },
  created() {
    this.refreshList(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
</style>