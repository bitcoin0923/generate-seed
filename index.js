
const seeds = require('./seeds').seeds
const isValidMnemonic = require('@ethersproject/hdnode').isValidMnemonic
const ethers = require('ethers')
const fs = require('fs');

const genSeedPhrase = async () => {
    let providerEth = new ethers.InfuraProvider()
    let providerBnb = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/')
    const count = 10000;
    let flag = true
    for (let c = 0; flag; c++) {
        let s = ""
        for (let index = 0; index < 12; index++) {
            let i = Math.floor(Math.random() * 2048)
            if(index != 0){
                s += (" ")
            }
            s += seeds[i]
        }
        if(isValidMnemonic(s)){
            console.log(c, s)
            let wallet = ethers.Wallet.fromPhrase(s)
            let balance1 = await providerEth.getBalance(wallet.address);
            // convert a currency unit from wei to ether
            const balanceInEth1 = ethers.formatEther(balance1)
            console.log(`balance: ${balanceInEth1} in ETH`)
            if(balanceInEth1 > 0){
                console.log(s)
                console.log(`balance: ${balanceInEth1} in ETH`)
                console.log(wallet.address)
                fs.appendFile('file.log', s + "\n" + balanceInEth1, err => {

                });                
            }
            
            let balance2 = await providerBnb.getBalance(wallet.address)
            
            // convert a currency unit from wei to ether
            const balanceInEth2 = ethers.formatEther(balance2)
            console.log(`balance: ${balanceInEth2} in BNB`)
            if(balanceInEth2 > 0){
                console.log(s)
                console.log(`balance: ${balanceInEth1} in ETH`)
                console.log(wallet.address)
                fs.appendFile('file.log', s + "\n" + balanceInEth2, err => {

                }); 
            }
            
            
        }
    }
}

    genSeedPhrase()

// newWallet = async () => {
//     let password = "Summerscent1!"

//     if (password) {
//       var randomSeed = ethers.Wallet.createRandom();

//       console.log(randomSeed.mnemonic);
//       console.log(randomSeed.address);

//       function callback(progress) {
//         //console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
//       }

//       let encryptPromise = randomSeed.encrypt(password, callback);

//       encryptPromise.then(function (json) {
//         console.log(json);
//       });
//     }
//   };

//   newWallet()