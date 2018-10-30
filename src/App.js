import React, { Component } from "react"

import { firestore } from "./firebase"
import Update from "./update"

import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = { loading: true, updating: false, documents: [] }
    this.update = new Update()
    this.listener = undefined
    this.documents = []
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
    this.update.init()
  }

  subscribeTo = id => {
    if (this.listener) this.listener()
    this.listener = firestore
      .collection("locations")
      .doc(id)
      .onSnapshot(snapshot => this.handleSnapshot(id, snapshot))
  }

  getSpecific = async id => {
    try {
      const data = await this.update.getSpecificDoc(id)
      console.log({ data })
    } catch (error) {}
  }

  handleSnapshot = (id, snapshot) => {
    const { counter } = snapshot.data()
    this.setState(({ documents }) => ({
      documents: { ...documents, [id]: counter }
    }))
  }

  toggleUpdater = () => {
    const hasCompleted = this.state.updating
      ? this.update.stop()
      : this.update.start()
    if (hasCompleted) {
      this.setState(prevState => ({ updating: !prevState.updating }))
    }
  }

  render() {
    const { loading, data, updating, documents } = this.state
    console.log(documents)
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleUpdater}>
            {updating ? "stop updater" : "start updater"}
          </button>
        </div>
        {loading && <div>loading...</div>}
        {!loading &&
          Object.keys(documents).map(id => (
            <div key={id}>
              <button onClick={() => this.subscribeTo(id)}>subscribe</button>
              <button onClick={() => this.getSpecific(id)}>get</button>
              {id}:{" "}
              {documents[id] !== undefined ? documents[id] : "no data yet"}
            </div>
          ))}
        {/* {!loading &&
          Object.keys(data).map(id => (
            <div key={id}>
              {id}: {data[id]}
            </div>
          ))} */}
      </div>
    )
  }
}

export default App
