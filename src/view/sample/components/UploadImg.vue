<template>
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
