import React from 'react'
import { connect } from 'react-redux'
import { titleChange, authorChange, urlChange, submit } from './../reducers/newBlogReducer'
import { notify } from './../reducers/notificationReducer'
import { Button, Input, Table, Transition } from 'semantic-ui-react'

class AddBlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formVisible: false
        }

    }

    toggle = () => {
        this.setState({ formVisible: !this.state.formVisible })
    }


    editHandler = (event) => {
        event.preventDefault()
        switch (event.target.name) {
            case 'newTitle':
                this.props.titleChange(event.target.value)
                break
            case 'newAuthor':
                this.props.authorChange(event.target.value)
                break
            case 'newUrl':
                this.props.urlChange(event.target.value)
                break
            default:
                break
        }
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.submit()
        this.props.notify(`you added '${document.getElementById('nt').value}'`, 'INFO')
        this.clearValues()
        this.toggle()

    }

    clearValues = () => {
        document.getElementById('nt').value = ''
        document.getElementById('na').value = ''
        document.getElementById('nu').value = ''
    }

    render() {
        return (
            <div>
                <br/>
                <Button size='tiny' content='Add new' onClick={this.toggle} />
                <Transition visible={this.state.formVisible} >
                    <form>
                        <Table basic singleLine collapsing>
                            <Table.Body>
                                <Table.Row><Table.Cell>title</Table.Cell><Table.Cell><Input id='nt' name='newTitle' onChange={this.editHandler} /></Table.Cell></Table.Row>
                                <Table.Row><Table.Cell>author</Table.Cell><Table.Cell><Input id='na' name='newAuthor' onChange={this.editHandler} /></Table.Cell></Table.Row>
                                <Table.Row><Table.Cell>url</Table.Cell><Table.Cell><Input id='nu' name='newUrl' onChange={this.editHandler} /></Table.Cell></Table.Row>
                                <Table.Row><Table.Cell></Table.Cell><Table.Cell><Button size='tiny' type='submit' onClick={this.submitHandler}>Create</Button></Table.Cell></Table.Row>
                            </Table.Body>
                        </Table>
                    </form>
                </Transition>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        titleValue: state.newBlog.title,
        authorValue: state.newBlog.author,
        urlValue: state.newBlog.url
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        titleChange: (title) => {
            dispatch(
                titleChange(title)
            )
        },
        authorChange: (author) => {
            dispatch(
                authorChange(author)
            )
        },
        urlChange: (url) => {
            dispatch(
                urlChange(url)
            )
        },
        submit: () => {
            dispatch(
                submit()
            )
        },
        notify: (message, kind, timeout) => {
            dispatch(
                notify(message, kind, timeout)
            )
        }
    }
}

const ConnectedAddBlogForm = connect(mapStateToProps, mapDispatchToProps)(AddBlogForm)
export default ConnectedAddBlogForm