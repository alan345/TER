import React from 'react'
import CarsPageList from './car/CarsPageList'
import renderer from 'react-test-renderer'

test('Renders Cars', () => {
  const component = renderer.create(
    <CarsPageList/>
  )
  expect(component).toMatchSnapshot()
})
