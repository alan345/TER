import React from "react"
import ImageTemplate from "./ImageTemplate"
import { AUTH_TOKEN } from "../../constants/constants"

class UploadFile extends React.Component {
  state = {
    isEditMode: true,
    imageURL: ""
  };
  uploadInput;

  componentDidMount() {
    if (this.props.nameFile) {
      this.setState({
        isEditMode: this.props.isEditMode,
        imageURL: this.props.nameFile
      })
    }
  }

  handleUploadImage(ev) {
    ev.preventDefault()
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const data = new FormData()
    data.append("file", this.uploadInput.files[0])

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization: "Bearer " + authToken
      })
    }).then(response => {
      response.json().then(body => {
        this.setState({ imageURL: body.file })
        this.props.onSelectFile(body.file)
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.isEditMode && (
          <form onSubmit={this.handleUploadImage.bind(this)}>
            <input
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
              ref={ref => {
                this.uploadInput = ref
              }}
              onChange={this.handleUploadImage.bind(this)}
              type="file"
            />
          </form>
        )}
        <br />
        {this.state.imageURL && (
          <ImageTemplate nameFile={this.state.imageURL} />
        )}
      </div>
    )
  }
}

export default UploadFile
