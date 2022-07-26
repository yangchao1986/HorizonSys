<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <el-avatar :size="120" :src="avatarUrl" style="margin: center;"></el-avatar>
  </el-upload>
</template>

<script>
  import base from '@/api/base'
  export default{
    data(){
      return{
        uploadUrl: base.uploadUrl,
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    methods: {
      /*
       * 1、URL.createObjectURL(file.raw)回调上出服务器的路径,
       * 2、回调数据为blob对象数据,通过二进制加密url
       */
      handleAvatarSuccess(res, file) {
        this.avatarUrl = URL.createObjectURL(file.raw);
         console.log(this.avatarUrl)
      },
      //上传前判断图片格式是否合规
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //重置
      resetUrl(){
        this.avatarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      //获取图片路由
      getAvatarUrl(){
        return this.avatarUrl
      }
    },

  }
</script>

<style>
</style>
