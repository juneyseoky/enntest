const express = require('express')
const app = express()

const port = 3000

app.set('views', __dirname+"/views")
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

// const session = require('express-session') 

// app.use(
//     session(
//         {
//             secret : process.env.secret,
//             resave : false,
//             saveUninitialized : false,
//             cookie : {
//                 maxAge : 60000 // 1000당 1초
//             }
//         }
//     )
// )

require('dotenv').config()

const main = require('./routes/main.js')()
app.use('/', main)

const boardsql = require('./routes/boardsql.js')()
app.use('/board', boardsql)

// app.get('/', function(req, res){
//     res.render('main')
// })

// market route
const market = require('./routes/marketplace.js')()
app.use('/market', market)

const server = app.listen(port, function(){
    console.log("server start")
})
