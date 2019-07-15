import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './src/views';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('App component testing', function() {
  it('renders "view" text', function() {
    const wrapper = shallow(<App />);
    const message = <div>view</div>;
    expect(wrapper.contains(message)).to.equal(true);
  });
});
