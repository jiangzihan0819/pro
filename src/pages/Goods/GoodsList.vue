<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <!-- 表格 -->
      <el-table :data="goodslist" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{props.row.category}}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{props.row.price}}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img :src="props.row.img" alt />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{props.row.ctime}}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{props.row.rating}}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{props.row.sellCount}}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{props.row.goodsDesc}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="sizelist"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 点击编辑弹出来的模态框 -->
      <el-dialog title="修改商品" :visible.sync="FormVisible">
        <el-form :model="form">
          <!-- 商品名称 -->
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-input v-model="form.category" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品图片地址 -->
          <el-form-item label="商品图片地址" :label-width="formLabelWidth">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCancal">取 消</el-button>
          <el-button type="primary" @click="editSure">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { API_GET_GOODS_LIST, API_GOODS_DEL ,API_GOODS_EDIT } from "@/api/apis";
export default {
  data() {
    return {
      //分页
      goodslist: [], //商品列表
      sizelist: [5, 10, 15], //可以选择的每页显示的条数
      currentPage: 1,
      pagesize: 5, //每一页显示的条数
      total: 0, //总条数
      //参数
      id: "", //数据唯一id
      name: "", //	商品名称
      category: "", //	商品分类
      price: "", //	商品价格
      imgUrl: "", //	商品图片地址
      ctime: "", //	商品创建时间
      rating: "", //	商品评价
      sellCount: "", //	商品销量
      goodsDesc: "", //	商品描述
      FormVisible: false, //模态框的显示与隐藏
      dialogImageUrl: "",
      dialogVisible: false,
      // 模态框
      form: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 封装刷新
    refreshGoodsList(cPages) {
      API_GET_GOODS_LIST(cPages, this.pagesize).then(res => {
        res.data.data.forEach(item => {
          // console.log(item)
          item[
            "img"
          ] = `http://127.0.0.1:5000/upload/imgs/goods_img/${item.imgUrl}`;
        });
        this.goodslist = res.data.data;
        this.total = res.data.total;
        console.log("获取商品列表", res);
      });
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshGoodsList(this.currentPage);
    },
    handleCurrentChange(cPages) {
      // 跳转到对应页码去
      this.refreshGoodsList(cPages);
    },
    // 删除商品
    handleDelete(index, row) {
      API_GOODS_DEL(row.id).then(res => {
        console.log("row.id", row);
        console.log("删除商品：", res);
        this.refreshGoodsList(this.currentPage);
      });
    },
    // 编辑商品
    handleEdit(index,row) {
      this.FormVisible = true;
      console.log(row)
    },
    // 确认编辑
    editSure(row) {
      API_GOODS_EDIT(this.name,this.category,this.price,this.imgUrl,this.goodsDesc).then(res=>{
        console.log('编辑',res)
        console.log(row.id)
      })
    },
    // 取消编辑
    editCancal() {
      this.FormVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    this.refreshGoodsList(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
</style>