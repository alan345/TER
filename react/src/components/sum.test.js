// 
// const sum = require('./sum');
//
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });



import React from 'react'
import CarsPageList from './car/CarsPageList'
import renderer from 'react-test-renderer'

test('Renders Cars', () => {
  const component = renderer.create(
    <CarsPageList/>
  )
  expect(component).toMatchSnapshot()
})
