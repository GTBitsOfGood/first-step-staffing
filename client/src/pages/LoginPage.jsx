import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  Paper,
  Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center'
  },
  input: {
    padding: '10px 0'
  },
  form: {
    margin: '0 auto'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '20px'
  },
  submit: {
    margin: '20px auto',
    padding: '10px 50px',
    width: '175px'
  }
})

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }

  changeUsername = event => {
    this.setState({ username: event.target.value })
  }

  changePassword = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ submitted: true })
  }

  loginForm = () => {
    const { classes, theme } = this.props
    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Login</h1>
        <form
          autoComplete="off"
          onSubmit={this.handleSubmit}
          className={classes.form}
        >
          <Paper className={classes.paper} elevation={1}>
            <FormGroup>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'username'}>Username</InputLabel>
                <Input
                  id="username"
                  value={this.state.username}
                  onChange={this.changeUsername}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'password'}>Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.changePassword}
                />
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

  loginLocation = () => {
    const { classes, theme } = this.props
    return (
      <div className={classes.container}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Where would you like to be directed?
        </h2>
        <Paper className={classes.paper}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/checkin" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Check in
            </Button>
          </Link>
        </Paper>
      </div>
    )
  }

  render() {
    const { classes, theme } = this.props
    const { submitted } = this.state
    return (
      <div className={classes.container}>
        {!submitted && this.loginForm()}
        {submitted && this.loginLocation()}
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(LoginPage)
