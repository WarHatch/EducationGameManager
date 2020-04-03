import React, { Component } from "react"

import SessionInstanceData from "./Components/SessionInstanceData";
import SessionConfig from "./Components/SessionConfig";
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";
import { getLesson } from "../../dataHandler";

import { ILesson } from "../../dataHandler/data";

interface S {
  lessonData: ILesson | null,
  error: Error | null,
}

interface P extends RouteComponentProps<R> {
}

interface R {
  lessonId: string,
}

// FIXME: rework for sentenceConstructor
class sentenceConstructorSessionPage extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      lessonData: null,
      error: null,
    };
  }

  async updateLessonData() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");
    try {
      const lessonData = await getLesson({ id: lessonId });
      this.setState({ lessonData })
    } catch (error) {
      this.setState({ error })
    }
  }

  componentDidMount() {
    // FIXME: update regularly
    this.updateLessonData();
  }

  componentWillUnmount() {
    window.stop();
  }

  renderLoading() {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading sessions data...</span>
      </div>
    )
  }

  renderHeader(lessonId: string) {
    return (
      <div className="pb-4">
        <h2 className="d-inline mr-3">{`LessonId: `}<strong>{lessonId}</strong></h2>
        <button type="button" className="btn btn-primary btn-lg" onClick={(e) => this.updateLessonData()}>
          Refresh lesson's session list
        </button>
      </div>
    )
  }

  render() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");
    const { lessonData, error } = this.state;
    // TODO: seems unnecesarry
    const relevantLessonData = lessonData?.sessions.map(({ sessionId, playerName, finishedAt }) => ({
      sessionId,
      playerName,
      finishedAt,
    }));

    return (
      <div className="container pt-3">
        {this.renderHeader(lessonId)}
        {
          error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )
        }
        {
          relevantLessonData === undefined ?
            this.renderLoading() :
            relevantLessonData.map(({ sessionId, playerName, finishedAt }) => {
              return (<React.Fragment key={sessionId}>
                <div className="pb-3">
                  <SessionInstanceData lessonId={lessonId} sessionId={sessionId} playerName={playerName} />
                </div>
                {!finishedAt &&
                  <SessionConfig lessonId={lessonId} sessionId={sessionId} />
                }
                <hr />
              </React.Fragment>)
            })
        }
      </div>
    )
  }
}

export default withRouter(sentenceConstructorSessionPage);