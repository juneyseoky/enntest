const express = require('express')
const router = express.Router()

const sql = require('mysql2')

const connection = mysql.createConnection(
    {
        host : process.env.host,
        port : process.env.port,
        user : process.env.user,
        password : process.env.password,
        database : process.env.database
    }
)

module.exports = function(){

    // 지갑연동후 회원정보가 있는지 확인후 없으면 insert
    function checkId(wallet){
        const account = wallet.account[0] // or wallet.wallet.account[0]
        const sql = `
            select *
            from users 
            where 
            wallet = ?
        `
        connection.query(
            sql,
            account,
            function(err, result){
                if(err){
                    console.log(err)
                }else{
                    return result
                }
            }
        )
    }
    router.get('/', function(req, res){
        const wallet = req.query.wallet
        const account = wallet.account[0] // or wallet.wallet.account[0]
        const balance = wallet.balance
        const hexchainid = wallet.chainId

        // 지갑연동없이 요청했다면 메인페이지를 보여준다
        if(wallet.length == 0){
            res.send("Main")
        }else{ 
            // 지갑연동을 했다면 지갑주소값으로 checkId()통해 회원정보확인
            // 없다면 insert 있다면 지갑의 보유코인 update   
            if(checkId(account) == 0  || checkId(account) == null ){
                const sql = `
                    insert into
                    testenn.users(wallet, balance, hexchainid, created_at)
                    values
                    (?, ?, ?, now())
                `
                const values = [account, balance, hexchainid]
                connection.query(
                    sql,
                    values,
                    function(err, result){
                        if(err){
                            console.log(err)
                        }else{
                            res.send("정보저장 완료~")
                        }
                    }
                )
            }else{
                const sql =`
                    update testenn.user set
                    balance = ? 
                    where 
                    wallet = ?
                `
                const values = [balance, account]
                connection.query(
                    sql,
                    values,
                    function(err, result){
                        if(err){
                            console.log(err)
                        }else{
                            res.send("업뎃완료~")
                        }
                    }
                )
            }
        }
        // console.log(wallet)
        // res.send(true)
    })


    return router
}