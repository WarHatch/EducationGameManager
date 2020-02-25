import React from 'react';

export default class AnswerCirlce extends React.PureComponent<{ correct: boolean }> {
  style = () => {
    const incorrectStyle = {
      height: "20px",
      width: "20px",
      backgroundColor: "red",
      borderRadius: "50%",
      display: "inline-block",
      marginLeft: "4px",
    }
    const correctStyle = {...incorrectStyle, backgroundColor: "green"}

    return this.props.correct ? correctStyle : incorrectStyle;
  }

  render() {
    return (
      <span style={this.style()}></span>
    )
  }
}