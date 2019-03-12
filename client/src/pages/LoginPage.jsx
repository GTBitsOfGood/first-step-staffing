import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  Paper,
  Button,
} from '@material-ui/core'
import moment from 'moment'

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

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      lastname: '',
      ssn: '',
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
                    maxLength: 4,
                  }}
                  value={this.state.ssn}
                  onChange={this.changeSSN}
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
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(LoginPage)
