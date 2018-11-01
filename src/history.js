import React, { Component } from "react"
import moment from "moment"
import "./history.css"

const DisplayMessage = props => {
  return (
    <div className="messageContainer">
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
    console.log(this.state.messages)
    return (
      <div>
        {this.state.isLoading && (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        )}

        {this.state.messages.map((message, index) => (
          <DisplayMessage message={message} key={index} />
        ))}
      </div>
    )
  }
  fetchMessages = async () => {
    this.setState({ isLoading: true })
    const history = await this.props.database.getCollection("messages")
    this.setState({ messages: history, isLoading: false })
  }
  componentDidMount() {
    this.fetchMessages()
  }
}
