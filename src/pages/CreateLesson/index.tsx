import React, { Component } from 'react'

import LessonCreate from "./Components/LessonCreate";
import LessonSpectate from './Components/LessonSpectate';

type S = {
  gameTypeInput,
}

class Page extends Component<{}, S> {
  constructor(props) {
    super(props);

    this.state = {
      gameTypeInput: undefined,
    };
  }

  componentDidMount() {
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  render() {
    const { gameTypeInput } = this.state

    return (
      <div className="page">
        <h1>Education-Game Manager</h1>
        <LessonCreate />
        <LessonSpectate />
      </div>
    )
  }
}

export default Page