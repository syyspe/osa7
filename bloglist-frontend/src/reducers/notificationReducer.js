const initialState = {
    message: '',
    kind: ''
}

const notificationReducer = (store = initialState, action) => {
    switch(action.type) {
        case 'SHOW':
            return {message: action.message, kind: action.kind}
        case 'CLEAR':
            return {...initialState}
        default:
            break
    }
    return store
}

export const notify = (message, kind, timeout = 3000) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })    
        }, timeout)

        dispatch({
            type: 'SHOW',
            message: message,
            kind: kind
        })
    }
}

export default notificationReducer