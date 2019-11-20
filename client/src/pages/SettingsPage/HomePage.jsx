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
            rows: [
              {
                id: '0',
                location: 'Elander',
                spotsAvail: '',

              },
              {
                id: '1',
                location: 'Chief',
                spotsAvail: '',

              },
              {
                id: '2',
                location: 'Candy Factory',
                spotsAvail: '',

              },
            ],
            location: '',
            jobLocations: []

        }
    }


    handleChange = e => {
      var temp = this.state.jobLocations
      temp[e.target.id][0] = e.target.value
      this.setState({jobLocations: temp})

      console.log(temp);
    }

     handleChangeCapacity = e => {
      // var temp = this.state.jobLocations
      // console.log(temp)
      // console.log(e.target.id)
      // console.log(temp[e.target.id])
      // temp[e.target.id][1] = e.target.value
      // this.setState({jobLocations: temp})

      // console.log(temp);
    }

    render() {
        return (
            <div>
                <DataTable
                  rows={this.state.rows}
                  headers={headers}
                  render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
                    <TableContainer title="Welcome! Setup today's dispatch here">
                      <Table>
                        <TableHead className ='head'>
                          <TableRow>
                            <TableHeader>On/Off</TableHeader>
                            <TableHeader>Location</TableHeader>
                            <TableHeader> Spots Available </TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.jobLocations.map((jobLoc, i) => (
                            <TableRow key={jobLoc}>
                          {/* could put toggle small here but it doesn't toggle*/}
                              <Toggle/>
                                 <TableCell
                                 className="cell-job">
                                  <TextInput
                                  onBlur = {this.handleChange}
                                  defaultValue={jobLoc[0]}
                                  id={i}
                                  />
                                 </TableCell>

                              <NumberInput onChange = {this.handleChangeCapacity} id={i} className = 'numberinput' value={jobLoc[1]}/>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    )}
                />

            </div>
        );

    }
}

export default HomePage



