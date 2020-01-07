import React, { Component } from 'react'
import { createLesson } from '../../../dataHandler';
import { withRouter } from 'react-router-dom';
import { Alert } from "react-bootstrap";

type P = {
}

type S = {
  error: Error,
  lessonIdValue: string,
}

class SessionForm extends Component<P, S> {
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
        teacherId: "placeholder",
        gameType: {
          type
        }
      })
      // @ts-ignore WithRouterStatics
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
          {"New lesson Id:"}
        </label>
        <input name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="add" />
        {error &&
          <Alert variant="danger">{JSON.stringify(error)}</Alert>
        }
      </form>
    );
  }
}

export default withRouter(SessionForm);