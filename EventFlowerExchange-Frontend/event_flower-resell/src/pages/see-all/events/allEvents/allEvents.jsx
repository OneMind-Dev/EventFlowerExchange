import React, { useState } from "react";
import "./allEvents.css";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../../components/config/axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await api.get("AllEvents");
      setEvents(response.data);
    } catch (e) {
      console.log("Error fetch product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2 className="wrapper__title-all">Tất Cả Sự Kiện</h2>
        <div className="wrapper__card-all">
          {events.map((event) => (
            <>
              <Card
                bordered={false}
                onClick={() => {
                  navigate(`/events/${event.eventId}`);
                }}
                key={event.evenId}
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
    </>
  );
};

export default Events;
