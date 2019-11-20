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
                var cap = {}
                for (var i = 0; i < dat.jobLocations.length; i++) {
                    cap[dat.jobLocations[i][0]] = dat.jobLocations[i][1]
                }
                this.setState({capacities:cap})
        }))


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
                        expanded={true}
                    >
                        <img className="logo" src="./0.png" alt="First Step Logo" />
                        <SideNavItems>
                            <SideNavMenuItem><a href="/homepage">Home</a></SideNavMenuItem>
                            <SideNavMenuItem><a href="/checkin">Check In</a></SideNavMenuItem>

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
                        {keys.map(key => (<AccordionItem key={key} title={key + " " + this.state.allData[key].length + ((typeof this.state.capacities !== 'undefined' && key in this.state.capacities) ? "/" + this.state.capacities[key] : "") +" Filled"}>
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