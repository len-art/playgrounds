import React, { Component } from "react"

/*
  Parent component should be a class component with state
  it should allow toggling between Login and Register
  its render should look something like this:
  {
    this.state.isRegistering ? <Register {...this.props} /> : <Login {...this.props} />
  }
  */

const Switcher = props => {
  return (
    <div>
      <div>SELECT</div>
      login
      <input type="radio" name="login" onChange={props.handlelogin} />
      register
      <input type="radio" name="register" onChange={props.handleregister} />
    </div>
  )
}

const Register = props => {
  return (
    <div>
      <div>please Register</div>
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
      <div>please LogIn</div>
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

export default class Authentication extends Component {
  constructor(props) {
    super()
    this.state = {
      isRegisterVisible: true
    }
  }
  handleRegister = () => {
    this.setState({ isRegisterVisible: false })
  }
  handleLogin = () => {
    this.setState({ isRegisterVisible: true })
  }
  render() {
    console.log("isLogedIn", this.state.isLogedIn)
    return (
      <div>
        <div>
          <Switcher
            handleregister={this.handleRegister}
            handlelogin={this.handleLogin}
          />
        </div>
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
      </div>
    )
  }
}
