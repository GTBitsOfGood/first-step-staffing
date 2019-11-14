import React from 'react'
import { Button, SideNav,SideNavItems, SideNavMenuItem, StructuredListWrapper, StructuredListBody, StructuredListRow, StructuredListCell, StructuredListInput, StructuredListHead, Accordion, AccordionItem } from 'carbon-components-react'
import "./DispatchPage.scss"



class DispatchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: {},
        }
    }
    componentDidMount(){
        fetch('/api/dispatch/getEmployeesByJobs')
        .then(response => response.json())
        .then(data => this.setState({allData:data}))
        
    }

    goToCheckIn = event => {
        window.location.href = "/checkin"
    }

    render() {
    
        console.log(this.state.allData);
        const keys = Object.keys(this.state.allData);


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
                    className="check-in-button"
                    disabled={false}
                    kind="primary"
                    tabIndex={1}
                    type="button"
                    onClick={this.goToCheckIn}> Check-In Worker + </Button>
                </div>
                <div className="accordion-container">
                    <Accordion>
                        {keys.map(key => (<AccordionItem title={key}>
                            <StructuredListWrapper
                                ariaLabel="List of users"
                                border
                                selection
                            >
                                <StructuredListHead>
                                    <StructuredListRow
                                        head
                                        label={false}
                                        onKeyDown={function noRefCheck(){}}
                                        tabIndex={0}
                                    >
                                    <StructuredListCell
                                        head
                                        noWrap={false}
                                    >
                                        #
                                    </StructuredListCell>
                                    <StructuredListCell
                                        head
                                        noWrap={false}
                                    >
                                        First
                                    </StructuredListCell>
                                    <StructuredListCell
                                        head
                                        noWrap={false}
                                    >
                                        Last
                                    </StructuredListCell>
                                    <StructuredListCell
                                        head
                                        noWrap={false}
                                    >
                                        Transport
                                    </StructuredListCell>
                                    <StructuredListCell
                                        head
                                        noWrap={false}
                                    />
                                    </StructuredListRow>
                                </StructuredListHead>
                                <StructuredListBody onKeyDown={function noRefCheck(){}}>
                                    {this.state.allData[key].map((user,i) => 
                                    <StructuredListRow 
                                        key={i}
                                        head={false}
                                        htmlFor={"row-" + i}
                                        label
                                        onKeyDown={function noRefCheck(){}}
                                        tabIndex={0}
                                    >
                                        <StructuredListCell
                                            head={false}
                                            noWrap={false}
                                        >
                                            {i + 1}
                                        </StructuredListCell>
                                        <StructuredListCell
                                            head={false}
                                            noWrap={false}
                                        >
                                            {user.fname}
                                        </StructuredListCell>
                                        <StructuredListCell
                                            head={false}
                                            noWrap={false}
                                        >
                                            {user.lname}
                                        </StructuredListCell>
                                        <StructuredListCell
                                            head={false}
                                            noWrap={false}
                                        >
                                            {user.transportation}
                                        </StructuredListCell>
                                        <StructuredListInput
                                            defaultChecked={null}
                                            id={"row-" + i}
                                            name="row-0"
                                            onChange={function noRefCheck(){}}
                                            title={"row-" + i}
                                            value={"row-" + i}
                                        />
                                        <StructuredListCell
                                            head={false}
                                            noWrap={false}
                                        >
                                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="select an option" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="bx--structured-list-svg" style={{"willChange": "transform"}}>
                                                <path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path>
                                                <path d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z" data-icon-path="inner-path" opacity="0"></path>
                                                <title>select an option</title>
                                            </svg>
                                        </StructuredListCell>
                                    </StructuredListRow>)}
                                </StructuredListBody>
                            </StructuredListWrapper>
                        </AccordionItem>))}
                    </Accordion>

                </div>
             
            </div>

            </div>
           

        )
    }

}
export default DispatchPage