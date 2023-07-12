const express = require('express')
const app = express()
const cors = require('cors')

const port = 3000

// let corsOptions = {
//    origin: "*", // 출처 허용 옵션
//    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
//  }
  
app.use(cors())

// app.set('views', __dirname+"/views")
// app.set("view engine" , "ejs")
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


require('dotenv').config()

const main = require('./routes/main.js')()
app.use('/', main)

const boardsql = require('./routes/boardsql.js')()
app.use('/board', boardsql)

const myPage = require('./routes/myPage.js')()
app.use('/myPage', myPage)

app.get('/', function(req, res){
    res.render('main')
})

// market route
// const market = require('./routes/marketplace.js')()
// app.use('/market', market)

const server = app.listen(port, function(){
    console.log("server start")
})
