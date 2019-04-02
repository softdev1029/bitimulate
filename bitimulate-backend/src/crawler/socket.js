const WebSocket = require("ws");

module.exports = (function() {
  let _client = null;
  let _messageHandler = message => {
    console.warn("message handler not defined!");
  };

  const handlers = {
    open: () => {
      console.log("ws opened");
      // subscribe to ticker
      _client.send(`{"command": "subscribe", "channel": "1002"}`);
    },
    message: data => {
      // console.log("received:=" + data);
      _messageHandler(data);
    }
  };

  const reconnect = () => {
    console.log("reconnecting...");
    setTimeout(connect, 100);
  };

  const connect = () => {
    _client = new WebSocket("wss://api2.poloniex.com");
    _client.on("open", handlers.open);
    _client.on("message", handlers.message);
    _client.on("close", reconnect);
  };

  return {
    handleMessage: handler => {
      _messageHandler = handler;
    },
    connect,
    reconnect,
    get getClient() {
      return _client;
    }
  };
})();
