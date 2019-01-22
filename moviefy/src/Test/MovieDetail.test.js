import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail from '../Components/MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

const match = {
  params: {
    id: 'hello',
  },
};

// Mock Console Error
console.error = jest.fn();

// If No Props are passed to the movie than it will error out
test('<MovieDetail>', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      id: 'hi',
      title: 'Star Wars',
      release_date: 'yesterday',
    }),
  );

  const { debug, getByText } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByText('Star Wars'));
  debug();
});
