import React, { useState, useEffect } from 'react';

import '../App.css';
// import axios from 'axios';
import Cards from '../components/Card/Cards';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/HeroSection/HeroSection';

const Home = () => {
  
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);
 
  // const getNews  = (setNews) => {
  //   axios.get('https://bodega-back-end.herokuapp.com/api/getall').then((response) => {
  //       console.log(response.data);
  //       setNews(response.data);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // }

  /**
  * @description This function requests the data of all seasons
  */
  const getNews = () => {
    fetch('https://bodega-back-end.herokuapp.com/api/getall')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  return (
    <>
      <HeroSection/>
      <Cards/>
      <Footer/>
    </>
  );
}

export default Home;
