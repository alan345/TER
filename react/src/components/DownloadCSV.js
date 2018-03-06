import React from 'react'
import axios from 'axios'
import { AUTH_TOKEN } from '../constants/constants'
var fileDownload = require('react-file-download');



export default class DownloadCSV extends React.Component {
  downloadCSV() {
    const token = localStorage.getItem(AUTH_TOKEN)
    const authorizationHeader = token ? `Bearer ${token}` : null
    let config = {
      headers: {
        'Authorization': authorizationHeader
      }
    }
    axios.get('http://localhost:8000', config)
    .then((response) => {
      console.log(response)
      fileDownload(response.data, new Date() + '_export.csv');
    });
  }


  render() {


    return (
      <button
        className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black pointer"
        onClick={() => this.downloadCSV()}>downloadCSV</button>

    )
  }
}
