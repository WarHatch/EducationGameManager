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
    }, 1500); // FIXME: should fetch all sessions data from parent component
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

    const noAnswersText = "no answers yet ⌛"
    const inProgressText = "in progress 💭"

    return (
      <>
        <li>{`game started at: ${moment(createdAt).format('l')} ${moment(createdAt).format('LTS')}`}</li>
        <li>{`game status: ${finishedAt ?
          `finished at ${moment(finishedAt).format('l')} ${moment(finishedAt).format('LTS')}` :
          inProgressText}`}</li>
        <li>{'avg. reaction time: '}
          {averageReactionTime ?
            // @ts-ignore already checked for null
            `${(averageReactionTime / 1000).toFixed(2)} seconds` :
            noAnswersText
          }</li>
        <li>{'correct answers: '}
          {correctPercentage ?
            // @ts-ignore already checked for null
            `${correctPercentage.toFixed(2)}%` :
            noAnswersText
          }</li>
        <li>{`answers:`}
          {clickData.map((c) => <AnswerCirlce key={c.id} correct={c.correct} />)}
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