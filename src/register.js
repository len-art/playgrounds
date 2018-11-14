import React, { Component } from "react"

export default class Register extends Component {
  constructor(props) {
    super()
    this.state = {}
  }
  render() {
    // console.log("isLogedIn", this.state.isLogedIn)
    return (
      <div>
        <div>please login</div>
        <input
          type="text"
          placeholder="Enter username"
          onChange={this.props.handleusernamechange}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={this.props.handlePassword}
        />
        <button className="button" onClick={this.props.handleRegSubmit}>
          confirm
        </button>
      </div>
    )
  }
}
