import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toLink = text => text.toLowerCase().replace(/\s+/g, '')

  render() {
    return <div>I Am Dashboard</div>
  }
}

export default Dashboard
