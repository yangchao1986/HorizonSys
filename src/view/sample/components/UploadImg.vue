<!--
action 必选参数，上传的地址
 :on-preview="handlePictureCardPreview"  点击文件列表中已上传的文件时的钩子
 on-remove 文件移除时的钩子 钩子可以理解为回调函数
 on-success 文件成功时的钩子
 on-error   文件失败时的钩子
 on-progress 文件上传的钩子
 auto-upload 是否自动上传
 file-list 上传的文件列表
list-type 属性来设置文件列表的样式
:auto-upload=false 设置自动或手动上传
-->
<template>
<!--  自动上传图片
<div id="" style="margin:5px;">
  <el-upload
    :action="url"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="successUpload">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div> -->
<!-- 手动上传图片 -->
<div style="margin:5px">
  <el-upload
    :action="url"
    list-type="picture-card"
    :auto-upload=false
    ref='upload'
    :on-success='successUpload'
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    style="width: 620px;">
    <i class="el-icon-plus"></i>
  </el-upload>
  <!-- 图片放大功能 -->
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <div style="margin: 20px 35px;">
    <el-button size="small" type="success" @click='submitUpload'>上传图片</el-button>
  </div>
</div>

</template>

<script>
  import base from '../../../api/base'
    export default {
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false, //
          url: base.uploadUrl,//引入上传服务器地址
          pics:[]
        };
      },
      /* 自动上传图片的方法 */
      // methods: {
      //   handleRemove(file) {
      //     //* 2. 从 pics 数组中，找到这个图片对应的索引值,let { tmp_path,name }=file.response即从数组中拿对应的值。
      //     const i = this.pics.findIndex(item => item===file.response.url)
      //     //* 3. 调用数组的splice方法，把图片信息对象，从pics数组中移除,用于数据库存取
      //     this.pics.splice(i,1)
      //     //* 4. 删除图片列表信息
      //     this.$emit('getPics',this.pics)
      //     //* 5. 删除图片文件
      //     this.deletePic()
      //     console.log("删除成功",this.pics);
      //   },
      //   /* 放大预览图片*/
      //   handlePictureCardPreview(file) {
      //     this.dialogImageUrl = file.url;
      //     this.dialogVisible = true;
      //   },
      //   /* 上传成功*/
      //   successUpload(response,file){
      //     // 2.将图片信息对象，push到pics组数中,用于数据库存取
      //     this.pics.push(file.response.url) //将上传图片的路径加入列表pics
      //     this.$emit('getPics',this.pics)
      //     console.log("上传成功",this.pics)
      //   },
      //   /* 上传函数*/
      //   // submitUpload(){
      //   //   this.$refs.upload.submit();
      //   // },
      // },

      /* 手动上传图片的方法 */
      methods: {
        handleRemove(file) {
          console.log("删除成功",file.name);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        successUpload(response,file){
          this.pics.push(file.response.url)
          this.$emit('getPics',this.pics)
          console.log("上传成功",this.pics)
        },
        submitUpload(){
          this.$refs.upload.submit();
        },
      },
    }
</script>

<style lang='scss' scoped>



</style>
