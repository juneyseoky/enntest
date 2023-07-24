const express = require('express')
const router  = express.Router()
const Web3    = require('web3');
const web3    = new Web3(new Web3.providers.HttpProvider('https://1d61-119-192-224-93.ngrok-free.app/geth/'));

const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : process.env.host,
    port : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})

module.exports = ()=>{
    router.post("/", function(req, res){

        const wallet  = req.body.wallet
        let ensname = req.body.ensname
        if (!wallet) {
            console.error('Invalid or missing wallet value: ', wallet);
            res.send('Invalid or missing wallet value');
            return;
        }
        console.log('----------',wallet,ensname,'----------')

                let sql = `SELECT id FROM testenn.users WHERE wallet = ?`;
                connection.query(sql, wallet, function(err, results){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('1',results); 
                        let user_id = results[0].id; 
                        console.log('2',user_id); 
                        sql = `
                            INSERT INTO testenn.nfts(ensname, user_id, account)
                            VALUES (?, ?, ?)
                        `;
                        const values = [ensname, user_id, wallet];
                        connection.query(sql, values, function(err, result){
                            if(err){
                                console.log(err);
                            }else{
                                sql = `
                                SELECT id FROM testenn.nfts WHERE ensname = ?
                                `;
                            connection.query(sql, ensname, function(err, results){
                                if(err){
                                    console.log(err);
                                }else{
                                    const nft_id = results[0].id; 
                                    console.log("3",nft_id)
                                    console.log('4',user_id);
                                    sql = `
                                        UPDATE testenn.users SET 
                                        active_nft_id = ? WHERE id = ?
                                    `;
                                    const idValues = [nft_id, user_id];
                                    console.log(nft_id)
                                    connection.query(sql, idValues, function(err, result){
                                        if(err){
                                            console.log(err);
                                        }else{
                                            res.send("등록완료");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        return router;
}