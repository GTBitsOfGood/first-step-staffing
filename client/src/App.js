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
import EquipmentCreationPage from './pages/Equipment/EquipmentCreationPage'
import * as routes from './routes'
import JobSeekersPage from './pages/JobSeekers/JobSeekersPage'
import JobDetailsPage from './pages/Jobs/JobDetailsPage'
import JobSeekerCreationPage from './pages/JobSeekers/JobSeekerCreationPage'
import JobAssignmentPage from './components/JobAssignmentPage'

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
                      exact
                      path={`${routes.JOBCREATION}`}
                      component={JobCreationPage}
                    />
                    <Route
                      exact
                      path={`${routes.JOBSLIST}`}
                      component={JobsPage}
                    />
                    <Route
                      path={`${routes.JOBDETAIL}:id`}
                      component={JobDetailsPage}
                    />
                    <Route
                      exact
                      path={`${routes.EQUIPMENTLIST}`}
                      component={EquipmentPage}
                    />
                    <Route
                      exact
                      path={`${routes.EQUIPMENTCREATION}`}
                      component={EquipmentCreationPage}
                    />
                    <Route
                      exact
                      path={`${routes.JOBSEEKERLIST}`}
                      component={JobSeekersPage}
                    />
                    <Route
                      exact path={`${routes.JOBSEEKERCREATION}`}
                      component={JobSeekerCreationPage}
                    />
                    <Route
                      exact path={`${routes.JOBASSIGNMENTLIST}:id`}
                      component={JobAssignmentPage}
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
