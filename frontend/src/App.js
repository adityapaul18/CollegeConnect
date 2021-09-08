import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Login from './Conponents/Login/Login';
import Header from './Conponents/Header/Header'

function App() {
  return (
    <div className="App">
      <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <div>
                            <Header/>
                        </div>
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
    </div>
  );
}

export default App;
