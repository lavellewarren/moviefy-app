import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { MovieType, POSTER_PATH } from '../Components/Movie';

afterEach(() => {
  cleanup();
});

const movie: MovieType = {
  id: 'hi',
  title: 'test-title',
  poster_path: 'thisIsAPosterImage',
  backdrop_path: 'backdropPath',
  overview: 'some over view of movie',
  release_date: 'some release date',
};

test('<Movie> with movie', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );

  expect(getByTestId('movie-link').getAttribute('href')).toBe(
    `/id/${movie.id}`,
  );

  expect(getByTestId('movie-img').getAttribute('src')).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
});
