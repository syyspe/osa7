import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logout } from './../reducers/loginReducer'


const NavigationMenu = (props) => {

    const logoutHandler = (event) => {
        event.preventDefault()
        props.logout()
        window.history.pushState(null, null, '/')
    }
    
    return (
        <Menu borderless>
            <Menu.Item as={Link} to='/'>home</Menu.Item>
            <Menu.Item as={Link} to='/users'>users</Menu.Item>
            <Menu.Item><em>{`${props.user.username} logged in`}</em></Menu.Item>
            <Menu.Item onClick={logoutHandler}>logout</Menu.Item>  
        </Menu>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch( logout() )
        }
    }
}

const ConnectedNavigationMenu = connect(
    mapStateToProps, 
    mapDispatchToProps)(NavigationMenu)

export default ConnectedNavigationMenu