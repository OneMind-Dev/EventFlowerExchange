import React from 'react';
import "./payment.css";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function paymentSuccess() {
    return (
        <div>
            <Header />
            <div className="payment-success">
                <div className="checkmark"></div>
                <div className="success-text">Thanh toán thành công</div>
            </div>
            <Footer />
        </div>
    );
}

export default paymentSuccess;
