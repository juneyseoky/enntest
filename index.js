const express = require('express')
const app = express()
const cors = require('cors')
var proxy = require('express-http-proxy')

require('dotenv').config()
const port = 3000
const bodyparser = require('body-parser')

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use('/geth', proxy('http://localhost:8546'))
app.use(express.static('build'))


  // const boardsql = require('./routes/boardsql.js')()
  // app.use('/board', boardsql)

  const main = require('./routes/main.js')()
  app.use('/', main)

  const search = require('./routes/search.js')()
  app.use('/search', search)

  const ens = require('./routes/makeens.js')()
  app.use('/makeens', ens)
  

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

  app.listen(port, () => {
      console.log('Proxy server is running at http://localhost:3000')
    })