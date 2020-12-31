import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteMovie, updateMovie } from "./MoviesActions";
import { Button } from "react-bootstrap";

class Movie extends Component {
    onDeleteClick = () => {
        const { movie } = this.props;
        this.props.deleteMovie(movie.id);
    };
    onUpperCaseClick = () => {
        const { movie } = this.props;
        this.props.updateMovie(movie.id, {
            title: movie.title.toUpperCase()
        });
    };
    onLowerCaseClick = () =>{
        const { movie } = this.props;
        this.props.updateMovie(movie.id, {
            title : movie.title.toLowerCase()
        });
    };
    render() {
        const { movie } = this.props;
        return (
            <div>
                <hr />
                <p>
                    (id:{movie.id})
                    (title:{movie.title})
                    (duration:{movie.duration})
                    (rating:{movie.rating})
                    (release_date:{movie.release_date})
                    <img src={movie.images} alt="image"></img>
                </p>
                <Button variant="secondary" size="sm" onClick={this.onUpperCaseClick}>
                    Upper Case
                </Button>{" "}
                <Button variant="info" size="sm" onClick={this.onLowerCaseClick}>
                    Lower Case
                </Button>
                <Button variant="danger" size="sm" onClick={this.onDeleteClick}>
                    Delete
                </Button>
            </div>
        );
    }
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteMovie, updateMovie })(
    withRouter(Movie)
);