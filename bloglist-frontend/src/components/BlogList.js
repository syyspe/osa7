import React from 'react'
import { connect } from 'react-redux'
import { removeBlog } from './../reducers/blogReducer'
import { logout } from '../reducers/loginReducer'
import { notify } from './../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

class BlogList extends React.Component {

    removeHandler = (event) => {
        event.preventDefault()
        const id = event.target.id
        const blog = this.props.blogs.find(b => b._id === id)
        if (window.confirm(`Are you sure you want to remove '${blog.title}'?`)) {
            const token = this.props.user.token
            this.props.removeBlog(id, token)
            this.props.notify(`'${blog.title}' removed`, 'INFO')
        }
    }

    logoutHandler = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedInUser')
        this.props.logout()
    }

    render() {
        const wrapper = {
            border: 'none',
            overflowY: 'scroll',
            overflowX: 'auto',
            height: '200px',
            width: '75%'
        }

        return (
            <div>
                <h2>Blogs</h2>
                <div>
                    <div style={wrapper}>
                        <Table collapsing>
                            <Table.Header>
                                <tr>
                                    <td>Title</td><td>Author</td><td> </td>
                                </tr>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.props.blogs.map(blog =>
                                        <Table.Row key={blog._id}>
                                            <Table.Cell>
                                                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                                            </Table.Cell>
                                            <Table.Cell>{blog.author}</Table.Cell>
                                            <Table.Cell>
                                                {
                                                    !blog.user || this.props.user.username === blog.user.username
                                                        ? <Button size='tiny' id={blog._id} onClick={this.removeHandler}>Remove</Button>
                                                        : null
                                                }
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        },
        removeBlog: (id, token) => {
            dispatch(removeBlog(id, token))
        },
        notify: (message, kind, timeout) => {
            dispatch(notify(message, kind, timeout))
        }
    }
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList