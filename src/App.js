import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Student from './Components/Student/StudentData'
import Form from './Components/Form/Form';
import Year from './Components/Year/Year';
import Section from './Components/Section/Section';
import Fees from './Components/Fees/Fees';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Form}></Route>    
            <Route exact path='/data' component={Student}></Route> 
            <Route exact path='/year' component={Year}></Route> 
            <Route exact path='/class' component={Section}></Route> 
            <Route exact path='/fees' component={Fees}></Route> 
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;