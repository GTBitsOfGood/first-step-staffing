import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CustomTable from '../../components/tables/CustomTable'
import { connect } from 'react-redux'
import { getAllJobSeekers, deleteJobSeeker } from './../../actions/users'

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

class UsersPage extends Component {
  state = {
    users: [],
    usersLoading: false,
    usersError: false
  }

  componentDidMount() {
    this.props.getAllJobSeekers();
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Job Seekers</h1>
        <CustomTable
          header={['First Name', 'Last Name']}
          data={this.props.users}
          keys={['firstName', 'lastName']}
          deleteItem={this.props.deleteJobSeeker}
          editable={true}
          editItem={() => console.log('edit placeholder')}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to="/dashboard/jobseekers/creation"
        >
          Create New Job Seeker
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllJobSeekers: () => dispatch(getAllJobSeekers()),
    deleteJobSeeker: (id) => dispatch(deleteJobSeeker(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UsersPage))
