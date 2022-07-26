<template>
<!--  <div id="">
    <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path!='/'">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div> -->
  <div style="margin:5px 10px">
    <el-breadcrumb separator='/' v-if='breadList.length > 2'>
      <el-breadcrumb-item v-for='(item,index) in breadList' :key='index' :to='{ path: item.path }' v-if="item.name!='主页'">
        <span style="font-size: 15px;">{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        breadList:[] //定义路由集合
      }
    },
    watch:{  //watch的作用可以监控一个值的变换，并调用因为变化需要执行的方法。
      $route(){ //监听toute的变化
        this.getBreadcrumb();
      }
    },
    methods:{
      isHome(route){
        return route.name==='首页';
      },
      getBreadcrumb(){
        let matched = this.$route.matched;
        /*
        *删除数组第一个元素--'主页'的路由，注意splice的用法
        * splice删除元素后返回的是删除的元素，
        * slice是取值函数，与splice长得很像
        * matched.splice(0,1)他估计删掉了路由根节点，导致子路由无法正常使用
        */
        // matched.splice(0,1)
        //判断是否首页
        if(!this.isHome(matched[1])){
          matched = [{ path: '/home',name: '首页' }].concat(matched);
        }
        this.breadList = matched;
      }
    },
    created(){
      this.getBreadcrumb();
    }
  }
</script>

<style lang='scss' scoped>


</style>
