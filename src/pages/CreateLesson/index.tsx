import React, { Component } from "react"

import LessonCreate from "./Components/LessonCreate";
import LessonSpectate from "./Components/LessonSpectate";
import content from "./content";

type S = {
  contentSlugInput,
  teacherKeyInput: string,
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.state = {
      teacherKeyInput: "",
      contentSlugInput: "",
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
    const { contentSlugInput, teacherKeyInput } = this.state

    return (
      <div className="container">
        <h1 className="mb-4 text-muted">Education-Game Manager</h1>

        <div className="row m-0 mb-3">
          <h2 className="mr-2">{content.steps[1].title.lt}</h2>
          <input required name="teacherKeyInput" type="password" value={teacherKeyInput} onChange={(event) => this.handleInputChange(event)}></input>
        </div>

        <div className="row m-0 mb-3">
          <h2 className="mr-2">{content.steps[2].title.lt}</h2>
          <input name="contentSlugInput" type="text"
            value={contentSlugInput} onChange={(event) => this.handleInputChange(event)}
            style={({width: "247px"})}
          ></input>
        </div>

        <h2 className="mr-2">{content.steps[3].title.lt}</h2>
        <div className="row">
          <div className="col-lg">
            <LessonCreate teacherKey={teacherKeyInput} contentSlug={contentSlugInput} />
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