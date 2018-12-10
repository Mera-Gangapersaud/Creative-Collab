import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from '../components/board';
import StoryBoard from '../components/storyBoard';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Board', () => {
  it('renders without crushing', () => {
    shallow(<Board G={{ storySoFar: null }} ctx={{ turn: 0 }} moves={() => {}} />);
  });

  it('has a list of players', () => {
    const wrapper = shallow(<Board G={{ storySoFar: null }} ctx={{ turn: 0 }} moves={() => {}} />);

    expect(
      wrapper.contains(
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" id="players-container">
          <h4>Player 1</h4>
          <h4>Player 2</h4>
        </div>
      )
    ).toEqual(true);
  });

  it('has a story board', () => {
    const propsG = { storySoFar: [''] };
    const wrapper = shallow(<Board G={propsG} ctx={{ turn: 0 }} moves={() => {}} />);
    expect(
      wrapper.contains(
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <StoryBoard story={propsG.storySoFar} />
        </div>
      )
    ).toEqual(true);
  });

  it('sets text value to empty', () => {
    const wrapper = shallow(<Board G={{ storySoFar: null }} ctx={{ turn: 0 }} moves={() => {}} />);
    wrapper.find('button').simulate('click');

    expect(wrapper.state('text')).toEqual('');
  });
});
