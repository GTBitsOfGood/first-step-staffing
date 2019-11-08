import React from 'react'
import { Button, SideNav,SideNavItems, SideNavMenuItem, Tile, Form, TextInput, FormLabel, DatePicker, DatePickerInput, Select, SelectItem, SelectItemGroup, Accordion, AccordionItem } from 'carbon-components-react'
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
        //here is where we call get request



        return (
            <div>
                <div className="sidebar-container">
                    <SideNav
                        isFixedNav
                    >
                        <SideNavItems>
                            <SideNavMenuItem>Test</SideNavMenuItem>
                        </SideNavItems>
                        

                    </SideNav>
                </div>
                 <div className="dispatch-container">
                <div className="dispatch-header">
                    <div className="dispatch-name">
                    Dispatch

                    </div>
                    <Button
                   
                    disabled={false}
                    kind="primary"
                    tabIndex={1}
                    type="button"
                    onClick={this.goToCheckIn}> Check-In Worker + </Button>
                </div>
                <div className="accordion-container">
                    <Accordion>
                        <AccordionItem>

                        </AccordionItem>


                    </Accordion>

                </div>
             

                {this.state.clickCheckin && (
                    <CheckinPage> </CheckinPage>
                )}

            </div>

            </div>
           

        )
    }

}
export default DispatchPage