import React from "react";
import Button from "./Button";
import Screen from "./Screen";
import Axios from "axios";
import UrlEncode from "urlencode";
class Calculator extends React.Component {
  constructor() {
    super();
    this.buttons = [
      { value: "0" },
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { value: "+" },
      { value: "-" },
      { value: "*" },
      { value: "/" },
      { value: "<==" },
      { value: "=" }
    ];
    this.state = { history: [{ operation: "" }] };
  }
  setOperation(value, type) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const currentOperation = current.operation;
    let newHistoryValue = null;
    if (type === "update") {
      newHistoryValue = history.concat({ operation: currentOperation + value });
    } else if (type === "delete") {
      if (history.length > 1) {
        history.pop();
        newHistoryValue = history;
      } else {
        newHistoryValue = [{ operation: "" }];
      }
    } else if (type === "replace") {
      newHistoryValue = history.concat({ operation: value });
    } else {
      console.error(
        "Plis use one of the 3 options we have! - delete - update - replace"
      );
    }

    this.setState({
      history: newHistoryValue
    });
  }

  getResult() {
    Axios.get(
      `http://api.mathjs.org/v4/?expr=${UrlEncode(
        this.state.history[this.state.history.length - 1].operation,
        "gbk"
      )}`
    )
      .then(response => {
        this.setOperation(response.data, "replace");
      })
      .catch(err => {
        this.setOperation("SYNTAX ERROR!!", "replace");
      });
  }

  handleOnClick(value) {
    if (value === "<==") {
      this.setOperation(null, "delete");
    } else if (value === "=") {
      this.getResult();
    } else {
      this.setOperation(value, "update");
    }
  }
  renderButtons() {
    return this.buttons.map((current, index) => {
      return (
        <Button
          value={current.value}
          key={index}
          parentOnClick={() => this.handleOnClick(current.value)}
        />
      );
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Screen
            value={this.state.history[this.state.history.length - 1].operation}
          />
        </div>
        <div className="row ">{this.renderButtons()}</div>
      </div>
    );
  }
}

export default Calculator;
