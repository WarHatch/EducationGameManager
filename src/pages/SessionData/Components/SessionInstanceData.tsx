import React, { Component } from 'react'
import moment from 'moment';

import { getSessionData } from "../../../dataHandler/index";

// Types
import { IGameSessionData } from "../../../dataHandler/data";
import AnswerCirlce from './AnswerCircle';

type P = {
  lessonId: string
  sessionId: string
  playerName: string
}

type S = {
  error: Error | null,
  sessionData?: IGameSessionData,
}

class SessionInstanceData extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      sessionData: undefined,
    };
  }

  updateSessionDataInterval: NodeJS.Timeout | null = null;

  updateSessionData() {
    const { sessionId, lessonId } = this.props;

    getSessionData(lessonId, sessionId).then((sessionData) => {
      this.setState({ sessionData });
    }).catch((error) => {
      this.setState({ error });
    })
  }

  componentDidMount() {
    this.updateSessionData();
    this.updateSessionDataInterval = setInterval(() => {
      this.updateSessionData();
    }, 1500); // TODO: could open a connection to server and wait to receive new data
  }

  componentWillUnmount() {
    if (this.updateSessionDataInterval !== null) {
      clearInterval(this.updateSessionDataInterval)
      this.updateSessionDataInterval = null;
    }
  }

  renderSessionContainer(sessionData: IGameSessionData) {
    const { fullData, averageReactionTime, correctPercentage } = sessionData;
    const { clickData, createdAt, finishedAt } = fullData;

    return (
      <>
        <li>{`game started at = ${moment(createdAt).format('l')} ${moment(createdAt).format('LTS')}`}</li>
        <li>{`game session status = ${finishedAt ?
          `finished at ${moment(finishedAt).format('l')} ${moment(finishedAt).format('LTS')}` :
          "IN PROGRESS"}`}</li>
        <li>{`avg. reaction time: ${(averageReactionTime / 1000).toFixed(2)} seconds`}</li>
        <li>{`correct answers: ${correctPercentage.toFixed(2)}%`}</li>
        <li>{`answers:`}
          {clickData.map((c) => <AnswerCirlce correct={c.correct} />)}
        </li>
      </>
    )
  }

  render() {
    const { error, sessionData } = this.state

    return (
      <div className="sessionInstance">
        <p className="data">{"Data of: " + this.props.playerName}</p>
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