import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class Api extends React.Component {
  state = {
    message: ''
  }
  callApi() {
    axios.get(`http://localhost:4000/user`)
      .then(res => {
        this.setState({
          message: res.data
        })
      })
      .catch(function () {
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <h2>API</h2>
            <Button onClick={()=>this.callApi()} variant='contained' color='primary'>
              Call API
            </Button>
            {this.state.message && (
              <Paper>
                <pre>{JSON.stringify(this.state.message, null, 2) }</pre>
              </Paper>
            )}
          </Paper>
        </div>
    </React.Fragment>
    )
  }
}

export default Api
