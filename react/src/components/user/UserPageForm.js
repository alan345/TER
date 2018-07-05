import React from 'react'
import UploadFile from '../nav/UploadFile'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'

class UserPageForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input id='name' onChange={e => this.props.updateUserData({
              ...this.props.user,
              name: e.target.value
            })} placeholder='name' type='text' value={this.props.user.name}/>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <Input id='email' onChange={e => this.props.updateUserData({
              ...this.props.user,
              email: e.target.value
            })} placeholder='email' type='text' value={this.props.user.email}/>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='role'>Role</InputLabel>
          <Select inputProps={{
              name: 'role',
              id: 'role'
            }} onChange={e => this.props.updateUserData({
              ...this.props.user,
              role: e.target.value
            })} value={this.props.user.role}>
            <MenuItem value='CUSTOMER'>CUSTOMER</MenuItem>
            <MenuItem value='ADMIN'>ADMIN</MenuItem>
          </Select>
        </FormControl>

        <UploadFile isEditMode={true} nameFile={this.props.user.nameFile} onSelectFile={nameFile => this.props.updateUserData({
            ...this.props.user,
            nameFile: nameFile
          })}/>
      </React.Fragment>
  )
  }
}

export default UserPageForm
