import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from 'material-ui/Paper'
import Icon from 'material-ui/Icon'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Button from 'material-ui/Button'
import SnackBarCustom from './SnackBarCustom'


class EmailValidated extends Component {

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    if(authToken && !userToken.emailvalidated) {
      return (
        <div className='paperOut'>
          <Paper className='paperIn'>
            <Icon>error_outline</Icon>{' '}
              Email not validated. Link sent by email, or {' '}
              <Button variant='raised' onClick={() => this.sendEmail()}>
                Resend
              </Button>
              <SnackBarCustom ref={instance => { this.child = instance }}/>
            </Paper>
          </div>
        )
    } else {
      return (<div></div>)
    }
  }
  sendEmail = async () => {
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
)(EmailValidated)
