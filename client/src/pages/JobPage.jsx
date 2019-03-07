import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  Paper,
  Button,
  Select,
  MenuItem
} from '@material-ui/core'
import moment from 'moment'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    textAlign: 'center'
  },
  input: {
    padding: '10px 0'
  },
  select: {
    padding: '10px 0',
    textAlign: 'left'
  },
  form: {
    margin: '0 15%'
  },
  paper: {
    margin: 'auto',
    padding: '20px'
  },
  submit: {
    marginTop: '20px',
    width: '100%'
  }
})

class JobPage extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      peopleNeeded: 5,
      transportationType: '',
      transportationCost: 25
    }
  }

  changeName = event => {
    this.setState({ name: event.target.value })
  }

  changePeopleNeeded = event => {
    this.setState({ peopleNeeded: event.target.value })
  }

  changeTransportationType = event => {
    this.setState({ transportationType: event.target.value })
  }

  changeTransportationCost = event => {
    this.setState({ transportationCost: event.target.value })
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.container}>
        <h1 style={{ color: theme.palette.secondary.main }}>Jobs</h1>
        <form className={classes.form}>
          <Paper className={classes.paper} elevation={1}>
            <FormGroup>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'name'}>Job Name</InputLabel>
                <Input
                  id="name"
                  value={this.state.name}
                  onChange={this.changeName}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'peopleNeeded'}>Number of People Needed for Job</InputLabel>
                <Input
                  id="peopleNeeded"
                  type="tel"
                  value={this.state.peopleNeeded}
                  onChange={this.changePeopleNeeded}
                />
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor="transportationType">Transportation Type</InputLabel>
                <Select
                  value={this.state.transportationType}
                  onChange={this.changeTransportationType}
                  inputProps={{
                    name: 'transportType',
                    id: 'transportationType',
                  }}
                >
                  <MenuItem value={"Uber"}>Uber</MenuItem>
                  <MenuItem value={"Van"}>Van</MenuItem>
                </Select>
              </FormControl>
              <FormControl required={true} style={styles.input}>
                <InputLabel htmlFor={'transportationCost'}>Transportation Cost</InputLabel>
                <Input
                  id="transportationCost"
                  type="tel"
                  value={this.state.transportationCost}
                  onChange={this.changeTransportationCost}
                />
              </FormControl>
            </FormGroup>
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            type="submit"
          >
            Submit
        </Button>
        </form>
      </div>
    )
  }
}

JobPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(JobPage)
