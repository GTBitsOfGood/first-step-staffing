import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './Theme'
import CreateEquipmentPage from './pages/CreateEquipmentPage';
import EditEquipmentPage from './pages/EditEquipmentPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/create_equipment" component={CreateEquipmentPage} />
             <Route path="/edit_equipment" component={EditEquipmentPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
