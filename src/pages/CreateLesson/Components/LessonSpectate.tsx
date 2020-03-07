import React, { Component } from "react"
import { getLesson } from "../../../dataHandler";
import { withRouter, RouteComponentProps } from "react-router-dom";
import content from "../content";

interface S {
  error: Error | null,
  lessonIdValue: string,
}

interface P extends RouteComponentProps {
  teacherKey: string
}

class LessonSpectate extends Component<P, S> {
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

    this.setState({error: null});

    const { lessonIdValue } = this.state;
    const { teacherKey } = this.props;

    if (!teacherKey) {
      this.setState({ error: new Error("teacher key is missing") })
      return;
    }
    try {
      const newLessonData = await getLesson({
        id: lessonIdValue,
        teacherId: teacherKey,
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
        <label>{content.lessonSpectate.lessonSpectateTitle.lt}</label>
        <input required name="lessonIdValue" type="text" value={lessonIdValue} onChange={(event) => this.handleInputChange(event)} />
        <input type="submit" value="Spectate" />
        {error &&
          <div className="alert alert-danger" role="alert">{error.message}</div>
        }
      </form>
    );
  }
}

export default withRouter(LessonSpectate);