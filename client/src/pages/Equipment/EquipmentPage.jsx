import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CustomTable from '../../components/tables/CustomTable'

const styles = theme => ({
  button: {
    float: 'right',
    margin: '20px 0'
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'center'
  }
})

class EquipmentPage extends Component {
  state = {
    equipment: [
      { id: 0, name: 'Steel Toed Boots', cost: 20 },
      { id: 1, name: 'Shovel', cost: 10 },
      { id: 2, name: 'Equipment1', cost: 5 },
      { id: 3, name: 'Equipment2', cost: 7 }
    ]
  }

  editItem = id => {
    // This function should likely link to a page with the id in the route
  }

  deleteItem = id => {
    this.setState(prevState => ({
      equipment: prevState.equipment.filter(e => e.id !== id)
    }))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Equipment</h1>
        <CustomTable
          header={['Name', 'Cost']}
          data={this.state.equipment}
          keys={['name', 'cost']}
          editable={true}
          deleteItem={this.deleteItem}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to="/dashboard/equipment/creation"
        >
          Create New Equipment
        </Button>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EquipmentPage)
