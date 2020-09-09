const Router = require('koa-router');
const post = new Router();
const postCtrl = require('./post.controller');


post.get('/list/:num', postCtrl.list);
post.get('/get/:id', postCtrl.get);
post.post('/write', postCtrl.write);
post.delete('/delete/:id', postCtrl.delete);


module.exports = post;