import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";

export default function requireAuth(Component) {
    class AuthenticatedComponet extends React.Component {
        constructor(props) {
            super(props);
            this.checkAuth();
        }

        componentDidUpdate(prevProps, prevState) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                // read the current location
                const redirectAfterLogin = this.props.location.pathname;
                // go to login and pass current location in next parameter
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true ? (
                        <Component {...this.props} />
                    ) : null}
                </div>
            );
        }
    }
    AuthenticatedComponet.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            token: state.auth.token
        };
    };

    return connect(mapStateToProps)(AuthenticatedComponet)
}