import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Newsreel extends Component {
  render() {
    return (
      <div className="newsReel">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 featuredReel">
            </div>
            <div className="col-sm-6 latestReel">
            </div>
            <div className="col-sm-12 bottomReel">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsreel;