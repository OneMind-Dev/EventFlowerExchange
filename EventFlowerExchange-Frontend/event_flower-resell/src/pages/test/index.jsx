import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";

function Test() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div>
      {user == null ? (
        <>
          <button>Login</button>
        </>
      ) : (
        <div>
          <h1>Welcome {user?.email}</h1>
          <label htmlFor="">Phone :{user?.phone}</label>
          <br />
          <label htmlFor="">Username :{user?.username}</label>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Test;
