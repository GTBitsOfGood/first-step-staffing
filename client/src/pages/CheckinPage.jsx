import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/users'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center'
  },
  formContainer: {
    margin: '0 30%'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  form: {
    margin: '0 20px'
  },
  paper: {
    margin: 'auto',
    padding: '15px'
  },
  submit: {
    marginTop: '20px',
    padding: '10px 50px'
  },
  load: {
    margin: 'auto'
  },
  table: {
    backgroundColor: 'white',
    margin: '0 15%',
    width: 'auto'
  },
  input: {
    fontWeight: 'bold',
    fontSize: '35px',
    maxWidth: '25px'
  }
})

class CheckinPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ssn: ['', '', '', ''],
      submitted: false,
      users: [],
      loading: false,
      error: ''
    }

    this.ssnInputs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ]
  }

  handleChange = ind => event => {
    const ssn = [...this.state.ssn]
    ssn[ind] = event.target.value
    this.setState({ ssn }, () => {
      this.autoFocus(ind)
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const ssn = parseInt(this.state.ssn.join(''))
    console.log(ssn)
    fetch(`/users/SSN?SSN=${ssn}`, { method: 'GET' })
      .then(res => res.json())
      .then(json => {
        this.setState({ loading: false, users: json.users })
      })
      .catch(err => this.setState({ loading: false, error: err }))
    this.setState({ submitted: true, loading: true })
  }

  displayUsers = () => {
    const { users } = this.props
    return users.map(user => (
      <TableRow key={user._id}>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
      </TableRow>
    ))
  }

  catchBackspace = ind => event => {
    if (event.keyCode === 8) {
      if (!this.state.ssn[ind]) {
        this.ssnInputs[ind - 1].focus()
      }
    }
  }

  autoFocus = ind => {
    if (ind !== 3 && this.state.ssn[ind].toString().length === 1) {
      const l = this.ssnInputs[ind + 1]
      l.focus()
    }
  }

  fourBoxInput = () => {
    const { classes, theme } = this.props
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={classes.formContainer}
      >
        <FormGroup className={classes.formGroup}>
          <FormControl required={true} className={classes.form}>
            <Paper className={classes.paper} elevation={1}>
              <Input
                inputRef={e => (this.ssnInputs[0] = e)}
                className={classes.input}
                id="ssn1"
                type="tel"
                disableUnderline={true}
                inputProps={{
                  maxLength: 1
                }}
                autoFocus={true}
                value={this.state.ssn[0]}
                onChange={this.handleChange(0)}
                onKeyDown={this.catchBackspace(1)}
              />
            </Paper>
          </FormControl>
          <FormControl required={true} className={classes.form}>
            <Paper className={classes.paper} elevation={1}>
              <Input
                inputRef={e => (this.ssnInputs[1] = e)}
                className={classes.input}
                id="ssn2"
                type="tel"
                disableUnderline={true}
                inputProps={{
                  maxLength: 1
                }}
                onKeyDown={this.catchBackspace(1)}
                value={this.state.ssn[1]}
                onChange={this.handleChange(1)}
              />
            </Paper>
          </FormControl>
          <FormControl required={true} className={classes.form}>
            <Paper className={classes.paper} elevation={1}>
              <Input
                inputRef={e => (this.ssnInputs[2] = e)}
                className={classes.input}
                id="ssn3"
                type="tel"
                disableUnderline={true}
                inputProps={{
                  maxLength: 1
                }}
                onKeyDown={this.catchBackspace(2)}
                value={this.state.ssn[2]}
                onChange={this.handleChange(2)}
              />
            </Paper>
          </FormControl>
          <FormControl required={true} className={classes.form}>
            <Paper className={classes.paper} elevation={1}>
              <Input
                inputRef={e => (this.ssnInputs[3] = e)}
                className={classes.input}
                id="ssn4"
                type="tel"
                disableUnderline={true}
                inputProps={{
                  maxLength: 1
                }}
                value={this.state.ssn[3]}
                onChange={this.handleChange(3)}
                onKeyDown={this.catchBackspace(3)}
              />
            </Paper>
          </FormControl>
        </FormGroup>
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

  render() {
    const { classes, theme } = this.props
    const { submitted, users, loading, error } = this.state

    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Check-in</h1>
        {!submitted && this.fourBoxInput()}
        {submitted && loading && (
          <CircularProgress
            className={classes.load}
            style={{ height: 'auto', width: '15%' }}
            color="secondary"
          />
        )}
        {submitted && !loading && !error && users.length > 1 && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.displayUsers()}</TableBody>
          </Table>
        )}
        {submitted && !loading && !error && users.length === 1 && }
      </div>
    )
  }
}

CheckinPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CheckinPage)
