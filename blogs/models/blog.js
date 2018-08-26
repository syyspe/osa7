const mongoose = require('mongoose')

const Schema = mongoose.Schema
const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: [String],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        comments: blog.comments,
        user: blog.user,
        _id: blog._id
    }
}

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog