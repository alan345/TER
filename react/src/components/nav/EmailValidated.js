import React from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from 'material-ui/Paper'
import Icon from 'material-ui/Icon'



function EmailValidated(props) {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    if(authToken && !userToken.emailvalidated) {
      return (
        <div className='paperOut'>
          <Paper className='paperIn'>
            <div>

              <div>
                <Icon>error_outline</Icon>{' '}
                  Email not validated. Click on the Link sent by email!
                </div>

              </div>
            </Paper>
          </div>
        )
    } else {
      return (<div></div>)
    }
  }

export default EmailValidated
