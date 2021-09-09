import React from 'react';

import { render, cleanup } from 'react-testing-library';
import App from '../App';

afterEach(cleanup);

test('<App>', () => {
  const { getByText } = render(<App />);

  expect(getByText('MOVIEFY')).toBeTruthy();
});
