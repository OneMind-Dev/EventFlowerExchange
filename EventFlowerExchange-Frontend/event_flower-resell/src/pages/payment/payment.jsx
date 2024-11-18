import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "../../components/payment/payment.css"; // Ensure to import your CSS
import { Table, Button, Image, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

function Payment() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector((store) => store.user);
    console.log("user: ", user);

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCartItems);
        const total = storedCartItems.reduce((sum, item) => {
            console.log("item: ", item.quantity);
            const priceValue = typeof item.floPrice === 'string' ? item.floPrice : String(item.floPrice || 0);
            return sum + (parseFloat(priceValue.replace(/\./g, '').replace('đ', '')) * item.quantity);
        }, 0);
        setTotalPrice(total.toLocaleString() + 'đ'); // Format total price
    }, []);

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (src) => <Image width={50} src={src} alt="Flower Image" />,
        },
        { title: "Name", dataIndex: "flowername", key: "flowername" },
        { title: "Price (VND)", dataIndex: "floPrice", key: "floPrice" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const handleConfirmPayment = () => {
        toast.success("Thanh toán thành công!");
        sessionStorage.removeItem("cart"); // Clear cart after payment
        setCartItems([]);
        setTotalPrice('0đ'); // Reset total price to 0đ
    };

    const handlePaymentClick = () => {
        Modal.confirm({
            title: 'Xác nhận thanh toán',
            content: 'Bạn có chắc chắn muốn thanh toán?',
            onOk: handleConfirmPayment,
        });
    };

    const handleCancelPayment = () => {
        sessionStorage.removeItem("cart"); // Clear cart on cancel
        setCartItems([]);
        setTotalPrice('0đ'); // Reset total price to 0đ
        toast.info("Thanh toán đã bị hủy!"); // Notify the user
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
                    rowKey="flower_id"
                    pagination={false}
                    bordered
                />
                <h3 className="total-price">Tổng cộng: {totalPrice} VND</h3>
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
