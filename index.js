const express = require('express')
const app = express()
const cors = require('cors')

const port = 3000

app.use(cors())

app.set('views', __dirname+"/views")
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


require('dotenv').config()

const main = require('./routes/main.js')()
app.use('/', main)

const boardsql = require('./routes/boardsql.js')()
app.use('/board', boardsql)

app.get('/', function(req, res){
    res.render('main')
})

// market route
// const market = require('./routes/marketplace.js')()
// app.use('/market', market)

const server = app.listen(port, function(){
    console.log("server start")
})
