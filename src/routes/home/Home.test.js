import { h } from 'preact';
import Home from './index';
import { shallow } from 'preact-render-spy'; // See: https://github.com/mzgoddard/preact-render-spy
// import { shallow, deep } from 'preact-render-spy'; // See: https://github.com/mzgoddard/preact-render-spy

test('check if Home is rendering', () => {
  // Use shallow (rendering) if the level of rendering is just 1, e.g. <Headline> is returning already HTML and not another VDOM element
  // which itself calls a render method (this would be level 2)
  const actual = shallow(<Home />);
  expect(actual.find('div').length).toBe(1);
});
