/* eslint-disable */
/* 导入excel文件 */

/**
 * 导入excel文件实现思路分析
 *
 * 1.使用html支持上传标签从本地获取文件，例如type为file的input，el-upload等。
 * 2.利用FileReader将文件读取为二进制字符串。
 * 3.使用XLSX插件的XLSX.read()方法，将二进制字符串转换成excel文件的工作蒲对象workbook（简写成wb）。
 * 4.通过XLSX.utils.sheet_to_json()方法，从wb中获取第一张 Sheets表格数据并将其转换为json数据。
 * 5.重组json数据生成数组，即是根据自己的定义的列字段名，重新组成符合自己需求的json数据。因为从excel中提取的数据是没有字段名或字段名不符合要求的，
 * 而我们需要渲染在页面表格中又确实需要合适的字段名。
 */


/**
 * @param file 文件流
 * @param tableField 要导入的表格模板，一个数组，如：
 * tableField: ['userCode', 'userName', 'department', 'major', 'position']，其中的值
 * 为表格的字段名，注意字段的顺序应与实际的导入excel一致。
 */
 export default function importExcel (file,tableField,tableHeader) {
    return new Promise((resolve, reject) => {
      let f = file.raw // 获取文件内容
      // 通过DOM取文件数据
      let rABS = false // 是否将文件读取为二进制字符串
      let reader = new FileReader()
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = ''
        let rABS = false // 是否将文件读取为二进制字符串
        let wb // 读取完成的数据
        let outdata
        let reader = new FileReader()
        reader.onload = function (e) {
          let bytes = new Uint8Array(reader.result)
          let length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          let XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(binary), { // 手动转化
              type: 'base64',
              cellDates:true
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary',
              cellDates:true
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是表格中的值

          let arr = []
          let keyArr = Object.keys(tableHeader)
          if (keyArr.length > 0) {
            outdata.map(item1=>{
              let obj={}
              keyArr.map(item2 => {
                let h = tableHeader[item2]
                if(typeof(item1[h])=="undefined"){item1[h]='/'}
                obj[item2] = item1[h]
              })
              arr.push(obj)
            })
            console.log(arr)
          }
          // 下面是数据解析提取逻辑
          // if (tableField.length > 0) {
          //   let tempArr = Object.keys(outdata[0]) //Object.keys()获取字段的keys;Object.values()取字典的值
          //   let tempArrNew = []
          //   for (let i in tempArr) {
          //     for (let k in tableField) {
          //       if (i === k) {
          //         tempArrNew.push({fieldE: tableField[k], fieldC: tempArr[i]})
                  
          //       }
          //     }
          //   }
          //   console.log(Object.keys(tableHeader))
          //   tempArr = tempArrNew
          //   console.log(tempArr)
          //   outdata.map(item => {
          //     let obj = {}
          //     tempArr.map(temp2 => {
          //       //obj[temp2.fieldE] = item[temp2.fieldC]
          //       obj[temp2.fieldE] = item[temp2.fieldE]  //将读入的文件数据的指定字段赋值
          //     })
          //     arr.push(obj)
          //   })
          // }else{ //如果没有指定字段则导入全部字段数据
          //   arr = outdata
          // }

  
          resolve(arr)
        }
        reader.readAsArrayBuffer(f)
      }
  
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    })
  }