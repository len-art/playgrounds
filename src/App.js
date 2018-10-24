import React, { Component } from "react"

import { firestore } from "./firebase"
import updater from "./updater"

import "./App.css"

class App extends Component {
  state = { counter: undefined }
  componentDidMount() {
    this.init()
  }

  init = async () => {
    const data = await firestore
      .collection("locations")
      .doc("I2r3viL9OZ8nvHEo4kct")
      .onSnapshot(this.handleSnapshot)
    updater.start()
  }

  handleSnapshot = snapshot => {
    const { counter } = snapshot.data()
    this.setState({ counter })
  }

  stopUpdater = () => {
    updater.stop()
  }

  render() {
    const { counter } = this.state
    console.log(counter !== undefined ? counter : "not yet defined")
    return (
      <div className="App">
        <button onClick={this.stopUpdater}>stop updater</button>
        <div>
          counter value: {counter !== undefined ? counter : "not yet defined"}
        </div>
      </div>
    )
  }
}

export default App
