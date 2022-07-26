<!-- 入库管理 -->
<template>
  <div id="material">
    <!-- 搜索区-->
    <div id="header">
      <el-input v-model="input" placeholder="请输入内容" @change="searchMaterial"></el-input>
      <el-button type="primary" @click="searchMaterial">查询物料</el-button>
      <el-button type="primary" @click="addMaterial">增加物料</el-button>
      <!-- 上传数据 -->
      <el-upload
        action=""
        id="upload-excel"
        :on-change="handleChange"
        :show-file-list="false"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-button type="primary">导入数据</el-button>
      </el-upload>
      <!-- 下载数据 -->
      <el-button type="primary" @click="clickDownload">下载数据</el-button>
    </div>
    <!-- 列表区 -->
    <div id="wrapper">
      <el-table
      ref="dataTable"
      size="small"
      :data="tableData"
      :cell-style="{ textAlign:'center' }"
      :row-style="{ height:'10px' }"
      :header-cell-style="{ textAlign: 'center'}">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="code" label="物料编码" width="150"></el-table-column>
        <el-table-column prop="material" label="名称" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brand" label="品牌" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specification" label="型号规格" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="article" label="货号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unit" label="单位" width="80"></el-table-column>
        <el-table-column prop="number" label="数量" width="80"></el-table-column>
        <el-table-column prop="receiving" label="到货日期" width="120"></el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editMaterial(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delMaterial(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区 -->
    <Pagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage='currentPage'/>
    <!-- 弹窗页面 -->
    <AddMaterial ref="dialog"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination.vue' //分页组件
  import AddMaterial from './components/AddMaterial.vue' //添加组件
  import importExcel from '@/assets/js/iexcel'
  import { exportJsonToExcel } from '@/assets/js/oexcel.js'
  import Moment from 'moment'

  export default{
    components:{
      Pagination,
      AddMaterial
    },
    data(){
      return{
        input: "",
        tableData: [],    //数据源
        total: 10,        //初始化分页组建总页码
        pageSize: 1,      //初始化分页组件数据条数
        type: 1,           //定义一个参数与搜索数据区分
        dialogVisible: false, //默认弹窗关闭
        currentPage: 1,     //当前页码
        
      }
    },
    methods: {
      /* 分页页码 */
      changePage(num){
        this.currentPage=num;
        if(this.type==1){
          this.materialList(num);
        }else{
          this.tableData = this.list.slice((num-1)*3,num*3)
        }
      },
      /* 物料列表 */
      materialList(page){
        this.$api.getMaterialList({
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

      /* 添加物料--弹窗 */
      changeDialog(){
        this.dialogVisible = false
      },
      /* 添加物料 */
      addMaterial(){
        this.$refs.dialog.dialogVisible = true
      },
      /* 删除物料 */
      delMaterial(index, row) {
        this.$confirm("此操作将彻底删除用户信息，是否继续?","提示",{
          confirmButtonText: "确定",
          cancelButton: "取消",
          type:"warning"
        }).then(()=>{
          //根据id删除样本信息
          this.$api.delMaterial({
            id:row.id
          }).then(res=>{
              if(res.data.status==200){
                this.materialList(1) //刷新信息页面
                this.$message({message:'删除成功!',type:'success'})
              }else{
                this.$message.error('删除失败!')
              }
            })
        }).catch(()=>{
          this.$message({type: "info", message: "已取消删除!"})
        })
      },
      /* 搜索物料 */
      searchMaterial(){
        //如果是空置则返回样本列表
        this.currentPage = 1;  //当前页码
        var val = this.input;  //绑定查询按钮获取输入的值
        //空值时返回样本列表
        if(!val){
          this.materialList(1); //初始化用户列表
          this.type = 1;    //解决搜索过后type=2,再空值搜索返回样本列表时仍然type=2，展示的数据就还是搜索数据，这步触发type=1才能真正返回样本列表。
          return
        }
        //如果不是空置,就正常检索
        this.$api.getSearchMaterial({
          search:val
        }).then(res =>{
          if(res.data.status == 200){
            this.total = res.data.result.length;
            this.tableData = res.data.result.slice(0,3); //对获取的数据进行分割处理，建议放到后台处理以减少前台的压力
            this.$date.dateFilter(res.data.result);
            this.list = res.data.result;
            this.type = 2;  //将搜索数据源编组为2
          }else{
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
          }
        })
      },
      /* 编辑物料 */
      editMaterial(index, row) {
        console.log('编辑用户');
      },

      /* 上传数据 */
      handleChange (file, fileList) {
        const tableField = ['物料编码','物料名称'],
        tableHeader = {code:'物料编码', class:'物料类别', material:'物料名称',brand:'品牌', specification:'型号规格', 
        article:'货号', unit:'单位', number:'数量', batch:'批号', serial:'序列号', price:'单价', 
        storage:'储存条件', expiration:'有效期', supplier:'供应商', liaison:'联系人', phone:'联系电话', 
        receiving:'到货日期', remarks:'备注信息', register:'登记日期', assets:'资产编号'}
        importExcel(file, tableField,tableHeader).then(k => {
          this.$api.addBatchMaterial(k).then(res=>{
            if(res.data.status==200){
              this.$message({message:res.data.msg,type:'success'});
              setTimeout(()=>{this.materialList(1);},500)//刷新
            }else {
              this.$message.error(res.data.msg)
              return false;
            };
          })
        })
      },
      
      /* 下载数据 */
      clickDownload () {
        const tableField = ['receiving','code', 'material', 'brand', 'specification', 'article','unit','number',
        'batch','serial','storage', 'expiration', 'supplier', 
        'assets', 'remarks'],
            tableHeader = {receiving:'到货日期', code:'物料编码',  material:'物料名称',brand:'品牌', specification:'型号规格', 
        article:'货号', unit:'单位', number:'数量', batch:'批号', serial:'序列号', 
        storage:'储存条件', expiration:'有效期', supplier:'供应商',
        assets:'资产编号', remarks:'备注信息'},
        tableTitle = '导出表格',
        templateData = []

        //获取选中的ids
        let sids=[]
        this.$refs.dataTable.selection.forEach(item=>{
          sids.push(item.id)
        })

        //通过ids获取数据列表
        if(sids.length>0){
          this.$api.selectMaterial({
            sids:sids,
            tableField:tableField
          }).then(res=>{
          //下载数据
          let dataArr = res.data.dataArr
          let obj = {
            header: tableHeader,
            data: dataArr,
            key: tableField,
            title: '',
            filename: '基因检测业务物料台账模板'+Moment(new Date()).format("YYYYMMDD"),
            autoWidth: true,
            sids: sids
          }
            exportJsonToExcel(obj)
            console.log("下载完成！")
          })
        }else(
          this.$message.warning('请选择数据!')
        )
       
      }


    },

    /* 生命周期函数 */
    created(){
      this.materialList(1)
    }

}



</script>

<style lang="scss" scoped>
  #material{
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
