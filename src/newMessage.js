import React, { Component } from "react"

import "./newMessage.css"

class Button extends Component {
  render() {
    return <button onClick={this.props.submit}>Submit</button>
  }
}

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: false
    }
  }
  componentDidMount() {
    console.log("componentDidMount")
    window.addEventListener("keydown", this.enter)
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
    window.removeEventListener("keydown", this.enter)
  }
  enter = target => {
    console.log("keycode", target.keyCode)
    if (target.keyCode === 13) {
      this.props.handleSubmit()
    }
  }
  render() {
    console.log(this.state.isLoading)
    return (
      <div>
        <div>
          Username:{" "}
          <input
            type="text"
            value={this.props.username}
            onChange={this.props.handleusernamechange}
          />
        </div>
        <div>
          Message:{" "}
          <input
            type="text"
            value={this.props.message}
            onChange={this.props.handlemessagechange}
          />
        </div>
        <div>
          <div>
            {this.state.isLoading ? (
              <div className="lds-ripple">
                <div />
                <div />
              </div>
            ) : (
              <Button submit={this.props.handlesubmit} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
