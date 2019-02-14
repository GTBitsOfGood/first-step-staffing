import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register" component={RegistrationPage} />
        </Switch>
      </Router>
    )
  }
}

export default App
