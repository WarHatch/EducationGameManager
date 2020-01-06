import React, { Component } from 'react'

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

  createNewLesson() {
  }

  render() {
    const { gameTypeInput } = this.state

    return (
      <div className="page">
        test
        {/* <SessionIdInput
          newSessionIdValue={newSessionIdInput}
          addNewSessionInstanceData={(newSessionIdInput) => this.addNewSessionInstanceData(newSessionIdInput)
          }
          changeNewSessionIdInput={(event) => this.changeNewSessionIdInput(event)}
        /> */}
      </div>
    )
  }
}

export default Page