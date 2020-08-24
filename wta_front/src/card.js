import React, { Component } from "react";

var divStyle = {
    background: "#eee",
    marginTop: "50px",
    width: "14rem",
};

class SimpleCard extends Component {
    onFileUpload = () => {
        console.log(this.props);
    };

    render() {
        return (
            <div className="card" style={divStyle}>
                <div className="card-body">
                    <h5 className="card-title">
                        <b>Details</b>
                    </h5>
                    <p className="card-text" style={{ lineHeight: "3px" }}>
                        max wall thickness = {this.props.min_thickness}
                    </p>
                    <p className="card-text">
                        min wall thickness = {this.props.max_thickness}
                    </p>
                </div>
            </div>
        );
    }
}

export default SimpleCard;
