import React, { Component } from 'react'

import SessionInstanceData from "./Components/SessionInstanceData";
import SessionIdInput from "./Components/SessionIdInput";
import SessionConfig from "./Components/SessionConfig";
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';

interface S {
  newSessionIdInput: string,
  sessionInstances: string[],
}

interface P extends RouteComponentProps<R> {
}

interface R {
  lessonId?: string,
}

class Page extends Component<P, S> {
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
      newSessionIdInput: event.target.value.trim()
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
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");

    return (
      <div className="page">
        {
          sessionInstances.map((sessionId) => <>
            <SessionInstanceData lessonId={lessonId} sessionId={sessionId} />
            <SessionConfig lessonId={lessonId} sessionId={sessionId} />
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

export default withRouter(Page);