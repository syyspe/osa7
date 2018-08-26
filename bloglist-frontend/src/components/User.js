import React from 'react'
import propTypes from 'prop-types'

const User = ({name}) => {
    return (
        <div>{name} logged in</div>
    )
}

User.propTypes = {
    name: propTypes.string.isRequired
}

export default User