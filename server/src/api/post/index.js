const Router = require('koa-router');
const post = new Router();
const postCtrl = require('./post.controller');


post.get('/list', postCtrl.list);
post.post('/write', postCtrl.write);
// post.post('/register/local', postCtrl.localRegister);
// post.post('/login/local', postCtrl.localLogin);
// post.get('/exists/:key(email|username)/:value', postCtrl.exists);
// post.post('/logout', postCtrl.logout);
// post.get('/check', postCtrl.check);


module.exports = post;