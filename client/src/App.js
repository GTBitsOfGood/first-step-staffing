import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'
import CheckinPage from './pages/CheckinPage'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/checkin" component={CheckinPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
