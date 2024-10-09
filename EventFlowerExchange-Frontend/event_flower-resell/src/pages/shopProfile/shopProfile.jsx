import "./shopProfile.css";
import { useParams, Link } from "react-router-dom";
import EventData from "../../components/config/eventData";
import UserData from "../../components/config/userData";
import Header from "../../components/header/header";
import { Image } from "antd";

const ShopProfile = () => {
  const { id } = useParams();
  const user = UserData.find((user) => user.user_id === parseInt(id));

  if (!user) {
    return <h2>User not found</h2>;
  }

  const userEvents = EventData.filter(
    (event) => event.user_id === user.user_id
  );

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="wrapper__shop">
          <Image
            className="wrapper__shop-img"
            src="../src/components/images/userPoster.jpg"
            alt=""
          />
          <div className="wrapper__shop-detail">
            <div className="wrapper__shop-detail--img">
              <img src={user.avatar} alt="avatar" />
            </div>
            <div className="wrapper__shop-detail--profile">
              <h3>{user.username}</h3>
              <p>Đánh giá</p>
            </div>
          </div>
        </div>

        <h1>{user.username}</h1>
        <img src={user.avatar} alt={user.username} style={{ width: "150px" }} />
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>

        <h3>Events by {user.username}:</h3>
        <ul>
          {userEvents.map((event) => (
            <li key={event.event_id}>
              <Link to={`/event/${event.event_id}`}>
                <h4>{event.event_name}</h4>
                <img
                  src={event.event_image}
                  alt={event.event_name}
                  style={{ width: "200px" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ShopProfile;
