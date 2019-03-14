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
      lastname: '',
      ssn: ''
    }
  }

  changeLastName = event => {
    this.setState({ lastname: event.target.value })
  }

  changeSSN = event => {
    if (/^\d*$/.test(event.target.value)) {
      this.setState({ ssn: event.target.value })
    }
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Login</h1>
        <form className={classes.form}>
          <Paper className={classes.paper} elevation={1}>
            <FormGroup>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'lastname'}>Last Name</InputLabel>
                <Input
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.changeLastName}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'ssn'}>Last 4 digits of SSN</InputLabel>
                <Input
                  id="ssn"
                  inputProps={{
                    maxLength: 4
                  }}
                  value={this.state.ssn}
                  onChange={this.changeSSN}
                />
              </FormControl>
            </FormGroup>
          </Paper>
          <Link to="/checkin" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              type="submit"
            >
              Submit
            </Button>
          </Link>
        </form>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(LoginPage)
