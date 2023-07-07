// const express = require('express')
// const router = express.Router()

// const mysql = require('mysql2')

// const connection = mysql.createConnection(
//     {
//         host : process.env.host,
//         port : process.env.port,
//         user : process.env.user,
//         password : process.env.password,
//         database : process.env.database
//     }
// )

// module.exports = function(){

//     // localhost:3000/market 요청 페이지
//     router.get('/', function(req, res){
//         const sql = `
//             select *
//             from testenn.nft
//             where
//             state = 'p'
//         `
//         connection.query(
//             sql,
//             function(err, result){
//                 if(err){
//                     console.log(err)
//                 }else{
//                     res.render('market',{
//                         data : result
//                     })
//                 }
//             }
//         )
//     })

//     // nft 판매 상세페이지
//     router.get('/nft?', function(req, res){

//         const values = req.query.nftaccount
//         console.log(values)
//         const sql =`
//             select *
//             from testenn.nft
//             where 
//             nftaccount = ?
//         `
//         connection.query(
//             sql,
//             values,
//             function(err, result){
//                 if(err){
//                     console.log(err)
//                 }else{
//                     console.log(result)
//                     res.render('nftdetail', {
//                         data : result
//                     })
//                 }
//             }
//         )
//     })

//     // nft 판매 등록을 위한 컬렉션 리스트
//     router.get('/nftsell?', function(req, res){
//         const owner = req.query.owner

//         const sql = `
//             select *
//             from
//             testenn.nft
//             where
//             owner = ?
//         `
//         connection.query(
//             sql,
//             owner,
//             function(err, result){
//                 if(err){
//                     console.log(err)
//                 }else{
//                     res.render('nftsell', {
//                         data : result
//                     })
//                 }
//             }
//         )
//     })

//     // nft 판매 등록 페이지
//     router.get('/nftselladd?', function(req, res){
//         const nftname = req.query.nftname
        
//         const sql = `
//             select * 
//             from testenn.nft 
//             where  
//             nftname = ?
//         `
//         connection.query(
//             sql,
//             nftname,
//             function(err, result){
//                 if(err){
//                     console.log(err)
//                 }else{
//                     res.render('nftselladd',{
//                         data : result
//                     })
//                 }
//             }
//         )
//     })

//     return router
// }