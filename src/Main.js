var express = require('express')
var router =express.Router()
var dotenv = require('dotenv')
var axios = require('axios')
let xmlParser = require('xml2json');
dotenv.config()

router.get('/',(req,res)=>{
    let xmls='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<soap:Header>'+
        '<AuthHeader xmlns="http://data.altinkaynak.com/">'+
            '<Username>'+process.env.KULLANICI_ADI+'</Username>'+
            '<Password>'+process.env.SIFRE+'</Password>'+
        '</AuthHeader>'+
    '</soap:Header>'+
    '<soap:Body>'+
        '<GetMain xmlns="http://data.altinkaynak.com/" />'+
    '</soap:Body>'+
  '</soap:Envelope>';
    axios.post('http://data.altinkaynak.com/DataService.asmx?wsdl',
    xmls,
    {headers:
    {'Content-Type': 'text/xml'}
    }).then(response=>{
    var json = xmlParser.toJson(response.data)
    var parseJson  = JSON.parse(json)
    var xml=parseJson['soap:Envelope']['soap:Body'].GetMainResponse.GetMainResult
    var xml2Json = xmlParser.toJson(xml)
    var xml2JsonParse = JSON.parse(xml2Json)
    res.json(xml2JsonParse.Kurlar.Kur)
    }).catch(err=>res.send(err));
})
module.exports = router