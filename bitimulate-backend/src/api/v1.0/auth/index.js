const Router = require('koa-router');

const auth = new Router();

auth.get('/', (ctx) => {
    ctx.body = 'hi';
});

module.exports = auth;