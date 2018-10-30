import React, { Component } from "react"

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      userName: "",
      message: ""
    }
  }
  render() {
    return (
      <div>
        <div>
          Username: <input type="text" />
        </div>
        <div>
          Message: <input />
        </div>
      </div>
    )
  }
}
