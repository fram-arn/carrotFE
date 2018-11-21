import React, {Component} from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login/Login"; 

const ACCESS_TOKEN = 'accessToken';

class App extends Component {
    
    state = {
        currentUser: {username: null, password: null},
        isAuthenticated: false,
    };

    loginHandler = (isLoginSuccessful) => {
        if(isLoginSuccessful){
            this.setState({isAuthenticated: true})
        }        
    };

    render() {
        if(!this.state.isAuthenticated && localStorage.getItem(ACCESS_TOKEN) === undefined){
            return (<Login loginHandler={this.loginHandler} />);
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <Dashboard/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
