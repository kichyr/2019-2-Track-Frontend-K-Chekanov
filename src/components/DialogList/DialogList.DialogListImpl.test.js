import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


import GenerateList  from './DialogList';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));  

it('renders with or without props', () => {
  let output = shallow(
    <GenerateList chats={[{chat_id: 0, topic: "test", lastmessage: ""}]} />
  );
  expect(output).toMatchSnapshot()

  output = shallow(
    <GenerateList chats={[{chat_id: 0, topic: "test", lastmessage: ""}]} />
  );
  expect(output).toMatchSnapshot()
});