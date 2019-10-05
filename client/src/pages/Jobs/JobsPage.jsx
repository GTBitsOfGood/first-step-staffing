import React, { Component } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
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
  },
  dropDown: {
    minWidth: 120,

  }
})

class JobPage extends Component {
  state = {
    jobs: [],
    jobsLoading: false,
    jobsError: false,
    jobAssigned: ''
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

  handleChange = event => {
    this.setState({
      jobAssigned: event.target.value
    });
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
        <br></br>

        <InputLabel htmlFor="JobAssignments"> Job Assigned: </InputLabel>
        <Select
          value={this.state.jobAssigned}
          className={classes.dropDown}
          onClick={this.handleChange}
          inputProps={{id: 'JobAssignments'}}
          >
            <MenuItem value="Job1"> Painting </MenuItem>
            <MenuItem value="Job2"> Mowing </MenuItem>
            <MenuItem value="Job3"> Factory work </MenuItem>
            <MenuItem value="Job4"> Food Critic </MenuItem>
        </Select>





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
