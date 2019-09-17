import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import '@material-ui/core/CircularProgress'
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createJobSeeker } from '../../actions/jobSeekers'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
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

class JobSeekersForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobSeeker: {
        firstName: '',
        lastName: '',
        ssn: '',
        birthday: moment().subtract(18, 'years')
      },
      submitted: false,
      redirect: false
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleChangeJobseeker = name => event => {
    this.setState({
      jobSeeker: { ...this.state.jobSeeker, [name]: event.target.value }
    })
  }

  handleChangeBirthday = birthday => {
    this.setState({ jobSeeker: { ...this.state.jobSeeker, birthday } })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createJobseeker(this.state.jobSeeker)
    this.setState({ submitted: true })
  }

  error = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ submitted: false }), 2000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Oops! Looks like something went wrong, please try again in a few
          moments.
        </h2>
      </Paper>
    )
  }

  confirm = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ redirect: true }), 3000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          The Job Seeker was created successfully!
        </h2>
      </Paper>
    )
  }

  render() {
    const { classes, theme, loading, error } = this.props
    return (
      <div className={classes.container}>
        <h1
          style={{
            color: theme.palette.secondary.main
          }}
        >
          New Job Seeker
        </h1>
        {!loading && !this.state.submitted && (
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={this.handleSubmit.bind(this)}
          >
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
                    value={this.state.jobSeeker.firstName}
                    onChange={this.handleChangeJobseeker('firstName')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'lastname'}>Last Name</InputLabel>
                  <Input
                    id="lastname"
                    value={this.state.jobSeeker.lastName}
                    onChange={this.handleChangeJobseeker('lastName')}
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
                    value={this.state.jobSeeker.ssn}
                    onChange={this.handleChangeJobseeker('ssn')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <InlineDatePicker
                      label="Date of birth"
                      value={this.state.jobSeeker.birthday}
                      disableFuture
                      openTo="year"
                      format={'MM/DD/YYYY'}
                      views={['year', 'month', 'day']}
                      onChange={this.handleChangeBirthday}
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
        )}
        {loading && !error && (
          <Paper elevation={1}>
            <CircularProgress
              className={classes.load}
              style={{ height: 'auto', minWidth: '150px' }}
              color="secondary"
            />
          </Paper>
        )}
        {!loading && this.state.submitted && error && this.error()}
        {!loading && !error && this.state.submitted && this.confirm()}
        {this.state.redirect && <Redirect to="/dashboard/jobseekers" />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobSeeker: state.jobSeekers.jobSeekers,
    loading: state.jobSeekers.loading,
    error: state.jobSeekers.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createJobseeker: jobSeeker => dispatch(createJobSeeker(jobSeeker))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobSeekersForm))
