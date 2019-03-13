import React, { Component } from 'react'
import {
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  Paper,
  Button
} from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/users'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center'
  },
  form: {
    margin: '0 15%'
  },
  paper: {
    margin: 'auto',
    padding: '20px'
  },
  submit: {
    marginTop: '20px',
    width: '100%'
  }
})

class RegistrationPage extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      ssn: '',
      birthday: moment().subtract(18, 'years')
    }
  }

  componentDidMount() {}

  changeFirstName = event => {
    this.setState({ firstName: event.target.value })
  }

  changeLastName = event => {
    this.setState({ lastName: event.target.value })
  }

  changeSSN = event => {
    if (/^\d*$/.test(event.target.value)) {
      this.setState({ ssn: event.target.value })
    }
  }

  changeBirthday = birthday => {
    this.setState({ birthday })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.userActions.registerJobSeeker(this.state)
  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Register</h1>
        <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
          <Paper className={classes.paper} elevation={1}>
            <FormGroup>
              <FormControl required={true} style={styles.input}>
                <InputLabel
                  htmlFor={'firstname'}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  First Name
                </InputLabel>
                <Input
                  id="firstname"
                  autoFocus={true}
                  value={this.state.firstname}
                  onChange={this.changeFirstName}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'lastname'}>Last Name</InputLabel>
                <Input
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.changeLastName}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'ssn'}>SSN</InputLabel>
                <Input
                  id="ssn"
                  inputProps={{
                    maxLength: 9
                  }}
                  value={this.state.ssn}
                  onChange={this.changeSSN}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <InlineDatePicker
                    label="Date of birth"
                    value={this.state.birthday}
                    disableFuture
                    openTo="year"
                    format={'DD/MM/YYYY'}
                    views={['year', 'month', 'day']}
                    onChange={this.changeBirthday}
                    mask={[
                      /\d/,
                      /\d/,
                      '/',
                      /\d/,
                      /\d/,
                      '/',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/
                    ]}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </FormGroup>
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RegistrationPage))
