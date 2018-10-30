import React, { Component } from "react"

import "./newMessage.css"

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      userName: "",
      message: "",
      isLoading: false
    }
  }
  handleUserNameChange = event => {
    this.setState({ userName: event.target.value })
  }
  handleMessageChange = event => {
    this.setState({ message: event.target.value })
  }
  handleSubmit = async () => {
    this.setState({ isLoading: true })
    const payload = {
      message: this.state.message,
      username: this.state.userName,
      ts: new Date()
    }
    await this.props.database.addToCollection("messages", payload)
    this.setState({ isLoading: false, message: "" })
  }
  render() {
    console.log(this.state.isLoading)
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
        <div>
          <div>
            {this.state.isLoading ? (
              <div className="lds-ripple">
                <div />
                <div />
              </div>
            ) : (
              <button onClick={this.handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    )
  }
}
