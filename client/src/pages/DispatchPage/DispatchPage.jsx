import React from 'react'
import { Button, Tile, Form, TextInput, FormLabel, DatePicker, DatePickerInput, Select, SelectItem, SelectItemGroup, Accordion } from 'carbon-components-react'
import CheckinPage from "../CheckinPage/CheckinPage.jsx"
import "./DispatchPage.scss"


class DispatchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCheckin: false
        }
    }

    goToCheckIn = event => {
        // this.setState({
        //     clickCheckin: true
        // })
        window.location.href = "/checkin"
    }

    render() {
        return (
            <div>
                <div className="dispatch-header">
                    <Button
                    className="checkin"
                    disabled={false}
                    kind="primary"
                    tabIndex={1}
                    type="button"
                    onClick={this.goToCheckIn}> Check-In Worker + </Button>
                </div>
                <div className="accordion-container">
                    <Accordion>

                        
                    </Accordion>

                </div>
             

                {this.state.clickCheckin && (
                    <CheckinPage> </CheckinPage>
                )}

            </div>

        )
    }

}
export default DispatchPage