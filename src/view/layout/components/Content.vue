<template>
  <div>
    <!-- 插入顶层 -->
    <div id="header">
      <div id="header-left">
        <!-- 插入导航伸缩控件-->
        <i v-if='!isCollapse' @click="changeMenu" class="el-icon-s-fold"></i>
        <i v-else @click="changeMenu" class="el-icon-s-unfold"></i>
        <!-- 插入面包屑 -->
        <Breadcrumb/>
      </div>
      <!-- 插入登陆状态-->
      <div id="header-right">
        <Logout/>
      </div>
    </div>
    <!-- 插入内容渲染 路由出口-->
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from './Breadcrumb.vue'
  import Logout from '../../../components/Logout.vue'
  export default {
    components:{
      Breadcrumb,
      Logout
    },
    props:['isCollapse'],
/*    用于当子组件需要调用父组件的方法的场景下使用。
    与之相对的当父组件需要调用子组件时则使用this.$refs的方法 */
    methods:{
      changeMenu(){
        this.$emit('changeCollapse')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #header{
    height: 50px;
    background-color: #42B983;
    font-size: 25px;
  }

  #header-right{
    display: flex;
    float:right;
    padding-right:20px;
    margin-top: 5px;
  }
  #header-left{
    float:left;
    display: flex;
    margin-top: 15px;
  }

</style>
