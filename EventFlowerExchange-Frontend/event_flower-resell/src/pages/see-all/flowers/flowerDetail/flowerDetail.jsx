import React, { useEffect, useState } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../components/config/axios";
import { useSelector } from "react-redux";

const FlowerDetail = () => {
  const navigate = useNavigate();
  const { relationshipID } = useParams(); // Retrieve relationshipID from URL
  const [flowerDetail, setFlowerDetail] = useState({});
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");

  // State to track the quantity of the product already added to the cart
  const [addedQuantity, setAddedQuantity] = useState(0);
  const maxQuantity = flowerDetail?.quantity; // Maximum quantity of the product available


  console.log("Event ID:", eventId);
  console.log("user:", user);

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      if (!user || !user.token) {
        toast.error("User not authenticated. Please log in.");
        return;
      }
      try {
        const response = await api.get(`GetFlowerEvent/${relationshipID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Use token from user object
          },
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
  }, [relationshipID, user]);


  if (!flowerDetail) {
    return <h2>Flower not found</h2>;
  }

  const addToCart = async () => {
    if (!user || !user.token) {
      toast.error("User not logged in. Please log in to add items to the cart.");
      return;
    }

    if (addedQuantity >= maxQuantity) {
      toast.error(`You cannot add more than ${maxQuantity} items to the cart.`);
      return; // Stop if the user tries to add more than the available quantity
    }

    try {
      const response = await api.post(
        `/addFlowerToCart/${user.userId}/${relationshipID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include token for authentication
          },
        }
      );
      console.log("Add to Cart Response:", response.status);
      if (response.status === 200) {
        setAddedQuantity((prevQuantity) => prevQuantity + 1); // Increment added quantity
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding product to cart.");
    }
  };

  // Reset added quantity when `flowerDetail` changes
  useEffect(() => {
    setAddedQuantity(0);
  }, [flowerDetail]);

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
