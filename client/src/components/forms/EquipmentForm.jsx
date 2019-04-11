import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createEquipment } from '../../actions/equipment'

const styles = theme => ({
  container: {
    display: 'flex',
    height: '100vh',
    margin: 'auto',
    flexDirection: 'column',
    textAlign: 'center'
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

class EquipmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment: {
        name: '',
        cost: ''
      },
      submitted: false,
      redirect: false
    }
  }

  handleChange = name => event => {
    this.setState({
      equipment: { ...this.state.equipment, [name]: event.target.value }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createEquipment(this.state.equipment)
    this.setState({ submitted: true })
  }

  error = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ submitted: false }), 2000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Oops! Looks like something went wrong, please try again in a few
          moments.
        </h2>
      </Paper>
    )
  }

  confirm = () => {
    const { classes, theme } = this.props
    setTimeout(() => this.setState({ redirect: true }), 3000)
    return (
      <Paper className={classes.confirm} elevation={1}>
        <h2 style={{ color: theme.palette.secondary.main }}>
          Your equipment was created successfully!
        </h2>
      </Paper>
    )
  }

  render() {
    const { classes, theme, loading, error } = this.props
    return (
      <div className={classes.container}>
        <h1
          style={{
            color: theme.palette.secondary.main
          }}
        >
          Create New Equipment
        </h1>
        {!loading && !this.state.submitted && (
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Paper className={classes.paper} elevation={1}>
              <FormGroup>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'name'}>Equipment Name</InputLabel>
                  <Input
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                  />
                </FormControl>
                <FormControl required={true} style={styles.input}>
                  <InputLabel htmlFor={'cost'}>Cost</InputLabel>
                  <Input
                    id="cost"
                    type="number"
                    value={this.state.cost}
                    onChange={this.handleChange('cost')}
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
        )}
        {loading && !error && (
          <Paper elevation={1}>
            <CircularProgress
              className={classes.load}
              style={{ height: 'auto', minWidth: '150px' }}
              color="secondary"
            />
          </Paper>
        )}
        {!loading && this.state.submitted && error && this.error()}
        {!loading && !error && this.state.submitted && this.confirm()}
        {this.state.redirect && <Redirect to="/dashboard/equipment" />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment.equipment,
    loading: state.equipment.equipmemntLoading,
    error: state.equipment.equipmentError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEquipment: equipment => dispatch(createEquipment(equipment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(EquipmentForm))
