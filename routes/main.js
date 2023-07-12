const express = require('express')
const router = express.Router()
const Web3 = require('web3');
const web3 = new Web3('https://1d61-119-192-224-93.ngrok-free.app/geth/');

const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : process.env.host,
    port : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})

module.exports = ()=>{


    router.post('/', async function(req, res){
        console.log(req.body)
        const wallet = req.body.walletAddress[0]
        const walletbal =await web3.eth.getBalance(wallet)
        const balance =  walletbal / 10 ** 18
        const hexchainid = req.body.walletAddress[2]

        console.log("wallet : " + wallet)
        // console.log("balance : " + walletbal / 10 ** 18)
        console.log("hexchainid : " + hexchainid)
        
        if(wallet){
            // console.log("지갑주소 :" + wallet)
           
            const sql = `
                select *
                from testenn.users
                where 
                wallet = ?
            `
            connection.query(
                sql,
                wallet,
                function(err, result){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("검색완료")
                        console.log("검색결과 : " + JSON.stringify(result))
                                        
                        if(!result || result.length == 0){
                            console.log('1')
                                const sql = `
                                    insert into 
                                    testenn.users(wallet, balance, hexchainid, created_at)
                                    values (?, ?, ?, now())
                                `
                                const values = [wallet, balance, hexchainid]
                                connection.query(
                                    sql,
                                    values,
                                    function(err, result){
                                        if(err){
                                            console.log(err)
                                        }else{
                                            console.log("인서트 완료" )
                                        }
                                    }
                                )
                        }else{
                            console.log('2')
                                const sql = `
                                    update testenn.users set
                                    balance = ? 
                                    where 
                                    wallet = ?
                                    `
                                const values = [balance, wallet]
                                connection.query(
                                    sql,
                                    values,
                                    function(err, result){
                                        if(err){
                                            console.log(err)
                                        }else{
                                            console.log("업데이트 완료")
                                        }
                                    }
                                )
                        }
                    }
                }
            )


        }
        // const wl = JSON.stringify(wallet)
        

        console.log(wallet +"연동")
    })

    router.get("/test", function(req, res){
        res.send('test')
    })


    return router
}