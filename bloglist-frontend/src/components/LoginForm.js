import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Input } from 'semantic-ui-react'
import { usernameChange, passwordChange, login } from '../reducers/loginReducer'

class LoginForm extends React.Component {
    handleEdit = (event) => {
        event.preventDefault()
        switch (event.target.name) {
            case 'username':
                this.props.usernameChange(event.target.value)
                break
            case 'password':
                this.props.passwordChange(event.target.value)
                break
            default:
                break
        }
    }

    handleLogin = (event) => {
        event.preventDefault()
        this.props.login()
    }

    render() {
        return (
            <div>
                <h2>Login to application</h2>
                <form>
                    <Table basic singleLine collapsing>
                        <Table.Body>
                            <Table.Row><Table.Cell collapsing>username</Table.Cell><Table.Cell><Input name='username' onChange={this.handleEdit} /></Table.Cell></Table.Row>
                            <Table.Row><Table.Cell>password</Table.Cell><Table.Cell><Input type='password' name='password' onChange={this.handleEdit} /></Table.Cell></Table.Row>
                            <Table.Row><Table.Cell></Table.Cell><Table.Cell><Button size='tiny' type="submit" onClick={this.handleLogin}>Login</Button></Table.Cell></Table.Row>
                            <Table.Row><Table.Cell>no account?</Table.Cell><Table.Cell><Link to='/signup'>sign up!</Link></Table.Cell></Table.Row>
                        </Table.Body>
                    </Table>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        usernameChange: (username) => {
            dispatch(usernameChange(username))
        },
        passwordChange: (password) => {
            dispatch(passwordChange(password))
        },
        login: () => {
            dispatch(login())
        }
    }
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm