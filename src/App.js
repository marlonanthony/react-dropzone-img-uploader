import React, { Component } from 'react';
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class App extends Component {
  state = {
    uploadedFileCloudinaryUrl: '',
    uploadedFile: ''
  }

  onImageDrop = files => {
    this.setState({ uploadedFile: files[0]})
    this.handleImageUpload(files[0])
  }

  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url})
      }
    })
  }

  render() {
    
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }} className='FileUpload'>
          <Dropzone 
            style={{ 
              borderRadius: '2px',
              fontSize: '15px',
              textAlign: 'center',
              margin: '50px',
              width: '20%', 
              height: 'auto', 
              padding: '5px',
              cursor: 'pointer',
              backgroundColor: 'lightblue' }}
            multiple={false}
            accept='image/*'
            onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null : 
          <div>
            <p style={{ textAlign: 'center' }}>{this.state.uploadedFile.name}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={this.state.uploadedFileCloudinaryUrl} 
                style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                alt={this.state.uploadedFile.name} />
            </div>
          </div>
          }
        </div>
        
      </div>
    );
  }
}

export default App;
