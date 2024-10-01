import React from "react";
import Header from "../../../../components/header/header";
import EventData from "../../../../components/config/eventData";
import { useParams } from "react-router-dom";

const FlowerDetail = () => {
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
      <h1>{flowerDetail.flower_name}</h1>
      <p>{flowerDetail.description}</p>
      <p>Quantity: {flowerDetail.quantity}</p>
      <p>Price: ${flowerDetail.price}</p>

      <h2>Event Information</h2>
      <p>
        This flower is part of the event:{" "}
        <strong>{eventDetail.event_name}</strong>
      </p>
      <p>Event Description: {eventDetail.description}</p>
      <p>Event Start Date: {eventDetail.startDate}</p>
      <p>Event End Date: {eventDetail.endDate}</p>
    </>
  );
};

export default FlowerDetail;
