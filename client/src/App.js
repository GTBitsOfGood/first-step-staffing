import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import JobPage from './pages/JobPage'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/jobs" component={JobPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
