import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, commentBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'

class BlogExpanded extends React.Component {
    getBlog = () => {
        const blog = this.props.blogs.find(b => b._id === this.props.id)
        return blog ? blog : {
            title: '', 
            author: '', 
            url: '', 
            user: {name: ''},
            comments: []
        }
    }

    likeBlog = (event) => {
        event.preventDefault()
        this.props.likeBlog(this.props.id)
    }

    commentBlog = (event) => {
        event.preventDefault()
        const comment = document.getElementById('comment').value
        if(comment && comment.length > 0) {
            this.props.notify(`you commented '${comment}'`, 'INFO')
            this.props.commentBlog(this.props.id, comment)
        }
    }

    getKey = () => {
        return Math.floor(Math.random() * 1000000).toString(10)
    }

    render() {
        const blog = this.getBlog()
        return  (
            <div>
                <h2>{blog.title} by {blog.author}</h2>
                <div>
                    <a href={blog.url}>{blog.url}</a>
                    <br /><br />
                    <div>likes: {blog.likes}&nbsp;<button onClick={this.likeBlog}>Like</button></div>
                    <br />
                    <div>Added by {blog.user.name}</div>
                </div>
                <h3>Comments</h3>
                <ul>
                    {
                        blog.comments.map(comment => <li key={this.getKey()}>{comment}</li>)
                    }
                </ul>
                <table>
                    <tbody>
                        <tr key={this.getKey()}><td>comment</td><td><input id='comment' /></td></tr>
                        <tr key={this.getKey()}><td></td><td><button onClick={this.commentBlog}>Submit</button></td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeBlog: (id) => {
            dispatch( likeBlog(id) )
        },
        commentBlog: (id, comment) => {
            dispatch( commentBlog(id, comment) )
        },
        notify: (message, kind, timeout) => {
            dispatch( notify(message, kind, timeout) )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const ConnectedBlogExpanded = connect(
    mapStateToProps, 
    mapDispatchToProps)(BlogExpanded)
export default ConnectedBlogExpanded