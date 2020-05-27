import React, { Component } from "react"
import { createLesson, getGameContentType } from "../../../dataHandler";
import errorHandler from "../../../errorHandler";
import { withRouter, RouteComponentProps } from "react-router-dom";
import content from "../content";
import { pushSessionRoute } from "../routerLogic";

const isCorrectGameContentType = (gametype: string) => {
  // TODO: implement a hardcoded list in db with gametype names 
  if (gametype === "sentenceConstructor") return true;
  return false;
}

interface S {
  error: Error | string | null,
  lessonIdValue: string,
}

interface P extends RouteComponentProps {
  teacherKey: string,
  contentSlug: string,
  contentJSONInput: string,
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
    const { teacherKey, contentSlug, contentJSONInput } = this.props;
    if (!teacherKey) {
      this.setState({ error: "Trūksta mokytojo kodo" })
      return;
    }
    if (!contentSlug) {
      // Check if contentJSON is provided instead
      if (!contentJSONInput) {
        this.setState({ error: "Trūksta turinio kodo arba turinio JSON" })
        return;
      }
      let contentObject: any = null;
      try {
        contentObject = JSON.parse(contentJSONInput)
        if (!isCorrectGameContentType(contentObject._type)) throw new Error(contentObject._type + " nėra žinomas žaidimo tipas")
      } catch (error) {
        this.setState({ error: "Turinio JSON netinkamas: \n" + error.message })
        return;
      }
      const gameContentType = contentObject._type;
      const newLessonData = await createLesson({
        id: lessonIdValue,
        teacherId: teacherKey,
        contentSlug,
        gameType: gameContentType,
        gameContentJSON: contentJSONInput,
        sessions: [],
      })
      pushSessionRoute(this, gameContentType, lessonIdValue)
    } else {
      // Find if content exists
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
          pushSessionRoute(this, gameContentType, lessonIdValue)
        }
      } catch (error) {
        errorHandler(error, (errorMessage) => this.setState({ error: errorMessage }))
      }
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