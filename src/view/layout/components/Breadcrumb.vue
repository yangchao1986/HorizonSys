<template>
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
        breadList:[] 
      }
    },
    watch:{  
      $route(){ 
        this.getBreadcrumb();
      }
    },
    methods:{
      isHome(route){
        return route.name==='首页';
      },
      getBreadcrumb(){
        let matched = this.$route.matched;
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
