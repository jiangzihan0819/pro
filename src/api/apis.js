// 引入axios
import axios from 'axios'
// 设置服务器IP地址
axios.defaults.baseURL = 'http://localhost:5000'

// 登录
// account账号
// password密码
export const API_LOGIN = (account, password) =>
    axios.post('/users/checkLogin', { account, password })


// 添加账号
// account账号
// password密码
// userGroup用户组
export const API_ADDACCOUNT = (account, password, userGroup) =>
    axios.post('/users/add', { account, password, userGroup })


// 获取账号列表
// currentPage当前页码
// pageSize每页条数
export const API_GETLIST = (currentPage, pageSize) =>
    axios.get('/users/list', { params: { currentPage, pageSize } })

// 删除账号
// id要删除的账号
export const API_DELACCOUNT = (id) =>
    axios.get('/users/del', { params: { id } })

// 批量删除账号
// ids要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export const API_BATCHDEL = (ids) =>
    axios.get('/users/batchdel', { params: { ids } })


// 修改账号
// id要修改账号的id
// account账号
// userGroup用户组
export const API_EDITACCOUNT = (id, account, userGroup) =>
    axios.post('/users/edit', { id, account, userGroup })


// 检查旧密码是否正确
// oldPwd旧密码
export const API_CHECKOLDPWD = (oldPwd, id) =>
    axios.get('/users/checkoldpwd', { params: { oldPwd, id } })


// 修改密码
// oldPwd旧密码
export const API_EDITPWD = (newPwd, id) =>
    axios.post('/users/editpwd', { newPwd, id })

// 验证token是否过期
// token保存用户的登录状态
export const API_CHECKTOKEN = (token) =>
    axios.get('/users/checktoken', { params: { token } })

// 添加分类
// cateName:分类名称
// state:是否启用
export const API_ADDCATE = (cateName, state) =>
    axios.post('/goods/addcate', { cateName, state })

// 获取分类
// currentPage当前页
// pageSize每条页数
export const API_GETCATELIST = (currentPage, pageSize) =>
    axios.get('/goods/catelist', { params: { currentPage, pageSize } })

// 获取个人中心
export const API_GETPERSON = (id) =>
    axios.get('/users/accountinfo', { params: { id } })

// 删除分类
export const API_DELCATE = (id) =>
    axios.get('/goods/delcate', { params: { id } })

// 修改分类
export const API_EDIT_CATE = (id, cateName, state) =>
    axios.post('/goods/editcate', { id, cateName, state })

// 头像上传接口
export const API_AVATART_UPLOAD = (id) =>
    axios.post('/users/avatar_upload', { id })

// 查询所有分类名称
export const API_CATEGORIES = () =>
    axios.get('/goods/categories', { params: {} })

// 商品图片上传
export const API_GOODS_IMG_UPLOAD = () =>
    axios.post('/goods/goods_img_upload', {})

// 添加商品
// name	商品名称
// category	商品分类
// price	商品价格
// imgUrl	商品图片地址
// goodsDesc	商品描述
export const API_ADD_GOODS = (name, category, price, imgUrl, goodsDesc) =>
    axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })

// 获取商品列表
// currentPage	当前页码
// pageSize 每页条数
export const API_GET_GOODS_LIST = (currentPage, pageSize) =>
    axios.get('/goods/list', { params: { currentPage, pageSize } })

// 删除商品
// id 要删除商品的id
export const API_GOODS_DEL = (id) =>
    axios.get('/goods/del', { params: { id } })

// 首页报表接口
export const API_TOTALDATA = () =>
    axios.get('/order/totaldata', { params: {} })

// 订单报表
export const API_ORDERTOTAL = (date) =>
    axios.get('/order/ordertotal', { params: { date } })

// 修改商品
//     name	String	是	商品名称
// category	String	是	商品分类
// price	String	是	商品价格
// imgUrl	String	是	商品图片地址
// goodsDesc	String	是	商品描述
// id	int	是	商品ID
export const API_GOODS_EDIT = (name, category, price, imgUrl, goodsDesc) =>
    axios.post('/goods/edit', { name, category, price, imgUrl, goodsDesc })

// 获取店铺详情
export const API_SHOP_INFO = () =>
    axios.get('/shop/info', { params: {} })

// 获取订单列表
export const API_ORDER_LIST = (currentPage, pageSize) =>
    axios.get('/order/list', { params: { currentPage, pageSize } })

// 查询
// currentPage当前页码
// pageSize每页条数
// orderNo订单号
// consignee收货人
// phone手机号
// orderState订单状态
// date时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const API_ORDER_SEARCH = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) =>
    axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 获取订单详情
export const API_ORDER_DETAIL = (id) =>
    axios.get('/order/detail', { params: { id } })

// 修改订单
// id	int	是	要修改账号的id
// orderNo	String	是	订单号
// orderTime	String	是	下单时间
// phone	String	是	电话
// consignee	String	是	收货人
// deliverAddress	String	是	送货地址
// deliveryTime	String	是	送达时间
// remarks	String	是	备注
// orderAmount	String	是	订单金额
// orderState	String	是	订单状态
export const API_ORDER_EDIT = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) =>
    axios.post('/order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

// 获取店铺信息
export const API_GET_SHOP = () =>
    axios.get('/shop/info', { params: {} })