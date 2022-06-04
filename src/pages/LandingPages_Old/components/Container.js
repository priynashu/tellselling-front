import React from 'react'

const Container= ({background,padding,fluid,children,...props})=>{
return(
    <div className={`${fluid ? "container-fluid":"container"}`} {...props}
    style={{margin:"5px 0", background,padding:`${padding}px`}}
    >{children}</div>
)
}
export default Container