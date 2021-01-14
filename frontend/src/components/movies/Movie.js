import React from "react";

import { useLocation } from "react-router-dom";
import { Row ,Container, Col } from 'react-bootstrap';
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { deleteMovie, updateMovie } from "./MoviesActions";
// import styled from 'styled-components'
// import { Button } from "react-bootstrap";
import './Movie.css';
import LazyLoad from "react-lazyload";
import ReadMoreReact from 'read-more-react';
import Badge from 'react-bootstrap/Badge';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

const Spinner = () => (
  <div className="post loading">
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#49d1e0"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(275.845 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

const responsive = {
  superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
  },
  desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
  },
  tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
  },
  mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
  },
};

const Movie = _ => {

    const { state } = useLocation();

    // let urls = [
    //   `http://127.0.0.1:8000/api/movie/pttcomments/?key_word=${state.items.id}`,
    //   `http://127.0.0.1:8000/api/movie/slidermovieimage/?movie=${state.items.id}`
    // ];

    // let texts = [];

    // Promise.all(urls.map(url =>
    //   fetch(url).then(resp => resp.text())
    //   )).then(t => {
    //     texts.push(t)
    //     console.log(texts);
    //   })

    let URL1 = `http://127.0.0.1:8000/api/movie/pttcomments/?key_word=${state.items.id}`
    let URL2 = `http://127.0.0.1:8000/api/movie/slidermovieimage/?movie=${state.items.id}`
    let datas = [];

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);

    Promise.all([promise1, promise2])
      .then(function(values)
        {
          datas.push(values)
          console.log(datas);

          return datas
        })
        .catch(error => console.log(`Error in promises ${error}`));

    return (
        <Container>
        <Row>
        <Col sm={5} >
            <img className="card-img-top image" src={state.items.images} alt="{{ state.items.title }}"/>
            <div>
                <Carousel
                    additionalTransfrom={0}
                    showDots={false}
                    arrows={true}
                    autoPlaySpeed={3000}
                    autoPlay={false}
                    centerMode={false}
                    className="carousel-hero"
                    containerClass="container-with-dots"
                    dotListClass="dots"
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass="carousel-top"
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside
                    responsive={responsive}>
                    {state.items.slidermovieimages.map((slidermovieimages) => {
                        return (
                            <div className="mt-5" key={slidermovieimages.id}>
                                <img className="media-img card-img-top card-img-hero" src={slidermovieimages.images} alt="Alt text"></img>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </Col>

        <Col sm={7} >
          <h1 className="name text-white">{ state.items.title }</h1>
          <div>
            <Badge variant="primary">{ state.items.release_date }</Badge>{' '}
            <Badge variant="secondary">IMDb分數：{ state.items.rating }</Badge>{' '}
            <Badge variant="success">{ state.items.duration }</Badge>{' '}
            <Badge variant="danger">網友想看指數：{ state.items.amount_reviews }</Badge>{' '}
          </div>
          <h6 style={{color:"palegreen", marginTop:"15px", whiteSpace: "pre-wrap"}}>
            <h5>OverView</h5>
            <span className="star" style={{ whiteSpace: "pre-wrap"}}>
              { state.items.critics_consensus }
            </span>
          </h6>
          <dev className="post-container">
            {state.items.pttcomments.map((pttcomments) => (
              <LazyLoad
                key={pttcomments.id}
                height={100}
                offset={[-100, 100]}
                placeholder={<Spinner />}
              >
              <div className="post">
                <dev className="post-body" key={pttcomments.id}>
                  <h4>{pttcomments.title}</h4>
                  <p>{pttcomments.author}</p>
                  <p>{pttcomments.date}</p>
                  <div style={{ whiteSpace: "pre-wrap"}}>
                    <ReadMoreReact text={pttcomments.contenttext}
                    min={70}
                    ideal={90}
                    max={500}
                    readMoreText="Read more"/>
                  </div>
                </dev>
              </div>
              </LazyLoad>
            ))}
          </dev>
        </Col>
        </Row>
        </Container>
    );
}


// Movie.propTypes = {
//     movie: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({});

// export default connect(mapStateToProps, { deleteMovie, updateMovie })(
//     withRouter(Movie)
// );
export default Movie;