import userService from './../services/users'
import { notifier } from './reducerUtils'

const userListReducer = (store = [], action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return [...action.data]
        case 'REMOVE_USER':
            return [...store.filter(u => u._id !== action.id)]
        default:
            break
    }
    return store
}

export const initUsers = () => {
    return async (dispatch) => {
        const result = await userService.getAll()
        if(!result.error) {
            dispatch({
                type: 'INIT_USERS',
                data: result
            })
        } else {
            notifier(dispatch, `fetching users failed: ${result.error}`, 'ERROR')
        }
    }
}

export const removeUser = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.token
        const result = await userService.remove(id, token)
        if(!result) {
            dispatch({
                type: 'REMOVE_USER',
                id: id
            })
            notifier(dispatch, 'user removed', 'INFO', 3000)
        } else {
            notifier(dispatch, `removing user failed: ${result.error}`, 'ERROR')
        }

    }
}

export default userListReducer