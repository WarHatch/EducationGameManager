import React, { Component } from "react"
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";

import AsteroidSessionInstanceData from "./Components/AsteroidSessionInstanceData";
import SessionConfig from "./Components/SessionConfig";
import SessionPageWrapper from "./Components/SessionPageWrapper";
import { ISession } from "../../dataHandler/data";

interface P extends RouteComponentProps<R> {
}

interface R {
  lessonId: string,
}

class SentenceConstructorSessionPage extends Component<P> {
  constructor(props: Readonly<P>) {
    super(props);
  }

  render() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");

    const sentenceConstructorSessionDataRender = (sessionData: ISession) => {
      const { sessionId, playerName, finishedAt } = sessionData;

      // TODO: make specific for SC
      return (
        <React.Fragment key={sessionId}>
          <div className="pb-3">
            <AsteroidSessionInstanceData
              lessonId={lessonId}
              playerName={playerName}
              sessionData={sessionData}
            />
          </div>
          {!finishedAt &&
            <SessionConfig lessonId={lessonId} sessionId={sessionId} />
          }
          <hr />
        </React.Fragment>
      )
    }

    return (
      <SessionPageWrapper lessonId={lessonId} sessionDataRender={sentenceConstructorSessionDataRender} />
    )
  }
}

class AsteroidSessionPage extends Component<P> {
  constructor(props) {
    super(props);
  }

  render() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");

    const sentenceConstructorSessionDataRender = (sessionData: ISession) => {
      const { sessionId, playerName, finishedAt } = sessionData;

      return (
        <React.Fragment key={sessionId}>
          <div className="pb-3">
            <AsteroidSessionInstanceData
              lessonId={lessonId}
              playerName={playerName}
              sessionData={sessionData}
            />
          </div>
          {!finishedAt &&
            <SessionConfig lessonId={lessonId} sessionId={sessionId} />
          }
          <hr />
        </React.Fragment>
      )
    }

    return (
      <SessionPageWrapper lessonId={lessonId} sessionDataRender={sentenceConstructorSessionDataRender} />
    )
  }
}

export const sentenceConstructorSessionPageWithRoute = withRouter(SentenceConstructorSessionPage);

export const asteroidSessionPageWithRoute = withRouter(AsteroidSessionPage);