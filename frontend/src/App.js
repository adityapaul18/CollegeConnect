import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Login from './Conponents/Login/Login';
import Header from './Conponents/Header/Header'
import Profile from './Conponents/Profile/Profile'
import Home from './Conponents/Home/Home';
import AskPage from './Conponents/AskPage/AskPage';
import Answers from './Conponents/Answers/Answers';
import Saved from './Conponents/Saved/Saved';

function App() {
  return (
    <div className="App">
      <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <div className="moveBottom">
                            <Header/>
                        </div>
                            <Home/>
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/Ask">
                        <div className="moveBottom">
                            <Header/>
                        </div>
                        <AskPage/>
                    </Route>
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/answers" component={Answers}>
                    </Route>
                    <Route exact path="/saved">
                        <div className="moveBottom">
                            <Header/>
                        </div>
                        <Saved/>
                    </Route>
                </Switch>
            </Router>
    </div>
  );
}

export default App;
