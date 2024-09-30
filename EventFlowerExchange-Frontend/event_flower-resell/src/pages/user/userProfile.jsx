import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import '../../components/user/userProfile.css'
import { Form, Input, Button } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import FormItem from "antd/es/form/FormItem";


function UserProfile() {
    return (
        <>
            <Header />
            <div className='background'>
                <div className='user_container'>
                    <div className='user_infor'>
                        <FaCircleUser className='user_icon' />
                        <h2 className='username'>
                            Nibba
                        </h2>
                    </div>
                    <div className='user_interact'>
                        <h3 className='privateInfor'>
                            Hồ sơ cá nhân
                        </h3>
                        <p>
                            Thay đổi mật khẩu
                        </p>
                        <p>
                            Đơn hàng
                        </p>
                    </div>
                </div>
                <div className='infor_container'>
                    <h1>
                        Thông tin cá nhân
                    </h1>
                    <p>
                        Tên tài khoản
                        <FormItem
                            className="input-box"
                            name="username"
                        >
                            <Input className="input" type="text" placeholder="" />
                        </FormItem>
                    </p>
                    <p>
                        Họ và tên
                    </p>
                    <p>
                        Số điện thoại
                    </p>
                    <p>
                        Email
                    </p>
                    <p>
                        Địa chỉ
                    </p>
                </div>
            </div >
            <Footer />
        </>
    );
}

export default UserProfile;
