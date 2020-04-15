import React, { Component } from "react"
import moment from "moment";

// Types
import { ISession } from "../../../dataHandler/data";
import content from "../content";
import ClickRecap from "../Components/ClickRecap";

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
    const { sentenceConstructorClickData, sentenceConstructorCompletedData, createdAt, finishedAt } = sessionData;
    if (sentenceConstructorClickData === undefined) throw new Error("sentenceConstructorClickData is undefined");
    const answerAttemptData = sentenceConstructorClickData.filter((c) => c.correct !== null)
    answerAttemptData.sort((a, b) => a.spawnToClickTime - b.spawnToClickTime)

    return (
      <>
        <li>{`${content.SentenceConstructor.instanceData.startedLabel.lt} ${moment(createdAt).format("l")} ${moment(createdAt).format("LTS")}`}</li>
        <li>{`${content.SentenceConstructor.instanceData.statusLabel.lt} ${finishedAt ?
          `${content.SentenceConstructor.instanceData.statusText.lt} ${moment(finishedAt).format("l")} ${moment(finishedAt).format("LTS")}` :
          content.misc.inProgressText.lt}`}</li>
        {/* multiple game sessions aren't implemented atm */}
        <li>{`Bandymų atsakyti eiga: `}
          {answerAttemptData.map((c) =>
            <ClickRecap key={c.id}
              clickName={c.attemptedAnswer}
              // @ts-ignore answerAttemptData has no correct === null
              correct={c.correct}
              // TODO: use spawnToClickTime
              date={c.createdAt}
            />
          )}
        </li>
        {finishedAt && sentenceConstructorCompletedData !== undefined &&
          <li>
            {`Galutinis įvertinimas: `}
            {sentenceConstructorCompletedData[0] !== undefined && sentenceConstructorCompletedData[0].correctPercentage?.toFixed(2)}
            {`%`}
          </li>}
      </>
    )
  }

  render() {
    // const { error } = this.state
    const { sessionData } = this.props

    return (
      <div className="sessionInstance">
        <p className="data">{content.SentenceConstructor.instanceData.nameLabel.lt} <i>{this.props.playerName}</i></p>
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