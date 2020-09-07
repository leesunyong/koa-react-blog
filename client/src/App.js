import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Post } from 'pages'


class App extends Component {
    render() {
        return (
            <div>
                <Route path="/post" component={Post}/>
            </div>
        )
    }
}


export default App;