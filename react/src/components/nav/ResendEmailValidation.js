import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import SnackBarCustom from './SnackBarCustom'

class ResendEmailValidation extends Component {
  state = {
    interval : 0
  }
  render() {
    return (
      <span>
        {this.state.interval ? (
          <span>wait {this.state.interval}s to resend.</span>
        ) : (
          <Button variant='contained' onClick={() => this.sendEmail()}>
            Resend Email
          </Button>
        )}
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </span>
    )
  }
  sendEmail = async () => {
    this.startTimer()
    await this.props.sendLinkValidateEmailMutation({
      variables: {
      },
    })
    .then((result) => {
      const messageSnackBar = `Email sent successfully to ${result.data.sendLinkValidateEmail.email}!`
      this.child._openSnackBar(messageSnackBar)
    })
    .catch((e) => {
      this.child._openSnackBar(e.graphQLErrors[0].message)
    })
  }

  startTimer = () => {
    this.initTimer()
    let intervalId = setInterval(this.timer, 1000)
    this.setState({ intervalId })
  };
  timer = () => {
    if (this.state.interval > 0) {
      this.setState({ interval: this.state.interval -1 })
    } else {
      clearTimeout(this.state.intervalId)
    }
  }
  initTimer() {
    this.setState({ interval: 40 })
  }
}

const SEND_LINK_VALIDATE_EMAIL_MUTATION = gql`
  mutation sendLinkValidateEmailMutation {
    sendLinkValidateEmail {
      email
    }
  }
`

export default compose(
  graphql(SEND_LINK_VALIDATE_EMAIL_MUTATION, { name: 'sendLinkValidateEmailMutation' }),
)(ResendEmailValidation)
