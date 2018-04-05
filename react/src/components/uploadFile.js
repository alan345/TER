import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
        this.props.onSelectFile(body.file);
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            ref={(ref) => { this.uploadInput = ref; }}
            onChange={this.handleUploadImage}
            type="file" />
        </div>
        <br />
        {this.state.imageURL && (
          <img src={this.state.imageURL} alt="img" />
        )

        }

      </form>
    );
  }
}

export default Main;
