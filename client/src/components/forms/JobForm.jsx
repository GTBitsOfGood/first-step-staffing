import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { createJob } from '../../actions/jobs'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    textAlign: 'center'
  },
  input: {
    padding: '10px 0'
  },
  select: {
    padding: '10px 0',
    textAlign: 'left'
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

class JobForm extends React.Component {
  constructor() {
    super()
    this.state = {
      job: {
        name: '',
        address: '',
        peopleNeeded: '',
        transportationType: '',
        transportationCost: ''
      },
      submitted: false,
      redirect: false
    }
  }

  handleChange = name => event => {
    this.setState({ job: { ...this.state.job, [name]: event.target.value } })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createJob(this.state.job)
    this.setState({ submitted: true })
  }

  error = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ submitted: false }), 3000)
    return (
      <Paper className={classes.form} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Oops! Looks like something went wrong, please try again in a few
          moments.
        </h2>
      </Paper>
    )
  }

  confirm = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.props.history.push('/dashboard/jobs'), 2000)
    return (
      <Paper className={classes.form} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Your job was created successfully!
        </h2>
      </Paper>
    )
  }

  render() {
    const { classes, theme, error, loading } = this.props
    const { submitted } = this.state
    return (
      <div
        className={classes.container}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <h1 style={{ color: theme.palette.secondary.main }}>Create New Job</h1>
        {!submitted && !loading && (
          <form autoComplete="off" className={classes.form}>
            <Paper className={classes.paper} elevation={1}>
              <FormGroup>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'name'}>Name</InputLabel>
                  <Input
                    id="name"
                    value={this.state.job.name}
                    onChange={this.handleChange('name')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'address'}>Address</InputLabel>
                  <Input
                    id="address"
                    value={this.state.job.address}
                    onChange={this.handleChange('address')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'peopleNeeded'}>
                    Number of People Needed
                  </InputLabel>
                  <Input
                    id="peopleNeeded"
                    type="number"
                    value={this.state.job.peopleNeeded}
                    onChange={this.handleChange('peopleNeeded')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor="transportationType">
                    Transportation Type
                  </InputLabel>
                  <Select
                    value={this.state.job.transportationType}
                    onChange={this.handleChange('transportationType')}
                    inputProps={{
                      name: 'transportType',
                      id: 'transportationType'
                    }}
                  >
                    <MenuItem value={'Uber'}>Uber</MenuItem>
                    <MenuItem value={'Van'}>Van</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'transportationCost'}>
                    Transportation Cost
                  </InputLabel>
                  <Input
                    id="transportationCost"
                    type="number"
                    value={this.state.job.transportationCost}
                    onChange={this.handleChange('transportationCost')}
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
        {loading && !error && (
          <Paper elevation={1}>
            <CircularProgress
              className={classes.load}
              style={{ height: 'auto', minWidth: '150px' }}
              color="secondary"
            />
          </Paper>
        )}
        {!loading && submitted && error && this.error()}
        {!loading && !error && this.state.submitted && this.confirm()}
      </div>
    )
  }
}

JobForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    job: state.jobs.job,
    loading: state.jobs.loading,
    error: state.jobs.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createJob: job => dispatch(createJob(job))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(JobForm))
)
