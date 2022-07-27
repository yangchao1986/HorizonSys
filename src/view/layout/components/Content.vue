<template>
  <div>
    <div id="header">
      <div id="header-left">
        <i v-if='!isCollapse' @click="changeMenu" class="el-icon-s-fold"></i>
        <i v-else @click="changeMenu" class="el-icon-s-unfold"></i>
        <Breadcrumb/>
      </div>
      <div id="header-right">
        <Logout/>
      </div>
    </div>
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
