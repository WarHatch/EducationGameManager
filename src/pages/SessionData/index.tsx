import React, { Component } from 'react'

import SessionInstanceData from "./Components/SessionInstanceData";
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

  renderRefreshSessionsButton() {
    return (
      <div className="p-4">
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
    const relevantLessonData = lessonData?.sessions.map(({sessionId, playerName}) => ({
      sessionId,
      playerName,
    }));

    return (
      <div className="page container">
        {this.renderRefreshSessionsButton()}
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
            relevantLessonData.map(({sessionId, playerName}) => {
              return (<>
                <div className="pb-3">
                  <SessionInstanceData lessonId={lessonId} sessionId={sessionId} playerName={playerName} />
                </div>
                <SessionConfig lessonId={lessonId} sessionId={sessionId} />
                <hr />
              </>)
            })
        }
      </div>
    )
  }
}

export default withRouter(Page);