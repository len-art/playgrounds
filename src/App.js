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
  }

  render() {
    return (
      <div className="App">
        <NewMessage database={this.database} />
        <History database={this.database} />
      </div>
    )
  }
}

export default App
