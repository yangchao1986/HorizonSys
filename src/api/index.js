/*
请求方法路径
 */

import axios from 'axios'
import base from './base'

const api = {
  /* 样本列表*/
  getSampleList(params){ //传page：xx参数
    return axios.get(base.sampleList,{
      params
    })
  },
  /*
  *搜索样本
  */
 getSearchSample(params){
   return axios.get(base.searchSample,{
     params
   })
 },
 /* 添加样本 */
 addSample(params){
   return axios.get(base.addSample,{
     params
   })
 },
 /* 删除样本 */
 delSample(params){
   return axios.get(base.delSample,{
     params
   })
 },
 /* 编辑样本 */
 editSample(params){
   return axios.get(base.editSample,{
     params
   })
 },
 /* 用户列表*/
 getUserList(params){ //传page：xx参数
   return axios.get(base.userList,{
     params
   })
 },
 /* 添加用户 */
 addUser(params){
   return axios.get(base.addUser,{
     params
   })
 },
 /* 删除用户 */
 delUser(params){
   return axios.get(base.delUser,{
     params
   })
 },
 /* 查询用户 */
 getSearchUser(params){
   return axios.get(base.searchUser,{
     params
   })
 },
 /* 修改用户 */
 editUser(params){
   return axios.get(base.editUser,{
     params
   })
 },
/* 物料列表*/
 getMaterialList(params){ //传page：xx参数
   return axios.get(base.materialList,{
     params
   })
 },
 /* 添加物料 */
 addMaterial(params){
   return axios.get(base.addMaterial,{
     params
   })
 },
 /* 删除物料 */
 delMaterial(params){
   return axios.get(base.delMaterial,{
     params
   })
 },
 /* 查询物料 */
 getSearchMaterial(params){
   return axios.get(base.searchMaterial,{
     params
   })
 },
 /* 修改物料 */
 editMaterial(params){
   return axios.get(base.editMaterial,{
     params
   })
 },
 /* 批量添加物料 */
 addBatchMaterial(params){
    return axios.get(base.addBatchMaterial,{
      params
    })
  },
 /* 通过ids查询物料 */
  selectMaterial(params){
    return axios.get(base.selectMaterial,{
      params
    })
  }
}




export default api
