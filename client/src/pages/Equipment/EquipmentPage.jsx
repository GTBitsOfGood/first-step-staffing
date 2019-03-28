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
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'center'
  }
})

let id = 0
class EquipmentPage extends Component {
  state = {}

  createData = (name, cost) => {
    id += 1
    return { id, name, cost }
  }

  rows = () => [
    this.createData('Steel Toed Boots', 20),
    this.createData('Shovel', 10),
    this.createData('Equipment1', 5),
    this.createData('Equipment2', 30)
  ]

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Equipment</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.rows().map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.cost}</TableCell>
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
          to="/dashboard/equipment/creation"
        >
          Create New Equipment
        </Button>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EquipmentPage)
