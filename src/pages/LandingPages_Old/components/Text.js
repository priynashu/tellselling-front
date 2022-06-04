import React from 'react'

const Text = ({text,fontSize,textAlign})=>{
return(
    <div>
    <p style={{fontSize:`${fontSize}px`,textAlign}}>{text}</p>
        </div>
)
}
export default Text