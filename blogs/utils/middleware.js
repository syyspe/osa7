const logger = (request, response, next) => {
    try {
        if(process.env.NODE_ENV === 'test') {
            return next()
        }
        const bodyCopy = {...request.body}
        if(bodyCopy.password) {
            bodyCopy.password = '*****'
        } 
        console.log('Method:', request.method)
        console.log('Path:', request.path)
        console.log('Body:', bodyCopy)
        console.log('---')
        next()
    } catch(error) {
        console.log(`logging failed: ${error}`)
        next()
    } 
    
}

const getToken = (request, response, next) => {
    try {
        const auth = request.get('Authorization')
        if (auth && auth.toLowerCase().startsWith('bearer ') && auth.length > 10) {
            const token = auth.split(' ')[1]
            request.token = token
        } else {
            request.token = null
        }
    } catch(error) {
        request.token = null
    }
    next()
}

const error = (request, response) => {
    response.status(404).json({error: 'not found'})
}

module.exports = {
    logger,
    error,
    getToken
}
