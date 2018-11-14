import React, { Component } from "react"

/*
  Parent component should be a class component with state
  it should allow toggling between Login and Register
  its render should look something like this:
  {
    this.state.isRegistering ? <Register {...this.props} /> : <Login {...this.props} />
  }
  */

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
          onChange={this.props.handlepassword}
        />
        <button className="button" onClick={this.props.handleregsubmit}>
          confirm
        </button>
      </div>
    )
  }
}
