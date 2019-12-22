import React, { Component } from 'react'

interface P {
  newSessionIdValue: string,
  changeNewSessionIdInput: (event) => void,
  addNewSessionInstanceData: (sessionId: string) => void,
}

class SessionForm extends Component<P> {
  constructor(props) {
    super(props);
  }

  handleSubmit(event, sessionInstanceData) {
    event.preventDefault();

    const { addNewSessionInstanceData } = this.props;
    
    addNewSessionInstanceData(sessionInstanceData);
  }

  render() {
    const { newSessionIdValue, changeNewSessionIdInput } = this.props;

    return (
      <form onSubmit={(event) => this.handleSubmit(event, newSessionIdValue)}>
        <label>
          {"New session to monitor id:"}
          <input type="text" value={newSessionIdValue} onChange={changeNewSessionIdInput} />
        </label>
        <input type="submit" value="add"/>
      </form>
    );
  }
}

export default SessionForm;