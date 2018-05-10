import React from 'react';
import { shallow } from 'enzyme';

// import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';

import { Header } from '../../components/header';

it('should render Header correctly', ()=>{
  // USING REACT SHALLOW RENDERER
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  // console.log (renderer.getRenderOutput());
  // expect(toJSON(wrapper)).toMatchSnapshot();

  const wrapper = shallow(<Header startLogout={()=>{}}/>);
  expect(wrapper.find('h1').length).toBe(1);
  expect(wrapper.find('h1').text()).toBe('Expensify');
  expect(wrapper).toMatchSnapshot();
})

it ('should call startLogout on button click', ()=> {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
})