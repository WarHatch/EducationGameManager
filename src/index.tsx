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

// import './style/main.css'

render(
  <Router>
    <Switch>
      <Route path="/lesson/:id">
        <CreateLesson />
      </Route>
      <Route exact path="/">
        <SessionData />
      </Route>
      <Route>{'Incorrect URL'}</Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);