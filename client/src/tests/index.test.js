import React from 'react';
import { shallow, configure } from 'enzyme';
import CreativeCollab from '../components/app';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<CreativeCollab />);
});

it("always renders a div", () => {
  const wrapper = shallow(<CreativeCollab />);
  const divs = wrapper.find("div");
  expect(divs.length).toBeGreaterThan(0);
});