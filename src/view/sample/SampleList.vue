<template>
  <div id="sample">
    <!-- 搜索区-->
    <div id="header">
      <el-input v-model="input" placeholder="请输入内容" @change="searchInput"></el-input>
      <el-button type="primary" @click="searchInput">查询样本</el-button>
      <el-button type="primary" @click="AddSample">添加样本</el-button>
    </div>
    <!-- 列表区 -->
    <div id="wrapper">
      <!--
      * cell-style 表格内容居中
      * header-cell-style 表头内容居中
      -->
      <el-table :data="tableData" :cell-style="{ textAlign:'center' }" :header-cell-style="{ textAlign: 'center'}" style="width: 100%">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="code" label="条形码" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="120"></el-table-column>
        <el-table-column prop="sample" label="样本类型" width="150"></el-table-column>
        <!-- 内容过长可以用show-overflow-tooltip属性 -->
        <el-table-column prop="test" label="检测项目" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="receiving" label="收样日期" width="150"></el-table-column>
        <el-table-column prop="unit" label="送检单位" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区 -->
    <Pagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage='currentPage'/>
    <!-- 弹窗页面 -->
    <!-- c操作子组件的方式 1 props父传子 2 children 3 ref直接修改子组件-->
    <DialogSample ref="dialog" :title="title" :rowData="rowData"/>
    <!-- <DialogSample :dialogVisible='dialogVisible' @changeDialog="changeDialog"/> -->
  </div>
</template>

<script>
  import Moment from 'moment' //时间格式化
  import Pagination from '../../components/Pagination.vue' //分页组件
  import DialogSample from './DialogSample.vue'
  import cascader from '@/assets/js/cascader.js'

  export default{
    components:{
      Pagination,
      DialogSample
    },

    data(){
      return{
        input: "",
        tableData: [],
        total: 10,            //初始化分页组建总页码
        pageSize: 1,          //初始化分页组件页码
        type:1,               //定义一个参数与搜索数据区分
        dialogVisible: false, //默认弹窗关闭
        currentPage:1         ,//当前页面
        title: '添加样本',
        rowData:{}
      }
    },

    methods: {
      /* 分页页码 */
      changePage(num){
        this.currentPage=num;
        if(this.type==1){
          this.http(num);
          console.log("样本列表")
        }else{
          this.tableData = this.list.slice((num-1)*3,num*3)
          console.log("搜索列表")
        }
      },
      /* 点击后弹窗,更改变量 */
      AddSample(){
        // this.dialogVisible = true //props方式传参
        this.title = '添加样本';
        this.$refs.dialog.dialogVisible = true; //ref直接修改子组件的实例数据
      },
      /* 弹窗 */
      changeDialog(){
        this.dialogVisible = false
      },
      /* 编辑操作 */
      handleEdit(index, row) {
        this.$refs.dialog.dialogVisible = true;
        this.title = '编辑样本';
        row.test = JSON.parse(row.test) //将数据库获取的字符串转成级联选择器认可的数据格式
        console.log(row.test)
        this.rowData = row;   //注意这个row是取的后台返回的所有数据
      },
      /* 删除操作 */
      handleDelete(index, row) {
        this.$confirm("此操作将彻底删除样本信息，是否继续?","提示",{
          confirmButtonText: "确定",
          cancelButton: "取消",
          type:"warning"
        }).then(()=>{
          //根据id删除样本信息
          this.$api.delSample({
            id:row.id
          }).then(res=>{
              if(res.data.status==200){
                this.http(1) //刷新信息页面
                this.$message({message:'删除成功!',type:'success'})
              }else{
                this.$message.error('删除失败!')
              }
            })
        }).catch(()=>{
          this.$message({type: "info", message: "已取消删除!"})
        })
      },

      /* 搜索功能 */
      searchInput(val){
        /* 如果是空置则返回样本列表*/
        this.currentPage = 1;
        var val = this.input;  //便于绑定查询按钮
        /* 空值时返回样本列表*/
        if(!val){
          this.http(1);
          this.type = 1; //解决搜索过后type=2,再空值搜索返回样本列表时仍然type=2，展示的数据就还是搜索数据，这步触发type=1才能真正返回样本列表。
          return
        }
        /* 如果不是空置,就正常检索*/
        this.$api.getSearchSample({
          search:val
        }).then(res =>{
          if(res.data.status==200){
            this.total = res.data.result.length;
            //this.pageSize = 3; //数据条数
            this.tableData=res.data.result.slice(0,3); //对获取的数据进行分割处理，建议放到后台处理以减少前台的压力
            this.$date.dateFilter(res.data.result);
            this.list = res.data.result;
            this.type=2;
          }else{
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
          }
        })
      },
      /* 样本列表 */
      http(page){
        this.$api.getSampleList({
          page
        }).then(res => {
          if(res.data.status==200){
            this.$date.dateFilter(res.data.data);
            this.tableData = res.data.data;
            this.total = res.data.total;  //这是分页组件上的条目总数
            this.pageSize = res.data.pageSize //这是分页组件上的页码数目
          }
        })
      }
    },


    //生命周期函数
    created(){
      this.http(1)
    }
  }

</script>

<style lang="scss" scoped>
  #sample{
    margin: 10px;
  }
  #header{
    display: flex;
    button{
      margin-left: 20px;
    }
  }
  #wrapper{
    margin: 20px 0;
  }
</style>
