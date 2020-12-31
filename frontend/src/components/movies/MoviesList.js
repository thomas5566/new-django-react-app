import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMovies } from "./MoviesActions";

import Movie from "./Movie";

class MoviesList extends Component {
    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const { movies } = this.props.movies;

        if (movies.length === 0) {
            return <h2>Please add your first movie</h2>
        }

        let items = movies.map(movie => {
            return <Movie key={movie.id} title={movie.title} duration={movie.duration} rating={movie.rating} release_date={movie.release_date} images={movie.images} movie={movie} />;
        });

        return (
            <div>
                <h2>Movies</h2>
                {items}
                <hr /> {/* add horizontal line */}
            </div>
        );
    }
}

MoviesList.propTypes = {
    getMovies: PropTypes.func.isRequired,
    movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps, {
    getMovies
})(withRouter(MoviesList));