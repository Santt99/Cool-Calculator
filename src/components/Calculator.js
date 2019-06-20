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
    if (type === "update") {
      this.setState({
        history: history.concat({ operation: currentOperation + value })
      });
    } else if (type === "delete") {
      if (history.length > 1) {
        history.pop();
        this.setState({
          history: history
        });
      } else {
        this.setState({
          history: [{ operation: "" }]
        });
      }
    } else if (type === "replace") {
      this.setState({
        history: history.concat({ operation: value })
      });
    } else {
      console.error(
        "Plis use one of the 3 options we have! - delete - update - replace"
      );
    }
  }

  async getResult() {
    try {
      const response = await Axios.get(
        `http://api.mathjs.org/v4/?expr=${UrlEncode(
          this.state.history[this.state.history.length - 1].operation,
          "gbk"
        )}`
      );
      this.setOperation(response.data, "replace");
      console.log(response);
    } catch (error) {
      this.setOperation("ERROR");
      console.error(error);
    }
  }

  handleOnClick(value) {
    if (value === "<==") {
      this.setOperation(null, "delete");
      console.log("Delete!");
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
