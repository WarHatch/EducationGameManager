import React, { Component } from "react"
import moment from "moment";

// Types
import { ISentenceConstructorClickDataModel, ISentenceConstructorCompletedDataModel, ISession } from "../../../dataHandler/data";
import AnswerCirlce from "../Components/AnswerCircle";

type P = {
  lessonId: string
  playerName: string
  sessionData: ISession
}

class SentenceConstructorInstanceData extends Component<P> {
  constructor(props: Readonly<P>) {
    super(props);

    // this.state = {
    //   error: null,
    // };
  }

  renderSessionContainer(sessionData: ISession) {
    const { asteroidClickData, createdAt, finishedAt } = sessionData;
    if (asteroidClickData === undefined) throw new Error("asteroidClickData is undefined");

    const noAnswersText = "no answers yet ⌛"
    const inProgressText = "in progress 💭"

    return (
      <>
        <li>{`game started at: ${moment(createdAt).format("l")} ${moment(createdAt).format("LTS")}`}</li>
        <li>{`game status: ${finishedAt ?
          `finished at ${moment(finishedAt).format("l")} ${moment(finishedAt).format("LTS")}` :
          inProgressText}`}</li>
        {/* TODO: Click timeline (with correct/incorrect marking) */}
        {/* <li>{"correct answers: "}
          {correctPercentage ?
            `${correctPercentage.toFixed(2)}%` :
            noAnswersText
          }</li> */}
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

export default SentenceConstructorInstanceData