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

let id = 0
class JobsPage extends Component {
  state = {
    jobs: [
      { id: 0, name: 'Job1', location: 'Atlanta', peopleNeeded: 45, peopleAssigned: 20 },
      { id: 1, name: 'Job2', location: 'Atlanta', peopleNeeded: 50, peopleAssigned: 27 },
      { id: 2, name: 'Job3', location: 'Macon', peopleNeeded: 35, peopleAssigned: 27 },
      { id: 3, name: 'Job4', location: 'Nashville', peopleNeeded: 30, peopleAssigned: 30 }
    ]
  }


  editItem = id => {
    // This function should likely link to a page with the id in the route
  }

  deleteItem = id => {
    this.setState(prevState => ({
      jobs: prevState.jobs.filter(e => e.id !== id)
    }))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Jobs</h1>
        <CustomTable
          header={['Name', 'Location', 'Needed', 'Assigned']}
          data={this.state.jobs}
          keys={['name', 'location', 'peopleNeeded', 'peopleAssigned']}
          editable={true}
          deleteItem={this.deleteItem}
        />
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
