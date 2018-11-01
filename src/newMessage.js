import React, { Component } from "react"

import "./newMessage.css"

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: false
    }
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <div>
        <div>
          Username:{" "}
          <input
            type="text"
            value={this.props.username}
            onChange={this.props.handleusernamechange}
          />
        </div>
        <div>
          Message:{" "}
          <input
            type="text"
            value={this.props.message}
            onChange={this.props.handlemessagechange}
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
              <button onClick={this.props.handlesubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    )
  }
}
