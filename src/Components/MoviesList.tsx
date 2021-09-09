import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Movie, { MovieType } from './Movie';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieSearch, setMovieSearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=2a208bd9217b421273ab1506025ce6e6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
        );
        const { results } = await result.json();
        setMovies(results);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  // When we click search, fetch the movies based on the users input
  const search = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2a208bd9217b421273ab1506025ce6e6&query=${movieSearch}`,
      );
      const { results } = await result.json();
      // Set the state to the new movies we searched for, and empty the search term
      setMovies(results);
      setMovieSearch('');
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {movies.length < 1 ? (
        <h1 data-testid="loading">Loading</h1>
      ) : (
        <div>
          <MovieSearchInput
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovieSearch(e.target.value)
            }
            value={movieSearch}
          />
          <SearchButton type="submit" onClick={search}>
            Search
          </SearchButton>
          {/* For each movie in the state array, create a new movie with the key of that movies id */}
          <MovieGrid>
            {movies.map(movie => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        </div>
      )}
    </>
  );
};

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 1rem;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MovieSearchInput = styled.input`
  border: none;
  height: 20px;
  border-radius: 10px;
  margin: 5px;
`;

const SearchButton = styled.button`
  border: none;
  color: white;
  height: 20px;
  border-radius: 10px;
  background: #551a8b;
`;
