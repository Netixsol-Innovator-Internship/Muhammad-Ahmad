import Image from "next/image"

import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero/Hero"
import GamesOnSale from "@/components/GamesOnSale/GamesOnSale"
import FeaturedGame from "@/components/FeaturedGame"
import FeaturedList from '@/components/FeaturedList'
import FreeGames from "@/components/FreeGames/FreeGames"
import TopGames from "@/components/TopGames/TopGames"
import Catalog from "@/components/Catalog"
import Footer from "@/components/Footer"

const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <NavBar></NavBar>
      </div>

      {/* Container */}
      <div className="max-w-screen-lg mx-auto px-4">
        <Hero></Hero>

        {/* Games On Sale section */}
        <GamesOnSale></GamesOnSale>

        {/* Featured Games Section */}
  <FeaturedList />

        {/* Free Games Section */}
        <FreeGames></FreeGames>

        {/* Top Games section */}
        <TopGames></TopGames>

        {/* Featured Games Section */}
  <FeaturedList />

        {/* Title has to be updated */}
        {/* Games On Sale section */}
        <GamesOnSale></GamesOnSale>

        <Catalog></Catalog>

      </div>

      <Footer></Footer>
    </>
  )
}

export default Home

