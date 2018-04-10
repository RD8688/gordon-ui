import React from 'react';
import classnames from 'classnames';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types'

class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.fileUpload.files[0]);
    }
    render() {
        const { spanText, fileName, setFileName } = this.props;
        return (
            <form onSubmit={this.handleSubmit} ref="uploadForm" encType="multipart/form-data">
                <label><input
                    type="file"
                    onChange={(event) => {
                        this.props.setFileName(this.fileUpload.files[0].name);
                       
                    }}
                    onClick={(event)=>{
                        event.target.value="";
                        this.props.setFileName(null);
                    }}
                    ref={(ref) => this.fileUpload = ref}
                /> <a></a>
                
                <p>
                        <span>{spanText}</span>{fileName}</p>
                    
                </label>
                <button
                    type="submit"
                    value="Upload"
                    className="btn btn-success"
                    data-dismiss="modal"
                >UPLOAD </button>
            </form>



        );
    };
}

Uploader.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    spanText: PropTypes.string.isRequired,
    setFileName: PropTypes.func.isRequired,
    fileName: PropTypes.string
}



export default Uploader;
