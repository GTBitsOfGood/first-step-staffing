import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import JobsPage from './pages/Jobs/JobsPage'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'
import EditEquipmentPage from './pages/EditEquipmentPage'
import CheckinPage from './pages/CheckinPage'
import Dashboard from './pages/Dashboard'
import NavBarMiniDrawer from './components/NavBarMiniDrawer'
import JobCreationPage from './pages/Jobs/JobCreationPage'
import EquipmentPage from './pages/Equipment/EquipmentPage'
import UsersPage from './pages/User/UsersPage'
import EquipmentCreationPage from './pages/Equipment/EquipmentCreationPage'
import JobseekersCreationPage from './pages/User/JobseekersCreationPage'

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
                    <Route
                      exact path={`${url}`}
                      component={Dashboard} 
                    />
                    <Route 
                      exact path={`${url}/jobs`}
                      component={JobsPage} 
                    />
                    <Route
                      exact
                      path={`${url}/job/creation`}
                      component={JobCreationPage}
                    />
                    <Route
                      exact
                      path={`${url}/equipment`}
                      component={EquipmentPage}
                    />
                    <Route
                      exact
                      path={`${url}/equipment/creation`}
                      component={EquipmentCreationPage}
                    />
                    <Route
                      exact path={`${url}/jobseekers`}
                      component={UsersPage}
                    />
                    <Route
                      exact path={`${url}/jobseekers/creation`}
                      component={JobseekersCreationPage}
                    />
                  </NavBarMiniDrawer>
                </>
              )}
            />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/edit_equipment" component={EditEquipmentPage} />
            <Route exact path="/checkin" component={CheckinPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
