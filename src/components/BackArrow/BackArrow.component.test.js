import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import BackArrow from './BackArrow'

it('renders back arrow', () => {
  const output = shallow(<BackArrow />)
  expect(output).toMatchSnapshot()
})
