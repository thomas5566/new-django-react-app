import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteMovie, updateMovie } from "./MoviesActions";

// import { Button } from "react-bootstrap";
import './Movie.css';

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
            title: movie.title.toLowerCase()
        });
    };
    
    render() {
        const { movie } = this.props;
        return (
            <div className="catalog__item" key={movie.id}>
                <div className="catalog__item__img">
                    <img src={movie.images} alt={movie.title} />
                    <div className="catalog__item__resume"> {movie.duration}</div>
                </div>
                <div className="catalog__item__footer">
                    <div className="catalog__item__footer__name">
                        {movie.title} ({new Date(movie.release_date).getFullYear()})
                    </div>
                    <div className="catalog__item__footer__rating">{movie.rating}</div>
                </div>
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