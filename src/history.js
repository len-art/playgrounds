import React, { Component } from "react"
import moment from "moment"
import "./history.css"

const DisplayMessage = props => {
  console.log("start of day")
  console.log(
    moment()
      .startOf("day")
      .toDate()
  )
  console.log(moment(props.message.ts).toDate())
  const Date = () => {
    if (
      moment(props.message.ts).toDate() >
      moment()
        .startOf("day")
        .toDate()
    ) {
      return moment(props.message.ts).format("HH:mm")
    } else if (
      moment(props.message.ts).toDate() >
      moment()
        .startOf("Year")
        .toDate()
    ) {
      return moment(props.message.ts).format("d. MMMM, HH:mm")
    } else {
      return moment(props.message.ts).format("d. MMMM YYYY, HH:mm")
    }
  }
  return (
    <div
      className={
        props.message.username === props.username
          ? "messageContainer right"
          : "messageContainer"
      }
    >
      <div
        className={
          props.message.username === props.username
            ? "messageTimeStamp messageRight"
            : "messageTimeStamp"
        }
      >
        {Date()}
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
    // console.log("aggregatedMessages", aggregatedMessages)
    // const sortedMessages = aggregatedMessages.sort(
    //   (a, b) => b.ts.getTime() - a.ts.getTime()
    // )
    //console.log("sortedMessages", sortedMessages)
    this.setState({ isLoading: false, messages: aggregatedMessages.reverse() })
  }
  fetchMessages = () => {
    this.setState({ isLoading: true })
    this.props.database.subscribeTo("messages", this.getUpdates)
  }
  componentDidMount() {
    this.fetchMessages()
  }
}
