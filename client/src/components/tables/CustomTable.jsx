import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Delete from '@material-ui/icons/Delete'
import Create from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.15) !important' // doesn't work without important, further research required
  }
}
class CustomTable extends Component {
  state = { selected: '' }
  // custom table, none of these methods are safe yet so don't be an idiot
  tableHeader = (header, editable, deletable) => {
    return (
      <TableHead>
        <TableRow>
          {header.map(h => (
            <TableCell key={h}>{h}</TableCell>
          ))}
          {(editable || deletable) && <TableCell />}
        </TableRow>
      </TableHead>
    )
  }

  multirowSelectHandler = (e, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  rowSelectHandler = (e, id) => {
    const { selected } = this.state
    if (selected === id) {
      this.setState({ selected: '' })
    } else this.setState({ selected: id })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  selectableTableBody = (data, keys, multiselect) => {
    const { classes } = this.props
    return (
      <TableBody>
        {data.map(d => {
          const isSelected = this.isSelected(d._id)
          return (
            <TableRow
              hover
              selected={isSelected}
              classes={{ selected: classes.selected }}
              key={d._id}
              onClick={e =>
                multiselect
                  ? this.multirowSelectHandler(e, d._id)
                  : this.rowSelectHandler(e, d._id)
              }
            >
              {keys.map(k => (
                <TableCell key={k} component="th" scope="row">
                  {d[k]}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  tableBody = (data, keys, editItem, deleteItem, rowClick) => {
    return (
      <TableBody>
        {data.map(d => {
          return (
            <TableRow hover={rowClick !== null} key={d._id}>
              {keys.map(k => (
                <TableCell
                  key={k}
                  component="th"
                  scope="row"
                  onClick={e => (rowClick ? rowClick(e, d._id) : null)}
                >
                  {d[k]}
                </TableCell>
              ))}
              {(editItem || deleteItem) && (
                <TableCell align="right">
                  {editItem && (
                    <IconButton onClick={() => editItem(d._id)}>
                      <Create />
                    </IconButton>
                  )}
                  {deleteItem && (
                    <IconButton onClick={() => deleteItem(d._id)}>
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  render() {
    const {
      header,
      data,
      keys,
      editItem,
      deleteItem,
      rowClick,
      selectable = false,
      multiselectable = false
    } = this.props
    return (
      <Table>
        {this.tableHeader(header, editItem, deleteItem)}
        {selectable || multiselectable
          ? this.selectableTableBody(data, keys, multiselectable)
          : this.tableBody(data, keys, editItem, deleteItem, rowClick)}
      </Table>
    )
  }
}

CustomTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  editItem: function(props, propName, componentName) {
    if (
      (props['selectable'] === true || props['multiselectable'] === true) &&
      typeof props[propName] === 'function'
    ) {
      return new Error('The table cannot be editable and selectable')
    } else if (
      props[propName] !== undefined &&
      typeof props[propName] !== 'function'
    ) {
      return new Error('editItem must be a function')
    }
  },
  deleteItem: function(props, propName, componentName) {
    if (
      (props['selectable'] === true || props['multiselectable'] === true) &&
      typeof props[propName] === 'function'
    ) {
      return new Error('The table cannot be editable and selectable')
    } else if (
      props[propName] !== undefined &&
      typeof props[propName] !== 'function'
    ) {
      return new Error('deleteItem must be a function')
    }
  },
  selectable: function(props, propName, componentName) {
    if (
      (typeof props['editItem'] === 'function' ||
        typeof props['deleteItem'] === 'function') &&
      props[propName] === true
    ) {
      return new Error('The table cannot be editable and selectable')
    } else if (props['multiselectable'] === true && props[propName] === true) {
      return new Error('The table cannot be single and multiselectable')
    } else if (
      props[propName] !== undefined &&
      typeof props[propName] !== 'boolean'
    ) {
      return new Error('selectable must be a boolean')
    }
  },
  multiselectable: function(props, propName, componentName) {
    if (
      (typeof props['editItem'] === 'function' ||
        typeof props['deleteItem'] === 'function') &&
      props[propName] === true
    ) {
      return new Error('The table cannot be editable and selectable')
    } else if (props['selectable'] === true && props[propName] === true) {
      return new Error('The table cannot be single and multiselectable')
    } else if (
      props[propName] !== undefined &&
      typeof props[propName] !== 'boolean'
    ) {
      return new Error('multiselectable must be a boolean')
    }
  },
  rowClick: function(props, propName, componentName) {
    if (
      (props['multiselectable'] === true || props['selectable'] === true) &&
      props[propName] === 'function'
    ) {
      return new Error(
        'The table cannot be selectable and have a custom click handler'
      )
    } else if (
      props[propName] !== undefined &&
      typeof props[propName] !== 'function'
    ) {
      return new Error('rowClick must be a function')
    }
  }
}

export default withStyles(styles)(CustomTable)
