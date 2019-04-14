import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import '@material-ui/core/CircularProgress'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    textAlign: 'center'
  },
  paper: {
    margin: 'auto',
    padding: '20px',
    textAlign: 'left'
  },
  button: {
    display: 'flex',
    marginTop: '20px',
    width: '100%'
  },
  group: {
    margin: '0 15%'
  }
})

class JobSeekerDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: 'Pablo',
      lastName: 'Johnson',
      ssn: '5678',
      birthday: '5/5/95',
      redirect: false
    }
  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.container}>
        <h1
          style={{
            color: theme.palette.secondary.main
          }}
        >
          Job Seeker Detail
        </h1>
        <div className={classes.group}>
          <Paper className={classes.paper} elevation={1}>
            <p> First Name: {this.state.firstName} </p>
            <p> Last Name: {this.state.lastName} </p>
            <p> SSN: {this.state.ssn} </p>
            <p> Birthday: {this.state.birthday} </p>
          </Paper>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            onClick={() => {
              this.setState({ redirect: true })
            }}
          >
            Done
          </Button>
        </div>
        {this.state.redirect && <Redirect to="/dashboard/jobseekers" />}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(JobSeekerDetailPage)
