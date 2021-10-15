import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/Footer';

it('Navbar renders the UI as expected', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
