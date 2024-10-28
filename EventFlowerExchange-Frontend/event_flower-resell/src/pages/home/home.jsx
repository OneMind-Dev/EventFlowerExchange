import "./home.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import EventData from "../../components/config/eventData";

import Footer from "../../components/footer/footer";
import api from "../../components/config/axios";
import { ToastContainer } from "react-toastify";
const Home = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const fetchEvent = async () => {
    const response = await api.get("/AllEvents");

    console.log(response.data);
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  // Lấy tất cả các hoa từ tất cả sự kiện
  const allFlowers = EventData.flatMap((event) => event.flowers);

  // Chọn ngẫu nhiên 4 hoa
  const randomFlowers = allFlowers
    .sort(() => 0.5 - Math.random()) // Shuffle mảng
    .slice(0, 4); // Lấy 4 phần tử đầu tiên sau khi shuffle

  return (
    <>
      <Header />
      <ToastContainer /> {/* Toast container for notifications */}

      <div className="wrapper">
        <div className="wrapper__poster">
          <img
            className="wrapper__poster-img"
            src="src/components/images/poster1.jpg"
            alt=""
          />
        </div>

        <div className="wrapper__title">
          <h3>CÁC HOA ĐANG BÁN</h3>
        </div>
        <div className="wrapper__card">
          {randomFlowers.map((flower) => (
            <>
              <Card
                bordered={false}
                onClick={() => {
                  navigate(`/flowers/${flower.flower_id}`);
                }}
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
        <div className="wrapper__all">
          <button
            onClick={() => {
              navigate("/flowers");
            }}
            className="wrapper__all-btn"
          >
            Xem Tất Cả
          </button>
        </div>

        <div className="wrapper__title">
          <h3>CÁC HOA SẮP ĐƯỢC BÁN</h3>
        </div>
        <div className="wrapper__card">
          <Card
            hoverable
            className="wrapper__card-card"
            cover={
              <img
                className="wrapper__card-img"
                alt="flower"
                src="src/components/images/flower.jpg"
              />
            }
          >
            <Meta
              className="wrapper__card-title"
              title="Hoa Tình Yêu"
              description="300.000 đ"
            />
          </Card>

          <Card
            hoverable
            className="wrapper__card-card"
            cover={
              <img
                className="wrapper__card-img"
                alt="flower"
                src="src/components/images/flower.jpg"
              />
            }
          >
            <Meta
              className="wrapper__card-title"
              title="Hoa Tình Yêu"
              description="300.000 đ"
            />
          </Card>

          <Card
            hoverable
            className="wrapper__card-card"
            cover={
              <img
                className="wrapper__card-img"
                alt="flower"
                src="src/components/images/flower.jpg"
              />
            }
          >
            <Meta
              className="wrapper__card-title"
              title="Hoa Tình Yêu"
              description="300.000 đ"
            />
          </Card>

          <Card
            hoverable
            className="wrapper__card-card"
            cover={
              <img
                className="wrapper__card-img"
                alt="flower"
                src="src/components/images/flower.jpg"
              />
            }
          >
            <Meta
              className="wrapper__card-title"
              title="Hoa Tình Yêu"
              description="300.000 đ"
            />
          </Card>
        </div>
        <div className="wrapper__all">
          <button className="wrapper__all-btn">Xem Tất Cả</button>
        </div>

        <div className="wrapper__title">
          <h3>SỰ KIỆN</h3>
        </div>
        <div className="wrapper__card">
          {events.slice(0, 2).map((event) => (
            <>
              <Card
                onClick={() => {
                  navigate(`/events/${event.eventId}`);
                }}
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

        <div className="wrapper__all">
          <button
            onClick={() => {
              navigate("/events");
            }}
            className="wrapper__all-btn"
          >
            Xem Tất Cả
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
