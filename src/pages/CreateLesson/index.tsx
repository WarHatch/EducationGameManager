import React, { Component } from "react"

import LessonCreate from "./Components/LessonCreate";
import LessonSpectate from "./Components/LessonSpectate";
import content from "./content";

type S = {
  contentSlugInput,
  contentJSONInput,
  teacherKeyInput: string,
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.state = {
      teacherKeyInput: "",
      contentSlugInput: "",
      contentJSONInput: "",
    };
  }

  componentDidMount() {
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { target } = event;
    // @ts-ignore target.checked if HTMLInputElement
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
    const { contentSlugInput, teacherKeyInput, contentJSONInput } = this.state

    return (
      <div className="container">
        <h1 className="mb-4 text-muted">Education-Game Manager</h1>

        <div className="row m-0 mb-3">
          <h2 className="mr-2">{content.steps[1].title.lt}</h2>
          <input required name="teacherKeyInput" type="password" value={teacherKeyInput} onChange={(event) => this.handleInputChange(event)}></input>
        </div>

        <div className="row m-0 mb-2">
          <h2 className="mr-2">{content.steps[2].title.lt}</h2>
          <input name="contentSlugInput" type="text"
            value={contentSlugInput} onChange={(event) => this.handleInputChange(event)}
            style={({ width: "247px" })}
          ></input>
        </div>

        <div className="row m-0 mb-3">
          <h4 className="mr-2">Vietoje turinio kodo galite įdėti turinio JSON</h4>
          <div>
            <small>
              <a href="https://gist.github.com/WarHatch/855a4135f15d34e2231abd8fd30396f9">Nuoroda į JSON schemą</a>
              {" 👨‍💻 "}
              <a href="https://gist.github.com/WarHatch/ed0e888ac1507e0c99ec9e4ed5221017">Nuoroda į JSON pavyzdį</a>
            </small>
          </div>

          <textarea name="contentJSONInput"
            style={({ width: "600px" })}
            onChange={(event) => this.handleInputChange(event)}
            value={contentJSONInput}
          ></textarea>
        </div>

        <h2 className="mr-2">{content.steps[3].title.lt}</h2>
        <div className="row">
          <div className="col-lg">
            <LessonCreate teacherKey={teacherKeyInput} contentSlug={contentSlugInput} contentJSONInput={contentJSONInput} />
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