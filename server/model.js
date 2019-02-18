require('../server/db');
const request = require('request');
const mongoose = require('mongoose');
require('dotenv').config({path: '/Users/casprovy/Projects/solo/OhCash/.env'});

const token = process.env.TOKEN_REV;


const MessageSchema = mongoose.Schema({
  nickName: String,
  projTitle: String,
  projDesc: String,
  url: String,
  loanTenor: Number,
  targetAmt: Number,
  raisedAmt: Number,
  creaDate: String,
  lender: Object,
});
const MessageModel = mongoose.model('basket', MessageSchema, 'basket');

exports.getAll = () => {
  
  return MessageModel.find().sort({creaDate: -1});
}

exports.getDb = () => {
  return MessageModel.find()
}

exports.postDb = (message) => {
  const nickName = message.nickName;
  const projTitle = message.projTitle;

  return MessageModel.create(
    {
      nickName: nickName,
      projTitle: projTitle,
      projDesc: message.projDesc,
      url: message.url,
      loanTenor: message.loanTenor,
      targetAmt: message.targetAmt,
      raisedAmt: 0,
      creaDate: new Date().toISOString().slice(0,10),
      lender: {'Toma': 0},
    }
  )
}

exports.putDb = (id, investAmt, raisedAmt1) => {
  const investAmt1 = parseInt(investAmt);
  return MessageModel.findByIdAndUpdate(id, {$inc: {raisedAmt: raisedAmt1, "lender.Toma": investAmt1}} 
    )
  }
  
exports.getBasket = () => {
  return MessageModel.find({"lender.Toma":{$gt: 0}}).sort({creaDate: -1});
}

exports.getAcc = () => {
  
  

  return request(`https://sandbox-b2b.revolut.com/api/1.0/accounts`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
  }
  })
}

exports.postTransfer = (amt) => {
  const rand = Math.floor(Math.random()*10000);
  return request(`https://sandbox-b2b.revolut.com/api/1.0/transfer`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
  },
    body: JSON.stringify({
      "request_id": `e09bf88${rand}sdf9097a840c`,
      "source_account_id": "9e90c1c7-626b-4c97-8d5c-568076e424c0",
      "target_account_id": "6434c535-2416-41d7-9e82-b92d9c4a75a9",
      "amount": amt,
      "currency": "EUR",
      "description": "Investment"
    })
  }
  )
}

