

const mongoose = require('mongoose');


mong = mongoose.connect('mongodb://casprovy:casprovy1@ds261755.mlab.com:61755/ohcash', function (err) {
  if (err) throw err;
  console.log("MongoDb connected!");
});


module.exports = mong;


