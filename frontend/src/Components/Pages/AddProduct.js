import React, { useState } from "react";
import { baseURL } from "../../url";
import axios from "axios"
import Header from '../UIC/Header'


export default function AddProduct() {
  // adding useState to tracking or updating data state
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    image: "",
    startingBid: "",
    auctionDuration: "",
  });
  // on submit post request
  const submitForm = async () => {
    try {
      const token = localStorage.getItem('Token'); // Retrieve token from localStorage

      // Check if token exists
      if (!token) {
        console.error('Token not found. User not authenticated.'); // Handle the case where token doesn't exist
        return;
      }

      // Set axios default headers with the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Make post request with authorization headers
      const response = await axios.post(`${baseURL}/product/add`, formdata);
      console.log(response.data);
      
      // Handle success response if needed
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error response if needed
    }
  };
    
  return (
    <div>
      <Header />
    <div style={{ margin: "2%" }}>
      <form>
        <div className="mb-3">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="String"
            className="form-control"
            id="title"
            value={formdata.title}
          onChange={(e) =>
            setFormdata({ ...formdata, title: e.target.value })
          }
            placeholder="Enter Your Product Title Here"
          />
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">
            defaultescription
          </label>
          <input
            type="String"
            className="form-control"
            id="description"
            placeholder="Product Description"
            value={formdata.description}
          onChange={(e) =>
            setFormdata({ ...formdata, description: e.target.value })
          }
          />
        </div>
        <div className="mb-3">
          <label for="image" className="form-label">
            image
          </label>
          <input
            type="String"
            className="form-control"
            id="image"
            placeholder="Enter Your Image Link"
            value={formdata.image}
          onChange={(e) =>
            setFormdata({ ...formdata, image: e.target.value })
          }
          />
        </div>
        <div className="mb-3">
          <label for="startingBid" className="form-label">
            startingBid
          </label>
          <input
            type="Number"
            className="form-control"
            id="startingBid"
            placeholder="Enter Starting Price "
            value={formdata.startingBid}
          onChange={(e) =>
            setFormdata({ ...formdata, startingBid: e.target.value })
          }
          />
        </div>
        <div className="mb-3">
          <label for="auctionDuration" className="form-label">
            auctionDuration
          </label>
          <input
            type="number"
            className="form-control"
            id="auctionDuration"
            placeholder="Auction Time"
            value={formdata.auctionDuration}
          onChange={(e) =>
            setFormdata({ ...formdata, auctionDuration: e.target.value })
          }
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitForm}>
          Place Bid
        </button>
      </form>
    </div>
    </div>
  );
}
