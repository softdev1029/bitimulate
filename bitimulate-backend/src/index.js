require("dotenv").config();

// load environment variables
const { PORT: port } = process.env;

const Koa = require("koa");
const bodyParser = require("koa-body-parser");
const Router = require("koa-router");
const api = require("./api");
const db = require("db");
const jwtMiddleware = require("lib/middlewares/jwt");
const app = new Koa();

// db
db.connect();

const router = new Router();

router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`listen ${port}`);
});
