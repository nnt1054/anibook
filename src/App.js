import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './winter-2018.json';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    componentDidMount() {
        // fetch(API_URL)
        //     .then(resp => resp.json())
        //     .then(data => 
        //         this.setState({
        //             value: data.value,
        //         }))
        this.setState({
            value: this.state.value + 1,
        })
    }

    render() {
        return (
            React.createElement('div', {
                className: 'app'
            }, [
                React.createElement(SideNav, null, null),
                React.createElement(MainContent, null, null),
            ])
        )
    }
}

class SideNav extends Component {

    onToggleGenreBtn() {
      alert('tester testing test :)');
    }

    render() {
        const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy']
        return (
            React.createElement('div', {
              className: 'side-nav',
            }, [
              // logo-container-container
              React.createElement('div', {
                className: 'nav-logo-container'
              }, [
                React.createElement('img', {
                  className: 'nav-logo-image',
                  src: logo,
                })]),
              // search-textbox (component)
              React.createElement(SearchTextBox),
              // your-list-btn
              React.createElement('button', {
                id: 'your-list-btn',
                className: 'nav-btn',
              }, 'Your List'),
              // season-btn
              React.createElement('button', {
                id: 'season-btn',
                className: 'nav-btn',
              }, 'By Season'),
              // popular-btn
              React.createElement('button', {
                id: 'popular-btn',
                className: 'nav-btn',
              }, 'Popular'),
              // genre-title-container
              // <div id='genre-title-container' class="row"><span> Genres </span><button id='toggleGenreBtn' onclick='toggleGenreList()'>v</button></div>
              React.createElement(GenreContainer, {
                id: 'genre-container',
                genres: genres,
              }),
              // React.createElement('div', {
              //   id: 'genre-title-container',
              //   className: 'row',
              // }, [
              //   React.createElement('span', null, 'Genres'),
              //   React.createElement('button', {
              //     id: 'toggleGenreBtn',
              //     onClick: this.onToggleGenreBtn,
              //   }, 'v')
              //   ]
              // ),
              // // genre-container (component)
              // React.createElement(GenreContainer, {
              //   genres: genres,
              // }),
            ])
        )
    }
}

class SearchTextBox extends Component {
  render() {
    return (
      // <input id="search-textbox" type="text" name="location" placeholder="Search..." value="">
      React.createElement('input', {
        id: 'search-textbox', 
        type: 'text',
        name: 'location',
        placeholder: 'Search...',
      }, null)
    )
  }
}

class GenreContainer extends Component {
    constructor(props) {
        super(props)
        var genres = {};
        props.genres.forEach(
            x => {
              genres[x] = false;
            }
        )
        
        this.state = {
          genres: genres,
        }
        this.toggleGenre = this.toggleGenre.bind(this);
    }

    toggleGenre(genre) {
        this.state.genres[genre] = (this.state.genres[genre]) ? false : true;
        this.forceUpdate();
    }

    render() {
        const genreButtons = Object.entries(this.state.genres).map(e => {
            return React.createElement(GenreButton, {
                genre: e[0],
                active: e[1],
                toggleGenre: this.toggleGenre,
            })
        });

        return (
            React.createElement('div', {
                key: 'genre-container',
                className: 'column',
            }, [
                React.createElement('span', {className: 'genre-label'}, 'Genres'),
                React.createElement('div', {
                    key: 'genre-list',
                    className: 'genre-list column',
                }, genreButtons)
            ])
        )
  }
}

class GenreButton extends Component {
    render() {
        return (
            React.createElement('button', {
                className: (this.props.active) ? 'genre-btn-active' : 'genre-btn',
                onClick: () => this.props.toggleGenre(this.props.genre),
            }, this.props.genre)
        )
    }
}

class MainContent extends Component {
    render() {
        return (
            React.createElement('div', {
                className: 'main-content'
            }, [
                React.createElement(PageTitle, null, null),
                React.createElement(AnimeList, {
                    className: 'anime-list'
                }, [
                    React.createElement(Show),
                ])
            ])
        )
    }
}

class AnimeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: data,
        }
        // this.shows = this.handleFilterTextChange.bind(this);
        // this.handleInStockChange = this.handleInStockChange.bind(this);
    }


    render() {
        return (
            React.createElement('div', {
                id: 'anime-list'
            }, [
                React.createElement(Show),
                React.createElement(Show),
                React.createElement(Show),
                React.createElement(Show),
                React.createElement(Show),
                React.createElement(Show),
            ])
        )
    }
}

class PageTitle extends Component {
    render() {
        return (
            React.createElement('div', {
                id: 'page-title-container',
                className: 'row',
            }, [
                React.createElement('h1', {
                    className: 'page-title',
                }, 'Your List'),
                React.createElement('button', {
                    className: 'sort-dropdown-btn',
                }, 'v'),
            ])
        )
    }
}

class Show extends Component {
    render() {
        return (
            React.createElement('div', {
                className: 'show-container',
            }, [
              React.createElement('div', {
                className: 'show-left',
              }, [
                  React.createElement('img', {
                      className: 'show-image',
                      src: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg?s=e2e6133e60a7f5351826fc9f72bdddb8'
                  }),
                  React.createElement('div', {
                      className: 'show-image-overlay',
                  }, [
                      React.createElement('span', {className: 'show-title'}, 'Violet Evergarden'),
                      React.createElement('span', {className: 'show-countdown'}, 'Ep. 02/24 airs in 10 hours')
                  ]),
                  React.createElement('button', {className: 'save-btn'}, '+')
              ])
            ])
        )
    }
}

export default App;