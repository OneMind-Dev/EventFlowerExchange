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
    // Load cart items from sessionStorage when component mounts
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "flower_image",
      key: "flower_image",
      render: (src) => <Image width={50} src={src} alt="Flower Image" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "flower_name",
      key: "flower_name",
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={0}
          value={quantity}
          onChange={(value) => handleQuantityChange(value, record.flower_id)}
        />
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleRemove(record.flower_id)}>
          Xóa
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (value, id) => {
    if (value < 0) return; // Prevent negative quantities

    const updatedCart = cartItems.map((item) => {
      if (item.flower_id === id) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    // Check if quantity is zero and prompt user
    if (value === 0) {
      confirmRemoval(id);
    }
  };

  const confirmRemoval = (id) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      onOk: () => handleRemove(id),
      onCancel() { },
    });
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.flower_id !== id);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
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
        <Table dataSource={cartItems} columns={columns} rowKey="flower_id" pagination={false} />
        <Button className="pay-button" type="primary" onClick={handlePaymentClick}>
          Thanh toán
        </Button>
      </div>
    </>
  );
}

export default CartPage;
