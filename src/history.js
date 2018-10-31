import React, { Component } from "react"

export default class History extends Component {
  constructor(props) {
    super()
    this.state = {
      messages: []
    }
  }
  render() {
    console.log(this.state.messages)
    return (
      <div>
        timeline:
        {this.state.messages.map(message => (
          <div>message:</div>
        ))}
      </div>
    )
  }
  fetchMessages = async () => {
    const history = await this.props.database.getCollection("messages")
    this.setState({ messages: history })
  }
  componentDidMount() {
    this.fetchMessages()
  }
}
