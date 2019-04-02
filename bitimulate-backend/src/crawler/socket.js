const WebSocket = require("ws");

module.exports = (function() {
  let _client = null;
  let _messageHandler = message => {
    console.warn("message handler not defined!");
  };
  let _refreshHandler = () => {
    console.warn("refresh handler not defined!");
  };

  const handlers = {
    open: async () => {
      console.log("ws opened");
      await _refreshHandler();
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
    handleRefresh: handler => {
      _refreshHandler = handler;
    },
    connect,
    reconnect,
    get getClient() {
      return _client;
    }
  };
})();
