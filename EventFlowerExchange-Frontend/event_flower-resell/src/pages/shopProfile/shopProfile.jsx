import "./shopProfile.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import EventData from "../../components/config/eventData";
import UserData from "../../components/config/userData";
import Header from "../../components/header/header";
import { Card, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Meta from "antd/es/card/Meta";
import { useEffect } from "react";

const ShopProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const user = UserData.find((user) => user.user_id === parseInt(id));
  const navigate = useNavigate();

  if (!user) {
    return <h2>User not found</h2>;
  }

  const userEvents = EventData.filter(
    (event) => event.user_id === user.user_id
  );

  const userFlowers = userEvents.flatMap((event) => event.flowers);

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
          <div className="wrapper__shop--location">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{user.address}</p>
          </div>
          <div className="wrapper__shop--check">
            <FontAwesomeIcon icon={faUserCheck} />
            <p>Đã tham gia: </p>
          </div>
        </div>

        <div className="wrapper__flower--detail">
          <h3>TẤT CẢ SỰ KIỆN</h3>
          <div className="wrapper__flower--detail-card">
            {userEvents.map((event) => (
              <>
                <Card
                  bordered={false}
                  onClick={() => {
                    navigate(`/events/${event.event_id}`);
                  }}
                  key={event.event_id}
                  hoverable
                  className="wrapper__card-card--event"
                  cover={
                    <img
                      className="wrapper__card-img--event"
                      alt={event.event_name}
                      src={event.event_image}
                    />
                  }
                >
                  <Meta
                    className="wrapper__card-title--event"
                    title={event.event_name}
                  />
                </Card>
              </>
            ))}
          </div>
        </div>

        <div className="wrapper__event--detail">
          <h3>TẤT CẢ CÁC HOA</h3>
          <div className="wrapper__event--detail-card">
            {userFlowers.map((flower) => (
              <>
                <Card
                  bordered={false}
                  onClick={() => {
                    navigate(`/flowers/${flower.flower_id}`);
                  }}
                  key={flower.flower_id}
                  hoverable
                  className="wrapper__card-card"
                  cover={
                    <img
                      className="wrapper__card-img"
                      alt={flower.flower_name}
                      src={flower.flower_image}
                    />
                  }
                >
                  <Meta
                    className="wrapper__card-title"
                    title={flower.flower_name}
                    description={flower.price}
                  />
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProfile;
