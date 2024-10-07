import React from "react";
import "./allEvents.css";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Events = () => {
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
          {EventData.map((event) => (
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
    </>
  );
};

export default Events;
