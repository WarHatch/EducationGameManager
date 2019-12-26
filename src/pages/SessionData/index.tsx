import React, { Component } from 'react'

import SessionInstanceData from "./Components/SessionInstanceData";
import SessionIdInput from "./Components/SessionIdInput";
import SessionConfig from "./Components/SessionConfig";

type S = {
  newSessionIdInput: string,
  sessionInstances: string[],
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.state = {
      newSessionIdInput: undefined,
      sessionInstances: [],
    };
  }

  componentDidMount() {
  }

  changeNewSessionIdInput(event) {
    this.setState({
      newSessionIdInput: event.target.value
    })
  }

  addNewSessionInstanceData(sessionId: string) {
    this.setState((prevState) => {
      prevState.sessionInstances.push(sessionId);
      return {
        sessionInstances: prevState.sessionInstances
      }
    })
  }

  render() {
    const { newSessionIdInput, sessionInstances } = this.state

    return (
      <div className="page">
        {
          sessionInstances.map((sessionId) => <>
            <SessionInstanceData sessionId={sessionId} />
            <SessionConfig sessionId={sessionId} />
          </>)
        }
        <SessionIdInput
          newSessionIdValue={newSessionIdInput}
          addNewSessionInstanceData={(newSessionIdInput) => this.addNewSessionInstanceData(newSessionIdInput)}
          changeNewSessionIdInput={(event) => this.changeNewSessionIdInput(event)}
        />
      </div>
    )
  }
}

export default Page