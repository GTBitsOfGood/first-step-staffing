import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import JobPage from './pages/Jobs/JobPage'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'
import CreateEquipmentPage from './pages/CreateEquipmentPage'
import EditEquipmentPage from './pages/EditEquipmentPage'
import CheckinPage from './pages/CheckinPage'
import Dashboard from './pages/Dashboard'
import NavBarMiniDrawer from './components/NavBarMiniDrawer'
import EquipmentPage from './pages/Equipment/EquipmentPage'
import EquipmentForm from './components/forms/EquipmentForm'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              render={({ match: { url } }) => (
                <>
                  <NavBarMiniDrawer>
                    <Route exact path={`${url}`} component={Dashboard} />
                    <Route path={`${url}/jobs`} component={JobPage} />
                    <Route
                      exact
                      path={`${url}/equipment`}
                      component={EquipmentPage}
                    />
                    <Route
                      exact
                      path={`${url}/equipment/creation`}
                      component={EquipmentForm}
                    />
                  </NavBarMiniDrawer>
                </>
              )}
            />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/create_equipment" component={CreateEquipmentPage} />
            <Route path="/edit_equipment" component={EditEquipmentPage} />
            <Route path="/checkin" component={CheckinPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
