import React from 'react'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "../../components/admin/admin"

function Admin() {
    const users = [
        { username: 'jackcypher', fullname: 'Trieu Phu Thang', email: 'phuthang4444@gmail.com', status: true },
        { username: 'litteboy', fullname: 'Japanese Favours meteor', email: 'shadowjutsu@example.com', status: false },
        { username: 'nibba', fullname: 'black man', email: 'quyendanchu404@example.com', status: false }
    ];
    return (
        <div>
            <Header />
            <div className="admin-container">
                <h1 className="title">Users List</h1>
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr className="table-header">
                                <th>Username</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="table-row">
                                    <td>{user.username}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td className={`status ${user.status ? 'active' : 'inactive'}`}>
                                        {user.status ? 'Active' : 'Inactive'}
                                    </td>
                                    <td>
                                        <button className="action-btn">
                                            {user.status ? 'ban' : 'unban'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
