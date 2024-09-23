import "./home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
    </>
  );
};

export default Home;
