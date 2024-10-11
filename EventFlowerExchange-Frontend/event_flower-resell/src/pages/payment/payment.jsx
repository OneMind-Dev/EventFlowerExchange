import React, { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "../../components/payment/payment.css";
import flowerImg from '../../components/images/flower.jpg';

function Payment() {
    const [isConfirming, setIsConfirming] = useState(false);

    const cartItems = [
        { id: 1, image: flowerImg, name: 'Hoa hồng', quantity: 2, price: '20.000đ' },
        { id: 2, image: flowerImg, name: 'Hoa tulip', quantity: 1, price: '15.000đ' }
    ];

    const totalPrice = '35.000đ';

    // Function to handle payment click
    const handlePaymentClick = () => {
        setIsConfirming(true);
    };

    // Function to handle cancel button
    const handleCancelClick = () => {
        setIsConfirming(false);
    };

    const handleConfirmPayment = () => {
        // Logic for confirming payment goes here
        alert("Thanh toán thành công!");
        setIsConfirming(false);
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <h2 className='payment-title'>Payment Page</h2>
                <div className='buyer-info'>
                    <h3>Thông tin người mua</h3>
                    <p><strong>Tên:</strong> Đóm chúa</p>
                    <p><strong>Địa chỉ:</strong> 97 No son, Quận bỏ con, Phường ăn cháo đá bát</p>
                    <p><strong>Sđt:</strong> 05011</p>
                </div>
                <div className='cart-items'>
                    <h3>Giỏ hàng</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='total'>
                    <h3>Tổng giá: {totalPrice}</h3>
                </div>
                <div className='button-group'>
                    <button className='payment-button' onClick={handlePaymentClick}>Thanh toán</button>
                    <button className='cancel-button' onClick={handleCancelClick}>Hủy</button>
                </div>
            </div>

            {isConfirming && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Xác nhận thanh toán</h3>
                        <p>Bạn có chắc chắn muốn thanh toán?</p>
                        <button className='confirm-button' onClick={handleConfirmPayment}>Xác nhận</button>
                        <button className='cancel-button' onClick={handleCancelClick}>Hủy</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Payment;
