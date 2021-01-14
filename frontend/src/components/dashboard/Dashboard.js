import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { logout } from "../login/LoginActions"
import MovieList from "../movies/MoviesList";
import AddMovie from "../movies/AddMovie";


class Dashboard extends Component {
    onLogout = () => {
        this.props.logout();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">Home</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a >User: {user.email}</a>
                            </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button onClick={this.onLogout} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                            </form>
                        </div>
                    </nav>
                </div>
                <div>
                    <Container>
                        <MovieList />
                        <AddMovie />
                    </Container>
                </div>
          </div>
        );
    }
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(Dashboard));