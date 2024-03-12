import React, { useState, useEffect } from "react";
import Card from "../UIC/Card";
import axios from "axios";
import { baseURL } from "../../url";
import Header from "../UIC/Header";

export default function Home() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('Token'); // Retrieve token from localStorage

    // Check if token exists
    if (token) {
      // Set axios default headers with the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch data with authorization headers
      axios.get(`${baseURL}/product/details`)
        .then((res) => setData(res.data))
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.error('Token not found. User not authenticated.'); // Handle the case where token doesn't exist
    }
  }, []);
  
  console.log(data);  

  if (!Array.isArray(data) || data.length === 0) {
    return<> Loading...</>;
  }
  
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        {data.map((e) => (    
            <div key={e._id} style={{ width: "25%", marginRight: "2%" }}>      
          <Card
            key={e._id}
            title={e.title}
            image={e.image}
            description={e.description}
            id={e._id}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
