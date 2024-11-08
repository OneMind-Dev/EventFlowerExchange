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
  const { relationshipID } = useParams(); // Retrieve relationshipID from URL
  const [flowerDetail, setFlowerDetail] = useState({});
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        const response = await api.get(`/${relationshipID}`);

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
