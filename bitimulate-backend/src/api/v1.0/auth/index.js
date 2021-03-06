const Router = require("koa-router");

const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.get("/", ctx => {
  ctx.body = "hi";
});

auth.get("/exists/email/:email", authCtrl.checkEmail);
auth.get("/exists/display-name/:displayName", authCtrl.checkDisplayName);
auth.post("/register/local", authCtrl.localRegister);
auth.post("/login/local", authCtrl.localLogin);

module.exports = auth;
