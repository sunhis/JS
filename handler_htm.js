/*Create By SunLishi -----2016-11-15---*/


var http=require('http')
var $=require('cheerio')
var iconv=require('iconv-lite')
var url='http://www.cs.com.cn/ssgs/hyzx/'

 //第一种转码
  /*
  http.get(url,function(res){
  	console.log('*******开始爬取*****')
  	var html='',body=[]
  	res.on('data',function(data){
        body.push(iconv.decode(data,'GBK')) 
  	})
  	res.on('end',function(){
  		console.log(body.toString())
  		console.log('********爬去完成**')
  	})
  })
*/
//第二种转码
http.get(url,function(res){
  	console.log('*******开始爬取*****')
  	var htm='',body=[]
  	res.on('data',function(data){
        body.push(data)
  	})
  	res.on('end',function(){
        htm=iconv.decode(Buffer.concat(body), 'GBK')
  		console.log(htm)
  		console.log('********爬去完成**')
  	})
  })
