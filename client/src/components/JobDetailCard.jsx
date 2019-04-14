import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core';

const styles = {
    grid: {
        margin: '0 0 0 20px'
    }
}

class JobDetailCard extends Component {
  render() {
    const { job, classes } = this.props
    console.log(this.props)
    return (
      <Paper>
        {job && (
          <Grid className={classes.grid} container spacing={24}>
            <Grid item xs={6}>
              Name: {job.name}
            </Grid>
            <Grid item xs={6}>
              Location: {job.address}
            </Grid>
            <Grid item xs={6}>
              People Needed: {job.peopleNeeded}
            </Grid>
            <Grid item xs={6}>
              People Assigned: TODO
            </Grid>
            <Grid item xs={6}>
              Transportation Type: {job.transportationType}
            </Grid>
            <Grid item xs={6}>
              Transportation Cost: {job.transportationCost}
            </Grid>
          </Grid>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(JobDetailCard)
