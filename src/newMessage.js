import React, { Component } from "react"

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      userName: "",
      message: ""
    }
  }
  handleUserNameChange = event => {
    this.setState({ userName: event.target.value })
  }
  handleMessageChange = event => {
    this.setState({ message: event.target.value })
  }
  render() {
    return (
      <div>
        <div>
          Username:{" "}
          <input
            type="text"
            value={this.state.userName}
            onChange={this.handleUserNameChange}
          />
        </div>
        <div>
          Message:{" "}
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
        </div>
      </div>
    )
  }
}
