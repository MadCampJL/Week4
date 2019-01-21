import React from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};

const INITIAL_STATE = {
  accepted: [],
  rejected: []
};

const reader = new FileReader();

class UploadDropzone extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {

    acceptedFiles.forEach(file => {
      if(!this.state.accepted.includes(file)) {
        this.setState({ accepted: [...this.state.accepted, file] });
      }
    });

    this.props.onNewFile(this.state.accepted);
    
  }

  render() {
   return (
  
    <Dropzone accept="image/*" onDrop={this.onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
        let styles = {...baseStyle}
        styles = isDragActive ? {...styles, ...activeStyle} : styles
        styles = isDragReject ? {...styles, ...rejectStyle} : styles
    
        return (
          <div
            {...getRootProps()}
            style={styles}
          >
            <input {...getInputProps()} />
            <div>
              {isDragAccept ? 'Drop' : 'Drag'} files here...
            </div>
            {isDragReject && <div>Unsupported file type...</div>}
          </div>
        )
      }}
    </Dropzone>
   );
 }
}

export default UploadDropzone;