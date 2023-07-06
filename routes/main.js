const express = require('express')
const router = express.Router()


module.exports = function(){
    router.get('/', function(req, res){
        const wallet = req.query.wallet

        console.log(wallet)
        res.send(true)
    })


    return router
}