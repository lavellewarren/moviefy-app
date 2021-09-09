import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../Components/MoviesList';
import { POSTER_PATH } from '../Components/MovieDetail';
import { MovieType } from '../Components/Movie';

// Initialize jest-fetch-mock for mock api calls
global.fetch = require('jest-fetch-mock');

const movies: { results: MovieType[] } = {
  results: [
    {
      id: '1',
      title: 'Star Wars',
      release_date: 'yesterday',
      poster_path: `${POSTER_PATH}PostImage`,
      backdrop_path: 'backdropPath',
      overview: 'some over view of movie',
    },
    {
      id: '2',
      title: 'New Movie',
      release_date: 'a while ago',
      poster_path: `${POSTER_PATH}NewMovie`,
      backdrop_path: 'backdropPath',
      overview: 'some over view of movie',
    },
    {
      id: '3',
      title: 'Second Movie',
      release_date: 'more a while ago',
      poster_path: `${POSTER_PATH}OldMovie`,
      backdrop_path: 'backdropPath',
      overview: 'some over view of movie',
    },
  ],
};

test('<MoviesList>', async () => {
  /* @ts-ignore */
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );
  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});
