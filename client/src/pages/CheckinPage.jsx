import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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
  },
  load: {
    margin: 'auto'
  },
  table: {
    minWidth: '300px'
  }
})

class CheckinPage extends React.Component {
  state = {
    lastName: '',
    ssn: '',
    submitted: false
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  changeSSN = event => {
    this.setState({ ssn: event.target.vaue })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ submitted: true })
    this.props.userActions.getUserBySSN(this.state.ssn)
  }

  displayUsers = () => {
    const { users } = this.props
    console.log('table users: ', users)
    return users.map(user => (
      <TableRow key={user._id}>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
      </TableRow>
    ))
  }

  render() {
    const { classes, theme, users, loading } = this.props
    const { submitted } = this.state
    console.log('props users: ', users)
    console.log('props loading: ', loading)

    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Check-in</h1>
        {!submitted && (
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Paper className={classes.paper} elevation={1}>
              <FormGroup>
                {/* <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'name'}>Last Name</InputLabel>
                <Input
                  autoFocus={true}
                  id="name"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                />
              </FormControl> */}
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'ssn'}>
                    Last Four Digits of SSN
                  </InputLabel>
                  <Input
                    id="ssn"
                    type="number"
                    onInput={e => {
                      e.target.value = e.target.value.toString().slice(0, 4)
                    }}
                    value={this.state.ssn}
                    onChange={this.handleChange('ssn')}
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
        )}
        {submitted && loading && (
          <CircularProgress
            className={classes.load}
            style={{ height: 'auto', width: '15%' }}
            color="secondary"
          />
        )}
        {submitted && !loading && users.length > 1 && (
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
      </div>
    )
  }
}

CheckinPage.propTypes = {
  classes: PropTypes.object.isRequired
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
)(withStyles(styles, { withTheme: true })(CheckinPage))
