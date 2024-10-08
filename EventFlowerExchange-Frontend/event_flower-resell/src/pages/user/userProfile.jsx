import React, { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../../components/user/userProfile.css';
import { Form, Input, Button } from "antd";
import { FaCircleUser } from "react-icons/fa6";

function UserProfile() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [editingField, setEditingField] = useState(null); // Track which field is being edited
    const [form] = Form.useForm();

    const handleEdit = (field) => {
        setEditingField(field); // Set the field to edit
    };

    const handleSave = (field) => {
        form.validateFields([field])
            .then((values) => {
                console.log(`Saved ${field}:`, values[field]);
                setEditingField(null); // Stop editing after saving
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setEditingField(null); // Cancel editing
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result); // Update avatarUrl with the new image
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <>
            <Header />
            <div className='background'>
                <div className='user_container'>
                    <div className='user_infor'>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="User Avatar" className='user_avatar' />
                        ) : (
                            <FaCircleUser className='user_icon' />
                        )}
                        <a className='username' onClick={triggerFileInput}>Thay đổi ảnh</a>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='user_interact'>
                        <h3 className='privateInfor'>Hồ sơ cá nhân</h3>
                        <p>Thay đổi mật khẩu</p>
                        <p>Đơn hàng</p>
                    </div>
                </div>
                <div className='infor_container'>
                    <h1>Thông tin cá nhân</h1>
                    <Form layout="vertical" form={form}>
                        {/* Username */}
                        <div className="form-item">
                            <label htmlFor="username">Tên tài khoản</label>
                            {editingField === 'username' ? (
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                                >
                                    <Input placeholder="Tên tài khoản" />
                                </Form.Item>
                            ) : (
                                <p>{form.getFieldValue('username') || 'Moon'}</p>
                            )}
                            {editingField === 'username' ? (
                                <>
                                    <Button type="primary" onClick={() => handleSave('username')}>Lưu</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </>
                            ) : (
                                <Button className="edit-button" onClick={() => handleEdit('username')}>Thay đổi</Button>
                            )}
                        </div>
                        {/* Full Name */}
                        <div className="form-item">
                            <label htmlFor="fullname">Họ và tên</label>
                            {editingField === 'fullname' ? (
                                <Form.Item
                                    name="fullname"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                            ) : (
                                <p>{form.getFieldValue('fullname') || 'Triệu Phú Moon'}</p>
                            )}
                            {editingField === 'fullname' ? (
                                <>
                                    <Button type="primary" onClick={() => handleSave('fullname')}>Lưu</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </>
                            ) : (
                                <Button className="edit-button" onClick={() => handleEdit('fullname')}>Thay đổi</Button>
                            )}
                        </div>
                        {/* Phone */}
                        <div className="form-item">
                            <label htmlFor="phone">Số điện thoại</label>
                            {editingField === 'phone' ? (
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>
                            ) : (
                                <p>{form.getFieldValue('phone') || 'Meow'}</p>
                            )}
                            {editingField === 'phone' ? (
                                <>
                                    <Button type="primary" onClick={() => handleSave('phone')}>Lưu</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </>
                            ) : (
                                <Button className="edit-button" onClick={() => handleEdit('phone')}>Thay đổi</Button>
                            )}
                        </div>
                        {/* Email */}
                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            {editingField === 'email' ? (
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                            ) : (
                                <p>{form.getFieldValue('email') || 'MyMoon@meow.com'}</p>
                            )}
                            {editingField === 'email' ? (
                                <>
                                    <Button type="primary" onClick={() => handleSave('email')}>Lưu</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </>
                            ) : (
                                <Button className="edit-button" onClick={() => handleEdit('email')}>Thay đổi</Button>
                            )}
                        </div>
                        {/* Address */}
                        <div className="form-item">
                            <label htmlFor="address">Địa chỉ</label>
                            {editingField === 'address' ? (
                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input className='address' placeholder="Địa chỉ" />
                                </Form.Item>
                            ) : (
                                <p>{form.getFieldValue('address') || '338/41'}</p>
                            )}
                            {editingField === 'address' ? (
                                <>
                                    <Button type="primary" onClick={() => handleSave('address')}>Lưu</Button>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </>
                            ) : (
                                <Button className="edit-button" onClick={() => handleEdit('address')}>Thay đổi</Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserProfile;
