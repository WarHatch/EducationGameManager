import React, { Component } from 'react'
import { getLesson } from '../../../dataHandler';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Alert } from "react-bootstrap";

type S = {
  error: Error,
  lessonIdValue: string,
}

class LessonSpectate extends Component<RouteComponentProps, S> {
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
      const newLessonData = await getLesson({
        id: lessonIdValue,
        teacherId: "placeholder",
        gameType: {
          type
        }
      })
      this.props.history.push(`/lesson/${newLessonData.id}`);
    } catch (error) {
      this.setState({ error });
      console.error(error)
    }
  }

  render() {
    const { error, lessonIdValue } = this.state;

    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          {"Spectate lesson id:"}
        </label>
        <input name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="add" />
        {error &&
          <Alert variant="danger">{error.message}</Alert>
        }
      </form>
    );
  }
}

export default withRouter(LessonSpectate);