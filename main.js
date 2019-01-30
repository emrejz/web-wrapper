const cheerio = require('cheerio');
const fs=require('fs');
const request=require('request');

let url ="https://eksisozluk.com/yasam-standardini-iki-katina-cikaran-seyler--5232868";


var prmsLength = new Promise(
    function (resolve, reject) {
        request(url,(err,res,body)=>{
        if(!err &&  res.statusCode==200){
            let $ = cheerio.load(body);
            let length=parseInt($("#content").children().find("div.pager").attr("data-pagecount"))
            resolve(length);
            }
           
             else {
            let  error = new Error(err);
            reject(error); // reject
        }

    }
)});


const prmsEntry=(length)=>{
    for(let i=1;i<=length;i++)
    request(url+"?p="+i,(err,res,body)=>{
    if(!err &&  res.statusCode==200){
    let $ = cheerio.load(body);
    let entry=  $("#content").children().find("div.content").text()
    fs.appendFileSync('entry.txt',entry);
    
    }
})}

prmsLength.then(length=>prmsEntry(length))
