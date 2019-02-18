const model = require('../server/model.js');

exports.getAll = async (ctx) => {
  try {
    const message = await model.getAll();
    ctx.body = message;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

exports.getBasket = async (ctx) => {
  try {
    const message = await model.getBasket();
    ctx.body = message;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

exports.postDb = async (ctx) => {
  try {
    await model.postDb(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

exports.putDb = async (ctx) => {
  try {
    await model.putDb(ctx.params.id, ctx.params.investAmt, ctx.params.raisedAmt);
    ctx.status = 201;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

exports.getAcc = async (ctx) => {
  try {
    const message = await model.getAcc();
    ctx.body = message;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

exports.postTransfer = async (ctx) => {
  try {
    const message = await model.postTransfer(ctx.params.amt);
    ctx.body = message;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}