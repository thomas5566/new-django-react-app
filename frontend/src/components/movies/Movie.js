import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteMovie, updateMovie } from "./MoviesActions";
import { useLocation, Link } from "react-router-dom";
import { Row ,Container, Col, Media } from 'react-bootstrap';
import styled from 'styled-components'
// import { Button } from "react-bootstrap";
import './Movie.css';
import LazyLoad from "react-lazyload";


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

const Movie = _ => {

    // onDeleteClick = () => {
    //     const { movie } = this.props;
    //     this.props.deleteMovie(movie.id);
    // };
    // onUpperCaseClick = () => {
    //     const { movie } = this.props;
    //     this.props.updateMovie(movie.id, {
    //         title: movie.title.toUpperCase()
    //     });
    // };
    // onLowerCaseClick = () =>{
    //     const { movie } = this.props;
    //     this.props.updateMovie(movie.id, {
    //         title: movie.title.toLowerCase()
    //     });
    // };

    const { state } = useLocation();

    return (
        <Container>
        <Row>
        <Col sm={5} >
            <img className="card-img-top image" src={state.items.images} alt="{{ movie.title }}"/>
        </Col>

        <Col sm={7} >
          <h1 className="name text-white">{ state.items.title }</h1>
          <p className="star"><i className="fa fa-calendar df"></i>  { state.items.release_date }
          <span style={{marginLeft: "20px"}}><i className="fa fa-star-o df"></i>  { state.items.rating } </span>
          <span style={{marginLeft: "20px"}}><i className="fa fa-star-o df"></i>  { state.items.duration } </span>
          <span style={{marginLeft: "20px"}}><i className="fa fa-star-o df"></i>  { state.items.amount_reviews } </span></p>
          {/* <p className="star" >{ state.items.amount_reviews }</p> */}
          {/* <h2 style={{color:"palegreen", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>{ state.items.body  }</h2> */}
          {/* <h5 className="star" style={{textAlign:"justify"}}>{ state.items.critics_consensus }</h5> */}
          {/* {/* <h6 style={{color:"palegreen",marginTop:"15px"}}>Director : <span className="star">{ state.items.critics_consensus  }</span></h6> */}
          <h6 style={{color:"palegreen",marginTop:"15px"}}> Description : <span className="star">{ state.items.critics_consensus }</span></h6>
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
                  <p>{pttcomments.contenttext}</p>
              </dev>

            </div>
              </LazyLoad>


            ))}
          </dev>

          {/* <span>{ state.items.pttcomments }</span> */}
        </Col>
        </Row>

        {/* <div className="headerr" style={{marginTop: "30px"}}>
        <h2 className="text-white" >{ state.items.title } Trailer </h2>
        <hr className="hr" />
        <iframe width="100%"  height="400" src={question.ytube} ></iframe>
        <Iframe url={question.ytube}
          width="100%"  height="400"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen/>

        </div>*/}


        {/* <h2 className="text-white" >Cast And Crews </h2><hr className="hr" />
        <Row>
          <Col sm={2} style={{marginTop: "15px"}} >
          <Media className="card">
              <img className="card-img-top image" src="" alt="Just" style={{height: "210px", width: "155px", border: "1px solid rgba(137, 255, 162, 0.78) }}"}}  />
                <div className="middle">
                  <p className="p">lol</p>
                  <p className="p">Rol</p>
                  <p className="p">mn</p>
                </div>
              </Media>
          </Col>
        </Row> */}


        </Container>
        // <div key={state.items.id}>
        //     <div >
        //         <img src={state.items.images} alt={state.items.title} />
        //         <div > {state.items.duration}</div>
        //     </div>
        //     <div >
        //         <div >
        //             {state.items.title} ({new Date(state.items.release_date).getFullYear()})
        //         </div>
        //         <div >{state.items.rating}</div>
        //     </div>
        // </div>
    );
    // render() {
    //     // const { movie } = this.props;

    // }
}

// Movie.propTypes = {
//     movie: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({});

// export default connect(mapStateToProps, { deleteMovie, updateMovie })(
//     withRouter(Movie)
// );
export default Movie;