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
                React.createElement(SideNav, {
                    className: 'side-nav',
                }, null),
                // React.createElement('div', {
                //     className: 'main-content'
                // }, [])
            ])
        )
    }
}

class SideNav extends Component {
    render() {
        return (
            React.createElement('h5', null, 'lmao hey'),
            React.createElement('h5', null, 'hey haha')
        )
    }
}

export default App;