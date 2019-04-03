const Router = require("koa-router");

const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.get("/", ctx => {
  ctx.body = "hi";
});

auth.post("/register/local", authCtrl.localRegister);

module.exports = auth;
