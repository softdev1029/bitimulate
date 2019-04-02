const currencyPairMap = require("./currencyPairMap");
const axios = require("axios");

module.exports = (function() {
  function getCurrencyPairName(id) {
    return currencyPairMap[id.toString()];
  }
  function getTickers() {
    return axios
      .get("https://poloniex.com/public?command=returnTicker")
      .then(response => response.data);
  }

  return {
    getCurrencyPairName,
    getTickers
  };
})();
