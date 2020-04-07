import React, { Component } from "react"
import moment from "moment";

// Types
import { ISentenceConstructorClickDataModel, ISentenceConstructorCompletedDataModel, ISession } from "../../../dataHandler/data";
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

    const noAnswersText = "no answers yet ⌛"
    const inProgressText = "in progress 💭"

    return (
      <>
        {/* TODO: translate into content */}
        <li>{`game started at: ${moment(createdAt).format("l")} ${moment(createdAt).format("LTS")}`}</li>
        <li>{`game status: ${finishedAt ?
          `finished at ${moment(finishedAt).format("l")} ${moment(finishedAt).format("LTS")}` :
          inProgressText}`}</li>
        {/* TODO: keep in mind multiple game sessions */}
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
        <p className="data">{content.SentenceConstructor.instanceData.nameLabel.lt + this.props.playerName}</p>
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