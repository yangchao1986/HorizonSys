//连接数据库 1 安装mysql 2 创建连接
const mysql = require('mysql')

//创建数据库连接
const client = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'labmana',
  port:'3306'
})


/* 
* 1、封装数据库操作语句SQL语句,arr插入数据，callback回调结果
* 2、const sql = "insert into project values (null,?,?,?,?,?,?,?,'',1,'','',?,?)",'?'按顺序从arr中取值
  3、var arr = [title, image, sellPoint, price, cid, category, num, descs, paramsInfo];
*/
function sqlFun(sql,arr,callback){
  client.query(sql,arr,function(error,result){
    if(error){
      console.log('数据库连接错误');
      return;
    }
    callback(result)
  })
}

module.exports= sqlFun
