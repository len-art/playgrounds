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
      <input
        type="radio"
        name="login"
        value="login"
        checked={!props.isregistervisible}
        onChange={props.handleSwitch}
      />
      register
      <input
        type="radio"
        name="register"
        value="register"
        checked={props.isregistervisible}
        onChange={props.handleSwitch}
      />
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
        value={props.regUserNameField}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={props.onchangepass}
        value={props.regPasswordField}
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
      isRegisterVisible: false
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.enter)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.enter)
  }
  enter = target => {
    if (target.keyCode === 13) {
      this.props.handleregsubmit() && this.props.handleLogin()
    }
  }

  handleSwitch = event => {
    console.log(event.target.value)
    this.setState({
      isRegisterVisible: event.target.value === "register"
    })
  }
  render() {
    return (
      <div>
        {this.props.userTaken}
        {this.props.errorMessage}
        <div>
          <Switcher
            handleSwitch={this.handleSwitch}
            isregistervisible={this.state.isRegisterVisible}
          />
        </div>
        <div>
          {this.state.isRegisterVisible ? (
            <Register
              onchange={this.props.handleusernamechange}
              onchangepass={this.props.handlepassword}
              onclick={this.props.handleregsubmit}
              regUserNameField={this.props.regUserNameField}
              regPasswordField={this.props.regPasswordField}
            />
          ) : (
            <Login
              onchange={this.props.handleusernamechange}
              onchangepass={this.props.handlepassword}
              onclick={this.props.handleLogin}
              handleisregistervisible={this.handleIsRegisterVisible}
            />
          )}
        </div>
      </div>
    )
  }
}
