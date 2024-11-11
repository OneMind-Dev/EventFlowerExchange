import React, { useEffect, useState } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import UserData from "../../../../components/config/userData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../components/config/axios";

const FlowerDetail = () => {
  const { relationshipID } = useParams(); // Get relationshipID from the URL
  const [flowerDetail, setFlowerDetail] = useState(null); // State for flower details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlowerDetail = async () => {
      try {
        // Fetch flower details from API with Authorization header
        const response = await api.get(`/${relationshipID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFlowerDetail(response.data); // Set flower details in state
      } catch (error) {
        console.error("Failed to fetch flower details:", error);
        message.error("Failed to fetch flower details");
        navigate("/error"); // Redirect to an error page if needed
      }
    };

    fetchFlowerDetail(); // Call the function
  }, [relationshipID, navigate]);

  if (!flowerDetail) {
    return <p>Loading...</p>; // Display loading state while data is being fetched
  }

  const addToCart = (flowerDetail) => {
    // Lấy giỏ hàng hiện tại từ sessionStorage
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(item => item.flower_id === flowerDetail.flower_id);

    if (existingItemIndex !== -1) {
      // Nếu có rồi, tăng số lượng
      cart[existingItemIndex].quantity += 1;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      cart.push({
        flower_id: flowerDetail.flower_id,
        flower_name: flowerDetail.flowername,
        flower_image: flowerDetail.image,
        flower_price: flowerDetail.floPrice,
        quantity: 1
      });
    }

    // Lưu lại giỏ hàng vào sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật lại state giỏ hàng (nếu cần)
    setCartItems(cart);
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
              onClick={() => navigate(`/event/${flowerDetail.relationshipID}`)}
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
