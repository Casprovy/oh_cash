const Koa = require('koa');
const bodypar = require('koa-bodyparser');
const router = require('../server/router.js')
const port = 3000;
const cors = require('koa-cors');

const app = new Koa();

app.use(cors());
app.use(bodypar());
app.use(router.routes());

app.listen(port, ()=>{console.log(`Server running on port ${port}`);})


