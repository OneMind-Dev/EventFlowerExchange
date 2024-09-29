import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import '../../components/user/userProfile.css'
import { FaCircleUser } from "react-icons/fa6";


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
            </div >
            <Footer />
        </>
    );
}

export default UserProfile;
