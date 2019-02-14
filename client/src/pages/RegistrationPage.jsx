import React, { Component } from 'react'
import { FormLabel, Input, FormGroup } from '@material-ui/core';

class RegistrationPage extends Component {
  render() {
    //   Firstname last name SSN BDay
    let styles = {
        margin: 'auto',
    }

    let submitStyle = {
        width: 'auto',
        margin: 'auto',
    }
    return <div style={styles}>
    <FormGroup>
{/* TODO: Fix bad code style */}
        <FormLabel style={styles}>
            First Name:
            <Input type="text" name="first" />
        </FormLabel>
        <FormLabel style={styles}>
            Last Name:
            <Input type="text" name="last" />
        </FormLabel>
        <FormLabel style={styles}>
            SSN:
            <Input type="password" name="SSN" />
        </FormLabel> 
        <FormLabel style={styles}>
            Birth date:
            <Input type="date" name="birthdate"/>
        </FormLabel>
        <Input type="submit" value="Submit" style={submitStyle} />
        </FormGroup>
    </div>
  }
}

export default RegistrationPage
