import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
// Define the url for our movies posters
export const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

// Define Movie as a statless functional component that takes in movie
const Movie = ({ movie }) => {
  if (!movie) return null;
  return (
    <Link to={`/id/${movie.id}`} data-testid="movie-link">
      <Overdrive id={movie.id}>
        {movie.poster_path ? (
          <Poster
            data-testid="movie-img"
            src={`${POSTER_PATH}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <p>IMAGE UNAVAIABLE</p>
        )}
      </Overdrive>
    </Link>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
