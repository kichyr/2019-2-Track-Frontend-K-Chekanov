import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import BurgerButton from './BurgerButton'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

it('renders with or without props', () => {
  const output = shallow(<BurgerButton />)
  expect(output).toMatchSnapshot()
})
