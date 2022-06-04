import React from 'react'

const Button = ({size,variant,color,text,...props})=>{
return(
    <button className={`btn btn-${variant?`outline-${color}`:color} ${size? `btn-${size}`:""}`} {...props}>{text}</button>
)
}
export default Button