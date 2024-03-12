import React from "react";
import { useNavigate } from "react-router-dom";


export default function Card(props) {
const navigate = useNavigate();
const moreDetails = () =>{
    navigate(`/product/${props.id}`)
};

  return (
    <div className="card-container">
        <div className="card" style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", margin: "10px" }}>
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

