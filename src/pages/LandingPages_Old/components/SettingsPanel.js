import React from "react";
const SettingsPanel =()=>{
    return(<div className="card shadow p-3 mb-5 mt-1 bg-body rounded">
        <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
                Selected
                <h5>
                    <span className="badge bg-primary">Selected Component</span>
                </h5>
            </div>
        </div>
        <div className="card-body">
            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>)
}
export default SettingsPanel