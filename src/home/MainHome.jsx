import React, { useEffect } from 'react'
import HomeNavbar from './HomeNavbar';
import Home from './HomeTwo';
import Cards from './Cards';
import About from './About';

import AOS from "aos";
import "aos/dist/aos.css";

const MainHome = () => {

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <HomeNavbar/>
      <Home handleOrderPopup={handleOrderPopup}/>
      <Cards/>
      <About/>
    </div>
  )
}

export default MainHome

