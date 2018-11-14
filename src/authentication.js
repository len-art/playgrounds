import React, { Component } from "react"

/*
  Parent component should be a class component with state
  it should allow toggling between Login and Register
  its render should look something like this:
  {
    this.state.isRegistering ? <Register {...this.props} /> : <Login {...this.props} />
  }
  */
const Register = props => {}

const Login = props => {
  return (
    <div>
      <div>please login</div>
      <input
        type="text"
        placeholder="Enter username"
        onChange={this.props.onchange}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={this.props.onchangepass}
      />
      <button className="button" onClick={this.props.onclick}>
        confirm
      </button>
    </div>
  )
}

export default class Authentication extends Component {
  constructor(props) {
    super()
    this.state = {}
  }
  render() {
    console.log("isLogedIn", this.state.isLogedIn)
    return (
      <div>
        <Login
          onchange={this.props.handleusernamechange}
          onchangepass={this.props.handlepassword}
          onclick={this.props.handleregsubmit}
        />
      </div>
    )
  }
}
