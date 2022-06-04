import React from "react";
const Toolbox =()=>{
    return(<div className=" card shadow p-3 mb-2 mt-1 bg-body rounded">
        <div className="card-header">Drag to Add</div>
        <div className="card-body">
            <div className="list-group list-group-flush">
                <li className="list-group-item">
                    <button className="btn btn-outline-primary">Button</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary">Text</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary">Container</button>
                </li>
            </div>
        </div>
    </div>)
}
export default Toolbox