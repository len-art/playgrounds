import React, { Component } from "react"

import { firestore } from "./firebase"
import Update from "./update"

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
    this.update = new Update()
  }
  componentDidMount() {
    this.init()
  }

  init = async () => {
    const docSnapshot = await firestore.collection("locations").get()
    if (!docSnapshot.empty) {
      const documents = docSnapshot.docs.map(s => ({
        id: s.id,
        value: undefined
      }))
      this.setState({
        loading: false,
        documents: documents.reduce(
          (acc, v) => ({ ...acc, [v.id]: v.value }),
          {}
        )
      })
    }
  }

  getSpecific = async id => {
    try {
      const data = await this.update.getSpecificDoc(id)
      console.log(data)
    } catch (error) {}
  }

  render() {
    const { loading, data, updating, documents } = this.state
    console.log(documents)
    return (
      <div className="App">
        <button onClick={this.update.updateSpecificDoc}>update</button>
        <div className="controls">
          <button onClick={this.toggleUpdater}>
            {updating ? "stop updater" : "start updater"}
          </button>
        </div>
        {loading && <div>loading...</div>}
        {!loading &&
          Object.keys(documents).map(id => (
            <div key={id}>
              <button onClick={() => this.getSpecific(id)}>get</button>
              {id}:{" "}
              {documents[id] !== undefined ? documents[id] : "no data yet"}
            </div>
          ))}
      </div>
    )
  }
}

export default App
