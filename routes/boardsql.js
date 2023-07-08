const express = require('express')
const router = express.Router()

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.host,
    pool : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
})



module.exports = function(){
    //조회수 증가하는 function
    // function viewincrement(_bno){
    //     const sql =`
    //         update contents set
    //         count = count + 1
    //         where
    //         bo_no = ?
    //     `
    //     const values = _bno
    //     connection.query(
    //         sql,
    //         values,
    //         function(err, result){
    //             if(err){
    //                 console.log(err)
    //             }
    //         }
    //     )
    // }

    // 글쓰기를 눌렀을때 글쓰기 폼으로 이동
    router.get('/writer', function(req, res){
        res.render('writer')
    })
    // localhost:3000/board 요청이 들어올시 게시판 목록
    router.get('/', function(req, res){
        const sql = `
        select p.*, un.*
        from testenn.posts p join
        (select u.*,n.ensname 
        from testenn.users u join 
        testenn.nfts n on u.active_nft_id = n.id) un
        order by p.created_at desc;
    `
    connection.query(
        sql,
        (err , result)=>{
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log(result)
                res.render('board',{
                    data : result
                })
            }
        }
    )
    })
    // 상세보기 눌렀을때마다 조회수 증가 해당 글번호를 가져와 보여주고
    // 
    router.get('/boardDetail?', function(req, res){
        const id = req.query.id

        //query로 받아온 글번호로 조회수증가
        //viewincrement(bo_no)
        let sql = `
            select
            *
            from 
            testenn.posts
            where
            id = ?
        `
        connection.query(
            sql,
            id,
            function(err, result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result[0])
                    res.render('boardDetail.ejs', {
                        data : result[0]
                    })
                }

            }
        )
    })

    // 글쓰기
    router.post('/boardregister', function(req, res){
        const writer = req.body._writer
        const title = req.body._title
        const content = req.body._content
        const wallet = req.body._wallet

        const sql =`
            insert
            into
            testenn.posts(writer_user_id, contents, created_at)
            values
            (?, ?, now())
        `
        const values = [writer, content]

        connection.query(
            sql,
            values,
            function(err, result){
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/board')
                }
            }
        )
    })
    // 글 삭제
    router.get('/contentdel/:_bo_no', function(req, res){
        const id = req.params._id

        const sql =`
            delete 
            from 
            testenn.posts
            where
            id = ?
        `
        connection.query(
            sql,
            id,
            function(err, result){
                if(err){
                    console.log(err)

                }else{
                    res.redirect('/board')
                }
            })
        
    })
    // 글 수정 폼
    router.get('/contentup:_bo_no', function(req, res){
        const id = req.params._id

        const sql = `
            select
            *
            from
            testenn.posts
            where
            bo_no = ?
        `
        connection.query(
            sql,
            id,
            function(err, result){
                if(err){
                    console.log(err)
                }else{
                    res.render('conupdate.ejs', {
                        data : result[0]
                    })
                }
            }
        )
    })
    // 글 수정
    router.post('/boardup', function(req, res){
        const id = req.body._id
        const content = req.body._content

        const sql =`
            update 
            testenn.posts
            set
            contents = ?,
            updated_at = ?
            where
            bo_no = ?
        `
        const values = [content, now(), id]

        connection.query(
            sql,
            values,
            function(err, result){
                if(err){
                    console.log(err)
                }else{
                    res.redirect('/board/boardDetail'+bno)
                }
            }
        )
    })
    // return 값이 없으면 Route() 미들웨어함수 오류
    return router
}