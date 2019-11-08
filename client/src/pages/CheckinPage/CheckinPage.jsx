import React from 'react'
import { Button, Tile, Form, TextInput, FormLabel, DatePicker, DatePickerInput, Select, SelectItem } from 'carbon-components-react'
import "./CheckinPage.scss"
import DispatchPage from "../DispatchPage/DispatchPage.jsx"
import SignaturePad from 'react-signature-pad-wrapper'

class CheckinPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      birthday: null,
      screen: 1,
      ssn: '',
      firstNameInvalid: '',
      lastNameInvalid: '',
      birthdayInvalid: '',
      ssnInvalid: '',
      jobAssigned: '',
      transportation: '',
      jobLocations: [],
      transportations: [],
    }
  }

  initializeState() {
    this.setState({
      firstName: '',
      lastName: '',
      birthday: null,
      screen: 1,
      ssn: '',
      firstNameInvalid: '',
      lastNameInvalid: '',
      birthdayInvalid: '',
      ssnInvalid: '',
      jobAssigned: '',
      transportation: '',
    })
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    today = mm + '-' + dd + '-' + yyyy;
    today = '10-29-2019'

    fetch(`/api/checkin/date/${today}`, {
      method: 'GET'
    })
    .then(res => res.json().then(dat => {
      this.setState({jobLocations: dat.jobLocations, transportations: dat.transportations})
      this.setState({jobAssigned: this.state.jobLocations[0][0], transportation: this.state.transportations[0]})
    }))
    
  }

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

  changeJob = event => {
    this.setState({
      jobAssigned: event.target.value
    })
  }

  changeTransportation = event => {
    this.setState({
      transportation: event.target.value
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.screen === 1) {
      var firstNameInvalid = (this.state.firstName.length === 0 && 'Please enter a first name') || (/\d/.test(this.state.firstName) && 'First name can not contain numbers')
      var lastNameInvalid = (this.state.lastName.length === 0 && 'Please enter a last name') || (/\d/.test(this.state.lastName) && 'Last name can not contain numbers')
      var birthdayInvalid = ((this.state.birthday === null || this.state.birthday.length === 0) && 'Please enter a birthday') || (!(/[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/.test(this.state.birthday)) && 'Please use the format \'mm/dd/yyyy\'')
      var ssnInvalid = ((this.state.ssn.length === 0) && 'Please enter the last 4 of your SSN') || (!(/[0-9][0-9][0-9][0-9]/.test(this.state.ssn)) && 'Please enter 4 digits')
      if (!firstNameInvalid && !lastNameInvalid && !birthdayInvalid && !ssnInvalid) {
        // Validate user info
        this.setState({ screen: 2 })
      }

      this.setState({
        firstNameInvalid: firstNameInvalid,
        lastNameInvalid: lastNameInvalid,
        birthdayInvalid: birthdayInvalid,
        ssnInvalid: ssnInvalid
      })

    } else if (this.state.screen === 2) {

      if (this.state.jobAssigned.length !== 0 && this.state.transportation.length !== 0 ) {
        this.setState({screen: 3})
      }
    } else if (this.state.screen === 3) {

      if (!this.signaturePad.isEmpty()){       
        let user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          ssn: this.state.ssn,
          date_of_birth: this.state.birthday,
          jobLocation: this.state.jobAssigned,
          transportation: this.state.transportation,
          signature: this.signaturePad.toDataURL()
        }
        fetch('/api/checkin/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ loading: false })
          })
          .catch(err => this.setState({ error: err, loading: false }))
          
        this.initializeState()
        this.setState({screen: 4})
      }
    }
  }

  handleBack = e => {

    if (this.state.screen > 1) {
      this.setState({screen: this.state.screen - 1})
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

  goToDispatch = () => {
    window.location.href = "/dispatch"
  }

  render() {
    return (


      <div className="container">
        <Tile className="tile">
          {this.state.screen === 1 && (
            <Form className="bx--form-item">
              <FormLabel className="formLabel">
                Let's get you signed in.
              </FormLabel>
              <TextInput className="text" defaultValue={this.state.firstName} invalid={this.state.firstNameInvalid.length > 0} invalidText={this.state.firstNameInvalid || ''} onChange={this.changeFirstName} labelText={"First Name"} placeholder="First Name" id="f_name" />
              <TextInput className="text" defaultValue={this.state.lastName} invalid={this.state.lastNameInvalid.length > 0} invalidText={this.state.lastNameInvalid || ''} onChange={this.changeLastName} labelText={"Last Name"} placeholder="Last Name" id="l_name" />
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
                <TextInput className="text" defaultValue={this.state.ssn} invalid={this.state.ssnInvalid.length > 0} invalidText={this.state.ssnInvalid || ''} onChange={this.changeSSN} labelText={"SSN"} placeholder="4 Digits" id="ssn" type="text"/>
              </div>
            </Form>
            )
            }
          {this.state.screen === 2 && (
            <Form className="bx--form-item">
              <FormLabel className="formLabel">
                Adjust {this.state.firstName}'s job details.
              </FormLabel>

              <Select
                className="select"
                iconDescription="open list of options"
                id="select-job"
                inline={false}
                invalid={false}
                invalidText="Please select a value"
                labelText="Jobs Assigned"
                light={false}
                onChange={this.changeJob}
              >
                {this.state.jobLocations.map((jobLoc) =>
                  <SelectItem
                    text={jobLoc[0]}
                    value={jobLoc[0]}
                    key={jobLoc[0]}
                  />
                )}
              </Select>

              <Select
                className="select"
                iconDescription="open list of options"
                id="select-transportation"
                inline={false}
                invalid={false}
                invalidText="Please select a value"
                labelText="Transportation"
                light={false}
                onChange={this.changeTransportation}
              >
                {this.state.transportations.map((transport) =>
                  <SelectItem
                    text={transport}
                    value={transport}
                    key={transport}
                  />
                )}
              </Select>
            </Form>
          )}
          {this.state.screen === 3 && (
            <Form className="bx--form-item">
              <FormLabel className="formLabel" style={{"lineHeight" : "24px", "width": "370px"}}>
                Hi {this.state.firstName}. Here are today's job details. You will be working at {this.state.jobAssigned}. {this.state.transportation} will be your transport.
              </FormLabel>

              <div style={{"paddingLeft": "10px"}}>Please sign to confirm</div>
              <div className="signature">
                <SignaturePad ref={ref => this.signaturePad = ref}></SignaturePad>
              </div>
            </Form>
          )}



          {this.state.screen === 4 && this.goToDispatch()}

          <div className="bx--btn-set">
            <Button
              disabled={false}
              kind="secondary"
              tabIndex={0}
              type="button"
              style={{backgroundColor: "dark-grey"}}
              onClick={this.handleBack}
            >
              Back
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

      </div>
    )
  }
}

export default CheckinPage
