import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "../../components/payment/payment.css"; // Ensure to import your CSS
import { Table, Button, Image, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/axios";

function Payment() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector((store) => store.user);
    console.log("user: ", user);

    // Fetch cart items
    useEffect(() => {
        if (user?.userId) {
            const fetchCartItems = async () => {
                try {
                    const response = await api.get(
                        `/GetCartItem/${user.userId}`,
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );
                    console.log("cart items: ", response.data);
                    const data = response.data || [];
                    setCartItems(data);
                } catch (error) {
                    console.error("Failed to fetch cart items:", error);
                    toast.error("Không thể tải thông tin giỏ hàng!");
                }
            };

            const fetchTotalPrice = async () => {
                try {
                    const response = await api.get(
                        `/GetShoppingCart/${user.userId}`,
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );
                    console.log("shopping cart: ", response.data);
                    if (response.data?.code === 1000 && response.data?.result) {
                        setTotalPrice(response.data.result.totalPrice || 0);
                    } else {
                        setTotalPrice(0);
                    }
                } catch (error) {
                    console.error("Failed to fetch total price:", error);
                    toast.error("Không thể tải tổng giá trị giỏ hàng!");
                }
            };

            fetchCartItems();
            fetchTotalPrice();
        }
    }, [user?.userId]);


    const columns = [
        {
            title: "Image",
            dataIndex: "flower_image",
            key: "flower_image",
            render: (src) => <Image width={50} src={src} alt="Flower Image" />,
        },
        { title: "Name", dataIndex: "flowerName", key: "flowerName" },
        { title: "Price (VND)", dataIndex: "item_price", key: "item_price" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const handleConfirmPayment = async () => {
        try {
            // Call the "shipcode" API
            const orderResponse = await api.post(`/order/shipcode/${user.userId}`, {
                phone: user?.phone || "Chưa cập nhật",
                name: user?.username || "Chưa cập nhật",
                address: user?.address || "Chưa cập nhật",
            });

            if (orderResponse.data?.code === 1000) {
                const { orderId } = orderResponse.data.result;
                console.log("orderId: ", orderId);

                // Call the "payment" API
                const paymentResponse = await api.get(
                    `/payment/vn-pay/${orderId}?amount=${totalPrice}`,
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );

                if (paymentResponse.data?.code === 200 && paymentResponse.data?.data?.paymentUrl) {
                    console.log("Redirecting to: ", paymentResponse.data.data.paymentUrl);
                    // Redirect user to the payment URL
                    window.location.href = paymentResponse.data.data.paymentUrl;
                } else {
                    toast.error("Thanh toán thất bại!");
                }
            } else {
                toast.error("Không thể tạo đơn hàng!");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast.error("Đã xảy ra lỗi trong quá trình thanh toán!");
        }
    };


    const handlePaymentClick = () => {
        Modal.confirm({
            title: 'Xác nhận thanh toán',
            content: 'Bạn có chắc chắn muốn thanh toán?',
            onOk: handleConfirmPayment,
        });
    };

    const handleCancelPayment = () => {
        sessionStorage.removeItem("cart");
        setCartItems([]);
        setTotalPrice('0đ');
        toast.info("Thanh toán đã bị hủy!");
    };

    return (
        <>
            <Header />
            <div className="payment-page">
                <h2 className="payment-title">Trang thanh toán</h2>
                <Table
                    dataSource={cartItems}
                    columns={columns}
                    rowKey="item_id"
                    pagination={false}
                    bordered
                />
                <h3 className="total-price">Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND</h3>

                <div className="button-group">
                    <Button
                        className="payment-button"
                        type="primary"
                        onClick={handlePaymentClick}
                    >
                        Thanh toán
                    </Button>
                    <Button
                        className="cancel-button"
                        type="default"
                        onClick={handleCancelPayment}
                    >
                        Hủy thanh toán
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Payment;
