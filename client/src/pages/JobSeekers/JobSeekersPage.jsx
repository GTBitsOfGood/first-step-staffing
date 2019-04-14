import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CustomTable from '../../components/tables/CustomTable'
import { connect } from 'react-redux'
import { getAllJobSeekers, deleteJobSeeker } from '../../actions/jobSeekers'
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

class JobSeekersPage extends Component {
  componentDidMount() {
    this.props.getAllJobSeekers()
  }

  rowClick = (e, id) => {
    this.props.history.push(`${routes.JOBSEEKERDETAIL}${id}`)
  }

  render() {
    const { classes, jobSeekers = [], error, loading } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Job Seekers</h1>
        {!error && (
          <CustomTable
            header={['First Name', 'Last Name']}
            data={jobSeekers}
            keys={['firstName', 'lastName']}
            deleteItem={this.props.deleteJobSeeker}
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
          to={`${routes.JOBSEEKERCREATION}`}
        >
          Create New Job Seeker
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobSeekers: state.jobSeekers.jobSeekers,
    loading: state.jobSeekers.loading,
    error: state.jobSeekers.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllJobSeekers: () => dispatch(getAllJobSeekers()),
    deleteJobSeeker: id => dispatch(deleteJobSeeker(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(JobSeekersPage))
