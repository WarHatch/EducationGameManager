import React from "react"
import moment from "moment";
import AnswerCirlce from "../Components/AnswerCircle";

const timeToString = (date: moment.MomentInput) => `${moment(date).format("LTS")}`;

export default class ClickRecap extends React.PureComponent<{
  correct: boolean,
  date: moment.MomentInput,
  clickName: string, // e.g. attemptedAnswer
}> {
  render() {
    const { clickName, date, correct } = this.props;

    return (
      <div>
        <AnswerCirlce correct={correct} />
        <span className="pl-3">{timeToString(date)}</span>
        <span className="pl-3">{clickName}</span>
      </div>
    )
  }
}