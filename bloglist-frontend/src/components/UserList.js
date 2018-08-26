import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'
import { removeUser } from './../reducers/userListReducer'

class UserList extends React.Component {

    removeUser = (event) => {
        event.preventDefault()
        this.props.removeUser(event.target.id)
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <Table collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Blogs</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.users.map(user => 
                                <Table.Row key={user._id}>
                                    <Table.Cell><Link to={`/users/${user._id}`}>{user.name}</Link></Table.Cell>
                                    <Table.Cell>{user.blogs.length}</Table.Cell>
                                    <Table.Cell><Button id={user._id} size='mini' disabled={!this.props.loggedin.admin} onClick={this.removeUser}>Remove</Button></Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userList,
        loggedin: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: (id) => {
            dispatch( removeUser(id) )
        }
    }
}

const ConnectedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)
export default ConnectedUserList