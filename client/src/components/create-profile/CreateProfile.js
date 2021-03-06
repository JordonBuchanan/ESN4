import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            website: '',
            location: '',
            status: '',
            bio: '',
            teams: '',
            twitter: '',
            facebook: '',
            snapchat: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }
  render() {
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">
                    Enter Your Information
                </p>
                <small className="d-block pb-3">* - denotes required fields</small>
                </div> 
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(null)(CreateProfile);