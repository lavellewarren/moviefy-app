import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail, { POSTER_PATH } from '../Components/MovieDetail';

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
