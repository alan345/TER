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


configure({ adapter: new Adapter() })


test('Renders Cars', () => {
  const component = mount(
    <Signup/>
  )
  expect(component).toMatchSnapshot()
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
