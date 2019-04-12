import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './winter-2018.json';
// const pages = ['search', 'favorites', 'season', 'popular']


class App extends Component {

    constructor(props) {
        super(props);

        // pull genres from API later!!!
        const genreLabels = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance']
        const genres = {};
        genreLabels.forEach(
            x => {
              genres[x] = false;
            }
        )

        this.state = {
            genres: genres,
            page: 'favorites',
            filterText: '',
        }

        this.toggleGenre = this.toggleGenre.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    toggleGenre(genre) {
        this.state.genres[genre] = (this.state.genres[genre]) ? false : true;
        this.forceUpdate();
    }

    changePage(pageName) {
        this.setState({page: pageName});
    }

    render() {
        const props = {
            genres: this.state.genres,
            page: this.state.page,
            filterText: '',
            toggleGenre: this.toggleGenre,
            changePage: this.changePage,
        }
      
        return (
            React.createElement('div', {
                className: 'app'
            }, [
                React.createElement(SideNav, Object.assign({}, props, {
                  key: 0
                }), null),
                React.createElement(MainContent, Object.assign({}, props, {
                  key: 1
                })),
            ])
        )
    }
}

class SideNav extends Component {


    render() {

        return (
            React.createElement('div', {
                className: 'side-nav',
            }, [
                React.createElement('div', {
                className: 'nav-logo-container'
                }, [
                    React.createElement('img', {
                        className: 'nav-logo-image',
                        src: logo,
                    })]),

                React.createElement(SearchTextBox, {
                    active: (this.props.page === 'search') ? true : false,
                    onClick: () => this.props.changePage('search'),
                }),
                React.createElement('button', {
                    id: 'favorites',
                    className: (this.props.page === 'favorites') ? 'nav-btn-active' : 'nav-btn',
                    onClick: () => this.props.changePage('favorites'),
                  }, 'Favorites'),
                React.createElement('button', {
                    id: 'season-btn',
                    className: (this.props.page === 'season') ? 'nav-btn-active' : 'nav-btn',
                    onClick: () => this.props.changePage('season'),
                }, 'By Season'),
                React.createElement('button', {
                    id: 'popular-btn',
                    className: (this.props.page === 'popular') ? 'nav-btn-active' : 'nav-btn',
                    onClick: () => this.props.changePage('popular'),
                }, 'Popular'),
                React.createElement(GenreContainer, {
                    id: 'genre-container',
                    genres: this.props.genres,
                    toggleGenre: this.props.toggleGenre,
                }),
            ])
        )
    }
}

class SearchTextBox extends Component {
  
  testFunction(e) {
      if (e.key === 'Enter') {
          console.log(e.target.value);
          alert('SUBMITTED');
      }
  }
  
  render() {
    return (
      React.createElement('input', {
        id: 'search-textbox', 
        type: 'text',
        name: 'location',
        placeholder: 'Search...',
        onKeyDown: this.testFunction,
      }, null)
    )
  }
}

class GenreContainer extends Component {

    render() {
        const genreButtons = Object.entries(this.props.genres).map(e => {
            return React.createElement(GenreButton, {
                genre: e[0],
                active: e[1],
                toggleGenre: this.props.toggleGenre,
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