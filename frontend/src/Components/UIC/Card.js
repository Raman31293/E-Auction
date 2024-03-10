import React from "react";
import { useNavigate } from "react-router-dom";


export default function Card(props) {
const navigate = useNavigate();
const moreDetails = () =>{
    navigate(`/product/${props.id}`)
};

  return (
    <div style={{margin:"2%"}}>
      <div className="card col-3" style={{"width": "18rem"}}>
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description}
          </p>
          <a href="#" className="btn btn-primary" onClick={moreDetails}>
            More Details
          </a>
        </div>
      </div>
    </div>
  );
}

