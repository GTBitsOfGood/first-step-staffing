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
      submitted: false,
      ssn: '',
      firstNameInvalid: '',
      lastNameInvalid: '',
      birthdayInvalid: '',
      ssnInvalid: ''
    }
  }

  componentDidMount() { }

  changeFirstName = event => {
    this.setState({
      firstName: event.target.value,
      firstNameInvalid: ''
    })
  }

  changeLastName = event => {
    this.setState({
      lastName: event.target.value,
      lastNameInvalid: ''
    })
  }

  changeBirthday = event => {
    this.setState({
      birthday: event.target.value,
      birthdayInvalid: ''
    })
  }

  changeSSN = event => {
    this.setState({
      ssn: event.target.value,
      ssnInvalid: ''
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({
      firstNameInvalid: (this.state.firstName.length === 0 && 'Please enter a first name') || (/\d/.test(this.state.firstName) && 'First name can not contain numbers'),
      lastNameInvalid: (this.state.lastName.length === 0 && 'Please enter a last name') || (/\d/.test(this.state.lastName) && 'Last name can not contain numbers'),
      birthdayInvalid: ((this.state.birthday === null || this.state.birthday.length === 0) && 'Please enter a birthday') || (!(/[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/.test(this.state.birthday)) && 'Please use the format \'mm/dd/yyyy\''),
      ssnInvalid: ((this.state.ssn.length === 0) && 'Please enter the last 4 of your SSN') || (!(/[0-9][0-9][0-9][0-9]/.test(this.state.ssn)) && 'Please enter 4 digits')
    })

    
    if (this.state.firstNameInvalid.length === 0 && this.state.lastNameInvalid.length === 0 && this.state.birthdayInvalid.length === 0 && this.state.ssnInvalid.length === 0) {
      // Validate user info
      this.setState({ submitted: true, loading: true })
    }
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
          <Form className="bx--form-item">
            <FormLabel className="formLabel">
            Let's get you signed in.
            </FormLabel>
            <TextInput className="text" invalid={this.state.firstNameInvalid.length > 0} invalidText={this.state.firstNameInvalid || ''} onChange={this.changeFirstName} labelText={"First Name"} placeholder="First Name" id="f_name" />
            <TextInput className="text" invalid={this.state.lastNameInvalid.length > 0} invalidText={this.state.lastNameInvalid || ''} onChange={this.changeLastName} labelText={"Last Name"} placeholder="Last Name" id="l_name" />
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
                  labelText="Birthday"
                  onChange={this.changeBirthday}
                  pattern="d{1,2}/d{4}"
                  placeholder="mm/dd/yyyy"
                  type="text"
                  invalid={this.state.birthdayInvalid.length > 0}
                  invalidText={this.state.birthdayInvalid || ''}
                />
              </DatePicker>
              <TextInput className="text" invalid={this.state.ssnInvalid.length > 0} invalidText={this.state.ssnInvalid || ''} onChange={this.changeSSN} labelText={"SSN"} placeholder="4 Digits" id="ssn" type="text"/>
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
