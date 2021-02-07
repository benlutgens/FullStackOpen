import React from 'react'

const Notification = ({message, type}) => {
    const styles = {
        error: {
            color: 'red',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px'
        },
        success: {
            color: 'green',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px'
        }
    }

    if (message === null) {
        return null
    }
    let thisStyle = (type === 'error' ? styles.error : styles.success)
    return (
        <div style={thisStyle}>
            {message}
        </div>
    )
}

export default Notification