import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../../components/user/userProfile.css';
import { Form, Input, Button } from "antd";
import { FaCircleUser } from "react-icons/fa6";

function UserProfile() {
    return (
        <>
            <Header />
            <div className='background'>
                <div className='user_container'>
                    <div className='user_infor'>
                        <FaCircleUser className='user_icon' />
                        <h2 className='username'>Nibba</h2>
                    </div>
                    <div className='user_interact'>
                        <h3 className='privateInfor'>Hồ sơ cá nhân</h3>
                        <p>Thay đổi mật khẩu</p>
                        <p>Đơn hàng</p>
                    </div>
                </div>
                <div className='infor_container'>
                    <h1>Thông tin cá nhân</h1>
                    <Form layout="vertical">
                        <div className="form-item">
                            <label htmlFor="username">Tên tài khoản</label>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </div>
                        <div className="form-item">
                            <label htmlFor="fullname">Họ và tên</label>
                            <Form.Item
                                name="fullname"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </div>
                        <div className="form-item">
                            <label htmlFor="phone">Số điện thoại</label>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </div>
                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </div>
                        <div className="form-item">
                            <label htmlFor="address">Địa chỉ</label>
                            <Form.Item
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input className='address' placeholder="" />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button className='submit-button' type="primary" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserProfile;
