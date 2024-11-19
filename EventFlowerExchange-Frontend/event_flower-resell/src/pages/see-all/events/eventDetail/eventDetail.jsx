import React, { useState, useEffect } from "react";
import "./eventDetail.css";
import Header from "../../../../components/header/header";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import api from "../../../../components/config/axios";
import { useSelector } from "react-redux";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [flowers, setFlowers] = useState([]);
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

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/AllEvents");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await api.get(`/GetFlowerFromEvent/${eventId}`);
        if (response.data.code === 1000) {
          setFlowers(response.data.result);
        } else {
          console.log("Error fetching flowers:", response.data.message);
        }
      } catch (e) {
        console.log("fetchFlowers: ", e);
      }
    };
    fetchFlowers();
  }, [eventId]);

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
        {/* Event Info */}
        <div className="wrapper__event-info">
          <Image
            className="wrapper__event-info--img"
            src={event.image}
            alt={event.eventName}
          />
          <h2 className="wrapper__event-name">{event.eventName}</h2>
          <p className="wrapper__event-des">{event.description}</p>
        </div>

        {/* Shop Info */}
        <div className="wrapper__shop-info">
          <div className="wrapper__shop-info--img">
            <img src="../src/components/images/userImage.png" alt="Ảnh người bán" />
          </div>
          <div className="wrapper__shop-info--des">
            <h3>{username}</h3>
          </div>
        </div>

        {/* Flowers in Event */}
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
          <div className="wrapper__event--detail-card">
            {flowers.map((flower) => {
              // Log each flower object here for inspection
              console.log("flower:", flower);

              return (
                <Card
                  key={flower.relationshipID}
                  bordered={false}
                  hoverable
                  className="wrapper__card-card"
                  cover={
                    <img
                      className="wrapper__card-img"
                      alt={flower.flowername}
                      src={flower.image}
                    />
                  }
                  onClick={() => navigate(`/flowerDetails/${flower.relationshipID}?eventId=${event.eventId}`)}
                >
                  <Meta
                    className="wrapper__card-title"
                    title={flower.flowername}
                    description={`${flower.floPrice} VND`}
                  />
                </Card>
              );
            })}
          </div>
        </div>

        {/* Other Events */}
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
