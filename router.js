'use strict';

const router = require('koa-router')();

const message = require('./controllers/message.js');
//
router.get('/messages', message.getAll);
router.post('/messages', message.post);

module.exports = router;