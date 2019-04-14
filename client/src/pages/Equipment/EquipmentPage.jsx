import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CustomTable from '../../components/tables/CustomTable'
import { connect } from 'react-redux'
import { getAllEquipment, deleteEquipment } from '../../actions/equipment'
import * as routes from '../../routes'

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
    equipment: []
  }

  componentDidMount() {
    this.props.getAllEquipment()
  }

  editItem = id => {
    // This function should likely link to a page with the id in the route
  }

  rowClick = (e, id) => {
    this.props.history.push(`${routes.EQUIPMENTDETAIL}${id}`)
  }

  render() {
    const { classes, equipment = [], error, loading } = this.props
    return (
      <div>
        <h1 className={classes.title}>Current Equipment</h1>
        {!error && (
          <CustomTable
            header={['Name', 'Cost']}
            data={equipment}
            keys={['name', 'cost']}
            editItem={this.editItem}
            deleteItem={this.props.deleteEquipment}
            rowClick={this.rowClick}
          />
        )}
        {error && <h1>Oops! Looks like something went wrong!</h1>}
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          component={Link}
          to={`${routes.EQUIPMENTCREATION}`}
        >
          Create New Equipment
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment.equipment,
    error: state.equipment.error,
    loading: state.equipment.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllEquipment: () => dispatch(getAllEquipment()),
    deleteEquipment: id => dispatch(deleteEquipment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(EquipmentPage))
