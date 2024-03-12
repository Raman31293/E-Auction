import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../UIC/Header";
import axios from "axios";
import { baseURL } from "../../url";

// import websocket library
import io from "socket.io-client";

export default function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [bidAmount, setBidAmount] = useState("");
  // State to store current bid
  const [currentBid, setCurrentBid] = useState(null);
  // State to store WebSocket instance
  const [socket, setSocket] = useState(null);
  const [bidStatus, setBidStatus] = useState(""); // State for bid status
  const [auctionDuration, setAuctionDuration] = useState(""); // State for auction duration


  useEffect(() => {
    // Connect to WebSocket server when the component mounts
    const newSocket = io("ws://localhost:8080"); // Replace with your WebSocket server URL
    setSocket(newSocket);

    // fetch product details
    axios
      .get(`${baseURL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Include token in headers
        },
      })
      .then((res) => {
        setData(res.data);
        setAuctionDuration(res.data.auctionDuration);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // clean up component mount
    return () => {
      newSocket.disconnect();
    };
  }, [id]);
  useEffect(() => {
    // Listen for bid updates from the server
    if (socket) {
      socket.on("newBid", (bid) => {
        setCurrentBid(bid);
      });
    }
    // Clean up socket event listener on component unmount
    return () => {
      if (socket) {
        socket.off("newBid");
      }
    };
  }, [socket]);

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const submitBid = () => {
    // Make an API call to submit the bid
    axios
      .post(`${baseURL}/product/${id}/bid`, { amount: bidAmount })
      .then((res) => {
        // Handle successful bid submission, e.g., show a success message
        // Update currentBid state with the new bid after successful submission
        setCurrentBid({ amount: bidAmount });
        console.log("Bid submitted successfully");
        setBidStatus("Bid submitted successfully"); // Update bid status
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error submitting bid:", error);
        setBidStatus("Error submiting Bid "); // Update bid status
      });
  };

  if (data) {
    return (
      <div>
        <Header />
        <div style={{ margin: "2%" }}>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">{data.title}</div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {" "}
              <img src={data.image} alt="Product" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Bid Amount"
                value={bidAmount}
                onChange={handleBidChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              Highest Bid: {currentBid ? currentBid.amount : data.startingBid}
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">{data.startingBid}</div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              Auction Duration: {auctionDuration} hours
            </div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {/* Render bid status message */}
              {bidStatus && <div>{bidStatus}</div>}
              <button className="btn btn-primary" onClick={submitBid}>
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
