import React, { Component } from "react"

import { firestore } from "./firebase"
import Database from "./database"
import NewMessage from "./newMessage"
import History from "./history"

import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.database = new Database()
    this.state = {
      userName: "",
      message: ""
    }
  }
  async componentDidMount() {
    /* example of doubleQueryEquals
      function takes 2 arguments:
      database name and two objects for query
      you can delete this */
    console.log(
      await this.database.doubleQueryEquals(
        "messages",
        { field: "message", value: "testing modify" },
        { field: "username", value: "leon" }
      )
    )
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
    await this.database.addToCollection("messages", payload)
    this.setState({ isLoading: false, message: "" })
  }
  render() {
    return (
      <div className="App">
        <NewMessage
          database={this.database}
          username={this.state.userName}
          message={this.state.message}
          handleusernamechange={this.handleUserNameChange}
          handlemessagechange={this.handleMessageChange}
          handlesubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App
