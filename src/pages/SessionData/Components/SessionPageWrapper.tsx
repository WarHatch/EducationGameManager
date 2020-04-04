import React, { Component } from "react"
import { RouteComponentProps, RouteProps, withRouter } from "react-router-dom";

import { getLesson } from "../../../dataHandler";
import { ILesson, ISession } from "../../../dataHandler/data";

interface S {
  lessonData: ILesson | null,
  error: Error | null,
}

interface P {
  // children
  lessonId: string,
  sessionDataRender: (sessionData: ISession) => JSX.Element
}

// FIXME: rework for sentenceConstructor
class SessionPageWrapper extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      lessonData: null,
      error: null,
    };
  }

  async updateLessonData() {
    const { lessonId } = this.props;
    try {
      const lessonData = await getLesson({ id: lessonId });
      this.setState({ lessonData })
    } catch (error) {
      this.setState({ error })
    }
  }

  componentDidMount() {
    // FIXME: update regularly replacing `updateSessionData`
    this.updateLessonData();
  }

  componentWillUnmount() {
    // TODO: dispose of cron functions

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
    const { lessonId } = this.props;
    const {
      lessonData,
      error
    } = this.state;
    const sessionData = lessonData?.sessions;

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
          sessionData === undefined ?
            this.renderLoading() :
            sessionData.map(this.props.sessionDataRender)
        }
      </div>
    )
  }
}

export default SessionPageWrapper;
