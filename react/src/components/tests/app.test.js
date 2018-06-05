import { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Signup from '../user/auth/Signup'
import { Login } from '../user/auth/Login'

import { ApolloProvider } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { withApollo } from 'react-apollo'
import { setMockGraphQLProps } from 'react-apollo';


configure({ adapter: new Adapter() })


it('Signup', () => {
  const wrapper = shallow(
    <Signup/>
  )
  expect(wrapper).toMatchSnapshot()
})

it('Login', () => {
  const wrapper = shallow(
    <Login/>
  )
  expect(wrapper).toMatchSnapshot()
})

it('renders a email input', () => {
  const wrapper = shallow(<Login />)
  expect(wrapper.find('#email').length).toEqual(1)
})

it('email input', () => {
  const wrapper = shallow(<Login />)
  wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}})
  expect(wrapper.state('email')).toEqual('blah@gmail.com')
})


describe('Password input', () => {
  it('should respond to change event and change the state of the Login Component', () => {
    const wrapper = shallow(<Login />)
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}})
    expect(wrapper.state('password')).toEqual('cats')
  })
})



// describe('Login', () => {
//
//   // https://github.com/apollographql/apollo-test-utils/issues/30
//   beforeAll(() => {
//     setMockGraphQLProps({ data: { error: true } }); // or { loading: true }
//   });
//
//   it('Login', () => {
//     const wrapper = shallow(<Login />)
//     wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'alan345@gmail.com'}})
//     wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'adminadmin'}})
//     wrapper.find('#ok').simulate('click')
//     expect(wrapper).toMatchSnapshot()
//   })
// })
