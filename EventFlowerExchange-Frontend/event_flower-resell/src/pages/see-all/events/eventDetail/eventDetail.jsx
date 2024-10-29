import React, { useState } from "react";
import "./eventDetail.css";
import Header from "../../../../components/header/header";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect } from "react";
import api from "../../../../components/config/axios";
import { useSelector } from "react-redux";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/SelectEvent/${eventId}`);
        setEvent(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchEvent();
  }, [eventId]);

  const fetchEvents = async () => {
    const response = await api.get("/AllEvents");

    console.log(response.data);
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (!event) {
    return <h1>Không có sự kiện này!</h1>;
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="wrapper__event-info">
          <Image
            className="wrapper__event-info--img"
            src={event.image}
            alt={event.eventName}
          />
          <h2 className="wrapper__event-name">{event.eventName}</h2>
          <p className="wrapper__event-des">{event.description}</p>
        </div>

        <div className="wrapper__shop-info">
          <div className="wrapper__shop-info--img">
            <img
              // onClick={() => {
              //   navigate(`/${user.user_id}`);
              // }}
              src="../src/components/images/userImage.png"
              alt="Ảnh người bán"
            />
          </div>

          <div className="wrapper__shop-info--des">
            <h3
            // onClick={() => {
            //   navigate(`/${user.user_id}`);
            // }}
            >
              {event.user.username}
            </h3>
          </div>
        </div>

        <div className="wrapper__event--detail">
          <h3>SẢN PHẨM CÓ TRONG SỰ KIỆN</h3>
          {event.user.userId === user.userId && (
            <button
              className="add-new-flower-btn"
              onClick={() => navigate(`/addFlowerToEvent/${event.eventId}`)}
            >
              Thêm Hoa
            </button>
          )}
          {/* <div className="wrapper__event--detail-card">
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
          </div> */}
        </div>

        <div className="wrapper__event--other">
          <h3>CÁC SỰ KIỆN KHÁC</h3>
          <div className="wrapper__event--other-card">
            {events.slice(0, 2).map((event) => (
              <>
                <Card
                  bordered={false}
                  onClick={() => {
                    navigate(`/events/${event.eventId}`);
                  }}
                  key={event.eventId}
                  hoverable
                  className="wrapper__card-card--event"
                  cover={
                    <img
                      className="wrapper__card-img--event"
                      alt={event.eventName}
                      src={event.image}
                    />
                  }
                >
                  <Meta
                    className="wrapper__card-title--event"
                    title={event.eventName}
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
