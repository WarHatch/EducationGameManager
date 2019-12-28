import React, { Component } from 'react'

import { getLatestSessionConfig, sendLatestSessionConfig } from "../../../dataHandler/index";

// Types
import { ISessionConfig } from "../../../dataHandler/data";

type P = {
  sessionId: string
}

type S = {
  error: Error,
  sessionConfig: ISessionConfig,
  inputSessionConfig: {
    asteroidSpawnPerMinute: number
  },
}

class SessionConfig extends Component<P, S> {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      sessionConfig: undefined,
      inputSessionConfig: {
        asteroidSpawnPerMinute: 0,
      },
    };
  }

  getConfigData() {
    const { sessionId } = this.props;
    getLatestSessionConfig(sessionId).then((newConfig) => {
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
    sendLatestSessionConfig({
      ...this.state.inputSessionConfig,
      sessionId: this.props.sessionId,
    })
  }

  renderSessionConfigPanel(sessionData: ISessionConfig) {
    return (
      <div className="configPanel">
        <p>Config</p>
        <ul>
          <li>{"Asteroid spawn per minute:" + sessionData.asteroidSpawnPerMinute}</li>
        </ul>
        <form onSubmit={(e) => this.onSend(e)}>
          <label>{"Asteroid spawn per minute:"}</label>
          <input
            name="asteroidSpawnPerMinute"
            type="number"
            value={this.state.inputSessionConfig.asteroidSpawnPerMinute}
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