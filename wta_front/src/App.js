import axios from "axios";
import { STLViewer } from "react-stl-obj-viewer";
import React, { Component } from "react";
import SimpleCard from "./card";

class App extends Component {
    state = {
        // Initially, no file is selected
        selectedFile: null,
        min_thickness: null,
        max_thickness: null,
        stlLink: null,
        fileUploaded: null,
    };

    // On file select (from the pop up)
    onFileChange = (event) => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        console.log("zzzzz");
        console.log(event.target.files[0]);
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        console.log("aaaa");
        console.log(this.state.selectedFile);

        const url = "http://localhost:5000/";
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios.post(url, formData, config).then((resp) => {
            this.setState({ stlLink: url + resp.data.filename });
            this.setState({ min_thickness: resp.data.min_thickness });
            this.setState({ max_thickness: resp.data.max_thickness });

            this.setState({ fileUploaded: true });
        });
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.fileUploaded) {
            console.log("bbbb");
            console.log(this.state.stlLink);
            return (
                <div>
                    <div className="container1" id="div4">
                        {this.state.stlLink ? (
                            <STLViewer
                                onSceneRendered={(element) => {
                                    console.log(element);
                                }}
                                sceneClassName="test-scene"
                                url={this.state.stlLink}
                                className="obj"
                                modelColor="#FF6347"
                                width="500"
                                height="500"
                                backgroundColor="#d3d3d3"
                            />
                        ) : null}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>No File</h4>
                </div>
            );
        }
    };

    cardData = () => {
        if (this.state.fileUploaded) {
            return (
                <div>
                    <SimpleCard
                        max_thickness={this.state.max_thickness}
                        min_thickness={this.state.min_thickness}
                    />
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <div className="container" id="container">
                    <div className="form-container">
                        <form action="#">
                            <input type="file" onChange={this.onFileChange} />
                            <button onClick={this.onFileUpload}>Upload</button>
                            {this.cardData()}
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel">
                                {this.fileData()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
