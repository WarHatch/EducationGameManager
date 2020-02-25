import React, { Component } from 'react'
import { createLesson } from '../../../dataHandler';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Alert } from "react-bootstrap";

type S = {
  error: Error | null,
  lessonIdValue: string,
}

class SessionForm extends Component<RouteComponentProps, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      lessonIdValue: "",
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
    const type = "asteroid";

    try {
      const newLessonData = await createLesson({
        id: lessonIdValue,
        // FIXME: input for teacher
        teacherId: "placeholder",
        gameType: {
          type
        },
        sessions: [],
      })
      this.props.history.push(`/lesson/${newLessonData.id}`);
    } catch (error) {
      // TODO: monkeypatched payload message extraction
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
        <input name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="Create & Spectate" />
        {error &&
          <Alert variant="danger">{error}</Alert>
        }
      </form>
    );
  }
}

export default withRouter(SessionForm);