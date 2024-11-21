import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "../../components/payment/payment.css"; // Ensure to import your CSS
import { Table, Button, Image, Modal, Checkbox } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../components/config/axios";

function Payment() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('vnpay'); // Default payment method
    const user = useSelector((store) => store.user);

    // Fetch cart items and total price
    useEffect(() => {
        if (user?.userId) {
            const fetchCartItems = async () => {
                try {
                    const response = await api.get(
                        `/GetCartItem/${user.userId}`,
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );
                    setCartItems(response.data || []);
                } catch (error) {
                    console.error("Failed to fetch cart items:", error);
                    message.error("Không thể tải thông tin giỏ hàng!");
                }
            };

            const fetchTotalPrice = async () => {
                try {
                    const response = await api.get(
                        `/GetShoppingCart/${user.userId}`,
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );
                    setTotalPrice(response.data?.result?.totalPrice || 0);
                } catch (error) {
                    console.error("Failed to fetch total price:", error);
                    message.error("Không thể tải tổng giá trị giỏ hàng!");
                }
            };

            fetchCartItems();
            fetchTotalPrice();
        }
    }, [user?.userId]);

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (src) => <img width={50} src={src} alt="Flower Image" />,
        },
        { title: "Name", dataIndex: "flowerName", key: "flowerName" },
        { title: "Price (VND)", dataIndex: "item_price", key: "item_price" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const handleConfirmPayment = async () => {
        try {
            // Call the "shipcode" API to create the order
            const orderResponse = await api.post(`/order/shipcode/${user.userId}`, {
                phone: user?.phone || "Chưa cập nhật",
                name: user?.username || "Chưa cập nhật",
                address: user?.address || "Chưa cập nhật",
            });

            if (orderResponse.data?.code === 1000) {
                const { orderId } = orderResponse.data.result;

                if (paymentMethod === 'vnpay') {
                    // VNPay Payment
                    const paymentResponse = await api.get(
                        `/payment/vn-pay/${orderId}?amount=${totalPrice}`,
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );

                    if (paymentResponse.data?.code === 200 && paymentResponse.data?.data?.paymentUrl) {
                        window.location.href = paymentResponse.data.data.paymentUrl;
                    } else {
                        message.error("Thanh toán bằng VNPay thất bại!");
                    }
                } else if (paymentMethod === 'cash') {
                    // Cash Payment
                    const cashResponse = await api.post(
                        `/order/cash/${orderId}`,
                        {},
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );
                    if (cashResponse.data?.code === 1000) {
                        message.success("Thanh toán bằng tiền mặt thành công!");
                        setCartItems([]);
                        setTotalPrice(0);

                        // Redirect to the success page
                        navigate('/payment/paymentSuccess');
                    } else {
                        message.error("Thanh toán bằng tiền mặt thất bại!");
                    }
                }
            } else {
                message.error("Không thể tạo đơn hàng!");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            message.error("Đã xảy ra lỗi trong quá trình thanh toán!");
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
        setTotalPrice(0);
        message.info("Thanh toán đã bị hủy!");
    };

    return (
        <>
            <Header />
            <div className="payment-page">
                <h2 className="payment-title">Trang thanh toán</h2>

                {/* User Information Section */}
                <div className="user-info">
                    <h3>Thông tin người dùng</h3>
                    <p><strong>Tên:</strong> {user?.username || 'Chưa cập nhật'}</p>
                    <p><strong>Số điện thoại:</strong> {user?.phone || 'Chưa cập nhật'}</p>
                    <p><strong>Địa chỉ:</strong> {user?.address || 'Chưa cập nhật'}</p>
                </div>

                <Table
                    dataSource={cartItems}
                    columns={columns}
                    rowKey="item_id"
                    pagination={false}
                    bordered
                />
                <h3 className="total-price">Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND</h3>

                <div className="payment-options">
                    <Checkbox
                        checked={paymentMethod === 'vnpay'}
                        onChange={() => setPaymentMethod('vnpay')}
                    >
                        Thanh toán bằng VNPay
                    </Checkbox>
                    <Checkbox
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                    >
                        Thanh toán bằng tiền mặt
                    </Checkbox>
                </div>

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
