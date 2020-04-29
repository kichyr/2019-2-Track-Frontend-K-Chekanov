import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { DragAndDropImg } from './MessageForm'

jest.mock('react-mic', () => ({
  ReactMic: () => ({
    push: jest.fn(),
  }),
}))

it('renders drag and drop background', () => {
  const output = shallow(<DragAndDropImg dragging={(e) => {}} handleDragOut={(e) => {}} handleDrop={(e) => {}} />)
  expect(output).toMatchSnapshot()
})
