/*
1、接口路径配置
2、一般由index.js和base.js
3、不同公司要求不一样
 */
const base = {
  uploadUrl: '/api/api/upload',           //图片上传
  sampleList: '/api/api/sampleList',      //样本列表
  addSample: '/api/api/addSample',        //添加样本
  delSample: '/api/api/delSample',        //删除样本
  searchSample:  '/api/api/searchSample', //搜索样本
  editSample:  '/api/api/editSample',     //编辑样本
  userList: '/api/user/userList',         //用户列表
  addUser: '/api/user/addUser',           //添加用户
  delUser: '/api/user/delUser',           //删除用户
  searchUser: '/api/user/searchUser',     //查询用户
  editUser: '/api/user/editUser',         //编辑用户
  materialList: '/api/material/materialList',         //物料列表
  addMaterial: '/api/material/addMaterial',           //添加物料
  delMaterial: '/api/material/delMaterial',           //删除物料
  searchMaterial: '/api/material/searchMaterial',     //查询物料
  editUMaterial: '/api/material/editMaterial',        //编辑物料
  addBatchMaterial: '/api/material/addBatchMaterial',      //批量添加物料
  selectMaterial: '/api/material/selectMaterial',      //通过ids查询物料
}

export default base
