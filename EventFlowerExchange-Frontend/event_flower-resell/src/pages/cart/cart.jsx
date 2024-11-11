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
    console.log("Products in cart:", storedCartItems); // Log the cart items when the page loads
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

    // Update cart items with new quantity
    const updatedCart = cartItems.map((item) => {
      if (item.flower_id === id) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    // If the quantity is set to 0, ask for removal
    if (value === 0) {
      console.log(`Product selected for removal: ${id}`); // Log the selected product's id
      confirmRemoval(id);  // Call to confirm removal only if quantity is 0
    }
  };

  const confirmRemoval = (id) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      onOk: () => {
        console.log(`Confirmed removal of product with id: ${id}`); // Log when removal is confirmed
        handleRemove(id);  // Proceed with removal if confirmed
      },
      onCancel() {
        console.log("Removal canceled"); // Log if the removal is canceled
      }
    });
  };

  const handleRemove = (id) => {
    // Log the product being removed
    const productToRemove = cartItems.find(item => item.flower_id === id);
    console.log("Product being removed:", productToRemove);

    // Remove the specific product by flower_id using the callback form of setCartItems
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter((item) => item.flower_id !== id);

      // Update session storage
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));

      // Notify the user
      toast.info("Sản phẩm đã được xóa khỏi giỏ hàng");

      return updatedCart;  // Return the updated state
    });
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
