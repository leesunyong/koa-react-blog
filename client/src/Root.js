import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';

class Root extends React.Component {
    
    render (){
        return (
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        )
    }
}


export default Root;