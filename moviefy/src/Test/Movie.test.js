import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Components/Movie';

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

// Mock Console Error
console.error = jest.fn();

// If No Props are passed to the movie than it will error out
test('<Movie>', () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
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
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/id/${movie.id}`);
  expect(getByTestId('movie-img').src).toBe(`${POSTER_PATH}${movie.poster_path}`);
});
