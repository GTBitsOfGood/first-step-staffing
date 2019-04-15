import React, { Component } from 'react'
import CustomTable from './tables/CustomTable'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { getAllJobs } from '../actions/jobs'
import { Redirect } from 'react-router-dom'
import * as routes from '../routes'
import 'whatwg-fetch'

const styles = theme => ({
  button: {
    float: 'right',
    margin: '20px 0'
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'center'
  },
  confirm: {
    margin: 'auto',
    padding: '20px',
    textAlign: 'center'
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

class JobAssignmentPage extends Component {
  state = {
    jobs: [],
    loading: false,
    error: false,
    selected: '',
    submitted: false,
    redirect: false
  }

  componentDidMount() {
    this.props.getAllJobs()
  }

  childRowSelectHandler = (id) => {
    this.setState({ selected: id })
  }

  childMultirowSelectHandler = (newSelected) => {
    this.setState({ selected: newSelected })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`/jobseekers/jobseeker/${this.props.match.params.id}/job/${this.state.selected}`, { method: 'GET' })
    this.setState({ submitted: true })
  }

  confirm = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ redirect: true }), 3000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Changes saved!
        </h2>
      </Paper>
    )
  }

  render() {
    const { classes, jobs = [], error, loading } = this.props
    return (
      <div>
        <h1 className={classes.title}>Assign Jobs</h1>
        {!this.state.submitted && !error && (
          <CustomTable
            header={['Name', 'Address', 'People Needed']}
            data={jobs}
            keys={['name', 'address', 'peopleNeeded']}
            deleteItem={this.props.deleteJob}
            rowClick={this.rowClick}
            selectable={this.childRowSelectHandler}
          />
        )}
        {error && <h1>Oops! Looks like something went wrong!</h1>}
        {!this.state.submitted && (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
            onClick={this.handleSubmit.bind(this)}
          >
            Assign Selected Job
          </Button>
        )}
        {this.state.submitted && this.confirm()}
        {this.state.redirect && <Redirect to='/dashboard/jobseekers/' />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    error: state.jobs.error,
    loading: state.jobs.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllJobs: () => dispatch(getAllJobs())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobAssignmentPage))
