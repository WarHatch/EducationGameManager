import React, { Component } from "react"
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";

import SessionInstanceData from "./Components/SessionInstanceData";
import SessionConfig from "./Components/SessionConfig";
import SessionPageWrapper from "./Components/SessionPageWrapper";

interface P extends RouteComponentProps<R> {
}

interface R {
  lessonId: string,
}

class SentenceConstructorSessionPage extends Component<P> {
  constructor(props) {
    super(props);
  }

  render() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");

    const sentenceConstructorSessionDataRender = ({ sessionId, playerName, finishedAt }) => 
    <React.Fragment key={sessionId}>
       <div className="pb-3">
        <SessionInstanceData lessonId={lessonId} sessionId={sessionId} playerName={playerName} />
      </div>
      {!finishedAt &&
        <SessionConfig lessonId={lessonId} sessionId={sessionId} />
      } 
      <hr />
    </React.Fragment>

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

    const sentenceConstructorSessionDataRender = ({ sessionId, playerName, finishedAt }) => 
    <React.Fragment key={sessionId}>
       <div className="pb-3">
        <SessionInstanceData lessonId={lessonId} sessionId={sessionId} playerName={playerName} />
      </div>
      {!finishedAt &&
        <SessionConfig lessonId={lessonId} sessionId={sessionId} />
      } 
      <hr />
    </React.Fragment>

    return (
      <SessionPageWrapper lessonId={lessonId} sessionDataRender={sentenceConstructorSessionDataRender} />
    )
  }
}

export const sentenceConstructorSessionPageWithRoute = withRouter(SentenceConstructorSessionPage);

export const asteroidSessionPageWithRoute = withRouter(AsteroidSessionPage);