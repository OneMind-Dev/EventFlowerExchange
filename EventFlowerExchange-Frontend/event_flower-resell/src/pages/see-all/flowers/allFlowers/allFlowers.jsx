import React, { useEffect } from "react";
import "./allFlowers.css";
import EventData from "../../../../components/config/eventData";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Header from "../../../../components/header/header";
import { useNavigate } from "react-router-dom";

const Flowers = () => {
  const navigate = useNavigate();
  const allFlowers = EventData.flatMap((event) => event.flowers);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2 className="wrapper__title-all">Tất Cả Hoa</h2>
        <div className="wrapper__card-all">
          {allFlowers.map((flower) => (
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
    </>
  );
};

export default Flowers;
