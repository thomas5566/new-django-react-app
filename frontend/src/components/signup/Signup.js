import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Container,
    Button,
    Row,
    Col,
    Form,
    FormControl
 } from "react-bootstrap";

 import { signupNewUser } from "./SignupActions";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
        };
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSignupClick = () => {
        const userData = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        this.props.signupNewUser(userData);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col md="4">
                        <h1>Signup</h1>
                        <Form>
                            <Form.Group controlId="emailId">
                                <Form.Label>User Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <FormControl.Feedback type="invalid"></FormControl.Feedback>
                            </Form.Group>

                            <Form.Group controlId="passwordId">
                                <Form.Label>Your Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.password}
                                    onChange={this.onChange}
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="nameId">
                                <Form.Label>User name</Form.Label>
                                <Form.Control
                                    isInvalid={this.props.createUser.usernameError}
                                    type="text"
                                    name="name"
                                    placeholder="Enter user name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                <FormControl.Feedback type="invalid">
                                    {this.props.createUser.usernameError}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Form>
                        <Button
                            color="primary"
                            onClick={this.onSignupClick}
                        >Sign Up</Button>
                        <p className="mt-2">
                            Already have account? <Link to="/login">Login</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Signup.propTypes = {
    signupNewUser: PropTypes.func.isRequired,
    createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    createUser: state.createUser
});

export default connect(mapStateToProps, {
    signupNewUser
})(withRouter(Signup));