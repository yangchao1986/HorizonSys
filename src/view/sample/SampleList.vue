<template>
  <div id="sample">
    <div id="header">
      <el-input v-model="input" placeholder="请输入内容" @change="searchInput"></el-input>
      <el-button type="primary" @click="searchInput">查询样本</el-button>
      <el-button type="primary" @click="AddSample">添加样本</el-button>
    </div>
    <div id="wrapper">
      <el-table :data="tableData" :cell-style="{ textAlign:'center' }" :header-cell-style="{ textAlign: 'center'}" style="width: 100%">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="code" label="条形码" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="120"></el-table-column>
        <el-table-column prop="sample" label="样本类型" width="150"></el-table-column>
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
    <Pagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage='currentPage'/>
    <DialogSample ref="dialog" :title="title" :rowData="rowData"/>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination.vue'
  import DialogSample from './DialogSample.vue'
  export default{
    components:{
      Pagination,
      DialogSample
    },

    data(){
      return{
        input: "",
        tableData: [],
        total: 10,         
        pageSize: 1,        
        type:1,               
        dialogVisible: false, 
        currentPage:1,
        title: '添加样本',
        rowData:{}
      }
    },
    methods: {
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
      AddSample(){
        this.title = '添加样本';
        this.$refs.dialog.dialogVisible = true; 
      },
      changeDialog(){
        this.dialogVisible = false
      },
      handleEdit(index, row) {
        this.$refs.dialog.dialogVisible = true;
        this.title = '编辑样本';
        row.test = JSON.parse(row.test) 
        console.log(row.test)
        this.rowData = row; 
      },
      handleDelete(index, row) {
        this.$confirm("此操作将彻底删除样本信息，是否继续?","提示",{
          confirmButtonText: "确定",
          cancelButton: "取消",
          type:"warning"
        }).then(()=>{
          this.$api.delSample({
            id:row.id
          }).then(res=>{
              if(res.data.status==200){
                this.http(1) 
                this.$message({message:'删除成功!',type:'success'})
              }else{
                this.$message.error('删除失败!')
              }
            })
        }).catch(()=>{
          this.$message({type: "info", message: "已取消删除!"})
        })
      },

      searchInput(val){
        this.currentPage = 1;
        var val = this.input; 
        if(!val){
          this.http(1);
          this.type = 1; 
          return
        }
        this.$api.getSearchSample({
          search:val
        }).then(res =>{
          if(res.data.status==200){
            this.total = res.data.result.length;
            this.tableData=res.data.result.slice(0,3); 
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
      http(page){
        this.$api.getSampleList({
          page
        }).then(res => {
          if(res.data.status==200){
            this.$date.dateFilter(res.data.data);
            this.tableData = res.data.data;
            this.total = res.data.total;  
            this.pageSize = res.data.pageSize 
          }
        })
      }
    },
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
