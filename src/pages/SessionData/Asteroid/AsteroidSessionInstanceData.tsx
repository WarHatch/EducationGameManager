import React, { Component } from "react"
import moment from "moment";

// Types
import { IAsteroidClickData, ISession } from "../../../dataHandler/data";
import AnswerCirlce from "../Components/AnswerCircle";

type P = {
  lessonId: string
  playerName: string
  sessionData: ISession
}

class AsteroidSessionInstanceData extends Component<P> {
  constructor(props: Readonly<P>) {
    super(props);

    // this.state = {
    //   error: null,
    // };
  }

  countAverageReactionTime = (sessionData: IAsteroidClickData[]) => {
    const dataEntryCount = sessionData.length;

    let reactionTime = 0;
    sessionData.forEach(entry => {
      reactionTime += entry.spawnToClickTime;
    });

    return reactionTime / dataEntryCount;
  }

  countPercentCorrect = (sessionData: IAsteroidClickData[]) => {
    const dataEntryCount = sessionData.length;

    let correctCount = 0;
    sessionData.forEach(entry => {
      if (entry.correct)
        correctCount += 1;
    });

    const correctPercentage = correctCount / dataEntryCount * 100;
    const incorrectPercentage = 100 - correctPercentage;

    return {
      correctPercentage,
      incorrectPercentage,
    }
  }

  renderSessionContainer(sessionData: ISession) {
    const { asteroidClickData, createdAt, finishedAt } = sessionData;
    if (asteroidClickData === undefined) throw new Error("asteroidClickData is undefined");

    const averageReactionTime = this.countAverageReactionTime(asteroidClickData);
    const { correctPercentage } = this.countPercentCorrect(asteroidClickData);

    const noAnswersText = "no answers yet ⌛"
    const inProgressText = "in progress 💭"

    return (
      <>
        <li>{`game started at: ${moment(createdAt).format("l")} ${moment(createdAt).format("LTS")}`}</li>
        <li>{`game status: ${finishedAt ?
          `finished at ${moment(finishedAt).format("l")} ${moment(finishedAt).format("LTS")}` :
          inProgressText}`}</li>
        <li>{"avg. reaction time: "}
          {averageReactionTime ?
            `${(averageReactionTime / 1000).toFixed(2)} seconds` :
            noAnswersText
          }</li>
        <li>{"correct answers: "}
          {correctPercentage ?
            `${correctPercentage.toFixed(2)}%` :
            noAnswersText
          }</li>
        <li>{`answers:`}
          {asteroidClickData.map((c) => <AnswerCirlce key={c.id} correct={c.correct} />)}
        </li>
      </>
    )
  }

  render() {
    // const { error } = this.state
    const { sessionData } = this.props

    return (
      <div className="sessionInstance">
        <p className="data">{"Data of: " + this.props.playerName}</p>
        {/* {error &&
          <div className="text-danger">{error.toString()}</div>
        } */}
        {
          sessionData === undefined ? 
          <p>Loading...</p> :
          this.renderSessionContainer(sessionData)
        }
      </div>
    )
  }
}

export default AsteroidSessionInstanceData