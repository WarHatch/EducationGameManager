import React, { Component } from 'react'

import { getLatestSessionConfig, sendLatestSessionConfig } from "../../../dataHandler/index";

// Types
import { ISessionConfig } from "../../../dataHandler/data";

type P = {
  lessonId: string,
  sessionId: string
}

type S = {
  error: Error | null,
  sessionConfig?: ISessionConfig,
  inputSessionConfig: {
    asteroidSpawnPerMinute: number,
    asteroidSecondsToCrash: number,
  },
}

class SessionConfig extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      sessionConfig: undefined,
      // TODO: atm hand-synced with GEA. Should be set on receiving config
      inputSessionConfig: {
        asteroidSpawnPerMinute: 20,
        asteroidSecondsToCrash: 9,
      },
    };
  }

  getConfigData() {
    const { sessionId, lessonId } = this.props;
    getLatestSessionConfig(lessonId, sessionId).then((newConfig) => {
      this.setState((prevState) => {
        return {
          sessionConfig: {
            ...newConfig,
          }
        };
      })
    }).catch((error) => {
      this.setState({ error });
    })
  }

  componentDidMount() {
    this.getConfigData();
    setInterval(() => {
      this.getConfigData();
    }, 1000);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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

  onSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { sessionId, lessonId } = this.props;
    sendLatestSessionConfig(
      lessonId,
      {
        ...this.state.inputSessionConfig,
        sessionId: this.props.sessionId,
      })
  }

  renderSessionConfigPanel(sessionData: ISessionConfig) {
    const { inputSessionConfig } =this.state;

    return (
      <div className="configPanel">
        <p>Config</p>
        <ul>
          <li>{"Asteroid spawn per minute:" + sessionData.asteroidSpawnPerMinute}</li>
          <li>{"Asteroid crashes in " + sessionData.asteroidSecondsToCrash + "seconds"}</li>
        </ul>
        <form onSubmit={(e) => this.onSend(e)}>
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
            max={14}
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
    const { error, sessionConfig } = this.state

    return (
      <div className="sessionConfig">
        {!error && sessionConfig === undefined &&
          <p>Loading...</p>
        }
        {error &&
          <div className="error">{error.toString()}</div>
        }
        {
          sessionConfig &&
          this.renderSessionConfigPanel(sessionConfig)
        }
      </div>
    )
  }
}

export default SessionConfig