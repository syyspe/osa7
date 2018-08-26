import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userListReducer from './reducers/userListReducer'
import newBlogReducer from './reducers/newBlogReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    blogs: blogReducer,
    user: loginReducer,
    newBlog: newBlogReducer,
    userList: userListReducer,
    notification: notificationReducer
})


const store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store