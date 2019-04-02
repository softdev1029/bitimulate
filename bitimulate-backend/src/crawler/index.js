require("dotenv").config();
const poloniex = require("lib/poloniex");
const db = require("db");
const socket = require("./socket");
const ExchangeRate = require("db/models/ExchangeRate");
const { parseJSON } = require("lib/common");

const handlers = {
  "1002": async data => {
    if (!data) return;
    const converted = poloniex.convertToTickerObject(data);
    const { name, ...rest } = converted;
    if (!name) return;
    if (name === "NULL_NULL") return;

    try {
      await ExchangeRate.updateTicker(name, rest);
    } catch (e) {
      console.error(e);
    }
  }
};
db.connect();
socket.connect();
socket.handleMessage(message => {
  const parsed = parseJSON(message);
  if (!parsed) {
    return null;
  }

  const [type, meta, data] = parsed;
  //console.log(parsed);
  if (handlers[type]) {
    handlers[type](data);
  }
});

async function registerInitialExchangeRate() {
  // temp remove old documents
  await ExchangeRate.drop();

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
