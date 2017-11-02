import { h } from 'preact';
import Home from './index';
import { shallow } from 'preact-render-spy'; // See: https://github.com/mzgoddard/preact-render-spy
// import { shallow, deep } from 'preact-render-spy'; // See: https://github.com/mzgoddard/preact-render-spy

test('Home is rendering', () => {
  const actual = shallow(<Home />);
  expect(actual.find('div').length).toBe(1);
});
