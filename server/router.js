const router = require('koa-router')();
const controller = require('../server/controller.js');

router.get('/oh', controller.getAll);
router.get('/oh/basket', controller.getBasket);
router.get('/revolut', controller.getAcc);
router.post('/revolut/transfer/:amt', controller.postTransfer);
router.post('/oh/new', controller.postDb);
router.post('/oh/:id/:investAmt/:raisedAmt', controller.putDb);


module.exports = router;