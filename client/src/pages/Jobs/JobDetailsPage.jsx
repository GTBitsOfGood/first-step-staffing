import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import JobDetailCard from '../../components/JobDetailCard'
import { getJobByID } from '../../actions/jobs'
import { connect } from 'react-redux'
import CustomTable from '../../components/tables/CustomTable'
import { getAllJobSeekers } from '../../actions/jobSeekers'
import Paper from '@material-ui/core/Paper'
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

class JobDetailsPage extends Component {
  componentDidMount() {
    this.props.getJobByID(this.props.match.params.id)
    this.props.getAllJobSeekers()
  }

  rowClick = (e, id) => {
    this.props.history.push(`${routes.JOBSEEKERDETAIL}${id}`)
  }

  render() {
    const {
      classes,
      jobs,
      jobsError,
      jobsLoading,
      jobSeekers,
      jobSeekersLoading,
      jobSeekersError
    } = this.props
    const job = jobs.filter(j => j._id === this.props.match.params.id)[0]
    let js =
      jobSeekers.length !== 0
        ? jobSeekers
            .filter(j => j.currentJob)
            .filter(j => j.currentJob._id === this.props.match.params.id)
        : []
    return (
      <div>
        <h1 className={classes.title}>Job Details</h1>
        <JobDetailCard job={job} assigned={js.length} />
        {js.length !== 0 && (
          <div>
            <h2 className={classes.title}>Assigned People</h2>
            <Paper>
              <CustomTable
                data={js}
                header={['First Name', 'Last Name']}
                keys={['firstName', 'lastName']}
                rowClick={this.rowClick}
              />
            </Paper>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.jobs,
    jobsError: state.jobs.error,
    jobsLoading: state.jobs.loading,
    jobSeekers: state.jobSeekers.jobSeekers,
    jobSeekersLoading: state.jobSeekers.loading,
    jobSeekersError: state.jobSeekers.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getJobByID: id => dispatch(getJobByID(id)),
    getAllJobSeekers: () => dispatch(getAllJobSeekers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobDetailsPage))
