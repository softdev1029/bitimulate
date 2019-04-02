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
      console.log("[UPDATE]", name, new Date());
    } catch (e) {
      console.error(e);
    }
  }
};

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

socket.handleRefresh(() => {
  updateEntireRate();
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

async function updateEntireRate() {
  const tickers = poloniex.getTickers();
  const keys = Object.keys(tickers);
  const promises = keys.map(key => {
    ExchangeRate.updateTicker(key, tickers[key]);
  });
  try {
    await Promise.all(promises);
  } catch (e) {
    console.error(e);
    return;
  }
  console.log("Update entrie rate!");
}

db.connect();
socket.connect();

// registerInitialExchangeRate();
updateEntireRate();
