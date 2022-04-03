'use strict';
var request = require("request");
const args = require('yargs').argv;
var cryptoCompare;
var usdValues;
var xrp_amount=0,btc_amount=0,eth_amount=0,amount=0;

// function to get the latest portfolio value per token in USD
var getLatestValPerTokenInUSD = function () {
    return new Promise(function (resolve) {
        
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('transactions.csv')
        });
        
	    var output = [];
        var btcOutputArr =  { "token": "BTC", "amount": btc_amount }
        var ethOutputArr =  { "token": "ETH", "amount": eth_amount }
        var xrpOutputArr =  { "token": "XRP", "amount": xrp_amount }
        
        lineReader.on('line', function (line) {

            var jsonFromLine = {};
            var lineSplit = line.split(',');
            jsonFromLine.transaction_type = lineSplit[1];
            jsonFromLine.token  =  lineSplit[2];
            jsonFromLine.amount =  lineSplit[3];
            amount = parseFloat(jsonFromLine.amount)
            
                if (jsonFromLine.token === 'ETH'){
                   
                    if( jsonFromLine.transaction_type === 'DEPOSIT' ){
                        eth_amount = parseFloat(eth_amount);
                        eth_amount = parseFloat(amount + eth_amount)
                        ethOutputArr = { "token": "ETH", "amount": eth_amount }
                        }
                    
                    else{
                        eth_amount = parseFloat(eth_amount);
                        eth_amount = parseFloat(eth_amount - amount)
                        ethOutputArr = { "token": "ETH", "amount": eth_amount }
                        }
                    
                } 
                
                else if (jsonFromLine.token === 'BTC'){
                    if( jsonFromLine.transaction_type === 'DEPOSIT' ){
                        btc_amount = parseFloat(btc_amount )
                        btc_amount = parseFloat(amount + btc_amount)
                        btcOutputArr = { "token": "BTC", "amount": btc_amount }
                    }
                    else{
                        btc_amount = parseFloat(btc_amount )
                        btc_amount = parseFloat(btc_amount - amount)
                        btcOutputArr = { "token": "BTC", "amount": btc_amount }
                    }
                }
                
                else if (jsonFromLine.token === 'XRP')
                {
                    
                    if( jsonFromLine.transaction_type === 'DEPOSIT' ){
                        xrp_amount = parseFloat(xrp_amount )
                        xrp_amount = parseFloat(amount + xrp_amount)
                        xrpOutputArr = { "token": "XRP", "amount": xrp_amount }
                    }
                    else{
                        xrp_amount = parseFloat(xrp_amount )
                        xrp_amount = parseFloat(xrp_amount - amount)
                        xrpOutputArr = { "token": "XRP", "amount": xrp_amount }
                    }
                    
                }
                
                },  function (err) {
                console.log(err);
            }  )

           
            lineReader.on('close', function (line) {
                    cryptoCompare = getUSDValues();
                    console.log("ETH Amount in close + is:  "+ethOutputArr.amount)
                    cryptoCompare.then(function (result){
                    usdValues = result;
                    console.log("Eth val:   "+usdValues.ETH.USD)
                    ethOutputArr.amount = ethOutputArr.amount * usdValues.ETH.USD;
                    btcOutputArr.amount = btcOutputArr.amount * usdValues.BTC.USD;
                    xrpOutputArr.amount = xrpOutputArr.amount * usdValues.XRP.USD;
                    output.push(ethOutputArr);
                    output.push(btcOutputArr);
                    output.push(xrpOutputArr);
                    resolve(output);
                    })
    
            });
            
    })       
}


// Retrieve USD Values from URL OFCryptoCompare
 function getUSDValues() {
    
    var cryptoURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,XRP&tsyms=USD'
    var options = {
        url: cryptoURL,
        headers: {
            'User-Agent': 'request'
                 }
    };

// Return new promise 
return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(body));
        }
    })
})

    
}


getLatestValPerTokenInUSD().then(function (result) { console.log(result) })

// Instructions, to run the command line program, install the below dependencies

// npm install request 
// npm install promise
// npm install parser
// npm install await
// npm install yargs

//To run the code type :    node .\fetchCryptoData.js