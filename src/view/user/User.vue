<template>
  <div id="user">
    <!-- 搜索区-->
    <div id="header">
      <el-input v-model="input" placeholder="请输入内容" @change="searchUser"></el-input>
      <el-button type="primary" @click="searchUser">查询用户</el-button>
      <el-button type="primary" @click="addUser">增加用户</el-button>
    </div>
    <!-- 列表区 -->
    <div id="wrapper">
      <el-table
      :data="tableData"
      :cell-style="{ textAlign:'center' }"
      :header-cell-style="{ textAlign: 'center'}">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="job" label="部门职务" width="120"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role" label="用户权限" width="150"></el-table-column>
        <el-table-column prop="status" label="用户状态" width="150"></el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区 -->
    <Pagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage='currentPage'/>
    <!-- 弹窗页面 -->
    <AddUser ref="dialog"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination.vue' //分页组件
  import AddUser from './AddUser.vue' //添加用户组件

  export default{
    components:{
      Pagination,
      AddUser
    },
    data(){
      return{
        input: "",
        tableData: [],    //数据源
        total: 10,        //初始化分页组建总页码
        pageSize: 1,      //初始化分页组件数据条数
        type: 1,           //定义一个参数与搜索数据区分
        dialogVisible: false, //默认弹窗关闭
        currentPage: 1     //当前页码
      }
    },
    methods: {
      /* 分页页码 */
      changePage(num){
        this.currentPage=num;
        if(this.type==1){
          this.userList(num);
        }else{
          this.tableData = this.list.slice((num-1)*3,num*3)
        }
      },
      /* 用户列表 */
      userList(page){
        this.$api.getUserList({
          page
        }).then(res => {
          if(res.data.status==200){
            this.$date.dateFilter(res.data.data);
            this.tableData=res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        })
      },

      /* 添加用户--弹窗 */
      changeDialog(){
        this.dialogVisible = false
      },
      /* 添加用户 */
      addUser(){
        this.$refs.dialog.dialogVisible = true
      },
      /* 删除用户 */
      delUser(index, row) {
        this.$confirm("此操作将彻底删除用户信息，是否继续?","提示",{
          confirmButtonText: "确定",
          cancelButton: "取消",
          type:"warning"
        }).then(()=>{
          //根据id删除样本信息
          this.$api.delUser({
            id:row.id
          }).then(res=>{
              if(res.data.status==200){
                this.userList(1) //刷新信息页面
                this.$message({message:'删除成功!',type:'success'})
              }else{
                this.$message.error('删除失败!')
              }
            })
        }).catch(()=>{
          this.$message({type: "info", message: "已取消删除!"})
        })
      },
      /* 搜索用户 */
      searchUser(){
        //如果是空置则返回样本列表
        this.currentPage = 1;  //当前页码
        var val = this.input;  //绑定查询按钮获取输入的值
        //空值时返回样本列表
        if(!val){
          this.userList(1); //初始化用户列表
          this.type = 1;    //解决搜索过后type=2,再空值搜索返回样本列表时仍然type=2，展示的数据就还是搜索数据，这步触发type=1才能真正返回样本列表。
          return
        }
        //如果不是空置,就正常检索
        this.$api.getSearchUser({
          search:val
        }).then(res =>{
          if(res.data.status == 200){
            this.total = res.data.result.length;
            //this.pageSize = 3; //限制数据为3条
            this.tableData = res.data.result.slice(0,3); //对获取的数据进行分割处理，建议放到后台处理以减少前台的压力
            this.list = res.data.result;
            this.type = 2;  //将搜索数据源编组为2
          }else{
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
          }
        })
      },
      /* 编辑用户 */
      editUser(index, row) {
        console.log('编辑用户');
      },


    },

    /* 生命周期函数 */
    created(){
      this.userList(1)
    }

}



</script>

<style lang="scss" scoped>
  #user{
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
