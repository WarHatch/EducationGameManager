import React, { Component } from 'react'

import { getSessionData } from "../dataHandler/index";

// Types
import { IGameSessionData } from "../dataHandler/data.d";

type S = {
  error: Error,
  sessionData: IGameSessionData,
}

class Page extends Component<any, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null, // TODO: handle errors
      sessionData: undefined,
    };
  }

  componentDidMount() {
    getSessionData().then((sessionData) => {
      this.setState({sessionData});
      console.log(this.state);
    })
  }

  renderSessionData(sessionData: IGameSessionData) {
    return (
    <>
      <ul className="data">{"Data of: hardcoded-session-id"}</ul>
      <li>{`avg. reaction time: ${sessionData.averageReactionTime}`}</li>
      <li>{`correct answers%: ${sessionData.correctPercentage}`}</li>
      <li>{`full data: ${JSON.stringify(sessionData.fullData)}`}</li>
    </>
    )
  }

  render() {
    const { error, sessionData } = this.state

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        {sessionData === undefined ? (
          <p>Loading...</p>
        ) : (this.renderSessionData(sessionData))}
      </div>
    )
  }
}

export default Page