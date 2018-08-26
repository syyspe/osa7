import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const MyMessage = ( props ) => {
    return (
        <Message 
            hidden={props.notification.message.length === 0} 
            positive={props.notification.kind === 'INFO'}
            negative={props.notification.kind === 'ERROR'}>
            <Message.Header>
                {props.notification.message}
            </Message.Header>
        </Message>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedMessage = connect(mapStateToProps)(MyMessage)
export default ConnectedMessage