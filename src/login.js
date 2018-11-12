import React, { Component } from "react"

export default class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      isLogedIn: true
    }
  }
  render() {
    console.log("isLogedIn", this.state.isLogedIn)
    return (
      <div>
        <div>please login</div>
        <input
          type="text"
          placeholder="Enter username"
          onChange={this.props.handleusernamechange}
        />
        <input
          type="text"
          placeholder="Enter password"
          onChange={this.props.handleusernamechange}
        />
        <button className="button" onClick={this.props.handleusernamechange}>
          confirm
        </button>
      </div>
    )
  }
}
