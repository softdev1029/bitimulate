require("dotenv").config();

// load environment variables
const { PORT: port } = process.env;

const Koa = require("koa");
const Router = require("koa-router");
const api = require("./api");
const db = require("db");
const app = new Koa();

// db
db.connect();

const router = new Router();

router.use("/api", api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`listen ${port}`);
});
