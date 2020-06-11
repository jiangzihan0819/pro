<template>
  <div>
    <!-- 商品品种 -->
    <div class="top_div"></div>
    <el-card class="box-card">
      <header class="add_top">
        <p>账号添加</p>
        <el-button type="primary" @click="click_addclass">添加分类</el-button>
      </header>
      <!-- 表格 -->
      <div class="list_button">
        <main>
          <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="序号" width="250"></el-table-column>
            <el-table-column prop="cateName" label="名字" width="250"></el-table-column>
            <el-table-column label="是否启用" width="250">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="edit_btn(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del_btn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total,sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </main>
      </div>
    </el-card>

    <!-- 修改资料模态框 -->
    <div class="modal_div" v-show="modal_show">
      <el-card class="box-card modal">
        <p>登录系统</p>
        <el-input class="login_input" disabled v-model="id"></el-input>
        <el-input class="login_input" v-model="cateName"></el-input>
        <el-select v-model="state" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="click_Btn" class="el-button" type="primary">确认修改</el-button>
      </el-card>
    </div>
    <!-- 添加分类模态框 -->
    <div class="modal_div" v-show="modal_addclass">
      <el-card class="box-card modal">
        <p>登录系统</p>
        <el-input class="login_input" v-model="addclass_cateName"></el-input>
        <el-switch
          v-model="addclass_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange"
        ></el-switch>
        <el-button @click="addclass_btn" class="el-button" type="primary">确认修改</el-button>
      </el-card>
    </div>
  </div>
</template>


<script>
// 添加分类// 删除分类// 修改分类
import { API_GETCATELIST, API_DELCATE, API_EDIT_CATE ,API_ADDCATE} from "@/api/apis";
export default {
  data() {
    return {
      // 渲染数组
      tableData: [],
      // 数据总条数
      total: null,
      // 显示当前页码
      currentPage: 1,
      // 显示每页条数
      pageSize: 5,
      // 修改资料模态框
      modal_show: false,
      cateName: "",
      id: "",
      state: "",
      // 选择器数组
      options: [
        {
          value: "false",
          label: false
        },
        {
          value: "true",
          label: true
        }
      ],

      // 添加分类模态框
      modal_addclass: false,
      addclass_state: false,
      addclass_cateName:'',
    };
  },
  methods: {
    switchChange(){
      console.log(this.addclass_state);
      
    },
    // 页面加载渲染表格
    // currentPage 当前页码
    // pageSize    每页条数
    // total 总条数
    ATPCATELIST(page) {
      API_GETCATELIST(this.currentPage, page).then(res => {
        let val = res.data.data
        if(val){
          val.forEach((item)=>{
            if(item.state==1){
              item.state=true
            }else{
              item.state=false
            }
          })
        }
        // 从数据库拿取表格
        this.tableData = res.data.data;
        // 获取数据总条数
        this.total = res.data.total;
      });
    },
    // 分页器
    handleSizeChange(val) {
      this.pageSize = val;
      this.ATPCATELIST(this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ATPCATELIST(this.pageSize);
    },
    // 删除
    del_btn(row) {
      this.id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除接口
          API_DELCATE(this.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 刷新页面
              this.ATPCATELIST(this.pageSize);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改
    edit_btn(row) {
      this.modal_show = true;
      this.id = row.id;
      this.cateName = row.cateName;
      this.state = row.state;
    },
    click_Btn() {
      API_EDIT_CATE(this.id, this.cateName, JSON.stringify(this.state)).then(res => {
        // console.log(res.request.withCredentials)
        console.log(res.data);
        
        if (res.data.code == 0) {
          // console.log(res.request.withCredentials)
          // res.request.forEach(item=>item.withCredentials)
          // console.log(withCredentials);
          // if(res.request.withCredentials)
          // for(let obj of res.request){
          //   console.log(obj.withCredentials);
          // }
          
          this.$message({
            message: "恭喜你，修改成功！",
            type: "success"
          });
          // 刷新页面
          this.ATPCATELIST(this.pageSize);
        } else {
          this.$message.error("修改失败！");
        }
      });
      this.modal_show = false;
    },
    // 添加分类
    click_addclass() {
      this.modal_addclass = true;
    },
    addclass_btn() {
      this.modal_addclass = false;
      API_ADDCATE(this.addclass_cateName,JSON.stringify(this.addclass_state)).then(res=>{
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，修改成功！",
            type: "success"
          });
          // 刷新页面
          this.ATPCATELIST(this.pageSize);
        } else {
          this.$message.error("修改失败！");
        }
      })
    }
  },

  created() {
    // 页面加载渲染表格
    this.ATPCATELIST(this.pageSize);
  }
};
</script>

<style lang="less" scoped>
.add_top {
  display: flex;
  justify-content: space-between;
}
.modal_div {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .modal {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    z-index: 1000;
    .login_input {
      margin-bottom: 8px;
    }
    p {
      text-align: center;
    }
    .el-button {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>