import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="#4a148c purple darken-4">
          <div className="container">
            <div className="row">
              <div className="nav-wrapper center col s12">
                <a href="#!" className="brand-logo center col s12 ">
                  Cool Calculator
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
