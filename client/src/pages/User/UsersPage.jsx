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
import { getAllJobSeekers } from './../../actions/users'

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
    users: []
  }

  componentDidMount() {
    this.props.getAllJobSeekers();
    // console.log(this.state);
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
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to="/dashboard/user/creation"
        >
          Create New Job Seeker
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  
    console.log(state.users.users);
  return {
    users: state.users.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllJobSeekers: () => dispatch(getAllJobSeekers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UsersPage))
