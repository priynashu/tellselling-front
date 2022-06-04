import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export class Loading extends Component {
    render() {
        return (
            <>
                <div style={{ margin: 'auto', width: '100%', padding: '10px', marginBottom: '20px' }}>
                    <Spinner style={{ float: 'left', marginTop: '-6px', marginRight: '10px', color: '#776cf7' }} animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <b style={{ color: '#776cf7' }}>Loading</b>
                </div>
            </>

        )
    }
}

export default Loading