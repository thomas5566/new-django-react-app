import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addMovie } from "./MoviesActions";

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onAddClick = () => {
        const movie = {
            title: this.state.title
        };
        this.props.addMovie(movie);
    };

    render() {
        return (
            <div>
                <h2>Add new movie</h2>
                <Form>
                    <Form.Group controlId="titleId">
                        <Form.Label>Movie</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="title"
                            placeholder="Enter Movie"
                            value={this.title}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                </Form>
                <Button variant="success" onClick={this.onAddClick}>
                    Add movie
                </Button>
            </div>
        );
    }
}

AddMovie.protoType = {
    addMovie: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addMovie })(withRouter(AddMovie))