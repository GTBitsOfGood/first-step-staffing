import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  Paper,
  Button
} from '@material-ui/core'
import { connect } from 'react-redux'
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
    this.state = { name: this.props.name || '', cost: this.props.cost || '' }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    this.props.createEquipment(JSON.stringify(this.state))
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
          New Equipment
        </h1>
        {error && <h1>{error}</h1>}
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
