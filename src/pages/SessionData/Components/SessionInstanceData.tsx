import React, { Component } from 'react'

import { getSessionData } from "../../../dataHandler/index";

// Types
import { IGameSessionData } from "../../../dataHandler/data";

type P = {
  sessionId: string
}

type S = {
  error: Error,
  sessionData: IGameSessionData,
}

class SessionInstanceData extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      sessionData: undefined,
    };
  }

  updateSessionData() {
    const { sessionId } = this.props;
    getSessionData(sessionId).then((sessionData) => {
      this.setState({ sessionData });
    }).catch((error) => {
      this.setState({ error });
    })
  }

  componentDidMount() {
    this.updateSessionData();
    setInterval(() => {
      this.updateSessionData();
    }, 1000);
  }

  renderSessionContainer(sessionData: IGameSessionData) {
    return (
      <>
        <li>{`avg. reaction time: ${sessionData.averageReactionTime}`}</li>
        <li>{`correct answers%: ${sessionData.correctPercentage}`}</li>
        <li>{`full data: ${JSON.stringify(sessionData.fullData)}`}</li>
      </>
    )
  }

  render() {
    const { error, sessionData } = this.state

    return (
      <div className="sessionInstance">
        <p className="data">{"Data of: " + this.props.sessionId}</p>
        {!error && sessionData === undefined &&
          <p>Loading...</p>
        }
        {error &&
          <div className="error">{error.toString()}</div>
        }
        {
          sessionData &&
          this.renderSessionContainer(sessionData)
        }
      </div>
    )
  }
}

export default SessionInstanceData