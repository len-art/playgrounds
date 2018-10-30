import React, { Component } from "react"

import { firestore } from "./firebase"
import Database from "./database"
import NewMessage from "./newMessage"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      updating: false,
      documents: {},
      fetchedValue: undefined
    }
    this.database = new Database()
  }

  getSpecific = async id => {
    try {
      const data = await this.database.getSpecificDoc(id)
      console.log(data)
    } catch (error) {}
  }

  render() {
    const { loading, data, updating, documents } = this.state
    console.log(documents)
    return (
      <div className="App">
        <NewMessage database={this.database} />
      </div>
    )
  }
}

export default App
