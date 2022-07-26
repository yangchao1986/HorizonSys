/*
1、级联选择器互转函数，目前仅设计了二级级联
 */
export default {
  toString: function(arr){//转成数据库存储的对象 '单基因遗传病检测->α地中海贫血基因检测/胚胎植入前遗传学检测->PGT-M'
    let ts = [];
    for(let i in arr){
      ts.push(arr[i].join("->"))
    }
    return ts.join("/")
  },
  toArray: function(str){//转成级联选择器认可的对象 [['单基因遗传病检测','α地中海贫血基因检测'],['胚胎植入前遗传学检测','PGT-M']]
    let arri = str.split("/")
    let arrj = []
    for(let k in arri){
      arrj.push(arri[k].split("->"));
    }
    return arrj
  },
  toList: function(dict,test){ //将数据库字符串转成浏览器显示的格式 'α地中海贫血基因检测/PGT-M'
    for(let i in dict){
      let arr = this.toArray(dict[i][test]);
      var ts = [];
      for(let k in arr){
        ts.push(arr[k].slice(-1))
      }
      dict[i][test] = ts.join("/")
    }
    return dict
  }
}
