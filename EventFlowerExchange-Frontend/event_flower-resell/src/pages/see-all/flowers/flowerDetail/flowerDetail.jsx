import React, { useEffect } from "react";
import "./flowerDetail.css";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";

const FlowerDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { id } = useParams(); // Lấy id của hoa từ URL
  let flowerDetail = null;
  let eventDetail = null;

  // Tìm hoa và sự kiện chứa hoa đó
  EventData.forEach((event) => {
    const flower = event.flowers.find((f) => f.flower_id === parseInt(id));
    if (flower) {
      flowerDetail = flower;
      eventDetail = event; // Sự kiện chứa hoa này
    }
  });

  if (!flowerDetail || !eventDetail) {
    return <h2>Flower not found</h2>;
  }

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="wrapper__flower-info">
          <Image
            className="wrapper__flower-info--img"
            src={flowerDetail.flower_image}
          />
          <div className="wrapper__flower-info-detail">
            <h1>{flowerDetail.flower_name}</h1>
            <h2>{flowerDetail.price} VND</h2>
            <p>Số lượng có sẵn: {flowerDetail.quantity}</p>
            <div className="wrapper__flower-info-detail--btn">
              <button className="wrapper__flower-info-detail--btn--buy">
                Mua
              </button>
              <button className="wrapper__flower-info-detail--btn--add">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
        <div className="wrapper__flower-des">
          <h2>Mô tả sản phẩm</h2>
          <p>{flowerDetail.description}</p>
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
        <div className="wrapper__flower--detail">
          <h3>SẢN PHẨM TRONG SỰ KIỆN</h3>
          <div className="wrapper__flower--detail-card">
            <>
              <Card
                bordered={false}
                onClick={() => {
                  navigate(`/events/${eventDetail.event_id}`);
                }}
                key={eventDetail.event_id}
                hoverable
                className="wrapper__card-card--event"
                cover={
                  <img
                    className="wrapper__card-img--event"
                    alt={eventDetail.event_name}
                    src={eventDetail.event_image}
                  />
                }
              >
                <Meta
                  className="wrapper__card-title--event"
                  title={eventDetail.event_name}
                />
              </Card>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerDetail;
