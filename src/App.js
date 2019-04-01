import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './winter-2018.json';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

class Page extends Component {

  // states: text search; watching list; season; popular
  // left-nav:
  //    -text filter
  //    -watching, season, popular radio buttons
  //    -list of genres

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      filterText: '',
      genres: [],
    };

    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleGenreChange(e) {
    // pass list of genres to MainContent
    this.props.onFilterTextChange(e.target.value);
  }

  handleTextFilterChange(e) {
    // pass new textFilter value to MainContent
  }

  handlePageChange(e) {
    // tell right side to change pages based
  }

  render() {
    return (
      <div className="App">
        <div className="SideNav">
          hello
        </div>
        <div className="MainContent">
          goodbye
        </div>
      </div>
    )
  }
}

class AnimeList extends Component {
  constructor(props) {
    super(props)
    // title, state
  }
  
  componentDidMount() {
    // uh do something here
  }
  
  render() {
    // const = this.prop
    // check state:
    //    watchlist --> split currently airing and completed shows
    //    season --> include left/right arrow buttons

    // should i filter here or have HOC set the product items already ?
    // i think its fine if its handled here
    // do filtering here, but make the API calls in the HOC

    return (  
      <h1> AnimeList </h1>
    )
  }
}

export default Page;