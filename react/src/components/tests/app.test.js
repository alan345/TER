//
// const sum = require('./sum');
//
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });



import { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Signup from '../user/auth/Signup'
import Login from '../user/auth/Login'

import { graphql, compose } from 'react-apollo'
import { withApollo } from 'react-apollo'



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
  wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
  expect(wrapper.state('email')).toEqual('blah@gmail.com');
})


describe('Password input', () => {

 it('should respond to change event and change the state of the Login Component', () => {

  const wrapper = shallow(<Login />);
  wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

  expect(wrapper.state('password')).toEqual('cats');
 })
})
//
// import React from 'react';
// import { mount } from 'enzyme';
// import Signup from './user/auth/Signup'
//
// it('Renders the SimpleInput', () => {
//
//   const component = mount(
//     <Signup
//
//     />
//   );
//
//   expect(component).toMatchSnapshot();
// });
