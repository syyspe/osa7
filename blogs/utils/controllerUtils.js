const jsonToken = require('jsonwebtoken')
const User = require('../models/user')
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
}

module.exports = {
    getUser
}