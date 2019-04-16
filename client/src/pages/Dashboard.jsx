import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import * as routes from '../routes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    width: '100%',
    height: '100%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: '200px',
    height: '200px',
    margin: '20px'
  }
})
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toLink = text => text.toLowerCase().replace(/\s+/g, '')

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            color="secondary"
            component={Link}
            variant="contained"
            to={`${routes.JOBSLIST}`}
          >
            Jobs
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            color="secondary"
            component={Link}
            variant="contained"
            to={`${routes.JOBSEEKERLIST}`}
          >
            Job Seekers
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            color="secondary"
            component={Link}
            variant="contained"
            to={`${routes.EQUIPMENTLIST}`}
          >
            Equipment
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard)
