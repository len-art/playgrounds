import React, { Component } from "react"
import moment from "moment"
import "./history.css"

const DisplayMessage = props => {
  return (
    <div
      className={
        props.message.username === props.username
          ? "messageContainer right"
          : "messageContainer"
      }
    >
      <div className="messageTimeStamp">
        {moment(props.message.ts.toDate()).format("l kk:mm")}
      </div>
      <div className="messageUser">{props.message.username}:</div>
      <div className="messageContent">{props.message.message}</div>
    </div>
  )
}

export default class History extends Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: false,
      messages: []
    }
  }
  render() {
    return (
      <div className="HistoryContainer">
        {this.state.isLoading && (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        )}

        {this.state.messages.map((message, index) => (
          <DisplayMessage
            username={this.props.username}
            message={message}
            key={index}
          />
        ))}
      </div>
    )
  }
  getUpdates = messages => {
    const aggregatedMessages = messages.map(msg => ({
      ...msg,
      ts: msg.ts.toDate()
    }))
    console.log("aggregatedMessages", aggregatedMessages)
    // const sortedMessages = aggregatedMessages.sort((a, b) => b.ts - a.ts)
    // console.log(messages)
    this.setState({ isLoading: false, messages: messages })
  }
  fetchMessages = () => {
    this.setState({ isLoading: true })
    this.props.database.subscribeTo("messages", this.getUpdates)
  }
  componentDidMount() {
    this.fetchMessages()
  }
}
