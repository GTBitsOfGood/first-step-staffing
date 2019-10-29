import React from 'react'
import { Button, Tile, Form, FormLabel} from 'carbon-components-react'
import "./CheckinPage.scss"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


class JobDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobAssigned: '',
            transportation: '',
            clickNext: false,
        }
    }

    componentDidMount() { }

    handleChange = event => {
        this.setState({
          [event.target.name] : event.target.value
        });
    }


    handleSubmit = e => {
        e.preventDefault()
        // Submit
        this.setState({ clickNext: true, loading: true })
    }

    render() {
        return (
            <div className="container">
            <Tile className="tile">
              <Form className="bx--form-item">
                <FormLabel className="formLabel">
                Adjust {this.props.name}'s job details.
                </FormLabel>
                <br></br>


                <font className="font" size="2.5"> Job Assigned: </font>

                <br></br>
                <Select
                  className="dropdown"
                  name="jobAssigned"
                  value={this.state.jobAssigned}
                  onClick={this.handleChange}
                  inputProps={{id: 'JobAssignments'}}
                  >
                    <MenuItem value="Job1"> Painting </MenuItem>
                    <MenuItem value="Job2"> Mowing </MenuItem>
                    <MenuItem value="Job3"> Factory work </MenuItem>
                    <MenuItem value="Job4"> Food Critic </MenuItem>
                </Select>

                <br></br>

                <font className="font" size="2.5"> Transportation: </font>
                <br></br>
                <Select
                  className="dropdown"
                  name="transportation"
                  value={this.state.transportation}
                  onClick={this.handleChange}
                  inputProps={{id: 'Transportation'}}
                  >
                    <MenuItem value="trans1"> Marta </MenuItem>
                    <MenuItem value="trans2"> Uber </MenuItem>
                    <MenuItem value="trans3"> Personal car </MenuItem>
                    <MenuItem value="trans4"> Bird </MenuItem>
                </Select>


              </Form>
              <div className="bx--btn-set">
                <Button
                  disabled={false}
                  kind="secondary"
                  tabIndex={0}
                  type="button"
                  style={{backgroundColor: "dark-grey"}}
                >
                  Cancel
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
export default JobDetailsPage