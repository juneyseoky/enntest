const express = require('express')
const route = express.Router()

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.host,
    pool : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})



module.exports = function(){

    route.get("/postAll?", function(req, res){
        const wallet = req.query.wallet
        
        const sql = `
            select count(*) cnt from testenn.posts p 
            join testenn.users u on u.id = p.writer_user_id
            where u.wallet = ?
        `
        connection.query(
            sql,
            wallet,
            function(err, post_c){
                if(err){
                    console.log(err)
                }else{
                   // console.log(result[0].cnt)
                   res.send(JSON.stringify(post_c[0].cnt))
                }
                   
            }
        )
        
    })
    route.get("/commentsAll?", function(req, res){
        const wallet = req.query.wallet
        console.log(wallet)

        const sql = `
            select count(*) cnt from testenn.comments c
            join testenn.users u on u.id = c.writer_user_id
            where u.wallet = ?
        `
        connection.query(
            sql,
            wallet,
            function(err, comments_c){
                if(err){ 
                    console.log(err)
                }else{
                    res.send(JSON.stringify(comments_c[0].cnt))
                }
            }
        )
    })
    route.get("/usingName?", function(req, res){
        const wallet = req.query.wallet
        console.log("사용중인이름 : " + wallet)

        const sql = `
            select n.ensname name from testenn.users u 
            join testenn.nfts n on u.active_nft_id = n.id
            where u.wallet = ?
        `

        connection.query(
            sql,
            wallet,
            function(err, usingName){
                if(err){
                    console.log(err)
                }else{
                    res.send( usingName )
                }
            }
        )

        route.get("/holdName?", function(req, res){
        const wallet = req.query.wallet

        const sql =`
            select n.ensname from testenn.users u
            join testenn.nfts n on u.id = n.user_id
            where u.wallet = ?
        `
        connection.query(
            sql,
            wallet,
            function(err, holdname){
                if(err){
                    console.log(err)
                }else{
                    res.send( holdname)
                }
            }
        )

        })
        
    })

    return route
}