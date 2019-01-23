import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail, { POSTER_PATH } from '../Components/MovieDetail';

// Initialize jest-fetch-mock for mock api calls
global.fetch = require('jest-fetch-mock');

// After each test, clear the mockErrors
afterEach(() => {
  cleanup();
  console.error.mockClear();
});

// This builds out the fake mock route that the compnents utilizies
const match = {
  params: {
    id: 'hello',
  },
};

// This is the fake json object we would recieve from our API
const movie = {
  id: 'hi',
  title: 'Star Wars',
  release_date: 'yesterday',
  poster_path: `${POSTER_PATH}PostImage`,
};

// Mock Console Error
console.error = jest.fn();

// If No Props are passed to the movie than it will error out
test('<MovieDetail>', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { debug, getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));
  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  debug();
});
