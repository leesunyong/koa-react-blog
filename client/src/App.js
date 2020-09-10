import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Post } from 'pages'
import './App.css';


class App extends Component {
    render() {
        return (
            <Route path="/post" component={Post}/>
        )
    }
}


export default App;