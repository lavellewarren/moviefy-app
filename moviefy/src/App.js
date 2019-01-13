import React, { Component } from "react";

import "./App.css";

import Movie from "./Components/Movie";

class App extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    try {
      const result = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=2a208bd9217b421273ab1506025ce6e6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      );
      const movies = await result.json();
      this.setState({
        movies: movies.results
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>MOVIEFY</h1>
        </header>
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

export default App;
