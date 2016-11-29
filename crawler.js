/*Create By SunLishi -----2016-11-15---*/

var http     =require('http')
var iconv    =require('iconv-lite')
var Promise  =require('Promise')
var async    =require('async')
var $        =require('cheerio')

function public_crawler(url,handle_html,charset,cb){
    charset = charset || 'GBK'
    http.get(url,function(res){
    	html ='' ,body=[]
    	res.on('data',function(data){
           body.push(data)
    	})
    	res.on('end',function(){
    		html=$.load( iconv.decode(Buffer.concat(body),charset) )   
            handle_html(html,charset,cb)

        })
    })
}

 function promise_crawler(url,handle_html,charset,cb){
    return new Promise(function(resolve,reject){
        charset=charset||'GBK'
            http.get(url,function(res){
                html ='' ,body=[]
                res.on('data',function(data){
                   body.push(data)
                })
                res.on('end',function(){
                    html=$.load( iconv.decode(Buffer.concat(body),charset) )
                    handle_html(html,resolve,reject)        
            })
        })
    })
}
exports.crawler=public_crawler
exports.promise_crawler=promise_crawler
