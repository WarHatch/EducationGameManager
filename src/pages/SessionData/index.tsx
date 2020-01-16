import React, { Component } from 'react'

import SessionInstanceData from "./Components/SessionInstanceData";
import SessionIdInput from "./Components/SessionIdInput";
import SessionConfig from "./Components/SessionConfig";
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';
import { getLesson } from '../../dataHandler';

import { ILesson } from '../../dataHandler/data';

interface S {
  lessonData: ILesson | null,
  error: Error | null,
}

interface P extends RouteComponentProps<R> {
}

interface R {
  lessonId: string,
}

class Page extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      // newSessionIdInput: undefined,
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
    this.updateLessonData();
  }

  renderLoading() {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading sessions data...</span>
      </div>
    )
  }

  renderRefreshSessionsButton() {
    return (
      <button type="button" className="btn btn-primary btn-lg" onClick={(e) => this.updateLessonData()}>
        Refresh lesson's session list
      </button>
    )
  }

  render() {
    const { match: { params: { lessonId } } } = this.props;
    if (lessonId === undefined) throw new Error("lessonId in url path is undefined");
    const { lessonData, error } = this.state;
    const lessonsSessionIds = lessonData?.sessions.map((session) => {
      return session.sessionId;
    });

    return (
      <div className="page">
        {this.renderRefreshSessionsButton()}
        {
          error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )
        }
        {
          lessonsSessionIds === undefined ?
            this.renderLoading() :
            lessonsSessionIds.map((sessionId) => {
              return (<>
                <SessionInstanceData lessonId={lessonId} sessionId={sessionId} />
                <SessionConfig lessonId={lessonId} sessionId={sessionId} />
              </>)
            })
        }
        {/* <SessionIdInput
          newSessionIdValue={newSessionIdInput}
          addNewSessionInstanceData={(newSessionIdInput) => this.addNewSessionInstanceData(newSessionIdInput)}
          changeNewSessionIdInput={(event) => this.changeNewSessionIdInput(event)}
        /> */}
      </div>
    )
  }
}

export default withRouter(Page);