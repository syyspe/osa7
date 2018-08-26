import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../reducers/loginReducer'
import { Table, Button, Input } from 'semantic-ui-react'

const SignUpForm = (props) => {
    const signUp = (event) => {
        event.preventDefault()
        props.createUser(getUser())
        props.history.push('/')
    }

    const getUser = () => {
        return {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            adult: document.getElementById('adult').checked
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <Table basic singleLine collapsing>
                <Table.Body>
                    <Table.Row><Table.Cell>name:</Table.Cell><Table.Cell><Input id='name' type='text' /></Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>username:</Table.Cell><Table.Cell><Input id='username' type='text' /></Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>password:</Table.Cell><Table.Cell><Input id='password' type='password' /></Table.Cell></Table.Row>
                    <Table.Row><Table.Cell>I am 18 years old:</Table.Cell><Table.Cell><Input id='adult' type='checkbox' /></Table.Cell></Table.Row>
                    <Table.Row><Table.Cell></Table.Cell><Table.Cell><Button size='tiny' onClick={signUp}>Join!</Button></Table.Cell></Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => {
            dispatch(
                createUser(user)
            )
        }
    }
}

const ConnectedSignUpForm = connect(null, mapDispatchToProps)(SignUpForm)
export default ConnectedSignUpForm