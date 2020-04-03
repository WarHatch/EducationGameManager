import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { render } from "react-dom"

import ChooseLesson from "./pages/CreateLesson";
import AsteroidSession from "./pages/SessionData/asteroidSession";
import SentenceConstructorSession from "./pages/SessionData/sentenceConstructorSession";

export type IGlobalState = {
}

class App extends React.Component<{}, IGlobalState> {
  constructor(props) {
    super(props);

    this.state = {
    };

    // bind
    this.changeGlobalState = this.changeGlobalState.bind(this);
  }

  changeGlobalState(newState: Partial<IGlobalState>) {
    this.setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
    console.log(this.state);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/asteroid/lesson/:lessonId">
            <AsteroidSession />
          </Route>
          <Route path="/sentenceConstructor/lesson/:lessonId">
            <SentenceConstructorSession />
          </Route>
          <Route exact path="/">
            <ChooseLesson />
          </Route>
          <Route>{"Incorrect URL"}</Route>
        </Switch>
      </Router>
    );
  }
}

render(
  <App />,
  document.getElementById("app")
);