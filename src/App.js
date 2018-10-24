import React, { Component } from "react"

import { firestore } from "./firebase"
import Update from "./update"

import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = { loading: true, data: [] }
    this.update = new Update()
  }
  componentDidMount() {
    this.init()
  }

  init = async () => {
    const docSnapshot = await firestore.collection("locations").get()
    if (!docSnapshot.empty) {
      this.listeners = docSnapshot.docs.map(async s => {
        firestore
          .collection("locations")
          .doc(s.id)
          .onSnapshot(snapshot => this.handleSnapshot(s.id, snapshot))
        return s.id
      })
      this.setState({ loading: false })
    }
    const setupUpdate = this.update.init()
  }

  handleSnapshot = (id, snapshot) => {
    const { counter } = snapshot.data()
    const { data } = this.state
    this.setState({ data: { ...data, [id]: counter } })
  }

  stopUpdater = () => {
    this.update.stop()
  }

  render() {
    const { loading, data } = this.state
    console.log(data)
    return (
      <div className="App">
        <button onClick={this.stopUpdater}>stop updater</button>
        {loading && <div>loading...</div>}
        {!loading &&
          Object.keys(data).map(id => (
            <div>
              {id}: {data[id]}
            </div>
          ))}
      </div>
    )
  }
}

export default App
