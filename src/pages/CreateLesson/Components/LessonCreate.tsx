import React, { Component } from "react"
import { createLesson, getGameContentType } from "../../../dataHandler";
import errorHandler from "../../../errorHandler";
import { withRouter, RouteComponentProps } from "react-router-dom";
import content from "../content";

interface S {
  error: Error | string | null,
  lessonIdValue: string,
}

interface P extends RouteComponentProps {
  teacherKey: string,
  contentSlug: string,
}

class LessonCreateForm extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      lessonIdValue: "",
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ error: null });

    const { lessonIdValue } = this.state;
    const { teacherKey, contentSlug } = this.props;
    if (!teacherKey) {
      this.setState({ error: "teacher key is missing" })
      return;
    }
    if (!contentSlug) {
      this.setState({ error: "contentSlug is missing" })
      return;
    }

    try {
      const gameContentType = await getGameContentType(contentSlug);
      if (gameContentType !== null) {
        const newLessonData = await createLesson({
          id: lessonIdValue,
          teacherId: teacherKey,
          contentSlug,
          gameType: gameContentType,
          sessions: [],
        })
        this.props.history.push(`/lesson/${newLessonData.id}`);
      }
    } catch (error) {
      errorHandler(error, (errorMessage) => this.setState({ error: errorMessage }))
    }
  }

  render() {
    const { error, lessonIdValue } = this.state;

    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          {content.lessonCreate.newLessonIdTitle.lt}
        </label>
        <input required name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="Create & Spectate" />
        {error &&
          <div className="alert alert-danger" role="alert">{error}</div>
        }
      </form>
    );
  }
}

export default withRouter(LessonCreateForm);