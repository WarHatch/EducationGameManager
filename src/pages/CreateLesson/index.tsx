import React, { Component } from "react"

import LessonCreate from "./Components/LessonCreate";
import LessonSpectate from "./Components/LessonSpectate";

type S = {
  gameTypeInput,
  teacherKeyInput: string,
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.state = {
      teacherKeyInput: "",
      gameTypeInput: undefined,
    };
  }

  componentDidMount() {
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  render() {
    const { gameTypeInput, teacherKeyInput } = this.state

    return (
      <div className="container">
        <h1 className="mb-4 text-muted">Education-Game Manager</h1>

        <div className="row m-0 mb-3">
          <h2 className="mr-2">Step 1: Your teacher key</h2>
          <input required name="teacherKeyInput" type="password" value={teacherKeyInput} onChange={(event) => this.handleInputChange(event)}></input>
        </div>

        <h2>Step 2: Create or spectate lesson</h2>
        <div className="row">
          <div className="col-lg">
            <LessonCreate teacherKey={teacherKeyInput} />
          </div>
          <div className="col-lg">
            <LessonSpectate teacherKey={teacherKeyInput} />
          </div>
        </div>
      </div>
    )
  }
}

export default Page