import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMovies } from "./MoviesActions";
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class MoviesList extends Component {

    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const style={
            display: 'flex',
            flexWrap: 'wrap'
        }

        const { movies } = this.props.movies;

        if (movies.length === 0) {
            return <h2>Please add your first movie</h2>
        }

        let items = movies.map(movie => {
            return (
                <div className="catalog__item" key={movie.id}>
                    <Link
                        to={{
                            pathname: `/movie/${movie.id}`,
                            state: { items: movie }
                        }}
                    >
                    <div className="catalog__item__img">
                        <img src={movie.images} alt={movie.title} />
                        <div className="catalog__item__resume">
                            {movie.duration}
                            {movie.countgoodandbads.map((countgoodandbads) => (
                                <div key={countgoodandbads.id}>
                                    <div>PTT 好雷: {countgoodandbads.good_ray}</div>
                                    <div>PTT 負雷: {countgoodandbads.bad_ray}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </Link>
                    <div className="catalog__item__footer">
                        <div className="catalog__item__footer__name">
                            {movie.title} ({new Date(movie.release_date).getFullYear()})
                        </div>
                        <div className="catalog__item__footer__rating">{movie.rating}</div>
                    </div>
                </div>
            );
        });

        return (
            <Container fluid={false}>
                    <Row style={style}>
                        {items}
                    </Row>
            </Container >
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
