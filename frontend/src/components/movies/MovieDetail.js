import React, { Component } from 'react'
import axios from 'axios';
import Iframe from 'react-iframe'
import { Row ,Container,Col,Media } from 'react-bootstrap';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: [],
    };
  }

  render() {

    const { movie } = this.props;

    if (question === null) return <p>Loading ...</p>;

    return (
      <Container className="de">
      <Row>
      <Col sm={5} >
          <img className="card-img-top image" src={movie.images} alt="{{ movie.title }}" style={{height: "480px"}} />
      </Col>

      <Col sm={7} >
        <h1 className="name text-white">{ movie.title }</h1>
        <p className="star" ><i className="fa fa-calendar df" ></i>  { movie.release_date }
        <span style={{marginLeft: "20px"}}><i className="fa fa-star-o df" ></i>  { movie.rating }/10 </span>
        <span style={{marginLeft: "20px"}}><i className="fa fa-clock-o df"></i>  { movie.duration } </span></p>
        <p className="star" >{ question.mtype  }</p>
        <h2 style={{color:"palegreen", fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>{ question.body  }</h2>
        <h5 className="star" style={{textAlign:"justify"}}>{ question.description  }</h5>
        <h6 style={{color:"palegreen",marginTop:"15px"}}>Director : <span className="star">{ question.director  }</span></h6>
        <h6 style={{color:"palegreen",marginTop:"15px"}}>Main Cast : <span className="star">{ question.maincast  }</span></h6>
      </Col>

      </Row>

      <div className="headerr" style={{marginTop: "30px"}}>
      <h2 className="text-white" >{ movie.title } Trailer </h2>
      <hr className="hr" />
      {/* <iframe width="100%"  height="400" src={question.ytube} ></iframe>
      <Iframe url={question.ytube}
        width="100%"  height="400"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
      */}
      </div>


      <h2 className="text-white" >Cast And Crews </h2><hr className="hr" />
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
        </Row>


      </Container>
      )
    }
}

export default Details;