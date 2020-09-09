const Post = require('models/Post');


exports.list = async (ctx) => {
    
    const { num } = ctx.params;

    let list = null;
    try {
        list = await Post.getList();
        list = list.slice(num, num + 3);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = list;
}

exports.write = async(ctx) => {
    const {
        writer,
        title,
        content
    } = ctx.request.body;

    const post = new Post({
        writer,
        title,
        content
    });

    try {
        await post.save();
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = post;
};


exports.get = async (ctx) => {
    const { id } = ctx.params;

    let result = null;
    try {
        result = await Post.findById(id);

    } catch (e) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body = result;
}


exports.delete = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Post.findByIdAndRemove(id);
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }

    ctx.status = 204;
};