import React from "react";
import "./eventDetail.css";
import Header from "../../../../components/header/header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EventData from "../../../../components/config/eventData";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect } from "react";

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id của sự kiện từ URL
  const event = EventData.find((event) => event.event_id === parseInt(id)); // Tìm sự kiện theo id1
  const displayedEvents = EventData.slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="wrapper__event-info">
          <Image
            className="wrapper__event-info--img"
            src={event.event_image}
            alt={event.event_name}
          />
          <h2 className="wrapper__event-name">{event.event_name}</h2>
          <p className="wrapper__event-des">{event.description}</p>
        </div>

        <div className="wrapper__shop-info">
          <div className="wrapper__shop-info--img">
            <img
              src="../src/components/images/userImage.png"
              alt="user image"
            />
          </div>
          <div className="wrapper__shop-info--des">
            <h3>Shop chuyên hoa cũ</h3>
          </div>
        </div>

        <div className="wrapper__event--detail">
          <h3>SẢN PHẨM TRONG SỰ KIỆN</h3>
          <div className="wrapper__event--detail-card">
            {event.flowers.map((flower) => (
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

        <div className="wrapper__event--other">
          <h3>CÁC SỰ KIỆN KHÁC</h3>
          <div className="wrapper__event--other-card">
            {displayedEvents.map((event) => (
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
      </div>
    </>
  );
};

export default EventDetail;
