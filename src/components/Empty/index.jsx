import React from 'react'
import EmptyImage from '../../assets/empty.gif'
function Empty() {
  return (
    <div>
        <center>
            <img style={{height:'350px',width:'auto'}} src={EmptyImage}/>
        </center>
    </div>
  )
}

export default Empty;