<template>
    <!-- 动态导航栏 -->
    <el-menu :default-active="this.$route.path" router class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#666" text-color="#fff">
        <el-menu-item index="/home">
          <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-qiyebiaozhiLogo1"></use>
          </svg>
         <!-- <i class="iconfont icon-qiyebiaozhiLogo1" style="font-size:40px;margin-left:-8px;margin-right:5px"></i> -->
          <span>实验室管理系统</span>
        </el-menu-item>
        <!-- template做for循环不能加key -->
        <template v-for="(item,index) in this.$router.options.routes[1].children" v-if="!item.hidden">
          <!-- 有children -->
          <el-submenu :index="item.path" v-if="item.hasChildren">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index="itemChild.path" v-for="(itemChild,indexj) in item.children" :key="indexj">
              <i :class="itemChild.icon"></i>
              <span slot="title">{{ itemChild.name }}</span>
            </el-menu-item>
          </el-submenu>

          <!-- 无children -->
          <el-menu-item :index="item.path" v-if="!item.hasChildren">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
  export default {
    props: ['isCollapse'],  //获取父组件变量
    methods:{

    },
    created(){
      console.log()
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
  }
  .icon {
  width: 3em;
  height: 3em;
  margin-left: -8px;

  }
</style>
