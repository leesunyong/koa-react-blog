const Post = require('models/Post');


exports.list = async (ctx) => {
    let list = null;

    try {
        list = await Post.getList();
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


exports.delete = async (ctx) => {
    const { id } = ctx.params;

    console.log(id);

    try {
        await Post.findByIdAndRemove(id).exec();
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }

    ctx.status = 204;
};