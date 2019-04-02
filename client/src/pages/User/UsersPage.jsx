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
    users: [
      { id: 0, firstName: 'John', lastName: 'Doe' },
      { id: 1, firstName: 'Aria', lastName: 'Stark' },
      { id: 2, firstName: 'Jamie', lastName: 'Lannister' },
      { id: 3, firstName: 'Bob', lastName: 'Marley' }
    ]
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Job Seekers</h1>
        <CustomTable
          header={['First Name', 'Last Name']}
          data={this.state.users}
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

export default withStyles(styles, { withTheme: true })(UsersPage)
