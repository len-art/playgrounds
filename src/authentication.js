import React, { Component } from "react"
import "./authentication.css"

const Register = props => {
  return (
    <div className="logInItems">
      <h2 className="items1">Sign In</h2>
      <div className="line" />
      <div className="items2">
        <p>User Name</p>
        <input type="text" onChange={props.onchange} />
        <p>Password</p>
        <input type="password" onChange={props.onchangepass} />
      </div>
      <button className="button" onClick={props.onclick}>
        SIGN IN
      </button>
    </div>
  )
}

const Login = props => {
  return (
    <div className="logInItems">
      <h2 className="items1">Log In</h2>
      <div className="line" />
      <div className="items2">
        <p>USER NAME</p>
        <input type="text" onChange={props.onchange} />
        <p>PASSWORD</p>
        <input type="password" onChange={props.onchangepass} />
      </div>
      <button className="button" onClick={props.onclick}>
        LOG IN
      </button>
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
      <div className="logInScreen">
        {this.props.userTaken}
        {this.props.errorMessage}
        {this.state.isButtonLogOrReg ? (
          <div className="insideLogInScreen">
            <Register
              onchange={this.props.handleusernamechange}
              onchangepass={this.props.handlepassword}
              onclick={this.props.handleregsubmit}
              regUserNameField={this.props.regUserNameField}
              regPasswordField={this.props.regPasswordField}
            />
          </div>
        ) : (
          <div className="insideLogInScreen">
            <Login
              onchange={this.props.handleusernamechange}
              onchangepass={this.props.handlepassword}
              onclick={this.props.handleLogin}
              handleisregistervisible={this.handleIsRegisterVisible}
            />
          </div>
        )}
        {this.state.isButtonLogOrReg ? (
          <p className="bottomItem">
            Allready have an account?
            <button className="bottomButton" onClick={this.handleIsLogOrReg}>
              Log In
            </button>
          </p>
        ) : (
          <p className="bottomItem">
            Don't have an account?
            <button className="bottomButton" onClick={this.handleIsLogOrReg}>
              Sign In
            </button>
          </p>
        )}
      </div>
    )
  }
}
