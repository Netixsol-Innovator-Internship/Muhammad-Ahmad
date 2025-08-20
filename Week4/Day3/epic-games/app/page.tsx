import Image from "next/image"

import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero/Hero"
import GamesOnSale from "@/components/GamesOnSale/GamesOnSale"
import FeaturedGame from "@/components/FeaturedGame"
import FreeGames from "@/components/FreeGames/FreeGames"
import TopGames from "@/components/TopGames/TopGames"

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
        <section className="my-6 grid gap-y-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-6'">
          <FeaturedGame 
            image="/images/NFS-featured.png"
            title="NFS UNBOUND"
            description="Pre-purchase NFS Unbound and get an exclusive Driving Effect, License Plate, $150,000 Bank, and more."
            price="₹3,499">
          </FeaturedGame>
          <FeaturedGame 
            image="/images/NFS-featured.png"
            title="NFS UNBOUND"
            description="Pre-purchase NFS Unbound and get an exclusive Driving Effect, License Plate, $150,000 Bank, and more."
            price="₹3,499">
          </FeaturedGame>
          <FeaturedGame 
            image="/images/NFS-featured.png"
            title="NFS UNBOUND"
            description="Pre-purchase NFS Unbound and get an exclusive Driving Effect, License Plate, $150,000 Bank, and more."
            price="₹3,499">
          </FeaturedGame>
        </section>

        {/* Free Games Section */}
        <FreeGames></FreeGames>

        <TopGames></TopGames>

      </div>
    </>
  )
}

export default Home

