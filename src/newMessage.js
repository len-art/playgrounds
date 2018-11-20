import React, { Component } from "react"

import "./newMessage.css"

import History from "./history"

export default class NewMessage extends Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: false
    }
  }
  componentDidMount() {
    window.addEventListener("keydown", this.enter)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.enter)
  }
  enter = target => {
    if (target.keyCode === 13) {
      this.props.handlesubmit()
    }
  }
  handleReload() {
    window.location.reload()
  }
  render() {
    console.log(this.state.isLoading)
    console.log(this.props.username)
    return (
      <div>
        <button onClick={this.handleReload}>LOG OUT</button>
        <div className="Container">
          <div>
            <History
              database={this.props.database}
              username={this.props.username}
            />
            <div className="HistoryContainer">
              <textarea
                id="description"
                rows="1"
                cols="50"
                placeholder="Type a message..."
                className="textContainer"
                name=""
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
                  <div>{""}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
