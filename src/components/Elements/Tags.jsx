import React, { Component } from 'react'
import { memo } from 'react';

class Tags extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        console.log("Child Rendered");
        return (
            <p style={(this.props.selected) ? { color: 'blue' } : { color: 'black' }}>{this.props.name}</p>
        )
    }
}

export default React.memo(Tags)
