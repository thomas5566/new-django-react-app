import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMovies } from "./MoviesActions";
import { Link } from 'react-router-dom'

import Movie from "./Movie";

import 'bootstrap/dist/css/bootstrap.min.css';

// import * as scrollHelpers from '../common/scroll.helpers';

class MoviesList extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       currentPage: 1
    //     };
    //     // Binds the handleScroll to this class (MovieBrowser)
    //     // which provides access to MovieBrowser's props
    //     // Note: You don't have to do this if you call a method
    //     // directly from a lifecycle method or define an arrow function
    //     this.handleScroll = this.handleScroll.bind(this);
    // }

    // componentDidMount() {
    //     window.onscroll = this.handleScroll;
    //     this.props.getTopMovies(this.state.currentPage);
    //   }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }

    // handleScroll() {
    //     const {topMovies} = this.props;
    //     if (!topMovies.isLoading) {
    //         let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
    //         if (percentageScrolled > .8) {
    //         const nextPage = this.state.currentPage + 1;
    //         this.props.getTopMovies(nextPage);
    //         this.setState({currentPage: nextPage});
    //         }
    //     }
    // }

    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const { movies } = this.props.movies;

        if (movies.length === 0) {
            return <h2>Please add your first movie</h2>
        }

        let items = movies.map(movie => {
            return <Movie key={movie.id} movie={movie} />;
        });

        return (
            <div className="catalogContainer">
                {items}
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
