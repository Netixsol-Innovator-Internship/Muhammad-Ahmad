import Image from "next/image"

import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero/Hero"
import GamesOnSale from "@/components/GamesOnSale/GamesOnSale"

const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <NavBar></NavBar>
      </div>

      <div className="max-w-screen-lg mx-auto px-4">
        <Hero></Hero>

        <GamesOnSale></GamesOnSale>

      </div>
    </>
  )
}

export default Home

