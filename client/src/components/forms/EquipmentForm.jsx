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
    this.state = { name: '', cost: '' }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
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
          New Equipment
        </h1>
        <form className={classes.form}>
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

export default withStyles(styles, { withTheme: true })(EquipmentForm)
