import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import EquipmentDetailCard from '../../components/EquipmentDetailCard'
import { getEquipmentByID } from '../../actions/equipment'
import { connect } from 'react-redux'

const styles = theme => ({
  button: {
    float: 'right',
    margin: '20px 0'
  },
  title: {
    color: theme.palette.secondary.main,
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class EquipmentDetailPage extends Component {
  componentDidMount() {
    this.props.getEquipmentByID(this.props.match.params.id)
  }
  render() {
    const { classes, equipment } = this.props
    const eq = equipment.filter(
      j => j._id === this.props.match.params.id
    )[0]
    return (
      <div>
        <h1 className={classes.title}>Equipment Details</h1>
        <div className={classes.container}>
          <EquipmentDetailCard equipment={eq} />
        </div>
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
    getEquipmentByID: id => dispatch(getEquipmentByID(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(EquipmentDetailPage))
