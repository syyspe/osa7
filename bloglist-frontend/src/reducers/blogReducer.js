import blogsService from './../services/blogs'
import { notifier } from './reducerUtils'

const blogReducer = (store = [], action) => {
    let previousStore
    switch (action.type) {
        case 'INIT':
            return action.data.sort((a, b) => {return b.likes - a.likes})
        case 'CREATE':
            return store
                .concat(action.data)
                .sort((a, b) => {return b.likes - a.likes})
        case 'LIKE':
            previousStore = store.filter(b => b._id !== action.data._id)
            return previousStore
                .concat({...action.data, likes: action.data.likes + 1})
                .sort((a, b) => {return b.likes - a.likes})
        case 'REMOVE':
            previousStore = store.filter(b => b._id !== action.id)
            return [...previousStore]
        case 'COMMENT':
            previousStore = store.filter(b => b._id !== action.data._id)
            return previousStore
                .concat(action.data)
                .sort((a, b) => {return b.likes - a.likes})
        default:
            break  
    }

    return store
}

export const initBlogs = () => {
    return async (dispatch) => {
        const result = await blogsService.getAll()
        if(!result.error) {
            dispatch({
                type: 'INIT',
                data: result
            })
        } else {
            notifier(dispatch, `initializing blogs failed: ${result.error}`, 'ERROR')
        }
    }
}

export const createBlog = (blog, token) => {
    return async (dispatch) => {
        const result = await blogsService.add(blog, token)
        if(!result.error) {
            dispatch({
                type: 'CREATE',
                data: result
            })
        } else {
            notifier(dispatch, `creating blog failed: ${result.error}`, 'ERROR')
        }
    }
}


export const likeBlog = (id) => {
    return async (dispatch, getState) => {
        const template = getState().blogs.find(b => b._id === id)
        const toUpdate = {...template, likes: template.likes + 1}
        const result = await blogsService.update(toUpdate)
        if(!result.error) {
            dispatch({
                type: 'LIKE',
                data: result 
            })
        } else {
            notifier(dispatch, `liking blog failed: ${result.error}`, 'ERROR')
        }
    }
}

export const commentBlog = (id, comment) => {
    return async (dispatch) => {
        const result = await blogsService.comment(id, comment) 
        if(!result.error) {
            dispatch({
                type: 'COMMENT',
                data: result
            })
        } else {
            notifier(dispatch, `commenting blog failed: ${result.error}`, 'ERROR')
        }
    }
}

export const removeBlog = (id, token) => {
    return async (dispatch) => {
        const result = await blogsService.remove(id, token)
        if(!result.error) {
            dispatch({
                type: 'REMOVE',
                id: id
            })
        } else {
            notifier(dispatch, `removing blog failed: ${result.error}`, 'ERROR')
        }  
    }
}

export default blogReducer