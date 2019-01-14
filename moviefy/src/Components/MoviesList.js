import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    movies: [],
    movieSearch: '',
  };

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

  updateInput = (event) => {
    this.setState({
      movieSearch: event.target.value,
    });
  };

  Search = async () => {
    const { movieSearch } = this.state;
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2a208bd9217b421273ab1506025ce6e6&query=${movieSearch}`,
      );
      const movies = await result.json();

      this.setState({
        movies: movies.results,
        movieSearch: '',
      });
    } catch (err) {
      throw err;
    }
  };

  render() {
    // Test
    const { movies, movieSearch } = this.state;
    return (
      <div>
        <MovieSearchInput type="text" onChange={this.updateInput} value={movieSearch} />
        <SearchButton type="submit" onClick={this.Search}>
          Search
        </SearchButton>
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
`;

const MovieSearchInput = styled.input`
  border: none;
  height: 20px;
  border-radius: 10px;
  margin: 0 5px;
`;

const SearchButton = styled.button`
  border: none;
  color: white;
  height: 20px;
  border-radius: 10px;
  background: #551a8b;
`;
