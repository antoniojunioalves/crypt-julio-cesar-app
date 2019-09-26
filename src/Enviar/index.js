import React from 'react'
import axios from 'axios';

class FileUploadForm extends React.Component {
  UPLOAD_ENDPOINT = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=64303698a48effb62677752107150d355a274937'
  // UPLOAD_ENDPOINT = 'https://hookb.in/oXojYGNGJptWlWL0Ox0g'
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }
  async onSubmit(e) {
    e.preventDefault()
    let res = await this.uploadFile(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('answer', file);

    // return await fetch(this.UPLOAD_ENDPOINT, {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'content-type': 'multipart/form-data' }
    // });

    return await axios.post(this.UPLOAD_ENDPOINT, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }

  render() {
    return (
      // <form onSubmit={this.onSubmit} encType="multipart/form-data">
      <form onSubmit={this.onSubmit}>
        <h1> React File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload File</button>
      </form>
    )
  }
}

export default FileUploadForm;