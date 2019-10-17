import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core'

const styles = {
  paper: {
    margin: 'auto',
    padding: '20px',
    textAlign: 'left'
  },
  group: {
    margin: '0 15%'
  },
  button: {
    maxHeight: '22px',
    margin: '0 0 0 20px'
  }
}

class EquipmentDetailCard extends Component {
  render() {
    const { equipment, classes } = this.props
    return (
      <div className={classes.group}>
        {equipment && (
          <Paper className={classes.paper} elevation={1}>
            <p> Equipment Name: {equipment.name} </p>
            <p> Equipment Cost: {equipment.cost} </p>
          </Paper>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(EquipmentDetailCard)
