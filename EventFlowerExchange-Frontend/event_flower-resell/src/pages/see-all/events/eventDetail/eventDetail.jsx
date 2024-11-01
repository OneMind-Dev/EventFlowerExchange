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
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/SelectEvent/${eventId}`);
        setEvent(response.data);
      } catch (e) {
        console.log("fetchEvent: ", e);
      }
    };

    fetchEvent();
  }, [eventId]);

  const fetchEvents = async () => {
    const response = await api.get("/AllEvents");

    console.log("Response.data: ", response.data);
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (event && event.userId) {
        try {
          const response = await api.get(`/users/${event.userId}`);
          setUsername(response.data.username);
        } catch (e) {
          console.log("fetchUsername: ", e);
        }
      }
    };

    fetchUsername();
  }, [event]);

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
              src="../src/components/images/userImage.png"
              alt="Ảnh người bán"
            // onClick={() => navigate(`/${user.user_id}`)}
            />
          </div>
          <div className="wrapper__shop-info--des">
            <h3>
              {username}
              {console.log("event username: ", username)}
            </h3>
          </div>
        </div>

        <div className="wrapper__event--detail">
          <h3>SẢN PHẨM CÓ TRONG SỰ KIỆN</h3>

          {event.userId === user.userId && (
            <button
              className="add-new-flower-btn"
              onClick={() => navigate(`/addFlowerToEvent/${event.eventId}`)}
            >
              Thêm Hoa
            </button>
          )}
          {/* Uncomment the following block to display event flowers */}
          {/* 
          <div className="wrapper__event--detail-card">
            {event.flowers.map((flower) => (
              <Card
                key={flower.flower_id}
                bordered={false}
                hoverable
                className="wrapper__card-card"
                cover={
                  <img
                    className="wrapper__card-img"
                    alt={flower.flower_name}
                    src={flower.flower_image}
                  />
                }
                onClick={() => navigate(`/flowers/${flower.flower_id}`)}
              >
                <Meta
                  className="wrapper__card-title"
                  title={flower.flower_name}
                  description={flower.price}
                />
              </Card>
            ))}
          </div>
          */}
        </div>

        <div className="wrapper__event--other">
          <h3>CÁC SỰ KIỆN KHÁC</h3>
          <div className="wrapper__event--other-card">
            {events.slice(0, 2).map((event) => (
              <Card
                key={event.eventId}
                bordered={false}
                hoverable
                className="wrapper__card-card--event"
                cover={
                  <img
                    className="wrapper__card-img--event"
                    alt={event.eventName}
                    src={event.image}
                  />
                }
                onClick={() => navigate(`/events/${event.eventId}`)}
              >
                <Meta className="wrapper__card-title--event" title={event.eventName} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );

};

export default EventDetail;
