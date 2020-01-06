import React, { Component } from 'react'
import { createLesson } from '../../../dataHandler';

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
      createLesson({
        id: lessonIdValue,
        teacherId: "placeholder",
        gameType: {
          type
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          {"New lesson Id:"}
        </label>
        <input name="lessonIdValue" type="text" value={this.state.lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="add" />
      </form>
    );
  }
}

export default SessionForm;