import React, { Component } from "react"

import { sendLatestSCSessionConfig } from "../../../dataHandler/index";

// Types
import { ISCSessionConfig } from "../../../dataHandler/data";
import content from "../content";

interface IInputSessionConfig {
  nextContentSlug: string
  hintMessage: string
}

type P = {
  lessonId: string
  sessionConfig: ISCSessionConfig
}

type S = {
  error: Error | null
  inputSessionConfig: IInputSessionConfig
}

class SentenceConstructorSessionConfig extends Component<P, S> {
  constructor(props: Readonly<P>) {
    super(props);

    this.state = {
      error: null,
      inputSessionConfig: {
        hintMessage: "",
        nextContentSlug: ""
      },
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { target } = event;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value = target.value;
    const { name } = target;

    this.setState((prevState) => {
      return {
        inputSessionConfig: {
          ...prevState.inputSessionConfig,
          [name]: value
        }
      }
    })
  }

  onSend(event: React.FormEvent<HTMLFormElement>, sessionId: string, inputSessionConfig: IInputSessionConfig) {
    event.preventDefault();

    const { lessonId } = this.props;
    sendLatestSCSessionConfig(
      lessonId,
      {
        hintMessage: inputSessionConfig.hintMessage === "" ? null : inputSessionConfig.hintMessage,
        nextContentSlug: inputSessionConfig.nextContentSlug === "" ? null : inputSessionConfig.nextContentSlug,
        sessionId,
      })

    // Clear hint message field to prevent double sending
    this.setState((prevState) => ({
      inputSessionConfig: {
        ...prevState.inputSessionConfig,
        hintMessage: ""
      }
    }))
  }

  renderSessionLoading() {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading session's config data...</span>
      </div>
    )
  }

  renderSessionConfigPanel(sessionConfig: ISCSessionConfig, inputSessionConfig: IInputSessionConfig) {
    return (
      <div className="configPanel">
        <b>{content.SentenceConstructor.configData.title.lt}</b>
        {/* <li>{content.SentenceConstructor.configData.nextContentLabel.lt + (sessionConfig.nextContentSlug ?? "")}</li> */}
        <form className="container" onSubmit={(e) => this.onSend(e, sessionConfig.sessionId, inputSessionConfig)}>
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                {/* <label>{content.SentenceConstructor.configData.nextContentLabel.lt}</label>
                <input
                  name="nextContentSlug" type="text" className="form-control"
                  value={inputSessionConfig.nextContentSlug}
                  onChange={(e) => this.handleInputChange(e)}
                /> */}
                <label>{content.SentenceConstructor.configData.hintLabel.lt}</label>
                <textarea
                  name="hintMessage"
                  className="form-control"
                  maxLength={500}
                  value={inputSessionConfig.hintMessage}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <input style={({ whiteSpace: "normal" })} className="btn btn-lg btn-block btn-primary h-100"
                type="submit" value={content.SentenceConstructor.configData.sendButtonLabel.lt}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }

  render() {
    const { error, inputSessionConfig } = this.state
    const { sessionConfig } = this.props;

    return (
      <div className="sessionConfig">
        {error &&
          <div className="error">{error.toString()}</div>
        }
        {!error && (sessionConfig === undefined) &&
          this.renderSessionLoading()
        }
        {
          sessionConfig &&
          this.renderSessionConfigPanel(sessionConfig, inputSessionConfig)
        }
      </div>
    )
  }
}

export default SentenceConstructorSessionConfig