import React, { Component } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllJobs, deleteJob } from './../../actions/jobs'
import * as routes from '../../routes'

const styles = theme => ({
  button: {
    float: 'right',
    margin: '20px 0'
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'center'
  }
})

class JobPage extends Component {
  state = {
    jobs: [],
    jobsLoading: false,
    jobsError: false
  }

  componentDidMount() {
    this.props.getAllJobs()
  }

  editItem = id => {
    // This function should likely link to a page with the id in the route
  }

  deleteItem = id => {
    this.setState(prevState => ({
      jobs: prevState.jobs.filter(e => e.id !== id)
    }))
  }

  rowClick = (e, id) => {
    this.props.history.push(`${routes.JOBDETAIL}${id}`)
  }

  render() {
    const { classes, jobs = [], error, loading } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Jobs</h1>
        {!error && (
          <CustomTable
            header={['Name', 'Address', 'People Needed']}
            data={jobs}
            keys={['name', 'address', 'peopleNeeded']}
            deleteItem={this.props.deleteJob}
            rowClick={this.rowClick}
          />
        )}
        {error && <h1>Oops! Looks like something went wrong!</h1>}
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to={`${routes.JOBCREATION}`}
        >
          Create New Job
        </Button>
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
    getAllJobs: () => dispatch(getAllJobs()),
    deleteJob: id => dispatch(deleteJob(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobPage))
