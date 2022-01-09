const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');
const cheerio = require("cheerio");
const axios = require('axios');
const chalk = require('chalk');
const puppeteer = require('puppeteer')

// const got = require("got");





module.exports = class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {

    // let price;

    // const getPrice = async () => {
    //   const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=plant-vs-undead-token&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
    //   const json = await result.json()
    //   // console.log(json)
    //   // return json
    //   price = json['plant-vs-undead-token'].usd
    //   console.log(price)
    //   return price;
    // }

    // const getSeed = async () => {
    //   function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   }
    //   const result = await fetch(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x31471e0791fcdbe82fbf4c44943255e923f1b794&address=0x5c50d79adc20630aef122ed2cf953e377cddd0f4&tag=latest&apikey=KC79DPRU646ZCS9JACRXFMHBJTVBQADVFN`)
    //   const json = await result.json()
    //   // console.log(json)
    //   // return json
    //   let price = json.result.slice(0, -18)
    //   let price2 = numberWithCommas(price)
    //   this.client.user.setActivity(`${price2} PVU left`, { type: 'PLAYING' });
    //   console.log(price2)
    //   return price2

    // };


    // let price2;

    // function updateFunction1() {
    //   setInterval(async () => { price2 = await getSeed() }, 5000);
    //   // console.log(price2)
    // }

    // updateFunction1();



    // const getReddit = async () => {
    // get html text from reddit
    // const response = await fetch("https://bscscan.com/readContract?m=normal&a=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275&v=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275");
    // using await to ensure that the promise resolves
    // const body = await response.text();




    // async function getData() {

    //   const browser = await puppeteer.launch({
    //     'args': [
    //       '--no-sandbox',
    //       '--disable-setuid-sandbox'
    //     ]
    //   });
    //   const page = await browser.newPage();

    //   await page.goto("https://info.factorychain.io/pair/0x1ad8210bcfa0a429d5880db79bc88574f1a1ae62", {
    //     waitUntil: 'networkidle2'
    //   });

    //   let element = await page.$('#center > div > div > div.sc-cmthru.bLxWry > div > div.sc-bdVaJa.sc-htpNat.sc-EHOje.ldtrll > div:nth-child(1) > div > div.Theme__TextWrapper-sc-1b0m4uy-0.ctFdbD.css-flugrv')
    //   let value = await page.evaluate(el => el.textContent, element)
    //   value = value.substring(9, 15)
    //   console.log(value);
    //   return value;
    //   // message.channel.send("Current price: " + "`` " + value + "``" + " FPVU");
    // }





    // // }


    // let price2;

    // async function updateFunction1() {
    //   price2 = await getData();
    //   setInterval(async () => { price2 = await getData() }, 900000);
    //   // console.log(price2)
    // }

    // updateFunction1();

    this.client.user.setActivity(`Busy Landlording`, { type: 'PLAYING' });


    // let i = 0;
    // setInterval(() => this.client.user.setActivity(`FPVU: $${price2}`, { type: 'PLAYING' }), 3000);
    console.log(`${this.client.user.tag} is now ready!`);
  }
};
