import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import schedule from './schedule.json';

class App extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }

        // pull genres from API later!!!
        const genreLabels = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Mystery', 'Sci-Fi', 'Slice of Life']
        const genres = {};
        genreLabels.forEach(
            x => {
              genres[x] = false;
            }
        )

        // var scheduleList = [schedule.sunday, schedule.monday, schedule.tuesday, schedule.wednesday,
        //         schedule.thursday, schedule.friday, schedule.saturday]
        var dayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        var dayDict = {};
        dayList.forEach(x => {
            dayDict[x] = [];
        })
        var d = new Date();
        var n = d.getDay();
        for (var i = 0; i < n; i++) {
            dayList.push(dayList.shift());
        }

        this.state = {
            genres: genres,
            page: 'season',
            filterText: '',
            shows: dayDict,
            days: dayList,
        }

        this.toggleGenre = this.toggleGenre.bind(this);
        this.changePage = this.changePage.bind(this);
        this.searchShow = this.searchShow.bind(this);
    }

    componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://api.jikan.moe/v3/schedule/'
        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(data => this.setState({ shows: data }));
    }

    toggleGenre(genre) {
        this.state.genres[genre] = (this.state.genres[genre]) ? false : true;
        this.forceUpdate();
    }

    changePage(pageName) {
        this.setState({page: pageName});
    }

    searchShow(e) {
        if (e.key === 'Enter') {
            if (e.target.value) {
                this.setState({filterText: e.target.value});
                this.changePage('search');
            }
        }
    }

    render() {
        const props = {
            genres: this.state.genres,
            page: this.state.page,
            filterText: this.state.filterText,
            toggleGenre: this.toggleGenre,
            changePage: this.changePage,
            searchShow: this.searchShow,
        }
      
        return (
            React.createElement('div', {
                className: 'app'
            }, [
                React.createElement(SideNav, Object.assign({}, props, {
                  key: 0
                }), null),
                React.createElement(MainContent, Object.assign({}, props, {
                  key: 1,
                  shows: this.state.shows,
                  days: this.state.days,
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
                    searchShow: this.props.searchShow,
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
                }, 'This Season'),
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
  
  render() {
    return (
      React.createElement('input', {
        id: 'search-textbox', 
        type: 'text',
        name: 'location',
        placeholder: 'Search...',
        onKeyDown: this.props.searchShow,
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
    constructor(props) {
        super(props);
        this.filterFavorites = this.filterFavorites.bind(this);
        this.filterGenres = this.filterGenres.bind(this);
    }


    filterFavorites(show, favorites) {
        if (favorites.includes(show.mal_id)) {
            return true;
        } else {
            return false;
        }
    }

    filterText(show) {
        if (show.title.toLowerCase().includes(this.props.filterText.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }

    filterNothing(show) {
        return true;
    }

    filterGenres(show, genres) {
        if (genres.length > 0) {
            var result = genres.map(f => {
                return show.genres.map(g => {
                    return (g.name == f)          
                }).includes(true);
            })
            return result.every((x) => x);
        } else {
            return true;
        }
    }

    render() {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        let genres = [];

        Object.keys(this.props.genres).forEach(k => {
            if (this.props.genres[k]) {
                genres.push(k)
            }
        });

        let pageTitle = {
            'search': 'Search Results',
            'favorites': "Favorites",
            'season': 'This Season',
            'popular': 'Popular'
        }

        let filterFunctions = {
            'search': (show) => this.filterText(show, this.props.filterText),
            'favorites': (show) => this.filterFavorites(show, favorites),
            'season': this.filterNothing,
            'popular': this.filterNothing,
            'genre': (show) => this.filterGenres(show, genres),
        }

        return (
            React.createElement('div', {
                className: 'main-content'
            }, [
                React.createElement(PageTitle, {
                    page: pageTitle[this.props.page]
                }, null),
                React.createElement(AnimeList, {
                    shows: this.props.shows,
                    days: this.props.days,
                    filter: filterFunctions[this.props.page],
                    filterFavorites: filterFunctions['favorites'],
                    filterGenres: filterFunctions['genre'],
                })
            ])
        )
    }
}

class AnimeList extends Component {

    render() {
        const schedule = this.props.days.map(day => {
            return React.createElement('div', {
                className: 'day-container column',
            }, [
                React.createElement('h2', {
                    className: 'day-label',
                }, day.toUpperCase()),
                React.createElement('div', {
                    className: 'anime-list'
                }, [
                    this.props.shows[day].filter(this.props.filter).filter(this.props.filterGenres).map(show => {
                        return React.createElement(Show, {
                            key: show.mal_id,
                            show: show,
                            favorite: this.props.filterFavorites(show),
                        })
                    })
                ])
            ])
        })

        return (
            React.createElement('div', {
                className: 'column'
            }, [
                schedule,
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
                }, this.props.page),
            ])
        )
    }
}

class Show extends Component {

    constructor(props) {
        super(props)
        this.state = {
            favorite: this.props.favorite,
        }
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    openLink(url) {
        window.open(url,'_blank');
    }

    toggleFavorite() {
        var favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!this.state.favorite) {
            favorites.push(this.props.show.mal_id)
        } else {
            favorites = favorites.filter((id) => {
                return id !== this.props.show.mal_id;
            })
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        this.setState({
            favorite: !this.state.favorite,
        })
    }

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
                        src: this.props.show.image_url,
                    }),
                    React.createElement('span', {
                        className: (this.state.favorite) ? 'fa fa-star save-btn save-btn-checked' : 'fa fa-star save-btn',
                        onClick: this.toggleFavorite,
                    })
                ],
                React.createElement('div', {
                    className: 'show-image-overlay',
                }, [
                    React.createElement('span', {
                        className: 'show-title',
                        onClick: () => this.openLink(this.props.show.url),
                    }, this.props.show.title),
                    React.createElement('span', {className: 'show-countdown'}, this.props.show.synopsis)
                ]))
            ])
        )
    }
}

export default App;