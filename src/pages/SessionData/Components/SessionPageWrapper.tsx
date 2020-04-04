import React, { Component } from "react"

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

  updateLessonDataInterval: NodeJS.Timeout | null = null;

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
    this.updateLessonData();
    this.updateLessonDataInterval = setInterval(() => {
      this.updateLessonData();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.updateLessonDataInterval !== null) {
      clearInterval(this.updateLessonDataInterval)
      this.updateLessonDataInterval = null;
    }
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
