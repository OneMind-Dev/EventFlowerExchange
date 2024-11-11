import React, { useEffect, useState } from "react";
import { Table, Button, Image, InputNumber, Modal } from "antd";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import Header from "../../components/header/header";
import { toast } from 'react-toastify'; // Ensure you have toast notifications set up
import "./cart.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (src) => <Image width={50} src={src} alt="Flower Image" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "flowername",
      key: "flowername",
    },
    {
      title: "Giá (VND)",
      dataIndex: "floPrice",
      key: "floPrice",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div>
          <Button
            onClick={() => handleQuantityChange(quantity - 1, record.relationshipID)}
            disabled={quantity <= 1} // Disable decrease button if quantity is 1
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => handleQuantityChange(value, record.relationshipID)}
          />
          <Button
            onClick={() => handleQuantityChange(quantity + 1, record.relationshipID)}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleRemove(record.relationshipID)}>
          Xóa
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (newQuantity, relationshipID) => {
    // Update the cart item's quantity
    const updatedCartItems = cartItems.map(item =>
      item.relationshipID === relationshipID ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems); // Assuming setCartItems updates the state
  };

  const handleRemove = (id) => {
    // Log the product being removed
    const productToRemove = cartItems.find((item) => item.relationshipID === id);
    console.log("Product being removed:", productToRemove);
    // Remove the specific product by flower_id
    const updatedCart = cartItems.filter((item) => item.relationshipID !== id);
    // Update the state and session storage
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    // Notify the user
    toast.info("Sản phẩm đã được xóa khỏi giỏ hàng");
  };

  const handlePaymentClick = () => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems)); // Store cart items
    navigate('/payment'); // Navigate to payment page
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2>Giỏ hàng</h2>
        <Table dataSource={cartItems} columns={columns} rowKey="flower_id" />
        <Button className="pay-button" type="primary" onClick={handlePaymentClick}>
          Thanh toán
        </Button>
      </div>
    </>
  );
}

export default CartPage;
