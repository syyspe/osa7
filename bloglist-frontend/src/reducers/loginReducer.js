import loginService from './../services/login'
import userService from './../services/users'
import { notifier } from './reducerUtils'

const loginReducer = (store = { logged: false }, action) => {
    switch (action.type) {
        case 'USERNAMECHANGE':
            return { ...store, username: action.username }
        case 'PASSWORDCHANGE':
            return { ...store, password: action.password }
        case 'RESUMEUSER':
            return { ...action.data, logged: true }
        case 'LOGIN':
            return { ...action.data, logged: true }
        case 'LOGOUT':
            return { logged: false }
        default:
            break
    }
    return store
}

export const resumeUser = (user) => {
    return {
        type: 'RESUMEUSER',
        data: user
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        const user = getState().user
        if (!user) {
            return
        }
        const credentials = {
            username: user.username,
            password: user.password
        }
        const result = await loginService.login(credentials)
        if (!result.error) {
            dispatch({
                type: 'LOGIN',
                data: result
            })
            window.localStorage.setItem('loggedInUser', JSON.stringify({ ...result, logged: true }))
            notifier(dispatch, `${user.username} logged in`, 'INFO')

        } else {
            notifier(dispatch, `login failed: ${result.error}`, 'ERROR')
        }
    }
}

export const createUser = (user) => {
    return async (dispatch) => {
        const result = await userService.add(user)
        if (!result.error) {
            dispatch({
                type: 'CREATEUSER',
                data: result
            })
            notifier(dispatch, `Welcome '${result.username}'! Please login now.`, 'INFO', 10000)
        } else {
            notifier(dispatch, `user creation failed: ${result.error}`, 'ERROR')
        }

    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    return {
        type: 'LOGOUT'
    }
}

export const usernameChange = (username) => {
    return {
        type: 'USERNAMECHANGE',
        username: username
    }
}

export const passwordChange = (password) => {
    return {
        type: 'PASSWORDCHANGE',
        password: password
    }
}

export default loginReducer