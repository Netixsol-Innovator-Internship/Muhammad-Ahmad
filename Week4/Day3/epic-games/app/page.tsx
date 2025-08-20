import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero/Hero"
import GameOnSale from "@/components/GameOnSale"

const Home: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <NavBar></NavBar>
      </div>

      <div className="max-w-screen-lg mx-auto px-4">
        <Hero></Hero>

        {/* Games on Sale Section */}
        <section>
          <GameOnSale></GameOnSale>
        </section>

      </div>
    </>
  )
}

export default Home

