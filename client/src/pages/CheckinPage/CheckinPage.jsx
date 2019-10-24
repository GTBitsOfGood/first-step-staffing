import React from 'react'
import { Button, Tile, Form, TextInput, FormLabel, DatePicker, DatePickerInput } from 'carbon-components-react'
import "./CheckinPage.scss"
import JobDetailsPage from './JobDetailsPage.jsx'

class CheckinPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      birthday: null,
      submitted: false
    }
  }

  componentDidMount() { }

  changeFirstName = event => {
    this.setState({
      firstName: event.target.value
    })
    console.log('State updated: ' + this.state.firstName)
  }

  changeLastName = event => {
    this.setState({
      lastName: event.target.value
    })
    console.log('State updated: ' + this.state.lastName)
  }

  changeBirthday = birthday => {
    this.setState({
      birthday: birthday
    })
    console.log('State updated: ' + birthday)
  }

  changeSSN = event => {
    this.setState({
      ssn: event.target.value
    })
    console.log('State updated: ' + this.state.ssn)
  }

  handleSubmit = e => {
    e.preventDefault()
    // Submit
    this.setState({ submitted: !this.state.submitted, loading: true })
    console.log(this.state.submitted)
  }

  displayError = () => {
    setTimeout(() => this.resetResults(), 4000)
    return (
      <div elevation={1}>
        <h2>
          Sorry it looks like something went wrong!
        </h2>
      </div>
    )
  }

  render() {
    return (


      <div className="container">
      {!this.state.submitted && (
        <Tile className="tile">
          <Form class="bx--form-item">
            <FormLabel class="formLabel">
            Let's get you signed in.
            </FormLabel>
            <TextInput className="text" onChange={this.changeFirstName} labelText={"First Name"} placeholder="First Name" id="f_name" />
            <TextInput className="text" onChange={this.changeLastName} labelText={"Last Name"} placeholder="Last Name" id="l_name" />
            <div className="row">
              <DatePicker
                dateFormat="m/d/Y"
                datePickerType="simple"
                id="date-picker"
                light={false}
                locale="en"
                onChange={function noRefCheck(){}}
                onClose={function noRefCheck(){}}
                short={false}
              >
                <DatePickerInput
                  className="text"
                  style={{backgroundColor: 'white'}}
                  disabled={false}
                  iconDescription="Icon description"
                  id="date-picker-input-id"
                  invalid={false}
                  invalidText="A valid value is required"
                  labelText="Birthday"
                  onChange={this.changeBirthday}
                  pattern="d{1,2}/d{4}"
                  placeholder="mm/dd/yyyy"
                  type="text"
                />
              </DatePicker>
              <TextInput className="text" onChange={this.changeSSN} labelText={"SSN"} placeholder="4 Digits" id="ssn" type="number"/>
            </div>
          </Form>
          <div className="bx--btn-set">
            <Button
              disabled={false}
              kind="secondary"
              tabIndex={0}
              type="button"
              style={{backgroundColor: "dark-grey"}}
            >
              Cancel
            </Button>
            <Button
              disabled={false}
              kind="primary"
              tabIndex={1}
              type="button"
              onClick={this.handleSubmit}
            >
              Next
            </Button>
          </div>
        </Tile>
        )}
        {this.state.submitted && (<JobDetailsPage name={this.state.firstName}/>)}

      </div>
    )
  }
}

export default CheckinPage
