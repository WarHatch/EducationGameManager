import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { render } from 'react-dom'

import SessionData from "./pages/SessionData";
import CreateLesson from "./pages/CreateLesson";

render(
  <Router>
    <Switch>
      <Route path="/lesson/:id">
        <SessionData />
      </Route>
      <Route exact path="/">
        <CreateLesson />
      </Route>
      <Route>{'Incorrect URL'}</Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);