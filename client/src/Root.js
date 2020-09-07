import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

class Root extends React.Component {
    
    render (){
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    <Route path="/" component={App}/>
                </BrowserRouter>
            </Provider>
        )
    }
}


export default Root;