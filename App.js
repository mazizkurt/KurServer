var express = require('express')
var app =express()
var cors = require('cors')
var dotenv = require('dotenv')
var Altin = require('./src/Altin')
var Dolar = require('./src/Dolar')
var Main = require('./src/Main')
dotenv.config()
app.use(cors())
app.use('/',(req,res,next)=>{
    var api_key = req.query.api_key;
    if(api_key)
        if(api_key == process.env.api_key)
            next()
        else
            res.json({success:false,message:'Geçersiz Api Key'})
    else
        res.json({success:false,message:'Bir anahtar belirtin!'})
})
app.use('/altin',Altin)
app.use('/dolar',Dolar)
app.use('/main',Main)

app.listen(process.env.port,()=>console.log('Server Çalışıyor.'))