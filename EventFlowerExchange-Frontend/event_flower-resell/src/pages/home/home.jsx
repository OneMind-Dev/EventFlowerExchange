import "./home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <Footer></Footer>
    </>
  );
};

export default Home;
