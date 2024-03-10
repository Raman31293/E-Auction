import React, { useState, useEffect } from "react";
import Card from "../UIC/Card";
import axios from "axios";
import { baseURL } from "../../url";
import Header from "../UIC/Header";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/product/details`)
    .then((res) => setData(res.data))
    .catch((error) => console.error('Error fetching data :',error))
  }, []);
  console.log(data);  
  if (!Array.isArray(data) || data.length === 0) {
    return<> Loading...</>;}
    return (
        <div>
            <Header />
        
      <div style={{ margin: "5%" }}>
        {data.map((e) => {
          return (
            <Card
              title={e.title}
              image = {e.image}
              description={e.description}
              id={e._id}
            />
          );
        })}
      </div>
      </div>
    );
  } 
