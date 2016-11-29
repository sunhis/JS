/*Create By SunLishi -----2016-11-15---*/
var http        =require('http')
var iconv       =require('iconv-lite')
var crawler     =require('./crawler.js').crawler
var get_htm     =require('./crawler.js').get_htm
var $           =require('cheerio')
var db_operation=require('./db.json')
var async       =require('async')
var mysql       =require('mysql')
var conn        =mysql.createConnection(db_operation.sql_option)
var now         = new Date()
var times       = now.getFullYear() + '-' + (now.getMonth() + 1) + '/' + now.getDate()
var url         ='http://news.cnstock.com/news/sns_yw/index.html'

function get_all_a(html,charset,cb){
	var lists=[]
	html('.new-list').find('a').each(function(){
		$(this).attr('href')?lists.push( $(this).attr('href') ):0
	})
     console.log(lists.length)
     cb(lists,get_info,charset)
}

function db_option(arr,get_info,charset){
     async.eachSeries(arr,function(item,next){
     	try{
     		get_info(item,charset,next)
               //next()
     	}catch(e){
     		console.log('----------------get-info-err------------------------------------')
     	}
    })
}

function get_info(url,charset,cb){
          http.get(url,function(res){
               var html='',body=[]
               res.on('data',function(data){
                    body.push(data)
               })
               res.on('end',function(){
                    console.log('url=>',url)
                    html=$.load( iconv.decode(Buffer.concat(body),charset) ) 
                    title=html('.title').text()
                    info=html('.content').text()
                    //console.log('title=>',title)
                    //console.log('info=>',info)
                   title?conn.query('INSERT INTO  tableName (?,?,?) VALUES (times,title,info);'):console.log('--------err')
                    cb?cb():0
          })
     })	
}
exports.get_all_a=get_all_a
exports.db_option=db_option
exports.get_info=get_info

crawler(url,get_all_a,'GBK',db_option)
