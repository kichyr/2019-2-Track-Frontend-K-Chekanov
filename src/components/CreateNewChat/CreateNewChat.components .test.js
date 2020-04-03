import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import {PlusButton}  from './CreateNewChat'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it('renders with PlusButton', () => {
  const button = shallow(
    <PlusButton />
	);
  expect(button).toMatchSnapshot();
  button.find('[role="button"]').simulate('hover');
  expect(button).toMatchSnapshot()
});

it('renders CreateChatForm', () => {
	const createChatForm = shallow(
    <PlusButton />
	);
  expect(createChatForm).toMatchSnapshot();
})