import React from 'react'
import { Button, Toggle, ToggleSmall, SideNav,SideNavItems, SideNavMenuItem, Tile, Form, TextInput, FormLabel, DatePicker, DataTable, NumberInput, DatePickerInput, Select, SelectItem, SelectItemGroup, Accordion, AccordionItem } from 'carbon-components-react'
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

const headers = [

    //ask about this cuz it makes no sense
  {
    key: 'location',
    header: 'Location',
  },

  // {
  //   key: 'spotsAvail',
  //   header: 'Spots Available',
  // }

];
class HomePage extends React.Component {
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
          console.log(this.state.jobLocations)
          console.log(this.state.transportations)
  
        }))
        console.log(this.state.jobLocations)
        

  }

    handleToggle = e => {
        e.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()

        today = mm + '-' + dd + '-' + yyyy;

        let object = {
          date: today,
          jobLocations: this.state.location,
          transportations: this.state.transportations
        }



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
            transportations: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCapacity = this.handleChangeCapacity.bind(this);
     
    }


    handleChange = e => {
      var temp = this.state.jobLocations
      temp[e.target.id][0] = e.target.value
      this.setState({jobLocations: temp})
      console.log(temp);
    }

    handleTransChange = e => {
      var temp = this.state.transportations;
      temp[e.target.id] = e.target.value
      this.setState({transportations: temp})
      console.log(temp);
    }

     handleChangeCapacity = e => {
      var temp = this.state.jobLocations;
      console.log(temp);
      console.log('id:' + e.target.id);
      //console.log(temp[e.target.id - ]);
      // temp[e.target.id][1] = e.target.value
      // this.setState({jobLocations: temp})

      console.log(temp);
    }
  
    render() {
        return (
            <div>
              <h2 style = {{font: 'bold'}}> Welcome! </h2>
              <br></br>
              <h4> All changes made here will be reflected in the "Dispatch" Page.</h4>
              <br></br>
              <h4 className = 'title'>Job Location & Availability </h4> 
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

 


              <br></br>


              <h4 className = 'title'>Tranportation </h4> 
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
                
            </div>
        );

    }
}

export default HomePage



