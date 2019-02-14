import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'

class RegistrationPage extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      ssn: null,
      birthday: null
    }
  }

  componentDidMount() {}

  changeName = event => {
    this.setState({ name: event.target.value })
  }

  changeSSN = event => {
    this.setState({ ssn: event.target.vaue })
  }

  render() {
    return (
      <div>
        <FormControl required={true}>
          <InputLabel htmlFor={'name'}>Full Name</InputLabel>
          <OutlinedInput
            id="name"
            autoFocus={true}
            value={this.state.name}
            onChange={this.changeName}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
        </FormControl>
        <FormControl required={true}>
          <InputLabel htmlFor={'ssn'}>SSN</InputLabel>
          <OutlinedInput
            id="ssn"
            type={'tel'}
            value={this.state.snn}
            onChange={this.changeSSN}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
        </FormControl>
      </div>
    )
  }
}

export default RegistrationPage
