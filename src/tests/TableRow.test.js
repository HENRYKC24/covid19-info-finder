import React from 'react';
import renderer from 'react-test-renderer';
import TableRow from '../components/TableRow';

it('Navbar renders the UI as expected', () => {
  const tree = renderer.create(<TableRow param="Deaths Today" value={333} />).toJSON();
  expect(tree).toMatchSnapshot();
});
