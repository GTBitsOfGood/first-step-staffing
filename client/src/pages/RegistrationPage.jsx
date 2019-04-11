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
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    ssn: '',
    birthday: moment().subtract(18, 'years')
  },
  loading: false,
  isSubmitted: false,
  newUser: null,
  error: ''
}

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
    margin: '0 auto'
  },
  paper: {
    margin: 'auto',
    padding: '20px'
  },
  submit: {
    margin: '20px auto',
    padding: '10px 50px',
    width: '175px'
  },
  confirm: {
    margin: 'auto',
    padding: '20px'
  },
  load: {
    margin: 'auto',
    padding: '20px'
  }
})

class RegistrationPage extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {}

  changeFirstName = event => {
    this.setState({
      user: { ...this.state.user, firstName: event.target.value }
    })
  }

  changeLastName = event => {
    this.setState({
      user: { ...this.state.user, lastName: event.target.value }
    })
  }

  changeSSN = event => {
    if (/^\d*$/.test(event.target.value)) {
      this.setState({ user: { ...this.state.user, ssn: event.target.value } })
    }
  }

  changeBirthday = birthday => {
    this.setState({ 
      user: {...this.state.user, birthday }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch('/users/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ loading: false, newUser: json.user })
      })
      .catch(err => this.setState({ error: err, loading: false }))
    this.setState({ isSubmitted: true, loading: true })
  }

  registrationForm = () => {
    const { classes, theme } = this.props
    return (
      <form
        autoComplete="off"
        className={classes.form}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <h1 style={{ color: theme.palette.secondary.main }}>Register</h1>
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
                value={this.state.user.firstName}
                onChange={this.changeFirstName}
              />
            </FormControl>
            <FormControl required={true} style={styles.input}>
              <InputLabel htmlFor={'lastname'}>Last Name</InputLabel>
              <Input
                id="lastname"
                value={this.state.user.lastName}
                onChange={this.changeLastName}
              />
            </FormControl>
            <FormControl required={true} style={styles.input}>
              <InputLabel htmlFor={'ssn'}>SSN</InputLabel>
              <Input
                id="ssn"
                type="tel"
                inputProps={{
                  maxLength: 9
                }}
                value={this.state.user.ssn}
                onChange={this.changeSSN}
              />
            </FormControl>
            <FormControl required={true} style={styles.input}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <InlineDatePicker
                  label="Date of birth"
                  value={this.state.user.birthday}
                  disableFuture
                  openTo="year"
                  format={'MM/DD/YYYY'}
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
    )
  }

  confirm = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.resetResults(), 3000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Thanks for registering!
        </h2>
      </Paper>
    )
  }

  loading = () => {
    const { classes } = this.props
    return (
      <Paper className={classes.confirm} elevation={1}>
        <CircularProgress
          className={classes.load}
          style={{ height: 'auto', minWidth: '150px' }}
          color="secondary"
        />
      </Paper>
    )
  }

  resetResults = () => {
    this.setState(initialState)
  }

  displayError = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.resetResults(), 4000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Sorry it looks like something went wrong!
        </h2>
      </Paper>
    )
  }

  render() {
    const { classes } = this.props
    const { isSubmitted, loading, newUser, error } = this.state
    return (
      <div className={classes.container}>
        {!isSubmitted && this.registrationForm()}
        {isSubmitted && loading && this.loading()}
        {isSubmitted && !loading && error && this.displayError()}
        {isSubmitted && !loading && !error && newUser && this.confirm()}
        <Link to="/checkin" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            fullWidth={false}
          >
            Check In
          </Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(RegistrationPage)
