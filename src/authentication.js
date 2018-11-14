import React, { Component } from "react"

/*
  Parent component should be a class component with state
  it should allow toggling between Login and Register
  its render should look something like this:
  {
    this.state.isRegistering ? <Register {...this.props} /> : <Login {...this.props} />
  }
  */
const Register = props => {
  return (
    <div>
      <div>please register</div>
      <input
        type="text"
        placeholder="Enter username"
        onChange={props.onchange}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={props.onchangepass}
      />
      <button className="button" onClick={props.onclick}>
        confirm
      </button>
    </div>
  )
}

const Login = props => {
  return (
    <div>
      <div>please login</div>
      <input
        type="text"
        placeholder="Enter username"
        onChange={props.onchange}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={props.onchangepass}
      />
      <button className="button" onClick={props.onclick}>
        confirm
      </button>
      <div>
        <button onClick={props.handleisregistervisible}>register</button>
      </div>
    </div>
  )
}

export default class Authentication extends Component {
  constructor(props) {
    super()
    this.state = {
      isRegisterVisible: true
    }
  }
  handleIsRegisterVisible = () => {
    this.setState({ isRegisterVisible: false })
  }
  render() {
    console.log("isLogedIn", this.state.isLogedIn)
    return (
      <div>
        {this.state.isRegisterVisible ? (
          <Login
            onchange={this.props.handleusernamechange}
            onchangepass={this.props.handlepassword}
            onclick={this.props.handleregsubmit}
            handleisregistervisible={this.handleIsRegisterVisible}
          />
        ) : (
          <Register
            onchange={this.props.handleusernamechange}
            onchangepass={this.props.handlepassword}
            onclick={this.props.handleregsubmit}
          />
        )}
      </div>
    )
  }
}
