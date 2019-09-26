import React from 'react'
import axios from 'axios';

// Exemplo: https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/
class FileUploadForm extends React.Component {
  UPLOAD_ENDPOINT = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=64303698a48effb62677752107150d355a274937'
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
    console.log(res.data);
  }

  onChange(e) {
    console.log(e.target.files)
    this.setState({ file: e.target.files[0] })
  }

  async uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append(file.file, file.name);

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
      <form onSubmit={this.onSubmit}>
        <h1> React File Upload Example</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload File</button>
      </form>
    )
  }
}

export default FileUploadForm;