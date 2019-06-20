import React from "react";

class Screen extends React.Component {
  render() {
    return (
      <div className="input-field col s12">
        <input
          id="last_name"
          type="text"
          className="validate"
          value={this.props.value}
          readOnly
          required
        />
      </div>
    );
  }
}

export default Screen;
