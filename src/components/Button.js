import React from "react";

class Buttton extends React.Component {
  render() {
    return (
      <div className="col s3">
        <button
          className="btn waves-effect waves-light purple darken-4 calcButtons"
          type="submit"
          name="action"
          onClick={this.props.parentOnClick}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}

export default Buttton;
