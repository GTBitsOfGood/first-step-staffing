import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import JobDetailCard from '../../components/JobSeekerDetailCard'
import { getJobSeekerByID } from '../../actions/jobSeekers'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
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

class JobSeekerDetailsPage extends Component {
  componentDidMount() {
    this.props.getJobSeekerByID(this.props.match.params.id)
  }
  render() {
    const { classes, jobSeekers } = this.props
    const jobSeeker = jobSeekers.filter(
      j => j._id === this.props.match.params.id
    )[0]
    return (
      <div>
        <h1 className={classes.title}>Job Seeker Details</h1>
        <JobDetailCard jobSeeker={jobSeeker} />
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          component={Link}
          to={`${routes.JOBASSIGNMENTLIST}${this.props.match.params.id}`}
        >
          Assign to Job
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobSeekers: state.jobSeekers.jobSeekers,
    error: state.jobSeekers.error,
    loading: state.jobSeekers.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getJobSeekerByID: id => dispatch(getJobSeekerByID(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobSeekerDetailsPage))
