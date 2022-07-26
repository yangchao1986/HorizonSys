<template>
  <el-container style="margin-top: 5px;display: flex;">
    <div id="">
      <h5 style="margin-right: 20px;margin-top: 5px">Yang</h5>
    </div>
    <!-- 插入头像 -->
    <span class="block">
      <el-avatar :size="30" :src="avatarUrl" alt="yang"/>
    </span>
    <el-dropdown style="margin: 5px 10px;">
      <!-- 插入下拉菜单 -->
      <span  class="el-dropdown-link" >
        {{ userInfo.nickName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span>
            当前角色：{{ userInfo.authority.authorityName }}
          </span>
        </el-dropdown-item>
        <template v-if="userInfo.authorities">
          <el-dropdown-item v-for="item in userInfo.authorities.filter(i=>i.authorityId!==userInfo.authorityId)" :key="item.authorityId" @click="changeUserAuth(item.authorityId)">
            <span>
              切换为：{{ item.authorityName }}
            </span>
          </el-dropdown-item>
        </template>
        <el-dropdown-item><i class="iconfont icon-guanlirenyuan"></i>个人信息</el-dropdown-item>
        <el-dropdown-item><i class="iconfont icon-tuichudenglu"></i>退出登录</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
  </el-container>
</template>

<script>
  export default {
    data(){
      return{
        userInfo: {
            uuid: '',
            nickName: '超级管理员',
            headerImg: '',
            authority: {'authorityName':'普通用户'},
            sideMode: 'dark',
            activeColor: '#4D70FF',
            baseColor: '#fff',
            authorities: [{'authorityId':'1','authorityName':'普通用户'},{'authorityId':'2','authorityName':'普通用户子用户'},{'authorityId':'3','authorityName':'测试用户'}],
            authorityId: '1'
          },
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
  }
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #444444;
    font-size: 15px;
  }
  .el-icon-arrow-down {
    font-size: 15px;
  }
</style>
