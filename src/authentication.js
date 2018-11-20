import React, { Component } from "react"
import "./authentication.css"

const Register = props => {
  return (
    <div className="containerIn">
      <h2 className="logIn">Sign In</h2>
      <vl
        style={{
          color: "#ccc",
          backgroundColor: "#ccc",
          height: 1,
          width: 300
        }}
      />
      <br />
      <p className="itemsContainerIn">User Name</p>
      <input
        type="text"
        className="itemsContainerIn"
        onChange={props.onchange}
      />
      <br />
      <p className="itemsContainerIn">Password</p>
      <input
        type="password"
        className="itemsContainerIn"
        onChange={props.onchangepass}
      />
      <div className="buttonContainer">
        <button className="button" onClick={props.onclick}>
          SIGN IN
        </button>
      </div>
    </div>
  )
}

const Login = props => {
  return (
    <div className="containerIn">
      <h2 className="logIn">Log In</h2>
      <vl
        style={{
          color: "#ccc",
          backgroundColor: "#ccc",
          height: 1,
          width: 300
        }}
      />
      <br />
      <p className="itemsContainerIn">User Name</p>
      <input
        type="text"
        className="itemsContainerIn"
        onChange={props.onchange}
      />
      <br />
      <p className="itemsContainerIn">Password</p>
      <input
        type="password"
        className="itemsContainerIn"
        onChange={props.onchangepass}
      />
      <div className="buttonContainer">
        <button className="button" onClick={props.onclick}>
          LOG IN
        </button>
      </div>
    </div>
  )
}

export default class Authentication extends Component {
  constructor(props) {
    super()
    this.state = {
      isRegisterVisible: false,
      isButtonLogOrReg: false
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.enter)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.enter)
  }
  enter = target => {
    if (target.keyCode === 13 && this.state.isButtonLogOrReg) {
      this.props.handleregsubmit()
    } else if (target.keyCode === 13 && !this.state.isButtonLogOrReg) {
      this.props.handleLogin()
      //no need for && !this.state.isButtonLogOrReg
    }
  }
  handleIsLogOrReg = () => {
    this.setState({ isButtonLogOrReg: !this.state.isButtonLogOrReg })
  }

  render() {
    return (
      <div className="container">
        {this.props.userTaken}
        {this.props.errorMessage}
        {this.state.isButtonLogOrReg ? (
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
        {this.state.isButtonLogOrReg ? (
          <h4
            style={{
              height: 1
            }}
          >
            Allready have an account?
            <button className="buttonRegSwitch" onClick={this.handleIsLogOrReg}>
              Log In
            </button>
          </h4>
        ) : (
          <h4
            style={{
              height: 1
            }}
          >
            Don't have an account?
            <button className="buttonRegSwitch" onClick={this.handleIsLogOrReg}>
              Sign In
            </button>
          </h4>
        )}
      </div>
    )
  }
}
