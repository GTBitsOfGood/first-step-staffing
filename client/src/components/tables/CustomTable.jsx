import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Delete from '@material-ui/icons/Delete'
import Create from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'

class CustomTable extends Component {
  // custom table, none of these methods are safe yet, don't be an idiot
  tableHeader = (header, editable) => {
    return (
      <TableHead>
        <TableRow>
          {header.map(h => (
            <TableCell>{h}</TableCell>
          ))}
          {editable && <TableCell />}
        </TableRow>
      </TableHead>
    )
  }

  tableBody = (data, keys, editable, editItem, deleteItem) => {
    return (
      <TableBody>
        {data.map(d => (
          <TableRow key={d._id}>
            {keys.map(k => (
              <TableCell component="th" scope="row">
                {d[k]}
              </TableCell>
            ))}
            {editable && (
              <TableCell align="right">
                <IconButton onClick={() => editItem(d._id)}>
                  <Create />
                </IconButton>
                <IconButton onClick={() => deleteItem(d._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    )
  }

  render() {
    const {
      header,
      editable = false,
      data,
      keys,
      editItem,
      deleteItem
    } = this.props
    return (
      <Table>
        {this.tableHeader(header, editable)}
        {this.tableBody(data, keys, editable, editItem, deleteItem)}
      </Table>
    )
  }
}

export default CustomTable
