import React from 'react'
import { Button, Toggle, SideNav,SideNavItems, SideNavMenuItem, Tile, Form, TextInput, FormLabel, DatePicker, DataTable, NumberInput, DatePickerInput, Select, SelectItem, SelectItemGroup, Accordion, AccordionItem } from 'carbon-components-react'
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
          this.setState({jobAssigned: this.state.jobLocations[0][0], transportation: this.state.transportations[0]})
        }))

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
                spotsAvail: '12',

              },
              {
                id: '1',
                location: 'Chief',
                spotsAvail: '12',

              },
              {
                id: '2',
                location: 'Candy Factory',
                spotsAvail: '12',

              },
            ],
            location: ''

        }
    }
    render() {
        return (
            <div>
                <DataTable
                  rows={this.state.rows}
                  headers={headers}
                  render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
                    <TableContainer title="Today's Dispatch">
                      <Table>
                        <TableHead className ='head'>
                          <TableRow>
                          <TableHeader>On/Off</TableHeader>
                            {headers.map(header => (
                              <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>

                            ))}
                            <TableHeader> Spots Available </TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              <TableSelectRow {...getSelectionProps({ row })} />
                              {row.cells.map(cell => (
                                <TableCell
                                 className="cell-body"
                                 key={cell.id}>{cell.value}

                                 </TableCell>

                              ))}
                              <NumberInput/>
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



