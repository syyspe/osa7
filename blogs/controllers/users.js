const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const utils = require('../utils/controllerUtils')

usersRouter.get('/', async (request, response) => {
    try {
        const result = await User
            .find({})
            .populate('blogs', {_id: 1, likes: 1, author: 1, title: 1, url: 1})
        const users = result.map(User.format)
        response.json(users)
    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

usersRouter.delete('/:id', async (request, response) => {
    try {
        const user = await utils.getUser(request)
        if(user.error) {
            return response.status(user.status).json({error: user.error})
        }

        if(user.admin) {
            await User.remove({_id: request.params.id})
            response.status(204).end()
        } else {
            response.status(401).json({error: 'insufficient access rights'})
        }


    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        if(!body.username || body.username.length === 0) {
            return response
                .status(400)
                .json({error: 'username not specified'})
        }

        const exists = await User.find({username: body.username})
        if(exists && exists.length > 0) {
            return response.status(400).json({error: `user ${body.username} already exists`})
        }

        if(!body.password || body.password.length < 3) {
            return response.status(400).json({error: 'password must be at least three characters long'})
        }

        const hash = await bcrypt.hash(body.password, 10)
        const newUser = new User({
            name: body.name,
            username: body.username,
            passwordHash: hash,
            adult: body.adult || true,
            admin: false,
            blogs: []
        })

        const result = await newUser.save()
        response.status(201).json(result)

    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = usersRouter