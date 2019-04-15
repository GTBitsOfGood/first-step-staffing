import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import JobDetailCard from '../../components/JobDetailCard'
import { getJobByID } from '../../actions/jobs'
import { connect } from 'react-redux'

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
  }
  render() {
    const { classes, jobs } = this.props
    const job = jobs.filter(j => j._id === this.props.match.params.id)[0] 
    console.log(job)
    return (
      <div>
        <h1 className={classes.title}>Job Details</h1>
        <JobDetailCard job={job} {...this.props} />
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
    getJobByID: id => dispatch(getJobByID(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobDetailsPage))
