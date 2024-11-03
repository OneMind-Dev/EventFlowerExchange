import React, { useEffect, useState } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../components/config/axios";

const FlowerDetail = () => {
  const navigate = useNavigate();
  const { id, eventId } = useParams(); // Retrieve flower ID and event ID from URL

  const [flowerDetail, setFlowerDetail] = useState({});
  const [eventDetail, setEventDetail] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const token = localStorage.getItem("token"); // Adjust as needed

  useEffect(() => {
    // Fetch flower details from the API
    const fetchFlowerDetails = async () => {
      if (!token) {
        toast.error("You must be logged in to view flower details.");
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await api.get(`/GetFlowerFromEvent/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setFlowerDetail(response.data.flower);
        setEventDetail(response.data.event); // Assume your API returns event details
        setUserDetail(response.data.user); // Assume your API returns user details
      } catch (error) {
        console.error("Error fetching flower details:", error);
        toast.error("Failed to fetch flower details");
      }
    };

    fetchFlowerDetails();
    window.scrollTo(0, 0);
  }, [eventId, token]); // Depend on eventId and token

  if (!flowerDetail || !eventDetail) {
    return <h2>Flower not found</h2>;
  }

  const addToCart = () => {
    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
      return; // Prevent adding to cart if no token
    }

    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const existingItemIndex = cartItems.findIndex(item => item.flower_id === flowerDetail.flower_id);

    if (existingItemIndex === -1) {
      const newItem = { ...flowerDetail, quantity: 1 };
      cartItems.push(newItem);
      toast.success("Product added to cart!");
    } else {
      cartItems[existingItemIndex].quantity += 1;
      toast.info("Product quantity updated in cart!");
    }

    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <>
      <Header />
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="wrapper">
        <div className="wrapper__flower-info">
          <Image
            className="wrapper__flower-info--img"
            src={flowerDetail.flower_image}
            alt={flowerDetail.flower_name}
          />
          <div className="wrapper__flower-info-detail">
            <h1>{flowerDetail.flower_name}</h1>
            <h2>{flowerDetail.price} VND</h2>
            <p>Số lượng có sẵn: {flowerDetail.quantity}</p>
            <div className="wrapper__flower-info-detail--btn">
              <button
                className="wrapper__flower-info-detail--btn--buy"
                onClick={addToCart}
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
        <div className="wrapper__shop-info">
          <div className="wrapper__shop-info--img">
            <img
              onClick={() => navigate(`/${userDetail.user_id}`)}
              src="../src/components/images/userImage.png"
              alt="User"
            />
          </div>
          <div className="wrapper__shop-info--des">
            <h3 onClick={() => navigate(`/${userDetail.user_id}`)}>
              {userDetail.username}
            </h3>
          </div>
        </div>
        <div className="wrapper__flower--detail">
          <h3>SẢN PHẨM THUỘC SỰ KIỆN</h3>
          <div className="wrapper__flower--detail-card">
            <>
              <Card
                bordered={false}
                onClick={() => {
                  navigate(`/event/${eventDetail.event_id}`);
                }}
              >
                <Meta
                  title={eventDetail.event_name}
                  description={eventDetail.event_description}
                />
              </Card>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerDetail;
