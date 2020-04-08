import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

export const pushSessionRoute = (componentWithRouter: Component<RouteComponentProps>, gameContentType: string, newLessonId: string) => {
  componentWithRouter.props.history.push(`/${gameContentType}/lesson/${newLessonId}`);
}