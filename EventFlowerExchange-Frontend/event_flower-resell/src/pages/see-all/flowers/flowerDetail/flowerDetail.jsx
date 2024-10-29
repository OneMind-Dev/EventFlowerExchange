import React, { useEffect } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import UserData from "../../../../components/config/userData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlowerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve flower ID from URL

  let flowerDetail = null;
  let eventDetail = null;
  let userDetail = null;

  // Find the specific flower, event, and user details based on the ID
  EventData.forEach((event) => {
    const flower = event.flowers.find((f) => f.flower_id === parseInt(id));
    if (flower) {
      flowerDetail = flower;
      eventDetail = event;
      userDetail = UserData.find((user) => user.user_id === event.user_id);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  if (!flowerDetail || !eventDetail) {
    return <h2>Flower not found</h2>;
  }

  const addToCart = () => {
    // Retrieve existing cart data from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Check if item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.flower_id === flowerDetail.flower_id);

    if (existingItemIndex === -1) {
      // Item does not exist, add it with quantity 1
      const newItem = { ...flowerDetail, quantity: 1 };
      cartItems.push(newItem);
      toast.success("Product added to cart!");
    } else {
      // Item exists, increment the quantity
      cartItems[existingItemIndex].quantity += 1;
      toast.info("Product quantity updated in cart!");
    }

    // Update sessionStorage with the modified cart
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
