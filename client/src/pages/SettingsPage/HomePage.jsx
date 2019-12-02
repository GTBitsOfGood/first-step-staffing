import React from 'react'
import { Button, Icon, Toggle, ToggleSmall, SideNav,SideNavItems, SideNavLink, SideNavMenuItem, Tile, Form, TextInput, FormLabel, DatePicker, DataTable, NumberInput, DatePickerInput, Select, SelectItem, SelectItemGroup, Accordion, AccordionItem } from 'carbon-components-react'
import "./HomePage.scss"
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbarSearch,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableSelectAll,
  TableSelectRow
} = DataTable;

const icon = <Icon
className="extra-class"
fill="grey"
icon={{
  height: '10',
  id: 'icon--add',
  name: 'icon--add',
  styles: '',
  svgData: {
    paths: [
      {
        d: 'M6 4h4v2H6v4H4V6H0V4h4V0h2v4z'
      }
    ]
  },
  tags: 'icon--add',
  viewBox: '0 0 10 10',
  width: '10'
}}
/>

class HomePage extends React.Component {
    componentDidMount() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()

        today = mm + '-' + dd + '-' + yyyy;
        today = '10-29-2019'

        fetch(`/api/checkin/date/${today}`, {
          method: 'GET'
        })
        .then(res => res.json().then(dat => {
          this.setState({jobLocations: dat.jobLocations, transportations: dat.transportations})
          console.log(this.state.jobLocations)
          console.log(this.state.transportations)

        }))
        console.log(this.state.jobLocations)


    }
   

    handleToggle = e => {
        e.preventDefault();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()

        today = mm + '-' + dd + '-' + yyyy;

        let object = {
          date: today,
          jobLocations: this.state.location,
          transportations: this.state.transportations
        }


        console.log("object" + object.transportations);



        fetch('/api/checkin/createDate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object)
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ loading: false })
          })
          .catch(err => this.setState({ error: err, loading: false }))


    }


    constructor(props) {
        super(props);
        this.state = {
            jobLocations: [],
            transportations: [],
            newLocation: '',
            newSpotsAvail: '',
            newTransp: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCapacity = this.handleChangeCapacity.bind(this);

    }


    handleChange = e => {
      let temp = this.state.jobLocations
      temp[e.target.id][0] = e.target.value
      this.setState({jobLocations: temp})
      console.log(temp);
    }

    handleTransChange = e => {
      let temp = this.state.transportations;
      temp[e.target.id] = e.target.value
      this.setState({transportations: temp})
      console.log(temp);
    }


    // having issue with this method. Only updates when they manually
    // change the numbers and not when they increment using the arrows
     handleChangeCapacity = e => {
      let temp = this.state.jobLocations;
      console.log(temp);
      console.log('id:' + e.target.id);
      //console.log(temp[e.target.id - ]);
      temp[e.target.id][1] = e.target.value
      // this.setState({jobLocations: temp})

      console.log(temp);
    }

    handleNew = e => {
      this.setState({
        [e.target.id] : e.target.value
      });
      console.log('location ' + this.state.newLocation);
      console.log('spots ' + this.state.newSpotsAvail);
      console.log('transp ' + this.state.newTransp);
    }

    handleClickJob = e => {
      let temp = this.state.jobLocations;
      temp.push([this.state.newLocation, this.state.newSpotsAvail]);
      this.setState({
        jobLocations: temp
      });
      console.log("state " + this.state.jobLocations);
    }

    handleClickTransp = e => {
      let temp = this.state.transportations;
      temp.push([this.state.newTransp]);
      this.setState({
        transportations: temp
      });
      console.log("state " + this.state.transportations);
    }

    render() {
        return (
            <div>
              <SideNav
                    isFixedNav
                    expanded={true}
                >
                    <img className="logo" src="./0.png" alt="First Step Logo" />
                    <SideNavItems>
                        <SideNavLink href="/homepage">Home</SideNavLink>
                        <SideNavLink href="/checkin">Check In</SideNavLink>

                    </SideNavItems>


                </SideNav>
              <h2 style = {{font: 'bold', marginLeft: '150px'}}> Welcome! </h2>
              <br></br>
              <h4 style = {{marginLeft: '150px'}}> All changes made here will be reflected in the "Dispatch" Page.</h4>
              <br></br>
              <h4 className = 'title' style = {{marginLeft: '150px'}}>Job Location & Availability </h4>
              <div className = 'header-container'>
                <h5 className = 'header1'> On/Off </h5>
                <h5 className = 'header'> Location </h5>
                <h5> Spots Available </h5>
              </div>
              {this.state.jobLocations.map((jobLoc, i) => (
                <Tile className = 'body'>
              {/* could put toggle small here but it doesn't toggle*/}
                    <Toggle/>

                    <TextInput
                    className = 'textInput'
                    onBlur = {this.handleChange}
                    defaultValue={jobLoc[0]}
                    id={i}
                    />

                    <NumberInput
                    style = {{height: '25px', backgroundColor: 'rgb(235, 235, 235)'}}
                    onChange = {this.handleChangeCapacity} id ={i} className = 'numberinput' value={jobLoc[1]}/>
                </Tile>
              ))}

              {/*Don't know how to put icons*/}
              {/* adds new location and spots available */}
              <Tile className = 'add-new'>
                <Button size = 'small' className = 'add-button' hasOnlyIcon={true} onClick = {this.handleClickJob}> + </Button> 
                <TextInput id = 'newLocation' onBlur = {this.handleNew}style = {{marginLeft: '10px'}} placeholder = 'Add a new location ... ' className = 'textInput'/>
                <TextInput id = 'newSpotsAvail' onBlur = {this.handleNew} style = {{backgroundColor: 'rgb(235, 235, 235)'}} className = 'numberInput'/> 
              </Tile>
          
              <br></br>
              <h4 className = 'title' style = {{marginLeft: '150px'}}>Tranportation </h4>
              <div className = 'header-container'>
                <h5 className = 'header1'> On/Off </h5>
                <h5 className = 'header'> Transportation </h5>

              </div>
              {this.state.transportations.map((trans, i) => (
                <Tile className = 'body'>
              {/* could put toggle small here but it doesn't toggle*/}
                    <Toggle/>
                    <TextInput
                    className = 'transpInput'
                    onBlur = {this.handleTransChange}
                    defaultValue={trans}
                    id={i}
                    />
                </Tile>

              ))}
              
              {/* adds new transporation */}

              <Tile className = 'add-new'>
                <Button size = 'small' onClick = {this.handleClickTransp} className = 'add-button'> + </Button> 
                <TextInput onBlur = {this.handleNew} id = 'newTransp' style = {{marginLeft: '10px'}} placeholder = 'Add a new transportation ... ' className = 'transpInput'/>
              </Tile>

            </div>
        );

    }
}

export default HomePage



