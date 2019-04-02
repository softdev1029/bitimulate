const { PORT: port, MONGO_URI: mongoURI } = process.env;

// connect db
const mongoose = require("mongoose");

module.exports = (function() {
  return {
    connect() {
      mongoose.Promise = global.Promise;
      mongoose
        .connect(mongoURI)
        .then(() => {
          console.log("db connect success");
        })
        .catch(e => {
          console.log("db connect error");
        });
    }
  };
})();
