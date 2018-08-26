import blogsService from './../services/blogs'

const initialState = {
    title: '',
    author: '',
    url: ''
}

const newBlogReducer = (store = initialState, action) => {
    switch(action.type) {
        case 'TITLECHANGE':
            return {...store, title: action.newTitle}
        case 'AUTHORCHANGE':
            return {...store, author: action.newAuthor}
        case 'URLCHANGE':
            return {...store, url: action.newUrl}
        case 'SUBMIT':
            return {...initialState}
        default:
            break
    }
    return store
}

export const titleChange = (title) => {
    return {
        type: 'TITLECHANGE',
        newTitle: title
    }
}

export const authorChange = (author) => {
    return {
        type: 'AUTHORCHANGE',
        newAuthor: author
    }
}

export const urlChange = (url) => {
    return {
        type: 'URLCHANGE',
        newUrl: url
    }
}

export const submit = () => {
    return async (dispatch, getState) => {
        const newBlog = { ...getState().newBlog }
        const token = getState().user.token
        const result = await blogsService.add(newBlog, token)
        if(!result.error) {
            dispatch({
                type: 'SUBMIT'
            })
            dispatch({
                type: 'CREATE',
                data: result
            })
        }
    }
}

export default newBlogReducer