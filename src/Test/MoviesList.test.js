import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../Components/MoviesList';
import { POSTER_PATH } from '../Components/MovieDetail';

// Initialize jest-fetch-mock for mock api calls
global.fetch = require('jest-fetch-mock');

// After each test, clear the mockErrors
afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  results: [
    {
      id: '1',
      title: 'Star Wars',
      release_date: 'yesterday',
      poster_path: `${POSTER_PATH}PostImage`,
    },
    {
      id: '2',
      title: 'New Movie',
      release_date: 'a while ago',
      poster_path: `${POSTER_PATH}NewMovie`,
    },
    {
      id: '3',
      title: 'Second Movie',
      release_date: 'more a while ago',
      poster_path: `${POSTER_PATH}OldMovie`,
    },
  ],
};

test('<MoviesList>', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const {
    debug, getByTestId, getAllByTestId, queryByTestId,
  } = render(
    <MemoryRouter>
      <MoviesList movies={movies} />
    </MemoryRouter>,
  );
  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});
