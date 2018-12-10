import React from 'react';
import { shallow } from 'enzyme';
import StoryBoard from '../components/storyBoard';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders', () => {
  shallow(<StoryBoard story={['Test']} />);
});
