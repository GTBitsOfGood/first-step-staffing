import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'

class JobDetailsPage extends Component {
  render() {
    return (
      <div>
        <h1>Job Details</h1>
        <Paper>
          <h1>{}</h1>
        </Paper>
      </div>
    )
  }
}

export default JobDetailsPage
