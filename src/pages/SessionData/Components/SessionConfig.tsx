import React, { Component } from 'react'

import { getLatestSessionConfig, sendLatestSessionConfig } from "../../../dataHandler/index";

// Types
import { ISessionConfig } from "../../../dataHandler/data";

interface IInputSessionConfig {
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
}

type P = {
  lessonId: string,
  sessionId: string
}

type S = {
  error: Error | null,
  sessionConfig?: ISessionConfig,
  inputSessionConfig?: IInputSessionConfig,
}

class SessionConfig extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      sessionConfig: undefined,
      inputSessionConfig: undefined,
    };
  }

  getConfigDataInterval: NodeJS.Timeout | null = null;

  getConfigData() {
    const { sessionId, lessonId } = this.props;
    getLatestSessionConfig(lessonId, sessionId).then((newConfig) => {
      this.setState({
        sessionConfig: newConfig
      })
    }).catch((error) => {
      this.setState({ error });
    })
  }

  componentDidMount() {
    // set initial config data
    const { sessionId, lessonId } = this.props;
    getLatestSessionConfig(lessonId, sessionId).then((newConfig) => {
      const { asteroidSecondsToCrash, asteroidSpawnPerMinute } = newConfig;
      this.setState({
        sessionConfig: newConfig,
        inputSessionConfig: { asteroidSpawnPerMinute, asteroidSecondsToCrash }
      })
    }).catch((error) => {
      this.setState({ error });
    })
    // Repeat config data sync
    this.getConfigDataInterval = setInterval(() => {
      this.getConfigData();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.getConfigDataInterval !== null) {
      clearInterval(this.getConfigDataInterval)
      this.getConfigDataInterval = null;
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState((prevState) => {
      if (prevState.inputSessionConfig === undefined) throw new Error(
        `input '${name}' value changed to '${value}' before inputSessionConfig was defined`
      );

      return {
        inputSessionConfig: {
          ...prevState.inputSessionConfig,
          [name]: value
        }
      }
    })
  }

  onSend(event: React.FormEvent<HTMLFormElement>, inputSessionConfig: IInputSessionConfig) {
    event.preventDefault();

    const { sessionId, lessonId } = this.props;
    sendLatestSessionConfig(
      lessonId,
      {
        ...inputSessionConfig,
        sessionId,
      })
  }

  renderSessionLoading() {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading session's config data...</span>
      </div>
    )
  }

  renderSessionConfigPanel(sessionData: ISessionConfig, inputSessionConfig: IInputSessionConfig) {
    return (
      <div className="configPanel">
        <p>Config</p>
        <ul>
          <li>{"Asteroid spawn per minute:" + sessionData.asteroidSpawnPerMinute}</li>
          <li>{"Asteroid crashes in: " + sessionData.asteroidSecondsToCrash + " seconds"}</li>
        </ul>
        {/* TODO: do not render if session has ended */}
        <form onSubmit={(e) => this.onSend(e, inputSessionConfig)}>
          <label>{"Asteroid spawn per minute: " + inputSessionConfig.asteroidSpawnPerMinute}</label>
          <input
            min={5}
            max={60}
            name="asteroidSpawnPerMinute"
            type="range"
            className="form-control-range"
            value={inputSessionConfig.asteroidSpawnPerMinute}
            onChange={(e) => this.handleInputChange(e)}
          />
          <label>{"Asteroid crashes in x seconds: " + inputSessionConfig.asteroidSecondsToCrash}</label>
          <input
            min={2}
            max={18}
            name="asteroidSecondsToCrash"
            type="range"
            className="form-control-range"
            value={inputSessionConfig.asteroidSecondsToCrash}
            onChange={(e) => this.handleInputChange(e)}
          />
          <input type="submit" value="Set" />
        </form>
      </div>
    )
  }

  render() {
    const { error, sessionConfig, inputSessionConfig } = this.state

    return (
      <div className="sessionConfig">
        {error &&
          <div className="error">{error.toString()}</div>
        }
        {!error && (sessionConfig === undefined || inputSessionConfig === undefined) &&
          this.renderSessionLoading()
        }
        {
          sessionConfig && inputSessionConfig &&
          this.renderSessionConfigPanel(sessionConfig, inputSessionConfig)
        }
      </div>
    )
  }
}

export default SessionConfig