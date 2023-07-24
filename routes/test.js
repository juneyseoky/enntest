module.exports = ()=>{



    router.post("/", function(req, res){
        // users id를 select 하기 위해 지갑주소를 받아옴
        const wallet  = req.body.wallet
        let ensname = req.body.ensname
        if (!wallet) {
            console.error('Invalid or missing wallet value: ', wallet);
            res.send('Invalid or missing wallet value');
            return;
        }
        console.log('----------',wallet,ensname,'----------')
                // 받아온 wallet을 받아 해당된 users_id select
                let sql = `SELECT id FROM testenn.users WHERE wallet = ?`;
                connection.query(sql, wallet, function(err, results){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('1',results); 
                        let user_id = results[0].id; 
                        console.log('2',user_id); 

                        // select한 user_id와 선언해둔 ensname, walletd으로 nfts테이블에 
                        // 새로운 nft 등록
                        sql = `
                            INSERT INTO testenn.nfts(ensname, user_id, account)
                            VALUES (?, ?, ?)
                        `;
                        const values = [ensname, user_id, wallet];
                        connection.query(sql, values, function(err, result){
                            if(err){
                                console.log(err);
                            }else{

                                // 사용중인 ens로 수정하기 위해 nft_id를 select
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

                                    // select한 nft_id로 user테이블에 active_nft_id 수정
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