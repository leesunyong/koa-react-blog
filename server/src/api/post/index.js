const Router = require('koa-router');
const post = new Router();
const postCtrl = require('./post.controller');


post.get('/list', postCtrl.list);
post.post('/write', postCtrl.write);
post.delete('/delete/:id', postCtrl.delete);


module.exports = post;