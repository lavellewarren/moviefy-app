import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends Component {
  // Define the state with an empty array and our empty search term
  state = {
    movies: [],
    movieSearch: '',
  };

  // When the component mounts, go an fetch the top trending movies and update the state
  async componentDidMount() {
    try {
      const result = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=2a208bd9217b421273ab1506025ce6e6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
      );
      const movies = await result.json();
      this.setState({
        movies: movies.results,
      });
    } catch (err) {
      throw err;
    }
  }

  // As we type, update the state of movieSearch
  updateInput = (event) => {
    this.setState({
      movieSearch: event.target.value,
    });
  };

  // When we click search, fetch the movies based on the users input
  Search = async () => {
    const { movieSearch } = this.state;
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2a208bd9217b421273ab1506025ce6e6&query=${movieSearch}`,
      );
      const movies = await result.json();
      // Set the state to the new movies we searched for, and empty the search term
      this.setState({
        movies: movies.results,
        movieSearch: '',
      });
    } catch (err) {
      throw err;
    }
  };

  render() {
    const { movies, movieSearch } = this.state;
    return (
      <div>
        <MovieSearchInput type="text" onChange={this.updateInput} value={movieSearch} />
        <SearchButton type="submit" onClick={this.Search}>
          Search
        </SearchButton>
        {/* For each movie in the state array, create a new movie with the key of that movies id */}
        <MovieGrid>
          {movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      </div>
    );
  }
}

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
