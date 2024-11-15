import React, { useEffect, useState } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../components/config/axios";

const FlowerDetail = () => {
  const navigate = useNavigate();
  const { relationshipID } = useParams(); // Retrieve relationshipID from URL
  const [flowerDetail, setFlowerDetail] = useState({});
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");
  console.log("Event ID:", eventId);

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        const response = await api.get(`/GetFlowerEvent/${relationshipID}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Include token in Authorization header
          }
        });
        if (response.data.code === 1000) {
          setFlowerDetail(response.data.result); // Set flower details
          console.log("flowerDetail: ", response.data.result);
        } else {
          toast.error("Failed to fetch flower details");
        }
      } catch (error) {
        console.error("Error fetching flower details:", error);
        toast.error("Failed to fetch flower details");
      }
    };

    fetchFlowerDetails();
    window.scrollTo(0, 0);
  }, [relationshipID, token]);

  if (!flowerDetail) {
    return <h2>Flower not found</h2>;
  }

  const addToCart = (flower) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    console.log("Existing cart before update:", existingCart);

    // Find index of the flower in the existing cart by flowerID (if this is your identifier)
    const flowerIndex = existingCart.findIndex((item) => item.relationshipID === flower.relationshipID);

    // If flower already exists in cart, update its quantity, otherwise add a new flower
    if (flowerIndex !== -1) {
      existingCart[flowerIndex].quantity += 1;
    } else {
      existingCart.push({ ...flower, quantity: 1 });
    }

    // Log the product being added and the updated cart state
    console.log("Product added to cart:", flower);
    console.log("Updated cart:", existingCart);

    // Update sessionStorage with the new cart data
    sessionStorage.setItem("cart", JSON.stringify(existingCart));

    // Notify user
    toast.success("Product added to cart successfully");
  };

  return (
    <>
      <Header />
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="wrapper">
        <div className="wrapper__flower-info">
          <Image
            className="wrapper__flower-info--img"
            src={flowerDetail.image} // Default image if not provided
            alt={flowerDetail.flowername}
          />
          <div className="wrapper__flower-info-detail">
            <h1>{flowerDetail.flowername}</h1>
            <h2>{flowerDetail.floPrice} VND</h2>
            <p>Số lượng có sẵn: {flowerDetail.quantity}</p>
            <div className="wrapper__flower-info-detail--btn">
              <button
                className="wrapper__flower-info-detail--btn--buy"
                onClick={() => addToCart(flowerDetail)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className="wrapper__flower-des">
          <h2>Mô tả sản phẩm</h2>
          <p>{flowerDetail.description}</p>
        </div>

        <div className="wrapper__flower--detail">
          <h3>SẢN PHẨM THUỘC SỰ KIỆN</h3>
          <div className="wrapper__flower--detail-card">
            <Card
              bordered={false}
              onClick={() => navigate(`/events/${eventId}`)}
            >
              <Card.Meta
                title={flowerDetail.eventname}
                description={flowerDetail.description}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerDetail;
