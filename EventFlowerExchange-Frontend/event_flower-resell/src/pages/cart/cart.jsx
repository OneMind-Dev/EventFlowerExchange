import React, { useEffect, useState } from "react";
import { Table, Button, Image, InputNumber, Modal } from "antd";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import Header from "../../components/header/header";
import { toast } from 'react-toastify'; // Ensure you have toast notifications set up
import "./cart.css";
import { useSelector } from "react-redux";
import api from "../../components/config/axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);  // Get user info from Redux store

  useEffect(() => {
    if (user.userId) {
      const fetchCartItems = async () => {
        try {
          const response = await api.get(`GetCartItem/${user.userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setCartItems(response.data); // Cập nhật lại giỏ hàng khi có sự thay đổi
        } catch (error) {
          toast.error("Failed to load cart items.");
        }
      };
      fetchCartItems();
    }
  }, [cartItems, user]);  // Trigger lại mỗi khi giỏ hàng thay đổi

  const confirmDeletion = (itemId) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa sản phẩm này không?',
      onOk: () => handleQuantityChange(0, itemId), // Set quantity to 0 if confirmed
      onCancel: () => handleQuantityChange(1, itemId), // Set quantity back to 1 if canceled
    });
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (src) => <Image width={50} src={src} alt="Flower Image" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "flowerName",
      key: "flowerName",
    },
    {
      title: "Giá (VND)",
      dataIndex: "item_price",
      key: "item_price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div>
          <Button
            onClick={() => {
              if (quantity <= 1) {
                confirmDeletion(record.item_id); // Show confirmation when decreasing quantity below 1
              } else {
                handleQuantityChange(quantity - 1, record.item_id);
              }
            }}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => handleQuantityChange(value, record.item_id)}
          />
          <Button
            onClick={() => handleQuantityChange(quantity + 1, record.item_id)}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => confirmDeletion(record.item_id)} // Show confirmation when "Xóa" button is clicked
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleQuantityChange = async (newQuantity, itemId) => {
    try {
      // Send a PUT request to update the quantity of the product in the cart
      const response = await api.post(
        `/updateCart/${user.userId}`, // Use userId from Redux store
        [{ quantity: newQuantity, itemId }], // Send an array of the object with quantity and itemId
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.data.code == 1000) {
        // Update local cart state with the new quantity
        const updatedCartItems = cartItems.map(item =>
          item.item_id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        toast.success("Số lượng giỏ hàng đã được cập nhật.");
      } else {
        console.log("response.data: ", response.data);
        toast.warning("Không thể cập nhật số lượng.");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật số lượng.");
    }
  };

  const handlePaymentClick = () => {
    navigate("/payment");
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2>Giỏ hàng</h2>
        <Table dataSource={cartItems} columns={columns} rowKey="item_id" />
        <Button className="pay-button" type="primary" onClick={handlePaymentClick}>
          Thanh toán
        </Button>
      </div>
    </>
  );
}

export default CartPage;