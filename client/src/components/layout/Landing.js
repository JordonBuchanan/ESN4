import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  ESNLogo from '../../img/newESN3.png';
import  PropTypes  from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-2 mb-4 ESNFont"><span className="Highlight">E</span>lite <span className="Highlight">S</span>ports <span className="Highlight">N</span>ews
                    </h1>
                    <hr className="hrTitle" />
                    <h2 className="display-6 mb-4 ESNFont">Sports News Site For All <span className="Highlight">Biased</span> Fan Needs
                    </h2>
                    <img alt="ESNlogo" className="ESNlogo" src={ ESNLogo } />
                </div>
                </div>
            </div>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
