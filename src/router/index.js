/*
使用vue-router v3.x创建路由
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../view/layout/Layout'
import Login from '../view/login/Login'


/*
 *解决重复点击路由报错的问题NavigationDuplicated:Avoided redundant navigation to current location:
 */
import Router from 'vue-router'
Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes=[
    {
      path: '/Login',
      name: '登录页',
      component: Login,
      hidden: true //用于与其他路由区分
    },
    {
      path: '/',
      name:'主页',
      component: Layout,
      children:[
        {
          path:'/home',
          name:'实验室管理系统', //首页
          component:()=>import('../view/home/Home'), //异步路由
          icon:'el-icon-menu',
          hidden: true
        },
        {
          /*
          *z注意每一个管理节点都需要在视图文件'.vue',用<router-view/>渲染
          */
          path:'/sample',
          name:'样本管理',
          component:()=>import('../view/sample/Sample'),
          redirect: '/sample/sampleList',
          icon:'el-icon-first-aid-kit',
          hasChildren: false,
          children:[

            {
              path:'/sample/sampleList',
              name:'样本列表',
              component:()=>import('../view/sample/SampleList'),
            }
          ]
        },
        /*
        * 注意这个路由虽然是sample二级路由访问，但是这个路由渲染的是一级路由根节点'/'
        * 所以仍然放在二级路由。
        */
        {
          path:'/test',
          name:'实验管理',
          component:()=>import('../view/test/Test'),
          redirect:'/test/nucleic',
          icon:'el-icon-location',
          hasChildren: true,
          children:[
            {
              path:'/test/nucleic',
              name:'核酸提取',
              component:()=>import('../view/test/nucleic/Nucleic'),
              icon:'el-icon-arrow-right',
            },
            {
              path:'/test/library',
              name:'文库构建',
              component:()=>import('../view/test/library/Library'),
              icon:'el-icon-arrow-right',
            },
            {
              path:'/test/sequence',
              name:'上机测序',
              component:()=>import('../view/test/sequence/Sequence'),
              icon:'el-icon-arrow-right',
            },
            {
              path:'/test/qpcr',
              name:'荧光PCR',
              component:()=>import('../view/test/qpcr/qPCR'),
              icon:'el-icon-arrow-right',
            },
          ]
        },
        {
          path:'/data',
          name:'数据管理',
          component:()=>import('../view/data/Data'),
          icon:'el-icon-cpu'
        },
        {
          path:'/report',
          name:'报告管理',
          component:()=>import('../view/report/Report'),
          icon:'el-icon-mobile'
        },
        {
          path:'/material',
          name:'物料管理',
          component:()=>import('../view/material/Material'),
          redirect:'/material/Store',
          icon:'el-icon-truck',
          hasChildren: true,
          children: [
            {
              path:'/material/store',
              name:'入库管理',
              component:()=>import('../view/material/Store'),
              icon:'el-icon-arrow-right',
            },
            {
              path:'/material/deliver',
              name:'出库管理',
              component:()=>import('../view/material/Deliver'),
              icon:'el-icon-arrow-right',
            },
            {
              path:'/material/supplier',
              name:'供应商管理',
              component:()=>import('../view/material/Supplier'),
              icon:'el-icon-arrow-right',
            },
          ]


        },
        {
          path:'/device',
          name:'设备管理',
          component:()=>import('../view/device/Device'),
          icon:'el-icon-printer'
        },
        {
          path:'/user',
          name:'用户管理',
          component:()=>import('../view/user/User'),
          icon:'el-icon-user'
        }
      ]
    }
  ]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
