"use client"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero/Hero"
import GamesOnSale from "@/components/GamesOnSale/GamesOnSale"
import FeaturedList from '@/components/FeaturedList'
import FreeGames from "@/components/FreeGames/FreeGames"
import TopGames from "@/components/TopGames/TopGames"
import Catalog from "@/components/Catalog"
import Footer from "@/components/Footer"

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto" data-aos="fade-down">
        <NavBar />
      </div>
      {/* Container */}
      <div className="max-w-screen-lg mx-auto px-4">
        <div data-aos="fade-up">
          <Hero />
        </div>
        <div data-aos="fade-right">
          <GamesOnSale />
        </div>
        <div data-aos="zoom-in">
          <FeaturedList />
        </div>
        <div data-aos="fade-left">
          <FreeGames />
        </div>
        <div data-aos="fade-up">
          <TopGames />
        </div>
        <div data-aos="zoom-in">
          <FeaturedList />
        </div>
        <div data-aos="fade-right">
          <GamesOnSale />
        </div>
        <div data-aos="fade-up">
          <Catalog />
        </div>
      </div>
      <div data-aos="fade-up">
        <Footer />
      </div>
    </>
  );
}

export default Home

