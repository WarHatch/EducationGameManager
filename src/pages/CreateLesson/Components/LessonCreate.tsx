import React, { Component } from "react"
import { createLesson } from "../../../dataHandler";
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
import { Alert } from "react-bootstrap";

interface S {
  error: Error | string | null,
  lessonIdValue: string,
}

interface P extends RouteComponentProps {
  teacherKey: string
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

    const { lessonIdValue } = this.state;
    const { teacherKey } = this.props;
    const type = "asteroid"; // TODO: pass game type through props

    if (!teacherKey) {
      this.setState({ error: "teacher key is missing" })
      return;
    }

    try {
      const newLessonData = await createLesson({
        id: lessonIdValue,
        teacherId: teacherKey,
        gameType: {
          type
        },
        sessions: [],
      })
      this.props.history.push(`/lesson/${newLessonData.id}`);
    } catch (error) {
      // TODO: monkeypatched payload message extraction - should be handled in data handler
      this.setState({ error: error.response.data });
      console.error({...error})
    }
  }

  render() {
    const { error, lessonIdValue } = this.state;

    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          {"New lesson Id:"}
        </label>
        <input required name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="Create & Spectate" />
        {error &&
          <Alert variant="danger">{error}</Alert>
        }
      </form>
    );
  }
}

export default withRouter(LessonCreateForm);