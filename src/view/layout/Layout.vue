<template>
  <div id="layout">
    <MyMenu class="menu" :isCollapse='isCollapse'/>
    <Content class="content" :class="{isActive:isCollapse}" @changeCollapse='changeCollapse' :isCollapse='isCollapse'/>
  </div>
</template>

<script>
  import MyMenu from './components/Mymenu.vue'
  import Content from './components/Content.vue'

  export default{
    components:{
      MyMenu,
      Content,

    },
    data(){
      return{
        isCollapse: false,
      }
    },
    methods:{
      changeCollapse(){
        this.isCollapse=!this.isCollapse
      }
    }
  }
</script>

<style lang="scss" scoped>
    .menu{
      min-height: 500px;
      background-color: #666;
      position: fixed;
      top: 0;
      bottom: 0;
    }
    .content{
      margin-left: 200px;
    }
    .isActive{
      margin-left: 64px;
    }

</style>
