import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Components/Movie';

afterEach(() => {
  cleanup();
});

const movie = {
  id: 'hi',
  title: 'test-title',
  poster_path: 'thisIsAPosterImage',
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
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
});
