require("dotenv").config();
const poloniex = require("lib/poloniex");
const db = require("db");
const ExchangeRate = require("db/models/ExchangeRate");

db.connect();

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers();

  const keys = Object.keys(tickers);
  const promises = keys.map(key => {
    const data = Object.assign({ name: key }, tickers[key]);
    const exchangeRate = new ExchangeRate(data);
    return exchangeRate.save();
  });

  await promises;
  console.log("save success");
}

registerInitialExchangeRate();
