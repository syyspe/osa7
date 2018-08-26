
export const notifier = (dispatch, message, kind, timeout = 3000) => {
    dispatch({
        type: 'SHOW',
        message: message,
        kind: kind
    })

    setTimeout(() => {
        dispatch({
            type: 'CLEAR'
        })    
    }, timeout)
}