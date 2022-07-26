import Moment from 'moment'
 /*
 * 1、时间格式化
 * 2、data为[{字典},]
 */
export default{
  dateFilter: function(data){
    for(var i in data){
      //console.log(data[i])
      for(var key in data[i]){
        if(isNaN(data[i][key])&&!isNaN(Date.parse(data[i][key]))){
          data[i][key] = Moment(data[i][key]).format("YYYY-MM-DD")
        }
      }
    }
    return data
  }
}
