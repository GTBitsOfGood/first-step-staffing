import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import * as routes from '../routes'
import { Link } from 'react-router-dom'

const styles = {
  paper: {
    margin: 'auto',
    padding: '20px',
    textAlign: 'left'
  },
  group: {
    margin: '0 15%'
  },
  button: {
    maxHeight: '22px',
    margin: '0 0 0 20px',
    padding: '5px 5px',
    fontSize: '12px'
  }
}

class JobSeekerDetailCard extends Component {
  render() {
    const { jobSeeker, classes } = this.props
    return (
      <div className={classes.group}>
        {jobSeeker && (
          <Paper className={classes.paper} elevation={1}>
            <p> First Name: {jobSeeker.firstName} </p>
            <p> Last Name: {jobSeeker.lastName} </p>
            <p> SSN: {jobSeeker.ssn} </p>
            <p> Birthday: {jobSeeker.birthday} </p>
            <p>
              Current Job Assignment: {jobSeeker.currentJob.name}
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
                component={Link}
                to={`${routes.JOBDETAIL}${jobSeeker.currentJob._id}`}
              >
                See Details
              </Button>
            </p>
          </Paper>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(JobSeekerDetailCard)
