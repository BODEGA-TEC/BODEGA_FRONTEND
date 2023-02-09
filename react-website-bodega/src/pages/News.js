import '../App.css';
import React, { useState, useEffect } from 'react';
// import Text from '../components/Text/Text';
import Footer from '../components/Footer/Footer';
// import axios from 'axios';


const News = () => {
  
    const [news, setNews] = useState([]);
  
    useEffect(() => {
      getNews();
    }, []);

//   /**
//   * @description This function requests the data of all seasons
//   */
//     const getNews  = (setNews) => {
//         axios.get('https://bodega-back-end.herokuapp.com/api/getall').then((response) => {
//             console.log(response.data);
//             setNews(response.data);
//         }).catch((err) => {
//         console.log(err.message);
//         })
//     }



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
        <h1 className='news'>Noticias</h1>
        <div>
        <pre dangerouslySetInnerHTML={{
            __html: JSON.stringify(news, null, 2),
        }} />
        
        </div>
        <Footer/>
        </>
      );
    }

export default News;
