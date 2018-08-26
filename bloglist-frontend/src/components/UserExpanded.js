import React from 'react'
import { connect } from 'react-redux'

class UserExpanded extends React.Component { 
    getUserName = () => {
        const user = this.props.users.find(u => u._id === this.props.id)
        if(user) {
            return user.name
        }
        return ''
    } 
    
    getBlogs = () => {
        const user = this.props.users.find(u => u._id === this.props.id)
        if(user) {
            return user.blogs
        }
        return []
    }

    render() {
        return (
            <div>
                <h2>{this.getUserName()}</h2>
                <h3>Added blogs</h3>
                <ul>
                    {
                        this.getBlogs().map(blog => 
                            <li key={blog._id}>{blog.title}</li>
                        )   
                    }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.userList
    }
}

const ConnectedUserExpanded = connect(mapStateToProps)(UserExpanded)

export default ConnectedUserExpanded