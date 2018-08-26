const blogsRouter = require('express').Router()
//const jsonToken = require('jsonwebtoken')
const Blog = require('../models/blog')
//const User = require('../models/user')
const utils = require('../utils/controllerUtils')
/*
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const getUser = async (request) => {
    try {
        if(request.token === null) {
            return {status: 401, error: 'authorization failed, no token found'}
        }
 
        const userObject = jsonToken.verify(request.token, process.env.SECRET)
        
        if(!userObject.id) {
            return {status: 401, error: 'authorization failed, invalid token'}
        }

        const user = await User.findById(userObject.id)
        if(!user) {
            return {status: 500, error: 'user not found'}
        }

        return user

    } catch(error) {
        return {status: 401, error: `authorization failed, ${error.message}`}
    }
} */

blogsRouter.get('/', async (request, response) => {
    try {
        const result = await Blog
            .find({})
            .populate('user', {_id: 1, username: 1, name: 1})
        const blogs = result.map(Blog.format)
        response.json(blogs)
    } catch(error) {
        response
            .status(500)
            .json({error: error.message})
    }
})

blogsRouter.post('/', async (request, response) => {
    try {     
        const body = request.body

        if (!body.title || body.title.length === 0) {
            return response.status(400).json({ error: 'title is mandatory' })
        }

        if (!body.url || body.url.length === 0) {
            return response.status(400).json({ error: 'url is mandatory' })
        }

        const user = await utils.getUser(request)
        if(user.error) {
            return response.status(user.status).json({error: user.error})
        }

        const newBlog = new Blog({
            title: body.title,
            author: body.author || 'unknown author',
            url: body.url,
            likes: body.likes || 0,
            user: user
        })

        const result = await newBlog.save()
        user.blogs.push(newBlog._id)
        await user.save()
        
        response.json(result)

    } catch(error) {
        return {status: 500, error: `unexpected error ${error.message}`}
    }
})



blogsRouter.delete('/:id', async (request, response) => {
    try {
        const user = await utils.getUser(request)

        if(user.error) {
            return response.status(user.status).json({error: user.error})
        }

        const blog = await Blog.findById(request.params.id)

        if(!blog) {
            return response.status(204).json({info: `blog id ${request.params.id} not found`})
        }
 
        if(blog.user && user._id.toString() !== blog.user.toString()) {
            return response.status(401).json({error: 'only blogs added by user, or userless blogs, can be deleted'})
        }
        
        await Blog.remove({_id: request.params.id})
        response.status(204).end()

    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
        const body = request.body
        if(!body.comment) {
            return response.status(400).json({error: 'comment is mandatory'})
        }

        const blog = await Blog.findById(request.params.id)
        blog.comments.push(body.comment)
        await blog.save()
        return response.status(200).json(blog)

    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        if(!body.title) {
            return response.status(400).json({error: 'title is mandatory'})
        }
    
        if(!body.url) {
            return response.status(400).json({error: 'url is mandatory'})
        }

        if(!body.likes) {
            return response.status(400).json({error: 'likes is mandatory'})
        }

        const updated = await Blog
            .findByIdAndUpdate(request.params.id, body)
            .populate('user', {name: 1, username: 1})
        
        if(updated) {
            return response.status(200).send(updated)
        }
        return response.status(404).json({error: 'blog not found'})
        
    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = blogsRouter