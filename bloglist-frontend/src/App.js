import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userListReducer'
import { resumeUser } from './reducers/loginReducer'
import NavigationMenu from './components/NavigationMenu'
import BlogList from './components/BlogList'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import AddBlogForm from './components/AddBlogForm'
import UserList from './components/UserList'
import UserExpanded from './components/UserExpanded'
import BlogExpanded from './components/BlogExpanded'
import { Container } from 'semantic-ui-react'


class App extends React.Component {

    componentDidMount() {
        const resumedUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (resumedUser) {
            this.props.resumeUser(resumedUser)
        }
        this.props.initBlogs()
        this.props.initUsers()
    }

    loggedIn = () => {
        return this.props.user.logged
    }

    render() {
        return (
            <Container>
                <Message  />
                <Router>
                    <div>
                        {
                            this.loggedIn() 
                                ?
                                <div>
                                    <NavigationMenu />
                                    <Route exact path='/' render={() =>
                                        <div>
                                            <BlogList />
                                            <AddBlogForm />
                                        </div>} />
                                    <Route path='/users' render={() => <UserList />} />
                                    <Route path='/users/:id' render={({ match }) => <UserExpanded id={match.params.id} />} />
                                    <Route path='/blogs/:id' render ={({ match }) => <BlogExpanded id={match.params.id} />} />
                                </div>
                                :
                                <div>
                                    <Route exact path='/' render={() => <LoginForm />} />
                                    <Route path='/signup' render={({ history }) => <SignUpForm history={history}/>} />
                                </div>
                        }
                    </div>
                </Router>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userList: state.userList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initBlogs: () => {
            dispatch(initBlogs())
        },
        resumeUser: (user) => {
            dispatch(resumeUser(user))
        },
        initUsers: () => {
            dispatch(initUsers())
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
