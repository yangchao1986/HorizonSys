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
  import Pagination from '@/components/Pagination.vue' 
  import AddUser from './AddUser.vue' 

  export default{
    components:{
      Pagination,
      AddUser
    },
    data(){
      return{
        input: "",
        tableData: [],    
        total: 10,        
        pageSize: 1,      
        type: 1,           
        dialogVisible: false, 
        currentPage: 1    
      }
    },
    methods: {
      changePage(num){
        this.currentPage=num;
        if(this.type==1){
          this.userList(num);
        }else{
          this.tableData = this.list.slice((num-1)*3,num*3)
        }
      },
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
      changeDialog(){
        this.dialogVisible = false
      },
      addUser(){
        this.$refs.dialog.dialogVisible = true
      },
      delUser(index, row) {
        this.$confirm("此操作将彻底删除用户信息，是否继续?","提示",{
          confirmButtonText: "确定",
          cancelButton: "取消",
          type:"warning"
        }).then(()=>{
          this.$api.delUser({
            id:row.id
          }).then(res=>{
              if(res.data.status==200){
                this.userList(1) 
                this.$message({message:'删除成功!',type:'success'})
              }else{
                this.$message.error('删除失败!')
              }
            })
        }).catch(()=>{
          this.$message({type: "info", message: "已取消删除!"})
        })
      },
      searchUser(){
        this.currentPage = 1; 
        var val = this.input;  
        if(!val){
          this.userList(1); 
          this.type = 1;    
          return
        }
        this.$api.getSearchUser({
          search:val
        }).then(res =>{
          if(res.data.status == 200){
            this.total = res.data.result.length;
            this.tableData = res.data.result.slice(0,3); 
            this.list = res.data.result;
            this.type = 2; 
          }else{
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
          }
        })
      },
      editUser(index, row) {
        console.log('编辑用户');
      },


    },
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
