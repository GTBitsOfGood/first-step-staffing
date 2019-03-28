import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = theme => ({
  button: {
    float: 'right',
    margin: '20px 0'
  },
  font: {
    color: 
  }
})

let id = 0
class JobsPage extends Component {
  state = {}

  createData = (name, loc, needed, assigned) => {
    id += 1
    return { id, name, loc, needed, assigned }
  }

  rows = () => [
    this.createData('Job1', 'Atlanta', 45, 20),
    this.createData('Job2', 'Atlanta', 50, 27),
    this.createData('Job3', 'Macon', 35, 27),
    this.createData('Job4', 'Nashville', 30, 30)
  ]

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1>Current Jobs</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>People Needed</TableCell>
              <TableCell>People Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.rows().map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.loc}</TableCell>
                <TableCell>{row.needed}</TableCell>
                <TableCell>{row.assigned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to="/dashboard/job/creation"
        >
          Create New Job
        </Button>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(JobsPage)
